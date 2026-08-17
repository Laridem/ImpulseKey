# 生成16张预渲染图片的步骤

## 方法：使用浏览器手动截图

由于我们只需要16张图片，可以用浏览器手动生成，不需要自动化脚本。

### 步骤：

1. **启动开发服务器**：
   ```bash
   cd /Users/I549685/Documents/SAPTI/app
   npm run dev
   ```

2. **在桌面浏览器打开每个结果页**：
   - http://localhost:5173/result/VOC
   - http://localhost:5173/result/FIORI
   - http://localhost:5173/result/PIXEL
   - ... (共16个)

3. **使用浏览器开发者工具截图**：
   - 打开DevTools (F12)
   - 找到 `.share-card-export-root` 元素
   - 右键 → "截图节点" 或使用截图工具

4. **保存到项目**：
   ```bash
   /Users/I549685/Documents/SAPTI/app/public/assets/share-cards/VOC.jpg
   /Users/I549685/Documents/SAPTI/app/public/assets/share-cards/FIORI.jpg
   ...
   ```

## 或者：使用现有的"Save as Image"功能

更简单的方法 - **在桌面端浏览器**：

1. 访问每个结果页
2. 点击"Save as Image"按钮（桌面端可以工作）
3. 下载的图片重命名为 `VOC.jpg`, `FIORI.jpg` 等
4. 移动到 `app/public/assets/share-cards/` 目录

## 16个结果类型：

```
VOC, FIORI, PIXEL, A11Y,
JOULE, CTRL, AGENT, SAFE,
OData, BTP, CORE, API,
QAQ, LOGS, TRIO, FIRE
```

---

生成完毕后，代码会自动在移动端使用这些预渲染图片。
