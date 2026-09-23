import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Calendar, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const contactCards = [
  {
    icon: MapPin,
    label: 'Corporate Headquarters',
    value: 'BITA CLOUD INFO TECH',
    sub: 'India · Global Remote Operations',
  },
  {
    icon: Phone,
    label: 'WhatsApp / Direct Call',
    value: '+91 89822 96014',
    rawCopy: '+918982296014',
    link: 'https://wa.me/918982296014',
    isExternal: true,
    canCopy: true,
  },
  {
    icon: Mail,
    label: 'Email Us',
    value: 'contact@bitacloudinfo.tech',
    rawCopy: 'contact@bitacloudinfo.tech',
    link: 'mailto:contact@bitacloudinfo.tech',
    canCopy: true,
  },
  {
    icon: Calendar,
    label: 'Schedule a Call',
    value: 'Book a 30-min free consultation',
    link: 'https://wa.me/918982296014?text=Hi%20BITA%20Cloud%2C%20I%20would%20like%20to%20schedule%20a%20consultation.',
    isExternal: true,
    highlight: true,
  },
];

const services = [
  'Data Analytics & Power BI',
  'Azure Data Factory & Pipeline ETL',
  'Microsoft Fabric Lakehouse Integration',
  'dbt Data Transformation',
  'Databricks & PySpark Engineering',
  'Enterprise AI / LLM Agents',
  'Cloud Infrastructure & Migration',
  'Custom Software Development',
];

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    jobtitle: '',
    service: services[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill out all required fields marked with *');
      return;
    }

    const msg = [
      'Hello BITA Cloud Team!',
      '',
      `*Name:* ${form.name}`,
      `*Company:* ${form.company || 'N/A'}`,
      `*Job Title:* ${form.jobtitle || 'N/A'}`,
      `*Email:* ${form.email}`,
      `*Service Required:* ${form.service}`,
      `*Message:* ${form.message}`,
    ].join('%0A');

    setSubmitted(true);
    toast.loading('Preparing your consultation brief...', { id: 'contact-submit' });

    setTimeout(() => {
      toast.success('Opening WhatsApp with your project brief...', { id: 'contact-submit' });
      window.open(`https://wa.me/918982296014?text=${msg}`, '_blank');
      setSubmitted(false);
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container">
        <div className="max-w-2xl mb-14 space-y-4">
          <div className="section-badge w-fit">Corporate Contact</div>
          <h2 id="contact-heading" className="section-title">
            Start Your <strong>Enterprise Engagement</strong>
          </h2>
          <p className="section-subtitle">
            Connect with our engineering leadership to discuss pipeline architecture, data modernization, or Power BI reporting. Typical response within <strong style={{ color: 'var(--text-primary)' }}>2 business hours</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-4">
            {contactCards.map((card, i) => (
              <div
                key={i}
                className="master-card p-5 flex items-start justify-between gap-4"
                style={card.highlight ? { borderColor: 'var(--accent-cyan)', borderWidth: '1px' } : {}}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: card.highlight ? 'var(--accent-cyan-dim)' : 'var(--bg-secondary)',
                      border: card.highlight
                        ? '1px solid rgba(0,229,255,0.3)'
                        : '1px solid var(--border-medium)',
                    }}
                  >
                    <card.icon size={19} style={{ color: 'var(--accent-cyan)' }} aria-hidden="true" />
                  </div>
                  <div>
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {card.label}
                    </p>
                    {card.link ? (
                      <a
                        href={card.link}
                        target={card.isExternal ? '_blank' : undefined}
                        rel={card.isExternal ? 'noopener noreferrer' : undefined}
                        className="font-semibold text-sm hover:underline"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        {card.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {card.value}
                      </p>
                    )}
                    {card.sub && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {card.sub}
                      </p>
                    )}
                  </div>
                </div>

                {card.canCopy && (
                  <button
                    onClick={() => copyToClipboard(card.rawCopy, card.label)}
                    className="p-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 mt-1"
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-medium)',
                      color: copiedKey === card.label ? 'var(--accent-green)' : 'var(--text-muted)',
                    }}
                    title={`Copy ${card.label}`}
                    aria-label={`Copy ${card.label}`}
                  >
                    {copiedKey === card.label ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                )}
              </div>
            ))}

            {/* Direct WhatsApp CTA */}
            <a
              href="https://wa.me/918982296014"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
              aria-label="Open WhatsApp to chat with BITA CLOUD INFO TECH — +91 89822 96014"
            >
              <MessageSquare size={16} className="fill-white" aria-hidden="true" />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

          {/* Right — form */}
          <div
            className="master-card p-7 lg:col-span-3"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <h3
              className="font-semibold text-lg mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              Send a Project Brief
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              All fields marked * are required. We respond within 2 business hours.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
              aria-label="Contact form — send a project brief"
            >
              {/* Name + Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-company"
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Company *
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="form-input"
                    aria-required="true"
                  />
                </div>
              </div>

              {/* Email + Job Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Work Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@enterprise.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="form-input"
                    aria-required="true"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-jobtitle"
                    className="block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Job Title
                  </label>
                  <input
                    id="contact-jobtitle"
                    type="text"
                    autoComplete="organization-title"
                    placeholder="CDO / VP Engineering"
                    value={form.jobtitle}
                    onChange={e => setForm({ ...form, jobtitle: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Service */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Service Required
                </label>
                <select
                  id="contact-service"
                  value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  className="form-input"
                  style={{ appearance: 'auto' }}
                >
                  {services.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Describe your pipeline requirements, data scale, current stack, or transformation goals…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="form-input resize-none"
                  aria-required="true"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-whatsapp w-full justify-center py-3.5 font-bold text-sm"
                aria-live="polite"
                aria-busy={submitted}
              >
                {submitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} aria-hidden="true" />
                    <span>Connecting to WhatsApp…</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <MessageSquare size={16} className="fill-white" aria-hidden="true" />
                    <span>Submit &amp; Open WhatsApp</span>
                  </span>
                )}
              </button>

              <p className="text-center text-xs" style={{ color: 'var(--text-muted)' }}>
                Your message is sent directly to our engineering leadership. No spam — ever.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
