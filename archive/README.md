# Archive - IMPULSE KEYS Project

This folder contains old versions and reference files that are no longer actively used but kept for historical reference.

## Design Specification

### game-content-old.md
- **Date**: 2026-05-15 (morning-afternoon)
- **Size**: 1,684 lines
- **Content**: Original comprehensive game design spec with 16 result definitions (mixed format), sample questions, templates, event guidelines
- **Status**: Archived - result definitions superseded by `/Users/I549685/Documents/SAPTI/results.md`
- **Why archived**: Result definitions were split across inconsistent formats. New `results.md` provides single source of truth with harmonized structure.

---

## Question Bank Versions

### questions-and-mapping.md (V1)
- **Date**: 2026-05-15 (morning)
- **Format**: 24 questions, 2 options each (A/B)
- **Scoring**: Binary (+1 to one pole per question)
- **Context**: Generic workplace scenarios
- **Status**: Superseded by V2

### questions-v2-16q-3options.md (V2)
- **Date**: 2026-05-15 (afternoon)
- **Format**: 16 questions, 3 options each (A/B/C)
- **Scoring**: A (+2 to Pole A), B (+1 to each), C (+2 to Pole B)
- **Context**: Generic workplace scenarios
- **Status**: Superseded by V3

### questions-v3-sap-pudong.md (V3 Draft)
- **Date**: 2026-05-15 (afternoon)
- **Format**: 16 questions, 3 options, Chinese only
- **Context**: SAP Pudong specific (PVG01-06, 长泰广场, 汇智湖, Jira, Teams, etc.)
- **Status**: Superseded by V3 Complete Bilingual

**Current Version**: `/Users/I549685/Documents/SAPTI/questions-v3-complete-bilingual.md`

---

## Current Files (Active)

**Result Definitions**: `/Users/I549685/Documents/SAPTI/results.md`  
**Questions**: `/Users/I549685/Documents/SAPTI/questions-v3-complete-bilingual.md`

---

## Reference Files

### sbti-reference.html
- **Source**: GitHub - FairFang-730/sbti-personality-test
- **Size**: 2,365 lines
- **Format**: Complete HTML/CSS/JS single-file implementation
- **Purpose**: Reference implementation for SBTI personality test
- **Used for**: Understanding vanilla JS SPA patterns, question flow, card UI design

### Image 1.png, Image 2.png
- **Source**: SBTI test screenshots
- **Purpose**: Visual reference for result card design
- **Used for**: Understanding card layout, color scheme, typography patterns

---

## Why These Were Archived

### Question Versions (V1, V2, V3 draft)
- **Superseded by better versions**: Each iteration improved question count, option format, and context
- **Not needed for development**: Current version (V3 Complete Bilingual) is final and ready for implementation
- **Kept for reference**: Show evolution of question design thinking

### SBTI Reference
- **Analysis complete**: All patterns extracted to `sbti-technical-analysis.md`
- **Not needed during development**: Can reference analysis doc instead of reading 2,365 lines of HTML
- **Kept for deep reference**: If specific implementation questions arise

---

## When to Use Archive Files

- **Design evolution**: If you want to understand why certain design decisions were made (see game-content-old.md)
- **Question evolution**: If you want to understand why certain design decisions were made
- **SBTI deep dive**: If technical analysis isn't enough and you need to see exact code implementation
- **Reference screenshots**: If you want to see SBTI's original visual design

**For current work, always use**:
- `/Users/I549685/Documents/SAPTI/results.md` (result definitions)
- `/Users/I549685/Documents/SAPTI/questions-v3-complete-bilingual.md` (questions)

---

*Last updated: 2026-05-15*
