// Reusable Modal component for dialogs
import { useEffect } from "react";

const Modal = ({ open, title, children, onClose, actions }) => {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  //to prevent background scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 dark:bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal container */}
      <div className="relative bg-white dark:bg-[#0d1b24] rounded-lg shadow-xl w-full max-w-lg my-8">
        
        {/* Header */}
        <div className="px-4 sm:px-5 py-4 border-b border-gray-200 dark:border-[#23303a] flex items-center justify-between">
          <h3
            id="modal-title"
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 ml-2"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 text-gray-800 dark:text-gray-200 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div className="px-4 sm:px-5 py-4 border-t border-gray-200 dark:border-[#23303a] bg-gray-50 dark:bg-[#0d1b24] flex flex-col sm:flex-row justify-end gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;