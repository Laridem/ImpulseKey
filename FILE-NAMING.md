# File Naming Convention Guide

> **Purpose**: Establish consistent file naming rules for the IMPULSE KEYS project

---

## 📏 **General Rules**

### **1. Use Kebab-Case for Files**
```
✅ Good:
- project-status.md
- questions-v3-complete-bilingual.md
- sbti-technical-analysis.md

❌ Bad:
- ProjectStatus.md (PascalCase)
- project_status.md (snake_case)
- projectstatus.md (no separators)
```

### **2. Use PascalCase for React Components**
```
✅ Good:
- App.tsx
- KeycapGallery.tsx
- QuestionCard.tsx
- ResultPage.tsx

❌ Bad:
- app.tsx (lowercase)
- keycap-gallery.tsx (kebab-case)
```

### **3. Use Lowercase for Utilities/Config**
```
✅ Good:
- assets.ts
- scoring.ts
- types.ts
- vite.config.ts
- tailwind.config.js

❌ Bad:
- Assets.ts (PascalCase)
- Scoring.ts (PascalCase)
```

---

## 📁 **File Type Specific Rules**

### **Markdown Files (.md)**
**Format**: `{topic}-{version}-{modifier}.md`

```
✅ Examples:
- README.md (all caps, special case)
- GIT-WORKFLOW.md (all caps, reference doc)
- project-status.md
- questions-v3-complete-bilingual.md
- mapping-validation.md
- research-plan.md

❌ Avoid:
- Project-Status.md (PascalCase)
- questions_v3.md (snake_case)
- myDoc.md (camelCase)
```

### **React Component Files (.tsx)**
**Format**: `{ComponentName}.tsx` (PascalCase)

```
✅ Examples:
- App.tsx
- KeycapGallery.tsx
- QuestionCard.tsx
- ResultPage.tsx
- DimensionBar.tsx
- ExpandSection.tsx

❌ Avoid:
- question-card.tsx (kebab-case)
- questionCard.tsx (camelCase)
```

### **TypeScript Files (.ts)**
**Format**: `{purpose}.ts` (lowercase with kebab-case)

```
✅ Examples:
- types.ts
- assets.ts
- scoring.ts
- mapping.ts
- randomize.ts

❌ Avoid:
- Types.ts (PascalCase)
- myTypes.ts (camelCase)
```

### **CSS Files (.css)**
**Format**: `{scope}.css` (lowercase)

```
✅ Examples:
- index.css
- App.css
- button.module.css
- card.module.css

❌ Avoid:
- Index.css (PascalCase)
- my-styles.css (kebab for CSS files)
```

### **Image Files**
**Format**: `{description}-{modifier}.{ext}` (kebab-case)

```
✅ Examples:
- figma-ui-flow.png
- result-page-web.png
- Type=VOC.svg (special: exported from Figma)
- Type=FIORI.svg

❌ Avoid:
- Image1.png (generic names)
- my_screenshot.png (snake_case)
- voc_character.svg (when exported format differs)
```

---

## 🗂️ **Folder Naming Rules**

### **Use Kebab-Case for Folders**

```
✅ Good:
- docs/
- docs/content/
- docs/planning/
- docs/design/
- docs/reference/
- assets/results-illustration/
- app/public/keycaps/

❌ Bad:
- Docs/ (PascalCase)
- docs/ContentFiles/ (PascalCase)
- assets/results_illustration/ (snake_case)
```

---

## 🎯 **Specific Naming Patterns**

### **Versioned Files**
**Pattern**: `{name}-v{number}-{description}.md`

```
✅ Examples:
- questions-v1.md
- questions-v2-16q-3options.md
- questions-v3-complete-bilingual.md

Rationale: Easy to identify latest version
```

### **Status/Tracking Files**
**Pattern**: `{topic}-{type}.md`

```
✅ Examples:
- project-status.md
- development-plan.md
- design-system.md

Rationale: Clear purpose, searchable
```

### **Reference Files**
**Pattern**: `{source}-{analysis-type}.md`

```
✅ Examples:
- sbti-technical-analysis.md
- mbti-research-notes.md
- competitor-analysis.md

Rationale: Identifies source + type of analysis
```

### **Asset Files from Figma**
**Pattern**: `Type={KEY}.svg` or `{description}-{context}.png`

