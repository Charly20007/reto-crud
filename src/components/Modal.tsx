import React, { type ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal: React.FC<Props> = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100/60 via-blue-200/60 to-blue-400/20 backdrop-blur-[4px] transition-all"
      aria-modal="true"
      role="dialog"
    >
      <div className="
        relative
        bg-white
        rounded-[2.25rem]
        shadow-[0_8px_48px_0_rgba(0,60,255,0.18)]
        border-4 border-white border-double
        max-w-lg w-[92vw] px-8 pt-0 pb-7
        animate-modalDrop
        flex flex-col
        "
      >
        <div className="flex items-center justify-between px-2 pt-7 pb-3">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-700 rounded-xl p-2 flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="white" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
            </div>
            {title && (
              <h2 className="text-xl font-semibold text-blue-800 tracking-tight select-none">{title}</h2>
            )}
          </div>
          <button
            onClick={onClose}
            className="
              bg-blue-50 hover:bg-blue-100 text-blue-500 rounded-full p-2 ml-2
              shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all
            "
            aria-label="Cerrar modal"
            type="button"
          >
            <svg className="w-6 h-6" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="white" />
              <path d="M7 7l6 6M7 13L13 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="mt-3">
          {children}
        </div>
      </div>
      <style>
        {`
          @keyframes modalDrop {
            0% { transform: translateY(-40px) scale(0.97); opacity: 0.3; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }
          .animate-modalDrop {
            animation: modalDrop 0.24s cubic-bezier(.3,1.4,.5,1) forwards;
          }
        `}
      </style>
    </div>
  );
};

export default Modal;
