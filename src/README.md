# 医疗化验单OCR管理系统 - 前端项目

## 技术栈
- **核心框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS + 自定义工具类
- **路由管理**: react-router-dom v7
- **数据可视化**: Recharts + Three.js
- **状态管理**: React Context API
- **UI动画**: Framer Motion
- **工具库**: 
  - Zod: 数据验证
  - clsx + tailwind-merge: 类名处理
  - sonner: Toast通知

## 项目结构
```
src/
├── components/      # 公共组件
├── data/            # 模拟数据
├── hooks/           # 自定义Hook
├── lib/             # 工具函数
├── pages/           # 页面组件
└── App.tsx         # 应用入口
```

## 开发指南

### 启动项目
```bash
pnpm install
pnpm dev
```

### 生产构建
```bash
pnpm build
```

## 扩展建议

### 功能扩展
1. 用户认证系统
2. 化验单分类管理
3. 异常指标预警
4. 多角色视图(医生/患者)

### 技术增强
1. 状态管理: Redux/Zustand
2. API服务层封装
3. 性能优化(代码分割)
4. 测试覆盖(Jest + Testing Library)

### 部署方案
1. 静态资源托管(Netlify/Vercel)
2. Docker容器化
3. CDN加速配置
