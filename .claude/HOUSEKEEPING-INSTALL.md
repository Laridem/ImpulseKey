# Housekeeping Skill - Installation Complete

## 📦 What Was Created

### Core Files
1. **`~/.claude/skills/housekeeping.md`** (Global)
   - Skill definition loaded by Claude Code
   - Contains detailed instructions for Claude
   - Accessible via `/housekeeping` command

2. **`.claude/housekeeping-impl.sh`** (Project)
   - Bash implementation script
   - Handles file organization and git operations
   - Supports `--dry-run` and `--aggressive` flags

3. **`.claude/HOUSEKEEPING.md`** (Project)
   - Comprehensive user documentation
   - Examples, troubleshooting, best practices
   - Integration guide

4. **`docs/INDEX.md`** (Project)
   - Documentation navigation guide
   - Updated after housekeeping runs
   - Shows organized structure

### Optional Enhancements
5. **`.claude/hooks/pre-commit-housekeeping-reminder.sh`**
   - Git pre-commit hook (optional install)
   - Warns when project needs housekeeping
   - Customizable thresholds

6. **`.claude/hooks/README.md`**
   - Hook installation and usage guide

## 🚀 Quick Start

```bash
# 1. Preview what will happen (safe, no changes)
/housekeeping --dry-run

# 2. Review the output and verify it looks correct

# 3. Run the actual cleanup
/housekeeping

# 4. Review changes
git status
git diff

# 5. Commit if satisfied
git add -A
git commit -m "chore: Project housekeeping - organize documentation"
```

## 🎯 Current Project Status

**Issues Detected:**
- ✗ 16 .md files scattered in root directory
- ✗ 9 redundant analysis files (PROBABILITY_*, DISTRIBUTION_*)
- ✗ 3 session summaries in wrong location
- ✗ Multiple files with SCREAMING_CASE naming
- ✗ 9 untracked files needing organization

**After Running Housekeeping:**
- ✓ Organized into `docs/analysis/` and `docs/sessions/`
- ✓ All files renamed to kebab-case
- ✓ Redundant files consolidated
- ✓ Clean root directory with only essential docs
- ✓ Git history preserved with `git mv`

## 📋 Additional Improvements Included

### 1. Git Ignore for .claude/
Created `.claude/.gitignore` to exclude user-specific settings:
```gitignore
# Settings are user-specific
settings.local.json
```

### 2. Documentation Index
Created `docs/INDEX.md` for easy navigation:
- Quick links to all doc categories
- Purpose of each directory
- Maintenance guidelines

### 3. Pre-commit Hook (Optional)
Warns before committing if housekeeping needed:
- Install with: `cp .claude/hooks/pre-commit-housekeeping-reminder.sh .git/hooks/pre-commit`
- Customizable thresholds
- Non-blocking (allows commit after warning)

## 🧹 Clean-Desk Principles

The skill applies these principles:

1. **One Home Per Item**
   - Analysis docs → `docs/analysis/`
   - Session summaries → `docs/sessions/`
   - Essential docs → project root

2. **Clear Naming**
   - `SCREAMING_CASE.md` → `kebab-case.md`
   - Consistent date formats: `YYYY-MM-DD`
   - Descriptive, purposeful names

3. **No Stale Items**
   - Archive obsolete files in `docs/archive/`
   - Remove true temporary files with `--aggressive`
   - Git track or explicitly ignore

4. **Related Items Together**
   - All probability analysis together
   - All session summaries together
   - Content, planning, design separated

5. **Git Hygiene**
   - Use `git mv` to preserve history
   - Stage organized changes
   - Clean commits with clear messages

## 🛠️ Advanced Usage

### Dry Run Analysis
```bash
# See what would happen without making changes
/housekeeping --dry-run > housekeeping-preview.txt

# Review the preview
cat housekeeping-preview.txt

# Decide whether to proceed
/housekeeping
```

### Aggressive Cleanup
```bash
# Remove obsolete files instead of archiving
/housekeeping --aggressive

# Use when:
# - Files are truly temporary/obsolete
# - You've reviewed and confirmed deletion is safe
# - Doing pre-release cleanup
```

### Custom Patterns
Edit `.claude/housekeeping-impl.sh` to add custom patterns:
```bash
# Add custom file patterns to move
for pattern in "*TODO*.md" "*TEMP*.md" "*DRAFT*.md"; do
    # ... move logic ...
done
```

### Integration with Workflow
```bash
# Before starting new feature
git checkout -b feature/new-feature
/housekeeping  # Start clean

# After completing feature
/housekeeping  # Organize any new docs
git add -A
git commit -m "feat: New feature with organized docs"

# Before release
/housekeeping --aggressive  # Deep clean
```

## 📊 Maintenance Schedule

**Recommended frequency:**
- **Daily**: Check with `/housekeeping --dry-run`
- **Weekly**: Run full housekeeping during active dev
- **Per Feature**: Before/after feature branches
- **Pre-Release**: Aggressive cleanup before releases
- **As Needed**: When >5 untracked or >10 root .md files

**Automation options:**
1. Install pre-commit hook (warns automatically)
2. Add to CI/CD pipeline (fails if too messy)
3. Schedule weekly reminder in calendar
4. Make it part of code review checklist

## 🔧 Troubleshooting

### "Cannot move file" error
```bash
# File may be open or locked
lsof | grep filename

# Or skip git mv and do manual move
mv FILE docs/analysis/
git add docs/analysis/FILE
git rm FILE
```

### Broken links after cleanup
```bash
# Find all markdown links
grep -r "\[.*\](.*\.md)" . --include="*.md"

# Bulk update paths
find . -name "*.md" -exec sed -i '' 's|OLD_PATH|NEW_PATH|g' {} +
```

### Want to undo housekeeping
```bash
# Undo last commit
git reset --soft HEAD^

# Or revert specific file
git checkout HEAD^ -- path/to/file
```

## 📚 Documentation Locations

- **Skill Guide**: `~/.claude/skills/housekeeping.md`
- **User Manual**: `.claude/HOUSEKEEPING.md`
- **This Guide**: `.claude/HOUSEKEEPING-INSTALL.md`
- **Hook Guide**: `.claude/hooks/README.md`
- **Doc Index**: `docs/INDEX.md`

## ✅ Next Steps

1. **Try it out:**
   ```bash
   /housekeeping --dry-run
   ```

2. **Apply if satisfied:**
   ```bash
   /housekeeping
   ```

3. **Install hook (optional):**
   ```bash
   cp .claude/hooks/pre-commit-housekeeping-reminder.sh .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```

4. **Commit housekeeping infrastructure:**
   ```bash
   git add .claude/ docs/INDEX.md
   git commit -m "feat: Add housekeeping skill and infrastructure"
   ```

5. **Update README:**
   Add a section about documentation organization

## 🎉 Benefits

After setting up housekeeping:
- ✅ **Faster navigation** - Know where to find documents
- ✅ **Less clutter** - Clean root directory
- ✅ **Better git history** - Organized commits
- ✅ **Easier onboarding** - Clear structure for new team members
- ✅ **Professional appearance** - Tidy codebase impresses reviewers
- ✅ **Reduced cognitive load** - Focus on code, not finding files

---

**Ready to try it?** Run `/housekeeping --dry-run` to see what it would do!
