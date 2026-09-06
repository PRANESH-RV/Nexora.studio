import React, { useState } from 'react';
import { Mail, Phone, Linkedin, MapPin, Send, MessageCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  initialProjectType?: string;
  onSubmitContact: (message: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType = 'Website Development',
  onSubmitContact,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState(initialProjectType);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email, and project details.');
      return;
    }
    setError('');
    onSubmitContact({ name, email, type, message });
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <span>Let's Connect</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Have a project in mind?
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
              Whether you need a full website build, custom product ad graphics, or design advice, I'd love to hear about your vision. Direct reply guaranteed.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:praneshrv567@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-indigo-400 hover:bg-slate-800 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Email Address</span>
                  <strong className="text-sm sm:text-base text-white font-bold group-hover:text-indigo-400 transition-colors">
                    praneshrv567@gmail.com
                  </strong>
                </div>
              </a>

              <a
                href="https://wa.me/919361066465"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-emerald-400 hover:bg-slate-800 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">WhatsApp / Call</span>
                  <strong className="text-sm sm:text-base text-white font-bold group-hover:text-emerald-400 transition-colors">
                    +91 9361066465
                  </strong>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/pranesh-rv-615962343"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/70 hover:border-sky-400 hover:bg-slate-800 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">LinkedIn Profile</span>
                  <strong className="text-sm sm:text-base text-white font-bold group-hover:text-sky-400 transition-colors">
                    linkedin.com/in/pranesh-rv-615962343
                  </strong>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-slate-700/50 text-slate-400 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Location</span>
                  <strong className="text-sm sm:text-base text-white font-bold">
                    Erode, Tamil Nadu, India (Open to Remote Worldwide)
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-slate-800/90 rounded-3xl p-8 sm:p-10 border border-slate-700/80 shadow-2xl">
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mb-6">
              Fill out your project requirements below to initiate our discussion.
            </p>

            {error && (
              <div className="mb-6 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 text-sm transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-type" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Type
                </label>
                <select
                  id="contact-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-hidden focus:border-indigo-500 text-sm transition-colors"
                >
                  <option value="Website Development">Website Development</option>
                  <option value="Graphic Design & Ad Banner">Graphic Design &amp; Ad Banner</option>
                  <option value="UI/UX Design & Prototyping">UI/UX Design &amp; Prototyping</option>
                  <option value="Branding & Logo Design">Branding &amp; Logo Design</option>
                  <option value="Other Project Inquiry">Other Project Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  placeholder="Tell me a bit about what you're working on, timeline, and goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 text-sm transition-colors resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-indigo-600/25 transition-all cursor-pointer"
              >
                <span>Continue &amp; Choose Channel</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
