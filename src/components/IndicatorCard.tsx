import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Indicator } from "@/data/mockIndicators";

interface IndicatorCardProps {
  indicator: Indicator;
}

export function IndicatorCard({ indicator }: IndicatorCardProps) {
  return (
    <motion.div
      className={`bg-gray-800 border ${indicator.isAbnormal ? 'border-red-500' : 'border-gray-700'} p-6 rounded-none w-full h-full min-h-[400px]`}
      whileHover={{ scale: 1.02 }}
      animate={indicator.isAbnormal ? {
        boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 3px rgba(239, 68, 68, 0.5)", "0 0 0 0 rgba(239, 68, 68, 0)"],
        transition: { repeat: Infinity, duration: 1.5 }
      } : {}}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-medium text-gray-100">{indicator.name}</h3>
          <div className="flex items-baseline mt-1">
            <motion.span 
              className={`text-2xl font-bold ${indicator.isAbnormal ? 'text-red-500' : 'text-teal-400'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {indicator.value}
            </motion.span>
            <span className="text-gray-400 ml-1">{indicator.unit}</span>
          </div>
        </div>
        <div className={`px-2 py-1 text-xs rounded ${indicator.isAbnormal ? 'bg-red-900 text-red-100' : 'bg-gray-700 text-gray-300'}`}>
          {indicator.normalRange}
        </div>
      </div>
      
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={indicator.history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151' }}
              labelStyle={{ color: '#E5E7EB' }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={indicator.trend === 'up' ? '#EF4444' : indicator.trend === 'down' ? '#10B981' : '#3B82F6'} 
              strokeWidth={2}
              dot={{ r: 3, fill: '#1F2937', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
