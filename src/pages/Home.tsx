export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      {/* 科技感背景 */}
      <div className="fixed inset-0 bg-grid-[#03fcf8]/[0.05] bg-[length:20px_20px] -z-10" />
      
      <main className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <section className="mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#03fcf8] to-white">
            医疗化验单智能管理系统
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            通过AI技术快速识别化验单数据，可视化追踪您的健康指标变化
          </p>
        </section>

        {/* 功能入口 */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[#03fcf8]/30 hover:border-[#03fcf8] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3">数据看板</h2>
            <p className="text-gray-400 mb-4">可视化分析您的化验指标趋势</p>
            <button className="px-4 py-2 bg-[#03fcf8]/10 hover:bg-[#03fcf8]/20 border border-[#03fcf8] transition-all duration-300">
              查看数据
            </button>
          </div>

          <div className="p-6 border border-[#03fcf8]/30 hover:border-[#03fcf8] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3">化验单上传</h2>
            <p className="text-gray-400 mb-4">拍照或上传图片识别化验数据</p>
            <button className="px-4 py-2 bg-[#03fcf8]/10 hover:bg-[#03fcf8]/20 border border-[#03fcf8] transition-all duration-300">
              上传化验单
            </button>
          </div>

          <div className="p-6 border border-[#03fcf8]/30 hover:border-[#03fcf8] transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-3">健康报告</h2>
            <p className="text-gray-400 mb-4">获取AI生成的健康分析与建议</p>
            <button className="px-4 py-2 bg-[#03fcf8]/10 hover:bg-[#03fcf8]/20 border border-[#03fcf8] transition-all duration-300">
              查看报告
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}