#!/bin/bash

# 16个结果类型（按顺序访问）
KEYS=(
  "VOC"
  "FIORI"
  "PIXEL"
  "A11Y"
  "JOULE"
  "CTRL"
  "AGENT"
  "SAFE"
  "OData"
  "BTP"
  "CORE"
  "API"
  "QAQ"
  "LOGS"
  "TRIO"
  "FIRE"
)

echo "📋 16个结果类型的URL列表："
echo ""

for key in "${KEYS[@]}"; do
  echo "http://localhost:5173/result/$key"
done

echo ""
echo "---"
echo ""
echo "💡 使用方法："
echo "1. 复制上面的URL"
echo "2. 在浏览器中逐个打开"
echo "3. 点击 'Save as Image' 按钮"
echo "4. 下载16张图片"
echo ""
echo "或者直接在浏览器地址栏输入："
echo "http://localhost:5173/result/"
echo "然后手动改成: VOC, FIORI, PIXEL 等"