```
✅ Examples:
- Type=VOC.svg (exported from Figma, matches Figma naming)
- Type=FIORI.svg
- figma-ui-flow.png (screenshot)
- result-page-web.png (screenshot)

Rationale: Consistency with Figma exports
```

---

## 🔧 **Special Cases**

### **Root Directory Files (All Caps)**
```
✅ Examples:
- README.md
- LICENSE
- CHANGELOG.md
- CONTRIBUTING.md
- GIT-WORKFLOW.md
- REORGANIZATION-PLAN.md

Rationale: Important meta files, easy to spot
```

### **Config Files (Standard Names)**
```
✅ Examples:
- package.json
- tsconfig.json
- vite.config.ts
- tailwind.config.js
- .gitignore
- .env

Rationale: Tool-specific conventions
```

### **Hidden Files (Dot Prefix)**
```
✅ Examples:
- .gitignore
- .env
- .DS_Store
- .eslintrc.json

Rationale: Standard Unix convention
```

---

## 📋 **Quick Reference Table**

| File Type | Convention | Example |
|-----------|------------|---------|
| **Markdown** | kebab-case | `project-status.md` |
| **React Component** | PascalCase | `QuestionCard.tsx` |
| **TypeScript Utility** | lowercase | `assets.ts` |
| **CSS/Styles** | lowercase | `index.css` |
| **Images** | kebab-case | `figma-ui-flow.png` |
| **Folders** | kebab-case | `docs/planning/` |
| **Config** | standard | `package.json` |
| **Root Docs** | ALL-CAPS | `README.md` |

---

## ✅ **Dos and Don'ts**

### **DO:**
- ✅ Use descriptive names (`question-card.tsx`, not `qc.tsx`)
- ✅ Include version numbers when relevant (`v3`, `v2`)
- ✅ Use modifiers for clarity (`complete`, `bilingual`, `final`)
- ✅ Follow framework conventions (React = PascalCase)
- ✅ Be consistent within a file type

### **DON'T:**
- ❌ Mix naming conventions in same folder
- ❌ Use spaces in file names (`my file.md`)
- ❌ Use special characters except `-`, `_`, `.`
- ❌ Use generic names (`file1.md`, `test.tsx`)
- ❌ Use abbreviations without context (`qc.tsx`)

---

## 🔄 **Migration Guidelines**

### **When Renaming Files:**

1. **Rename the file**
   ```bash
   git mv old-name.md new-name.md
   ```

2. **Update all references** in:
   - README.md
   - Import statements (for code files)
   - Documentation links
   - Build scripts

3. **Commit with descriptive message**
   ```bash
   git commit -m "refactor: Rename project-status to follow naming convention"
   ```

---

## 📝 **Examples by Category**

### **Documentation Files**
```
docs/
├── content/
│   ├── results.md                        ✅
│   ├── questions-v3-complete-bilingual.md ✅
│   └── mapping-validation.md             ✅
│
├── planning/
│   ├── project-status.md                 ✅
│   ├── research-plan.md                  ✅
│   └── Design.md                         ⚠️ (consider: design-system.md)
│
└── reference/
    └── sbti-technical-analysis.md        ✅
```

### **React Components**
```
app/src/
├── components/
│   ├── KeycapGallery.tsx                 ✅
│   ├── QuestionCard.tsx                  ✅
│   ├── DimensionBar.tsx                  ✅
│   └── ResultPage.tsx                    ✅
│
├── pages/
│   ├── Landing.tsx                       ✅
│   ├── QuestionFlow.tsx                  ✅
│   └── Result.tsx                        ✅
│
└── utils/
    ├── assets.ts                         ✅
    ├── scoring.ts                        ✅
    └── types.ts                          ✅
```

---

## 🎯 **Summary**

**Golden Rule**: **Be consistent, be descriptive, follow framework conventions**

- **Markdown**: kebab-case (`project-status.md`)
- **React**: PascalCase (`QuestionCard.tsx`)
- **Utilities**: lowercase (`assets.ts`)
- **Images**: kebab-case (`figma-ui-flow.png`)
- **Folders**: kebab-case (`docs/planning/`)

**When in doubt**: Look at existing files in the same category!

---

*Created: 2026-05-18*  
*For: IMPULSE KEYS Project*
