import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { mockReport } from '@/data/mockReport';
import { motion } from 'framer-motion';

export default function ReportPage() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGene, setActiveGene] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    // 初始化3D场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.Fog(0x0f172a, 10, 20);

    const camera = new THREE.PerspectiveCamera(75, isMobile ? 1 : 0.8, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(isMobile ? 300 : 500, isMobile ? 300 : 500);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    mountRef.current?.appendChild(renderer.domElement);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x03fcf8, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // 创建DNA双螺旋
    const dnaGroup = new THREE.Group();
    const cylinderGeometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 32);
    const sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x03fcf8,
      emissive: 0x03fcf8,
      emissiveIntensity: 0.2,
      shininess: 100
    });

    // 创建碱基对
    mockReport.dnaModelData.forEach((value, i) => {
      const angle = (i / mockReport.dnaModelData.length) * Math.PI * 2;
      const x = Math.cos(angle) * 3;
      const z = Math.sin(angle) * 3;
      
      // 创建连接线
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, -5, 0),
        new THREE.Vector3(x, value * 10 - 5, z)
      ]);
      const line = new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color: 0x03fcf8, transparent: true, opacity: 0.5 })
      );
      dnaGroup.add(line);

      // 创建碱基球体
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.position.set(x, value * 10 - 5, z);
      sphere.userData.index = i;
      dnaGroup.add(sphere);
    });

    // 创建主链
    const cylinder1 = new THREE.Mesh(cylinderGeometry, material);
    cylinder1.position.y = 0;
    cylinder1.rotation.x = Math.PI / 2;
    dnaGroup.add(cylinder1);

    const cylinder2 = new THREE.Mesh(cylinderGeometry, material);
    cylinder2.position.y = 0;
    cylinder2.rotation.x = Math.PI / 2;
    cylinder2.rotation.z = Math.PI;
    dnaGroup.add(cylinder2);

    scene.add(dnaGroup);

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 点击事件处理
    const onDocumentMouseDown = (event: MouseEvent) => {
      event.preventDefault();

      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(dnaGroup.children);
      if (intersects.length > 0 && intersects[0].object.userData.index !== undefined) {
        setActiveGene(intersects[0].object.userData.index);
      }
    };

    window.addEventListener('mousedown', onDocumentMouseDown, false);

    // 响应式处理
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      camera.aspect = isMobile ? 1 : 0.8;
      camera.updateProjectionMatrix();
      renderer.setSize(isMobile ? 300 : 500, isMobile ? 300 : 500);
    };

    window.addEventListener('resize', handleResize);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 清理
    return () => {
      window.removeEventListener('mousedown', onDocumentMouseDown);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 bg-[linear-gradient(#0f172a_0.2px,transparent_0.2px)] bg-[size:16px_16px]">
      <Navbar />
      
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">健康分析报告</h1>
          
          <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-8`}>
            {/* 3D模型区域 */}
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} flex justify-center`}>
              <div 
                ref={mountRef} 
                className={`${isMobile ? 'w-full' : 'w-full'} h-[500px] bg-gray-900/50 border border-gray-700 rounded-none`}
              />
            </div>
            
            {/* 报告内容区域 */}
            <div className={`${isMobile ? 'w-full' : 'w-1/2'} space-y-6`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700 rounded-none"
              >
                <h2 className="text-xl font-semibold text-teal-400 mb-4">健康概述</h2>
                <p className="text-gray-300">{mockReport.overview}</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700 rounded-none"
              >
                <h2 className="text-xl font-semibold text-teal-400 mb-4">风险因素</h2>
                <ul className="space-y-2">
                  {mockReport.riskFactors.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="text-gray-300 flex items-start"
                    >
                      <span className="text-red-400 mr-2">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 border border-gray-700 rounded-none"
              >
                <h2 className="text-xl font-semibold text-teal-400 mb-4">健康建议</h2>
                <ul className="space-y-2">
                  {mockReport.suggestions.map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                      className="text-gray-300 flex items-start"
                    >
                      <span className="text-teal-400 mr-2">•</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {activeGene !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 border border-teal-400/30 rounded-none"
                >
                  <h2 className="text-xl font-semibold text-teal-400 mb-2">基因位点分析</h2>
                  <p className="text-gray-300">
                    您点击的是第 {activeGene + 1} 号基因位点，该位点与您的 {mockReport.riskFactors[activeGene % mockReport.riskFactors.length].split('(')[0]} 相关。
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}