# PNG 导出移动端缺失元素问题 - 诊断报告

## 问题描述
- **现象**：桌面端导出 PNG 正常，移动端固定缺少相同元素
- **导出方式**：使用 `html-to-image` 库重新渲染导出模板

---

## 🔍 诊断结果

### 1. PNG 导出使用的库
**html-to-image v1.11.13**

**技术链路**：
```
ShareCard 组件 (React DOM)
  ↓
html-to-image 的 cloneNode()
  ↓
SVG foreignObject
  ↓
Canvas
  ↓
PNG (1080×1920)
```

### 2. 导出函数所在文件
**文件**：`/app/src/pages/Result.tsx`
**函数**：`handleShare()` (第 46-130 行)
**导出模板**：`/app/src/components/ShareCard.tsx`

### 3. 移动端固定缺失元素（推测）

**最可能缺失**：
- ✅ Anvils Logo（左下角，第 132-139 行）
- ✅ QR Code（右下角，第 142-152 行）
- ⚠️ 可能缺失分隔线

### 4. 最可能的根因

**主要原因：CSS Media Query 继承问题**

即使导出容器设置了固定尺寸 `1080px × 1920px`，但 CSS 的 `@media` 查询判断的是：
- ❌ `window.innerWidth`（浏览器视口宽度）
- 而不是 ✅ 导出容器的宽度

**问题链路**：
```
移动端视口宽度 < 640px
  ↓
Tailwind 应用 mobile-first 样式
  ↓
ShareCard 渲染在移动端 DOM 中
  ↓
html-to-image 克隆时保留了移动端样式
  ↓
PNG 导出使用了错误的 CSS
```

### 5. 证据

**代码分析**：
- ✅ `ShareCard` 组件没有使用响应式断点类（无 `sm:`、`md:`、`lg:`）
- ✅ 但全局 CSS 存在 `@media (max-width: 640px)` 规则
- ✅ ShareCard 虽然定位在屏幕外，但仍在移动端 DOM 树中
- ✅ html-to-image 克隆 DOM 时会保留当前计算样式

**移动端特殊逻辑**（第 93-94 行）：
```typescript
const isMobile = window.innerWidth < 1024;
const pixelRatio = isMobile ? 1 : 2;  // 移动端降低像素密度
```

### 6. Desktop 与 Mobile 差异

#### 桌面端 (`window.innerWidth >= 1024`)
- 无移动端 media query 影响
- 所有元素正常渲染
- pixelRatio = 2（高清）

#### 移动端 (`window.innerWidth < 1024`)
- 移动端 media query 可能影响全局样式
- Tailwind 可能应用 mobile-first 规则
- pixelRatio = 1（降低质量以提速）
- 底部元素可能受到以下影响：
  - `overflow: hidden` 裁切
  - `transform` 位移
  - `opacity: 0` 隐藏
  - `display: none` 隐藏
  - 元素跑到 Canvas 边界外

### 7. 建议最小修改方案

#### **方案 1：添加导出专用 CSS 隔离**（推荐）

创建 `/app/src/components/ShareCard.css`：

```css
/* 强制固定渲染，忽略所有响应式样式 */
.share-card-export-root {
  width: 1080px !important;
  height: 1920px !important;
  min-width: 1080px !important;
  min-height: 1920px !important;
  overflow: visible !important;
  transform: none !important;
}

.share-card-export-root img {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
```

然后在 `ShareCard.tsx` 第 46 行添加这个 class：
```tsx
<div
  ref={ref}
  className="share-card-export-root relative w-[1080px] h-[1920px]..."
```

#### **方案 2：关键元素使用 inline style**

在 `ShareCard.tsx` 中，给底部的 Logo 和 QR Code 添加内联样式：

```tsx
{/* Anvils Logo - 第 132-139 行 */}
<img
  src="/assets/Anvils-1.png"
  alt="Anvils"
  style={{ 
    height: '80px', 
    width: 'auto', 
    opacity: 0.6,
    display: 'block',
    visibility: 'visible'
  }}
  crossOrigin="anonymous"
/>
```

### 8. 是否建议把 screen CSS 和 export CSS 隔离？

**是，强烈建议隔离**

**原因**：
1. ✅ 导出模板永远不应该响应视口变化
2. ✅ 固定设计（1080×1920）应该使用固定样式
3. ✅ 防止移动端 media query 影响导出
4. ✅ 更易调试 - 导出模板行为可预测
5. ✅ 跨设备一致性更好

**实现方式**：
- **展示页面**：自由使用响应式 Tailwind class
- **导出模板**：使用独立的 `.export-*` class 或 inline style
- **原则**：永远不要混用响应式和固定尺寸上下文

---

## 🧪 已添加诊断日志

已在 `Result.tsx` 中添加诊断日志（第 87-145 行），会输出：

```javascript
=== EXPORT DIAGNOSTICS ===
Viewport: { innerWidth, innerHeight, dpr, isMobile }
Export container rect: { top, left, width, height, bottom, right }

Keycap Image: { rect, display, visibility, opacity, complete, naturalWidth }
Anvils Logo: { rect, display, visibility, opacity, complete, naturalWidth }
QR Code: { rect, display, visibility, opacity, complete, naturalWidth }
Divider: { rect, display, visibility, opacity }

// 如果元素超出 Canvas 边界会显示：
WARNING: ⚠️ OUTSIDE CANVAS BOUNDS!
=== END DIAGNOSTICS ===
```

---

## 📋 测试步骤

### 第一步：查看诊断日志
1. 在移动设备上打开 `/result/AGENT`
2. 点击"保存为图片"按钮
3. 打开浏览器控制台（Safari 需要先开启开发者模式）
4. 查找 `=== EXPORT DIAGNOSTICS ===` 日志
5. 记录哪些元素显示 "NOT FOUND" 或 "OUTSIDE CANVAS BOUNDS"

### 第二步：对比桌面与移动端
在桌面浏览器执行相同操作，对比：
- `rect` 位置是否不同
- `display`/`visibility`/`opacity` 是否不同
- 元素是否超出 1920px 高度

### 第三步：应用修复方案
根据诊断结果，应用方案 1（CSS 隔离）或方案 2（inline style）

---

## ⚠️ 注意事项

1. **不要先重构**：先完成诊断，确认根因再修复
2. **优先级顺序**：
   - ① 移动端 media query
   - ② Canvas 边界裁切
   - ③ overflow / transform
   - ④ DOM clone 问题
   - ⑤ Safari 兼容性
3. **测试设备**：必须在真实移动设备测试，不要只用 Chrome DevTools
4. **Safari 特别注意**：iOS Safari 对 Canvas 渲染有特殊限制

---

## 📝 下一步

1. ✅ **已完成**：添加诊断日志
2. ⏳ **等待用户**：在移动端测试并提供控制台输出
3. ⏳ **待执行**：根据诊断结果实施修复方案
4. ⏳ **待验证**：确认所有元素在移动端 PNG 中正常显示
