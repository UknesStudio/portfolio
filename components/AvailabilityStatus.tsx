'use client';

import { motion } from 'framer-motion';

interface AvailabilityStatusProps {
  status: 'available' | 'busy' | 'unavailable';
}

const statusConfig = {
  available: {
    message: "Available for new projects",
    bgColor: "bg-green-500",
    textColor: "text-green-400",
  },
  busy: {
    message: "Limited availability",
    bgColor: "bg-yellow-500",
    textColor: "text-yellow-400",
  },
  unavailable: {
    message: "Currently unavailable",
    bgColor: "bg-red-500",
    textColor: "text-red-400",
  }
};

export default function AvailabilityStatus({ status }: AvailabilityStatusProps) {
  const config = statusConfig[status];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 mb-6"
    >
      <div className="relative">
        <div className={`w-2.5 h-2.5 rounded-full ${config.bgColor}`} />
        <div 
          className={`absolute inset-0 rounded-full ${config.bgColor} animate-ping opacity-75`}
        />
      </div>
      <span className={`font-medium ${config.textColor}`}>
        {config.message}
      </span>
    </motion.div>
  );
}
