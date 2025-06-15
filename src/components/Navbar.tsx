import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-teal-400 font-bold text-xl">
            医疗化验单OCR系统
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-300 hover:text-teal-400 transition-colors">
              数据看板
            </Link>
            <Link to="/upload" className="text-gray-300 hover:text-teal-400 transition-colors">
              上传化验单
            </Link>
            <Link to="/report" className="text-gray-300 hover:text-teal-400 transition-colors">
              健康报告
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
