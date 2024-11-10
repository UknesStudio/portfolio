'use client';

import { motion } from 'framer-motion';

interface AvailabilityStatusProps {
  status: 'available' | 'busy' | 'unavailable';
}

const statusConfig = {
  available: {
    message: "Available for new projects",
    color: "green",
    pulseColor: "rgb(34 197 94)", // text-green-500
  },
  busy: {
    message: "Limited availability",
    color: "yellow",
    pulseColor: "rgb(234 179 8)", // text-yellow-500
  },
  unavailable: {
    message: "Currently unavailable",
    color: "red",
    pulseColor: "rgb(239 68 68)", // text-red-500
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
        <div className={`w-2.5 h-2.5 rounded-full bg-${config.color}-500`} />
        <div 
          className={`absolute inset-0 rounded-full bg-${config.color}-500 animate-ping opacity-75`}
          style={{ backgroundColor: config.pulseColor }}
        />
      </div>
      <span className={`text-${config.color}-400 font-medium`}>
        {config.message}
      </span>
    </motion.div>
  );
}
