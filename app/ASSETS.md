# Asset Management System

所有素材集中管理，使用相对路径（相对于 `/public` 目录）。

## 文件结构

```
/app
  /public                      # 所有素材放这里
    /keycaps                   # 16个人格键帽插图 (SVG)
      Type=VOC.svg
      Type=FIORI.svg
      ...
    /screens                   # UI设计稿
      /png                     # PNG格式
        Landing_Web.png
        Test Intro_Web.png
        Survey Question_Web.png
        Loading - IMPULSE KEYS (Tactile).png
        Comprehensive Result_Web.png
        Results Examples.png
      /svg                     # SVG格式
        Landing_Web.svg
        ...
    icons.svg                  # 图标集
    favicon.svg                # 网站图标

  /src
    /assets
      config.ts                # 素材配置中心 ✨
      README.md                # 使用文档
```

## 如何使用

### 1. 获取键帽图片

```typescript
import { getKeycapAsset } from '@/assets/config';

// 获取 VOC 键帽
const imagePath = getKeycapAsset('VOC');
// 返回: '/keycaps/Type=VOC.svg'

// 在组件中使用
<img src={getKeycapAsset('VOC')} alt="VOC" />
```

### 2. 获取设计稿

```typescript
import { getScreenAsset } from '@/assets/config';

// 获取首页设计稿 (PNG)
const landingPng = getScreenAsset('landing', 'png');
// 返回: '/screens/png/Landing_Web.png'

// 获取首页设计稿 (SVG)
const landingSvg = getScreenAsset('landing', 'svg');
// 返回: '/screens/svg/Landing_Web.svg'
```

### 3. 获取颜色配置

```typescript
import { getKeycapColor } from '@/assets/config';

// 获取 VOC 对应的主题色
const color = getKeycapColor('VOC');
// 返回: '#FF6B4A'
```

## 如何添加新素材

### 添加新的键帽类型

1. 把 SVG 文件放到 `/public/keycaps/`，命名格式：`Type=新键名.svg`
2. 编辑 `/src/assets/config.ts`：
   ```typescript
   export type KeycapType =
     | 'VOC' | 'FIORI' | ... | '新键名'  // 添加到这里
   ```
3. 在 `getAllKeycaps()` 函数中添加新键名
4. 在 `getKeycapColor()` 中添加对应颜色

### 添加新的设计稿

1. 把文件放到 `/public/screens/png/` 或 `/public/screens/svg/`
2. 编辑 `/src/assets/config.ts`：
   ```typescript
   export type DesignScreenType =
     | 'landing' | ... | '新屏幕名'  // 添加类型
   
   const screenNames: Record<DesignScreenType, string> = {
     ...
     新屏幕名: '文件名（不含扩展名）'  // 添加映射
   }
   ```

## 优势

✅ **集中管理** - 所有素材路径在一个文件里配置  
✅ **类型安全** - TypeScript 确保不会用错键名或文件名  
✅ **相对路径** - 所有路径相对于 `/public`，部署到任何环境都能用  
✅ **易于维护** - 修改文件名只需改配置文件，不用到处找代码  
✅ **自动补全** - IDE 会提示所有可用的键帽和屏幕类型

## 注意事项

- 所有路径都是相对于 `/public` 目录
- 路径中**不要**包含 `/public` 前缀
- Vite 会自动处理 `/public` 下的静态文件
- 键帽优先使用 SVG 格式（可缩放）
- 设计稿提供 PNG 和 SVG 两种格式供选择
