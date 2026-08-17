# 如何生成16张预渲染图片

## 方法1：使用桌面浏览器手动生成（推荐）

### 步骤：

1. **启动开发服务器**：
   ```bash
   cd /Users/I549685/Documents/SAPTI/app
   npm run dev
   ```

2. **在Chrome浏览器（桌面版）打开控制台**：
   - 按 F12 打开开发者工具
   - 在Console中运行以下脚本：

```javascript
// 自动生成16张图片的脚本
const keys = ['VOC', 'FIORI', 'PIXEL', 'A11Y', 'JOULE', 'CTRL', 'AGENT', 'SAFE', 'OData', 'BTP', 'CORE', 'API', 'QAQ', 'LOGS', 'TRIO', 'FIRE'];

async function generateAllCards() {
  for (const key of keys) {
    // 导航到结果页
    window.location.href = `/result/${key}`;
    
    // 等待页面加载
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 点击"Save as Image"按钮
    const button = document.querySelector('button');
    if (button && button.textContent.includes('Save')) {
      button.click();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}

// 运行脚本
generateAllCards();
```

3. **整理下载的图片**：
   - 16张图片会自动下载到Downloads文件夹
   - 重命名为：`VOC.jpg`, `FIORI.jpg`, `PIXEL.jpg` 等
   - 移动到：`/Users/I549685/Documents/SAPTI/app/public/assets/share-cards/`

---

## 方法2：手动访问每个页面

如果自动脚本不工作，可以手动操作：

1. 访问 http://localhost:5173/result/VOC
2. 点击"Save as Image"按钮
3. 下载的图片重命名为 `VOC.jpg`
4. 重复以上步骤16次（每个personality type）

---

## 16个结果类型清单：

✅ VOC - Voice-of-Customer Detective
✅ FIORI - Fiori Experience Guardian  
✅ PIXEL - Pixel-Level Perfectionist
✅ A11Y - Accessibility Advocate
✅ JOULE - AI Innovation Catalyst
✅ CTRL - System Architecture Guardian
✅ AGENT - Intelligent Automation Engineer
✅ SAFE - Security & Compliance Specialist
✅ OData - API & Integration Architect
✅ BTP - Platform Extension Strategist
✅ CORE - ERP System Expert
✅ API - Developer Experience Champion
✅ QAQ - Quality Assurance Warrior
✅ LOGS - Observability Detective
✅ TRIO - Cross-Functional Connector
✅ FIRE - Crisis Response Commander

---

## 完成后

所有16张图片应该在：
```
app/public/assets/share-cards/
├── VOC.jpg
├── FIORI.jpg
├── PIXEL.jpg
├── A11Y.jpg
├── JOULE.jpg
├── CTRL.jpg
├── AGENT.jpg
├── SAFE.jpg
├── OData.jpg
├── BTP.jpg
├── CORE.jpg
├── API.jpg
├── QAQ.jpg
├── LOGS.jpg
├── TRIO.jpg
└── FIRE.jpg
```

然后重新部署到Cloudflare，移动端就会自动使用这些预渲染图片！
