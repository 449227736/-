/**
 * 套管交付与质量专项改善 — 问题异常跟踪表
 * 本地 Web 服务入口
 *
 * 启动: npm start
 * 访问: http://localhost:3000
 */

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 静态文件服务 — 把整个项目根目录当成静态资源目录
app.use(express.static(__dirname, {
  setHeaders(res, filePath) {
    // 禁用缓存 — 避免浏览器缓存旧版页面
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    // .xlsx 模板文件正确设置 MIME
    if (filePath.endsWith('.xlsx')) {
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
  }
}));

// SPA fallback: 所有非静态资源请求都返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('');
  console.log('  ============================================');
  console.log('  套管交付与质量专项改善 — 问题异常跟踪表');
  console.log('  ============================================');
  console.log('');
  console.log(`  本地访问: http://localhost:${PORT}`);
  console.log('');
  console.log('  如需外网访问，请使用 Cloudflare Tunnel:');
  console.log('    cloudflared tunnel --url http://localhost:3000');
  console.log('');
});
