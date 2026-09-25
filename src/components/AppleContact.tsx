import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2, Copy, Check, Send } from 'lucide-react';
import { toast } from 'sonner';

export const AppleContact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    jobtitle: '',
    service: 'Microsoft Fabric & OneLake Lakehouse',
    message: '',
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    'Microsoft Fabric & OneLake Lakehouse',
    'Azure Data Factory (ADF) Pipeline Automation',
    'Databricks & PySpark Optimization',
    'Power BI Visual Analytics & DAX Modeling',
    'dbt Transformation Layer & Testing',
    'Enterprise AI & LLM Agentic RAG',
    'Cloud Migration (SQL Server / Oracle / AWS to Azure)',
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill out all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    const msg = [
      'Hello BITA Cloud Engineering Team!',
      '',
      `*Name:* ${form.name}`,
      `*Company:* ${form.company || 'N/A'}`,
      `*Job Title:* ${form.jobtitle || 'N/A'}`,
      `*Email:* ${form.email}`,
      `*Service Required:* ${form.service}`,
      `*Project Brief:* ${form.message}`,
    ].join('%0A');

    toast.loading('Formatting your project brief for engineering leadership...', { id: 'contact' });
    setTimeout(() => {
      toast.success('Opening WhatsApp with your project brief...', { id: 'contact' });
      window.open(`https://wa.me/918982296014?text=${msg}`, '_blank');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400 inline-flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Corporate Contact &amp; Brief
        </span>
        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          Initiate Your Engagement
        </h2>
        <p className="text-[#86868b] text-base sm:text-lg font-medium">
          Connect directly with our engineering leadership to discuss lakehouse architecture, pipeline
          refactoring, or Power BI reporting. Typical response within 2 business hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        {/* Left Direct Channels */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card 1: Headquarters */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl apple-glass flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#86868b]">
                Headquarters
              </span>
              <h4 className="text-base font-bold text-white mt-0.5">BITA CLOUD INFO TECH</h4>
              <p className="text-xs text-[#86868b] mt-1">India · Global Remote Operations</p>
            </div>
          </div>

          {/* Card 2: WhatsApp / Call */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl apple-glass flex items-center justify-center text-emerald-400 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#86868b]">
                  WhatsApp / Direct Line
                </span>
                <a
                  href="https://wa.me/918982296014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-bold text-emerald-400 hover:underline mt-0.5"
                >
                  +91 89822 96014
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard('+918982296014', 'Phone number')}
              className="p-2.5 rounded-xl apple-glass text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Copy Phone Number"
            >
              {copiedKey === 'Phone number' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          {/* Card 3: Email */}
          <div className="apple-glass rounded-3xl p-6 border border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl apple-glass flex items-center justify-center text-cyan-400 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#86868b]">
                  Corporate Email
                </span>
                <a
                  href="mailto:contact@bitacloudinfo.tech"
                  className="block text-sm sm:text-base font-bold text-white hover:text-cyan-400 transition-colors mt-0.5"
                >
                  contact@bitacloudinfo.tech
                </a>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard('contact@bitacloudinfo.tech', 'Email')}
              className="p-2.5 rounded-xl apple-glass text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Copy Email"
            >
              {copiedKey === 'Email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            </button>
          </div>

          {/* WhatsApp Direct Action Button */}
          <a
            href="https://wa.me/918982296014"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageSquare size={16} className="fill-white" />
            <span>Chat Directly on WhatsApp</span>
          </a>
        </div>

        {/* Right Form Card */}
        <div className="apple-glass rounded-3xl p-8 lg:p-10 border border-white/10 lg:col-span-3 space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white tracking-tight">Submit Project Brief</h3>
            <p className="text-xs text-[#86868b]">
              All fields marked * are required. Sent directly to engineering leadership.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Health Corp"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@enterprise.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="CDO / VP Engineering / Architect"
                  value={form.jobtitle}
                  onChange={(e) => setForm({ ...form, jobtitle: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                Service Required
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="form-input"
              >
                {services.map((s, i) => (
                  <option key={i} value={s} className="bg-[#121214] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#86868b]">
                Project Scope &amp; Latency Goals *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Describe your data volume, current architecture, reporting bottlenecks, or migration requirements..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="form-input resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all hover:scale-[1.01] active:scale-[0.99] shadow-2xl flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <CheckCircle2 size={16} className="animate-spin" />
                  <span>Connecting to WhatsApp...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit &amp; Open WhatsApp Brief</span>
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-[#86868b]">
              Your brief is routed directly to senior engineering leadership. NDA protected.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
