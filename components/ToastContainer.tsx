import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Copy, Info, X } from 'lucide-react';
import { useEcosystemStore } from '../store/useEcosystemStore';

export function ToastItem({ id, message, type }: { key?: React.Key; id: string; message: string; type?: 'info' | 'success' | 'copy' }) {
  const { removeToast } = useEcosystemStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -15, scale: 0.95, filter: 'blur(4px)' }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-center space-x-3 bg-zinc-900/90 dark:bg-zinc-900/95 text-white border border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl px-4 py-2.5 rounded-2xl text-xs font-medium max-w-md select-none pointer-events-auto"
    >
      <div className="shrink-0">
        {type === 'copy' && <Copy className="w-4 h-4 text-emerald-400" />}
        {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
        {type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
      </div>
      <span className="flex-1 leading-snug">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const { toasts } = useEcosystemStore();

  return (
    <div className="fixed top-10 right-6 z-9999 flex flex-col space-y-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} id={toast.id} message={toast.message} type={toast.type} />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ToastContainer;
