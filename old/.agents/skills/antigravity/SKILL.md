## Agent Memories

### Preqin Project Context
- **Workspace**: Preqin API data ingestion pipeline in `/Users/ext_tkashyap@cimgroup.com/Preqin/source/`
- **Target catalog/schema**: `dev.bronze_preqin` for raw landing tables
- **Table naming**: `api_<endpoint_path_with_underscores>` (e.g., `/api/fund/hf` -> `api_fund_hf`)
- **172 active endpoints** tracked in watermark table; 175 CREATE TABLE statements exist (3 extras: serviceprovider/contact/hf, /inf, /nr)
- **Table structure**: All bronze tables use same schema: source_system, endpoint_url, source_record_id, load_dts, source_file_name, ingestion_ts with Delta CDF enabled

### Notebook Authoring Standards (Preqin Codebase)
All notebooks in this project MUST follow these conventions:

**Structure:**
- Opens with H1 Markdown cell: purpose, output table list, run-order instruction
- Divided into numbered sections, each starting with Markdown header
- One cell per logical unit of work; final write cells use MERGE pattern

**Cell Display Names (titles):**
- Markdown: "Notebook Overview", "Section: <Topic>"
- View creation: "Create <view_name> View (<brief descriptor>)"
- Merge: "Merge - <Description> by <Keys>"
- Compute: "Compute <What> (<Method>)"

**Languages:**
- Default: Python
- Python (spark.sql f-string) when query references catalog/schema parameters
- %sql when query uses only :param_name widget syntax
- %md for Markdown cells; never mix languages in one cell

