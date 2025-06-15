import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IndicatorCard } from "@/components/IndicatorCard";
import { mockIndicators } from "@/data/mockIndicators";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'latest' | 'history' | 'trend'>('latest');
  const [activeCategory, setActiveCategory] = useState<'all' | 'blood' | 'urine' | 'biochemistry'>('all');

  const filteredIndicators = mockIndicators.filter(indicator => 
    activeCategory === 'all' || indicator.category === activeCategory
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 bg-[linear-gradient(#0f172a_0.2px,transparent_0.2px)] bg-[size:16px_16px]">
      <Navbar />
      
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">健康数据看板</h1>
          
          {/* 筛选控件 */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex space-x-2 bg-gray-800 p-1 rounded">
              {['latest', 'history', 'trend'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium rounded-none ${
                    activeTab === tab ? 'bg-teal-500 text-gray-900' : 'text-gray-300 hover:text-teal-400'
                  }`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {tab === 'latest' ? '最新数据' : tab === 'history' ? '历史对比' : '趋势预测'}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2 bg-gray-800 p-1 rounded">
              {['all', 'blood', 'urine', 'biochemistry'].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 text-sm font-medium rounded-none ${
                    activeCategory === category ? 'bg-teal-500 text-gray-900' : 'text-gray-300 hover:text-teal-400'
                  }`}
                  onClick={() => setActiveCategory(category as any)}
                >
                  {category === 'all' ? '全部' : category === 'blood' ? '血常规' : category === 'urine' ? '尿常规' : '生化检测'}
                </button>
              ))}
            </div>
          </div>
          
          {/* 纵向布局 */}
          <div className="space-y-6">
            {filteredIndicators.map((indicator) => (
              <div key={indicator.id} className="w-full">
                <div className="w-[1200px] mx-auto">
                  <IndicatorCard indicator={indicator} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
