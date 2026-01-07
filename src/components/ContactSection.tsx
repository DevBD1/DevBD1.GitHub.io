import React, { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Check, Loader2 } from 'lucide-react';
import type { Profile } from '../types/portfolio';

interface ContactSectionProps {
  profile: Profile;
}

type FormStatus = 'idle' | 'sending' | 'sent';

const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  const socialLinks = [
    { icon: Github, text: profile.socials.github.replace('https://', ''), href: profile.socials.github },
    { icon: Linkedin, text: profile.socials.linkedin.replace('https://www.', ''), href: profile.socials.linkedin },
    ...(profile.socials.twitter
      ? [{ icon: Twitter, text: profile.socials.twitter.replace('https://', ''), href: profile.socials.twitter }]
      : []),
    { icon: Mail, text: profile.email, href: `mailto:${profile.email}` },
  ];

  return (
    <section id="contact" className="py-32 mb-20">
      <div className="max-w-4xl mx-auto glass-panel rounded-2xl p-1 border border-cyan-500/20">
        <div className="bg-slate-950/80 rounded-xl p-8 md:p-12 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left column - Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Establish Uplink</h2>
              <p className="text-slate-400 mb-8">
                Ready to collaborate on the next interstellar project? Send a transmission.
              </p>

              <div className="space-y-4">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="flex items-center gap-4 text-slate-400 hover:text-cyan-400 transition-colors p-2 rounded hover:bg-white/5"
                  >
                    <link.icon size={20} />
                    <span className="font-mono text-sm">{link.text}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Right column - Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Identity</label>
                <input
                  type="text"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Commander Name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Frequency</label>
                <input
                  type="email"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="email@sector7.com"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-cyan-500 mb-1 uppercase">Transmission</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Message content..."
                ></textarea>
              </div>
              <button
                disabled={formStatus !== 'idle'}
                className={`w-full py-4 font-bold rounded shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed relative overflow-hidden group
                  ${formStatus === 'idle' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1' : ''}
                  ${formStatus === 'sending' ? 'bg-slate-900 border border-cyan-500/30 text-cyan-400 cursor-wait' : ''}
                  ${formStatus === 'sent' ? 'bg-emerald-950/50 border border-emerald-500/50 text-emerald-400 cursor-default shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''}
                `}
              >
                {formStatus === 'idle' && (
                  <>
                    <MessageSquare size={18} />
                    <span className="tracking-widest">TRANSMIT DATA</span>
                  </>
                )}

                {formStatus === 'sending' && (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span className="font-mono text-sm tracking-widest animate-pulse">UPLINKING...</span>
                  </>
                )}

                {formStatus === 'sent' && (
                  <div className="flex items-center gap-2 animate-[pop-in_0.5s_ease-out_forwards]">
                    <Check size={18} />
                    <span className="font-mono text-sm tracking-widest">TRANSMISSION RECEIVED</span>
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
