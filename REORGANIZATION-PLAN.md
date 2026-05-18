# SAPTI Project Reorganization Plan

## 📁 Proposed New Structure

```
/Users/I549685/Documents/SAPTI/
├── README.md                    # Keep at root - project entry point
├── GIT-WORKFLOW.md              # Keep at root - quick reference
│
├── app/                         # 🚀 DEV - React application
│   ├── src/
│   ├── public/
│   └── ...
│
├── docs/                        # 📚 DOCUMENTATION
│   ├── content/                 # Content files
│   │   ├── questions-v3-complete-bilingual.md
│   │   ├── results.md
│   │   └── mapping-validation.md
│   │
│   ├── planning/                # Project planning & strategy
│   │   ├── project-status.md
│   │   ├── research-plan.md
│   │   └── Design.md
│   │
│   ├── design/                  # UI/UX documentation
│   │   └── (Figma screenshots, design notes)
│   │
│   └── reference/               # Reference & analysis
│       └── sbti-technical-analysis.md
│
├── assets/                      # 🎨 DESIGN ASSETS
│   ├── results-illustration/    # SVG keycap characters
│   ├── result-cards/            # PNG exports (old)
│   ├── figma-ui-flow.png
│   └── result-page-web.png
│
├── archive/                     # 🗄️ OLD VERSIONS
│   └── (old question versions, etc.)
│
└── .git/                        # Git repository data
```

---

## 🔄 File Moves

### Move to `docs/content/`
- questions-v3-complete-bilingual.md
- results.md
- mapping-validation.md

### Move to `docs/planning/`
- project-status.md
- research-plan.md
- Design.md

### Move to `docs/reference/`
- sbti-technical-analysis.md

### Stay at root
- README.md (navigation hub)
- GIT-WORKFLOW.md (quick reference)
- .gitignore
- vercel.json
- package.json, package-lock.json (if needed)

### Remove from root (cleanup)
- node_modules/ (shouldn't be at root)
- package.json, package-lock.json (if they're duplicates from app/)

---

## ✅ Benefits

1. **Clear separation** - Content / Planning / Design / Dev
2. **Easier navigation** - Find files by category
3. **Cleaner root** - Only essential files visible
4. **Better for teams** - Clear where to add new files
5. **Git-friendly** - Logical folder structure

---

## 🎯 Implementation

Run the reorganization script, then:
1. Test that everything still works
2. Update README.md with new paths
3. Commit changes to Git
