import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';

interface OCRResult {
  name: string;
  value: string;
  confidence: number;
}

interface OCRResponse {
  status: 'success' | 'error';
  imageUrl: string;
  results: OCRResult[];
}

export default function UploadPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResponse | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 模拟OCR处理
  const processOCR = (file: File): Promise<OCRResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          imageUrl: URL.createObjectURL(file),
          results: [
            { name: '白细胞计数', value: '11.2 ×10^9/L', confidence: 0.92 },
            { name: '血红蛋白', value: '125 g/L', confidence: 0.89 },
            { name: '血小板计数', value: '210 ×10^9/L', confidence: 0.95 },
          ]
        });
      }, 2000);
    });
  };

  // 粒子动画
  useEffect(() => {
    if (!isProcessing || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: `rgba(3, 252, 248, ${Math.random() * 0.5 + 0.3})`
      });
    }

    const animate = () => {
      if (!isProcessing) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [isProcessing]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      await handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error('请上传图片文件');
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processOCR(file);
      setOcrResult(result);
      toast.success('化验单识别成功');
    } catch (error) {
      toast.error('识别失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // 这里简化处理，实际应用中需要实现拍照功能
      toast.info('拍照功能需要在实际设备上测试');
    } catch (error) {
      toast.error('无法访问摄像头');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 bg-[linear-gradient(#0f172a_0.2px,transparent_0.2px)] bg-[size:16px_16px]">
      <Navbar />
      
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">上传化验单</h1>
          
          <div className="flex flex-col items-center">
            {/* 上传区域 */}
            {!ocrResult ? (
              <div 
                className={`w-full md:w-3/5 p-8 border-2 border-dashed rounded-none transition-all duration-300 ${
                  isDragging ? 'border-teal-400 bg-teal-400/10' : 'border-gray-700 hover:border-teal-400'
                } ${isProcessing ? 'pointer-events-none' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-64 relative">
                    <canvas 
                      ref={canvasRef} 
                      className="absolute inset-0 w-full h-full"
                    />
                    <p className="text-teal-400 text-lg font-medium relative z-10">正在识别中...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64">
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-teal-400 mb-4"></i>
                    <p className="text-gray-300 text-center mb-4">
                      拖拽图片到此处或
                      <span 
                        className="text-teal-400 cursor-pointer ml-1"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        选择文件
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">支持JPG、PNG格式</p>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileInput}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full md:w-3/5 bg-gray-800/50 backdrop-blur-sm p-6 rounded-none border border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-100">识别结果</h2>
                  <button 
                    className="text-teal-400 hover:text-teal-300"
                    onClick={() => setOcrResult(null)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                
                <div className="mb-6">
                  <img 
                    src={ocrResult.imageUrl} 
                    alt="上传的化验单" 
                    className="w-full h-auto max-h-60 object-contain border border-gray-700"
                  />
                </div>
                
                <div className="space-y-4">
                  {ocrResult.results.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 transition-colors">
                      <div>
                        <p className="text-gray-100 font-medium">{item.name}</p>
                        <p className="text-gray-400 text-sm">置信度: {(item.confidence * 100).toFixed(1)}%</p>
                      </div>
                      <p className="text-teal-400 font-bold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* 操作按钮 */}
            <div className="flex space-x-4 mt-8">
              <button 
                className="px-6 py-2 border border-gray-700 text-gray-300 hover:text-teal-400 hover:border-teal-400 transition-all duration-300"
                onClick={handleCancel}
              >
                取消
              </button>
              
              {!isProcessing && (
                <button 
                  className="px-6 py-2 bg-gray-800 text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-all duration-300 flex items-center"
                  onClick={handleTakePhoto}
                >
                  <i className="fa-solid fa-camera mr-2"></i>
                  拍照上传
                </button>
              )}
              
              {ocrResult && (
                <button 
                  className="px-6 py-2 bg-teal-500 text-gray-900 font-medium hover:bg-teal-400 transition-all duration-300"
                  onClick={handleConfirm}
                >
                  确认上传
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
