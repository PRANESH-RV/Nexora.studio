import React from 'react';
import { MessageSquare, Mail, Linkedin, X, Check, Copy } from 'lucide-react';
import { ContactMessage } from '../types';

interface ChoiceModalProps {
  messageData: ContactMessage | null;
  onClose: () => void;
}

export const ChoiceModal: React.FC<ChoiceModalProps> = ({ messageData, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!messageData) return null;

  const { name, email, type, message } = messageData;

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Pranesh, my name is ${name} (${email}).\nProject Type: ${type}\n\nMessage:\n${message}`
    );
    window.open(`https://wa.me/919361066465?text=${text}`, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${type} - ${name}`);
    const body = encodeURIComponent(
      `Hi Pranesh,\n\nMy name is ${name} (${email}).\nProject Type: ${type}\n\n${message}\n\nLooking forward to hearing from you.`
    );
    window.location.href = `mailto:praneshrv567@gmail.com?subject=${subject}&body=${body}`;
    onClose();
  };

  const handleLinkedIn = () => {
    window.open('https://www.linkedin.com/in/pranesh-rv-615962343', '_blank', 'noopener,noreferrer');
    onClose();
  };

  const handleCopy = () => {
    const fullText = `Name: ${name}\nEmail: ${email}\nProject: ${type}\nMessage: ${message}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-bold text-slate-900">
            Send Your Message
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-slate-600 text-sm mb-6">
          Choose where you would like to connect with Pranesh to send your project details:
        </p>

        <div className="space-y-3">
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-500 text-emerald-800 hover:text-white border border-emerald-200 hover:border-transparent transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <strong className="block text-sm font-bold">WhatsApp Direct</strong>
                <span className="text-xs opacity-80">+91 9361066465 (Instant Reply)</span>
              </div>
            </div>
            <span className="text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* Email Mailto Button */}
          <button
            onClick={handleEmail}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-600 text-indigo-800 hover:text-white border border-indigo-200 hover:border-transparent transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left">
                <strong className="block text-sm font-bold">Email Message</strong>
                <span className="text-xs opacity-80">praneshrv567@gmail.com</span>
              </div>
            </div>
            <span className="text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
          </button>

          {/* LinkedIn Button */}
          <button
            onClick={handleLinkedIn}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-sky-50 hover:bg-sky-600 text-sky-800 hover:text-white border border-sky-200 hover:border-transparent transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <strong className="block text-sm font-bold">LinkedIn Connection</strong>
                <span className="text-xs opacity-80">pranesh-rv-615962343</span>
              </div>
            </div>
            <span className="text-base font-bold group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        {/* Copy Details Option */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
