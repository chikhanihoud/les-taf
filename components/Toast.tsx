import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useToast, Toast as ToastType } from '../contexts/ToastContext';

const iconMap = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
  warning: AlertTriangle
};

const colorMap = {
  success: 'from-green-500 to-emerald-600',
  error: 'from-red-500 to-rose-600',
  info: 'from-blue-500 to-cyan-600',
  warning: 'from-yellow-500 to-orange-600'
};

const ToastItem: React.FC<{ toast: ToastType }> = ({ toast }) => {
  const { removeToast } = useToast();
  const [progress, setProgress] = useState(100);
  const Icon = iconMap[toast.type];

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev - (100 / (toast.duration! / 100));
          return newProgress > 0 ? newProgress : 0;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [toast.duration]);

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden animate-slide-in-right hover-lift transition-all duration-300 max-w-md w-full border-l-4 border-transparent">
      <div className={`h-1 bg-gradient-to-r ${colorMap[toast.type]}`} style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
      <div className="p-4 flex items-start gap-3">
        <div className={`p-2 rounded-full bg-gradient-to-br ${colorMap[toast.type]} flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <p className="flex-1 text-gray-800 dark:text-gray-100 font-medium text-sm leading-relaxed">{toast.message}</p>
        <button
          onClick={() => removeToast(toast.id)}
          className="text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
};
