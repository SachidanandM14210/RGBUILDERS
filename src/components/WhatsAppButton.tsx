import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export function WhatsAppButton({
  phoneNumber = '+919876543210',
  defaultMessage = 'Hello RG BUILDERS ENGINEERS AND CONTRACTORS, I would like to discuss a construction project. Please contact me with more details.'
}: WhatsAppButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <aside 
      aria-label="Direct WhatsApp Assistance"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2"
    >
      {/* Interactive Tooltip / Mini Chat Badge */}
      {showTooltip && (
        <div className="bg-[#171717] text-white p-3.5 rounded-2xl shadow-2xl border border-zinc-700/80 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-zinc-800">
            <div className="flex items-center gap-1.5 font-semibold text-[#25D366]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping" />
              <span>RG Builders Engineers and Contractors Desk</span>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-zinc-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-zinc-300 leading-snug">
            Need an instant response regarding your architectural blueprint or site estimate? Chat directly with our project engineers.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 w-full bg-[#25D366] hover:bg-[#20ba59] text-black font-heading font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Start WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-xl shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with RG BUILDERS ENGINEERS AND CONTRACTORS on WhatsApp"
        id="floating-whatsapp-btn"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F28C28] rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold text-black">
          1
        </span>
        <MessageSquare className="w-7 h-7 text-white fill-current transition-transform group-hover:scale-110" />
      </a>
    </aside>
  );
}