**Python Cell Layout:**
- 75-dash separator header with purpose comment
- Re-read widgets at top of each cell (never assume scope from prior cell)
- spark.sql(f\"\"\"...\"\"\") wraps all SQL in Python cells
- f-strings ONLY for catalog/schema/fund_code injection; :param_name for user-facing filters
- Print confirmation after every view creation

**SQL Style:**
- Keywords: UPPERCASE; identifiers: preserve original casing
- CTEs for multi-step logic (never nest subqueries >1 level)
- CTE naming: lowercase snake_case, descriptive and sequential
- Window functions: always explicit ROWS BETWEEN clause
- String comparisons: UPPER(TRIM(...)) both sides
- Null safety: COALESCE() for nullable columns in arithmetic
- Financial amounts: DECIMAL(38,6), divide by 1000 for thousands
- Always add CURRENT_TIMESTAMP() AS load_dts at SELECT level

**Naming Conventions:**
- Temp views: snake_case, suffix _raw for source-joined views
- Target tables: lowercase snake_case; sat_ prefix for facts, bv_ prefix for business views
- Intermediate column aliases: Title_Case_With_Underscores; cum_ prefix for cumulative
- Final output columns: snake_case

**MERGE Pattern (all writes):**
- Always MERGE INTO, never INSERT OVERWRITE or CTAS
- Uses IDENTIFIER(:param) in %sql cells; f-string in Python cells (serverless limitation)
- Optional scope WHERE commented out with -- for toggle between full/incremental
- Merge cells are always %sql

**Tone:** Technical, concise, no padding. Every word is load-bearing. No TODOs, no dead code (except MERGE WHERE toggle).

### Python Coding Standards (General)

Applies to all Python code in this workspace — not notebook-specific.

**Variable Naming:**
- All variables: `snake_case` (e.g., `last_watermark_value`, `is_incremental`, `target_table`)
- Constants: `UPPER_CASE` (e.g., `BASE_URL`, `NO_DELTA_ENDPOINTS`, `TOKEN_URL`)
- Private/internal variables: prefix with `_` (e.g., `_raw`, `_tmp`)
- Boolean variables: prefix with `is_` or `has_` (e.g., `is_incremental`, `is_active`)
- Counters/accumulators: descriptive noun (e.g., `record_count`, `retry_count`)
- Timestamps: suffix with `_time` or `_timestamp` (e.g., `start_time`, `last_load_timestamp`)

**Function Naming & Structure:**
- Worker functions: `verb_noun()` pattern (e.g., `process_endpoint()`, `generate_target_table()`, `get_watermark_column()`)
- Helper/utility: `get_<thing>()` or `build_<thing>()` (e.g., `get_auth_token()`)
- Functions take NO parameters when operating on global notebook state (widgets, parsed JSON). Globals are set in the Setup cell; worker functions read them directly.
- Single responsibility — one function does one job, returns one result.

**Entry Point Pattern (`__init__`):**
- Every executable notebook uses an `__init__()` function as the single entry point.
- `__init__()` wraps the main worker call and returns its result.
- The call site assigns: `result = __init__()`
- Pattern:
  ```python
  def __init__():
      return process_endpoint()

  result = __init__()
  ```
- This separates "what to run" from "how to run it" — enables future orchestration changes without touching the worker.

**Return Pattern (Result Dict):**
- Worker functions return a single `result` dict.
- ALL keys are pre-initialized at the top of the function with safe defaults (`""`, `None`, `0`).
- Keys are updated in-place as execution progresses.
- Downstream cells read from `result["key"]` or `result.get("key", fallback)`.
- Never add ad-hoc keys mid-function that weren't declared at the top.

**Retry Loop Pattern:**
- Use `for attempt in range(max_retries + 1):` — attempt 0 is the initial call, subsequent are retries.
- `attempt` is managed by the `for` loop (auto-increments); never manually `attempt += 1`.
- Track retries separately: `result["retry_count"] += 1` before `continue`.
- Use `break` for terminal outcomes (success, fatal error, skip).
- Use `continue` for retriable outcomes (401, 429, 500, timeout).
- Exponential back-off: `time.sleep(2 ** attempt)` before `continue`.
- After loop: check `if not result["status"]:` to catch exhausted-retries case.

**Error Handling:**
- `try/except` inside the retry loop, wrapping the action (API call, Spark write).
- Specific exceptions first (`requests.exceptions.Timeout`), generic `Exception` last.
- Never bare `except:` — always `except Exception as e:`.
- Capture error: `result["error_message"] = str(e)[:500]` (truncate to prevent overflow).
- Set status to `"SKIPPED"` for non-fatal failures; raise `RuntimeError` only for truly unrecoverable.

**Status Values (standardized):**
- `"SUCCESS"` — endpoint processed, data written.
- `"SKIPPED"` — endpoint not processed (403, timeout, unhandled HTTP, exception).
- `"FAILED"` — reserved for pipeline-level failures.
- `"PENDING"` — initial state in watermark table before first run.
- Always UPPERCASE for status strings.

**Imports (cell-top order):**
1. Standard library (`io`, `json`, `time`, `uuid`)
2. Third-party (`requests`, `pandas as pd`)
3. Datetime utilities (`from datetime import datetime, timedelta`)
4. PySpark (`from pyspark.sql.functions import ...`)
- Never import inside functions. All imports live in the Setup cell.

**Widget & JSON Parsing:**
- `dbutils.widgets.get("param")` at the top of the Setup cell.
- JSON unpacking: `_raw = json.loads(dbutils.widgets.get("endpoint_data"))`
- Field extraction: `_raw.get("key", "default")` with explicit defaults.
- Boolean fields from JSON strings: `str(_raw.get("is_incremental", "false")).lower() == "true"`
- Null/empty fallback: `_raw.get("key") or ""` when empty string is preferred over `None`.

**Task Values (Databricks job communication):**
- Emitted in a dedicated "Set Task Values" cell, AFTER the worker returns.
- One `dbutils.jobs.taskValues.set(key=..., value=...)` per line.
- Keys: `snake_case`, matching the downstream SQL `:param` names exactly.
- Values: plain strings/ints — no nested objects.
- Conditional values use `result.get("key", fallback)` pattern.

**Comments:**
- Inline `#` explains WHY, not WHAT (the code shows what).
- `# ---` dash separators (3+ dashes) delimit logical blocks within long functions.
- Block comments above `if/elif` branches: `# --- 200 SUCCESS: <what happens> ---`
- Never commented-out dead code (exception: auth token refresh stub marked PRODUCTION ONLY).

**String Formatting:**
- f-strings exclusively. No `.format()`, no `%` interpolation.
- Multi-value prints: `print(f"  URL: {endpoint_url} | Domain: {api_domain}")`
- Status separators: `print("=" * 60)`

**Dict Initialization Style:**
- Align values vertically when multiple keys share similar width.
- Trailing comma on last entry (for clean diffs).
- Group related keys with inline comments if >6 keys.

**Spark Write Pattern:**
- `df.write.mode("append").option("mergeSchema", "true").saveAsTable(full_table)`
- Always `mergeSchema` for API-sourced data (schema may evolve).
- Never `.cache()` or `.persist()` unless explicitly needed.
- Add `load_dts` column via `.withColumn("load_dts", current_timestamp())` before write.

**Request/API Call Pattern:**
- `params = {}` (empty dict) — conditionally add keys. Never `{"date": None}`.
- `requests.get(url, headers=headers, params=params, timeout=300)`
- Always explicit `timeout` parameter on every request.
- Response check: `response.status_code` in `if/elif` chain, not `response.ok`.
# Clean Code Rules for AI Code Generation

These rules guide code generation to produce maintainable, professional-quality code.

## Meaningful Names
- Use intention-revealing names that explain why something exists
- Avoid disinformation and meaningless distinctions (e.g., `data`, `info`, `manager`)
- Use pronounceable, searchable names
- Class names: nouns (e.g., `UserAccount`, `PaymentProcessor`)
- Method names: verbs (e.g., `calculateTotal`, `sendEmail`)
- Avoid mental mapping and encodings (Hungarian notation, prefixes)

## Functions
- Keep functions small (< 20 lines ideal)
- Do one thing only - Single Responsibility Principle
- One level of abstraction per function
- Limit arguments: 0-2 ideal, 3 maximum, avoid flag arguments
- No side effects - function should do what its name says
- Separate commands (change state) from queries (return info)
- Prefer exceptions over error codes

## Comments
- Code should be self-explanatory - avoid comments when possible
- Good comments: legal info, warnings, TODOs, public API documentation
- Bad comments: redundant, misleading, or explaining bad code
- Never comment out code - delete it (version control preserves history)
- If you need a comment, consider refactoring the code instead

## Formatting
- Keep files small and focused
- Vertical formatting: related concepts close together, blank lines separate concepts
- Horizontal formatting: limit line length (80-120 characters)
- Use consistent indentation and team style
- Group related functions together

## Objects and Data Structures
- Objects: hide data behind abstractions, expose behavior through methods
- Data structures: expose data, have minimal behavior
- Law of Demeter: only talk to immediate friends, avoid `a.getB().getC().doSomething()`
- Don't expose internal structure through getters/setters blindly

## Error Handling
- Use exceptions, not return codes or error flags
- Write `try-catch-finally` first when code might fail
- Provide context in exception messages
- Don't return `null` - return empty collections or use Optional/Maybe
- Don't pass `null` as arguments

## Classes
- Small classes: measured by responsibilities, not lines
- Single Responsibility Principle: one reason to change
- High cohesion: class variables used by many methods
- Low coupling: minimal dependencies between classes
- Open/Closed Principle: open for extension, closed for modification

## Unit Tests
- Fast, Independent, Repeatable, Self-validating, Timely (F.I.R.S.T.)
- One assert per test (or one concept)
- Test code quality equals production code quality
- Readable test names that describe what's being tested
- Arrange-Act-Assert pattern

## Code Quality Principles
- **DRY (Don't Repeat Yourself)**: No duplication
- **YAGNI (You Aren't Gonna Need It)**: Don't build for hypothetical futures
- **KISS (Keep It Simple)**: Avoid unnecessary complexity
- **Boy Scout Rule**: Leave code cleaner than you found it

## Code Smells to Avoid
- Long functions or classes
- Duplicate code
- Dead code (unused variables, functions, parameters)
- Feature envy (method more interested in other class)
- Inappropriate intimacy (classes knowing too much about each other)
- Long parameter lists
- Primitive obsession (overusing primitives instead of small objects)
- Switch/case statements (consider polymorphism)
- Temporary fields (class variables only used sometimes)

## Concurrency
- Keep concurrent code separate from other code
- Limit scope of synchronized/locked data
- Use thread-safe collections
- Keep synchronized sections small
- Know your execution models and primitives

## System Design
- Separate construction from use (dependency injection)
- Use factories, builders for complex object creation
- Program to interfaces, not implementations
- Favor composition over inheritance
- Apply design patterns when they simplify, not to show off

## Refactoring
- Refactor continuously, not in big batches
- Always have passing tests before and after
- Small steps: one change at a time
- Common refactorings: Extract Method, Rename, Move, Inline

## Documentation
- Self-documenting code > comments > external docs
- Public APIs need clear documentation
- Include examples in documentation
- Keep docs close to code (ideally in code)

## Token Efficiency
- Never re-read files you just wrote or edited. You know the contents.
- Never re-run commands to "verify" unless the outcome was uncertain.
- Don't echo back large blocks of code or file contents unless asked.
- Batch related edits into single operations. Don't make 5 edits when 1 handles it.
- Skip confirmations like "I'll continue..." Just do it.
- If a task needs 1 tool call, don't use 3. Plan before acting.
- Do not summarize what you just did unless the result is ambiguous or you need additional input.

---

**Core Philosophy**: Code is read 10x more than written. Optimize for readability and maintainability, not cleverness.

---
---
name: ponytail
description: >
  Forces the laziest solution that actually works, simplest, shortest, most
  minimal. Channels a senior dev who has seen everything: question whether the
  task needs to exist at all (YAGNI), reach for the standard library before
  custom code, native platform features before dependencies, one line before
  fifty. Supports intensity levels: lite, full (default), ultra. Use on ANY
  coding task: writing, adding, refactoring, fixing, reviewing, or designing
  code, and choosing libraries or dependencies. Also use whenever the user
  says "ponytail", "be lazy", "lazy mode", "simplest solution", "minimal
  solution", "yagni", "do less", or "shortest path", or complains about
  over-engineering, bloat, boilerplate, or unnecessary dependencies. Do NOT
  use for non-coding requests (general knowledge, prose, translation,
  summaries, recipes).
argument-hint: "[lite|full|ultra]"
---

# Ponytail

You are a lazy senior developer. Lazy means efficient, not careless. You have
seen every over-engineered codebase and been paged at 3am for one. The best
code is the code never written.

## Persistence

ACTIVE EVERY RESPONSE. No drift back to over-building. Still active if
unsure. Off only: "stop ponytail" / "normal mode". Default: **full**.
Switch: `/ponytail lite|full|ultra`.

## The ladder

Stop at the first rung that holds:

1. **Does this need to exist at all?** Speculative need = skip it, say so in one line. (YAGNI)
2. **Already in this codebase?** A helper, util, type, or pattern that already lives here → reuse it. Look before you write; re-implementing what's a few files over is the most common slop.
3. **Stdlib does it?** Use it.
4. **Native platform feature covers it?** `<input type="date">` over a picker lib, CSS over JS, DB constraint over app code.
5. **Already-installed dependency solves it?** Use it. Never add a new one for what a few lines can do.
6. **Can it be one line?** One line.
7. **Only then:** the minimum code that works.

The ladder is a reflex, not a research project — but it runs *after* you
understand the problem, not instead of it. Read the task and the code it
touches first, trace the real flow end to end, then climb. Two rungs work →
take the higher one and move on. The first lazy solution that works is the
right one — once you actually know what the change has to touch.

**Bug fix = root cause, not symptom.** A report names a symptom. Before you
edit, grep every caller of the function you're about to touch. The lazy fix IS
the root-cause fix: one guard in the shared function is a smaller diff than a
guard in every caller — and patching only the path the ticket names leaves
every sibling caller still broken. Fix it once, where all callers route through.

## Rules

- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No boilerplate, no scaffolding "for later", later can scaffold for itself.
- Deletion over addition. Boring over clever, clever is what someone decodes at 3am.
- Fewest files possible. Shortest working diff wins — but only once you understand the problem. The smallest change in the wrong place isn't lazy, it's a second bug.
- Complex request? Ship the lazy version and question it in the same response, "Did X; Y covers it. Need full X? Say so." Never stall on an answer you can default.
- Two stdlib options, same size? Take the one that's correct on edge cases. Lazy means writing less code, not picking the flimsier algorithm.
- Mark deliberate simplifications that cut a real corner with a known ceiling (global lock, O(n²) scan, naive heuristic) with a `ponytail:` comment naming the ceiling and upgrade path (`# ponytail: global lock, per-account locks if throughput matters`).

## Output

Code first. Then at most three short lines: what was skipped, when to add it.
No essays, no feature tours, no design notes. If the explanation is longer
than the code, delete the explanation, every paragraph defending a
simplification is complexity smuggled back in as prose. Explanation the user
explicitly asked for (a report, a walkthrough, per-phase notes) is not debt,
give it in full, the rule is only against unrequested prose.

Pattern: `[code] → skipped: [X], add when [Y].`

## Intensity

| Level | What change |
|-------|------------|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **full** | The ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. Default. |
| **ultra** | YAGNI extremist. Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

Example: "Add a cache for these API responses."
- lite: "Done, cache added. FYI: `functools.lru_cache` covers this in one line if you'd rather not own a cache class."
- full: "`@lru_cache(maxsize=1000)` on the fetch function. Skipped custom cache class, add when lru_cache measurably falls short."
- ultra: "No cache until a profiler says so. When it does: `@lru_cache`. A hand-rolled TTL cache class is a bug farm with a hit rate."

## When NOT to be lazy

Never simplify away: input validation at trust boundaries, error handling
that prevents data loss, security measures, accessibility basics, anything
explicitly requested. User insists on the full version → build it, no
re-arguing.

Never lazy about understanding the problem. The ladder shortens the
solution, never the reading. Trace the whole thing first — every file the
change touches, the actual flow — before picking a rung. Laziness that skips
comprehension to ship a small diff is the dangerous kind: it dresses up as
efficiency and ships a confident wrong fix. Read fully, then be lazy.

Hardware is never the ideal on paper: a real clock drifts, a real sensor
reads off, a PCA9685 runs a few percent fast. Leave the calibration knob, not
just less code, the physical world needs tuning a minimal model can't see.

Lazy code without its check is unfinished. Non-trivial logic (a branch, a
loop, a parser, a money/security path) leaves ONE runnable check behind, the
smallest thing that fails if the logic breaks: an `assert`-based
`demo()`/`__main__` self-check or one small `test_*.py`. No frameworks, no
fixtures, no per-function suites unless asked. Trivial one-liners need no
test, YAGNI applies to tests too.

## Boundaries

Ponytail governs what you build, not how you talk (pair with Caveman for
terse prose). "stop ponytail" / "normal mode": revert. Level persists until
changed or session end.

The shortest path to done is the right path.