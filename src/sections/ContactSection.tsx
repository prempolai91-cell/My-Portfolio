import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PERSONAL_BRAND } from '../data/portfolioData';
import { Mail, Send, Check, Copy, ArrowUpRight, Github, Linkedin, Instagram, Loader2 } from 'lucide-react';
import { soundManager } from '../lib/audio';
import { ScrollReveal } from '../components/motion/ScrollReveal';

// EmailJS Credentials configured for direct visitor communication
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_1g8pimd',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_t03fmoi',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ENuieEOaM5JZgbueJ',
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web / App Development',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedViaClient, setSubmittedViaClient] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const getMailtoUrl = () => {
    return `mailto:prempolai66@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${formData.projectType} (${formData.name})`
    )}&body=${encodeURIComponent(
      `Hi Prem,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    )}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        user_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        user_email: formData.email,
        reply_to: formData.email,
        project_type: formData.projectType,
        subject: `New Portfolio Message: ${formData.projectType} from ${formData.name}`,
        message: formData.message,
        to_name: 'Prem Polai',
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );

      setSubmittedViaClient(false);
      setIsSubmitted(true);
    } catch {
      // Seamless direct fallback: automatically dispatch to default email app
      const mailtoUrl = getMailtoUrl();
      window.location.href = mailtoUrl;
      setSubmittedViaClient(true);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText('prempolai66@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'GitHub':
        return <Github className="w-4 h-4" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4" />;
      case 'Instagram':
        return <Instagram className="w-4 h-4" />;
      case 'Email':
        return <Mail className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 md:px-12 lg:px-16 border-t border-white/5">
      {/* Background ambient crimson flare */}
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-rose-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* Left Column: Heading, Supporting Text, Socials */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" distance={24}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="text-xs font-mono tracking-widest uppercase text-rose-400">
                    COLLABORATION // 09
                  </span>
                  <h2 className="text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.08] break-words">
                    LET&apos;S BUILD <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600 inline-block pr-2">
                      SOMETHING
                    </span>{' '}
                    <br />
                    <span className="italic font-light text-zinc-300">MEANINGFUL.</span>
                  </h2>
                </div>

                <p className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">
                  Have an idea, project or collaboration in mind? Let&apos;s turn it into something real. Whether you need full-stack development, refined UI/UX design, or security-conscious architecture, I&apos;m ready to talk.
                </p>

                {/* Email quick copy card */}
                <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-2">
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    DIRECT INBOX
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href="mailto:prempolai66@gmail.com"
                      className="text-sm md:text-base font-mono text-white hover:text-rose-400 transition-colors truncate"
                    >
                      prempolai66@gmail.com
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Social channels */}
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    CONNECT ACROSS THE WEB
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {PERSONAL_BRAND.socialLinks.map((social) => (
                      <a
                        key={social.platform}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        onMouseEnter={() => soundManager.playHover()}
                        className="p-3.5 rounded-xl bg-[#090b10] border border-white/5 hover:border-rose-500/40 hover:bg-zinc-900/80 transition-all flex items-center justify-between group text-xs font-mono text-zinc-300"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-rose-400">{getSocialIcon(social.platform)}</span>
                          <span>{social.platform}</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" distance={24} delay={0.1}>
              <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-b from-[#0e1017] via-[#090b10] to-[#06070a] border border-white/10 shadow-2xl">
                {isSubmitted ? (
                  <div className="py-16 text-center space-y-5 animate-in fade-in duration-300">
                    <div className="w-14 h-14 rounded-full bg-rose-600/20 text-rose-400 border border-rose-500/40 flex items-center justify-center mx-auto">
                      <Check className="w-7 h-7" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-display font-bold text-white">
                        {submittedViaClient ? 'Message Prepared for Dispatch' : 'Message Sent Successfully'}
                      </h3>
                      <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                        {submittedViaClient ? (
                          <>
                            Thank you, <span className="text-white font-medium">{formData.name}</span>! Your message has been pre-filled for <span className="text-rose-400 font-mono">prempolai66@gmail.com</span> in your email client. If your client didn&apos;t open automatically, use the button below:
                          </>
                        ) : (
                          <>
                            Thank you for reaching out, <span className="text-white font-medium">{formData.name}</span>! I review inquiries carefully and will get back to you shortly at <span className="text-rose-400 font-mono">{formData.email}</span>.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                      {submittedViaClient && (
                        <a
                          href={getMailtoUrl()}
                          onClick={() => soundManager.playClick()}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-rose-950/40"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Open in Email App</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          setIsSubmitted(false);
                          setSubmittedViaClient(false);
                          setFormData({
                            name: '',
                            email: '',
                            projectType: 'Web / App Development',
                            message: '',
                          });
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white uppercase tracking-wider transition-colors border border-white/5"
                      >
                        SEND ANOTHER MESSAGE
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                        START A CONVERSATION
                      </span>
                      <span className="text-[11px] font-mono text-rose-400">
                        DIRECT TRANSMISSION
                      </span>
                    </div>

                    {/* Name field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-wider"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-hidden focus:border-rose-500 transition-colors font-sans"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-wider"
                      >
                        Your Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-hidden focus:border-rose-500 transition-colors font-sans"
                      />
                    </div>

                    {/* Project Type */}
                    <div className="space-y-2">
                      <label
                        htmlFor="project-type"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-wider"
                      >
                        Project Type
                      </label>
                      <select
                        id="project-type"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/90 border border-white/10 text-zinc-200 text-sm focus:outline-hidden focus:border-rose-500 transition-colors font-sans"
                      >
                        <option value="Web / App Development">Web / App Development</option>
                        <option value="UI/UX Product Design">UI/UX Product Design</option>
                        <option value="Cybersecurity / Security Review">Cybersecurity / Security Review</option>
                        <option value="Full-Stack + Design System">Full-Stack + Design System</option>
                        <option value="Internship / Role Opportunity">Internship / Role Opportunity</option>
                        <option value="General Collaboration">General Collaboration</option>
                      </select>
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label
                        htmlFor="contact-message"
                        className="text-xs font-mono text-zinc-400 uppercase tracking-wider"
                      >
                        Your Message *
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about your idea, timeline, or requirements..."
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-white/10 text-white placeholder:text-zinc-600 text-sm focus:outline-hidden focus:border-rose-500 transition-colors font-sans resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onMouseEnter={() => soundManager.playHover()}
                      className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-200 shadow-xl shadow-rose-950/40"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-rose-300" />
                          <span>TRANSMITTING MESSAGE...</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

