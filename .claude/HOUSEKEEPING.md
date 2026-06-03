# Housekeeping System

Comprehensive project cleanup and organization toolkit following clean-desk principles.

## Quick Start

```bash
# Preview what will be done
/housekeeping --dry-run

# Run the cleanup
/housekeeping

# Aggressive mode (removes obsolete files)
/housekeeping --aggressive
```

## What Gets Cleaned

### 1. **Documentation Organization**
- ✅ Moves session summaries → `docs/sessions/`
- ✅ Moves analysis files → `docs/analysis/`
- ✅ Consolidates redundant files
- ✅ Updates cross-references

### 2. **Naming Harmonization**
- ✅ Converts `SCREAMING_CASE.md` → `kebab-case.md`
- ✅ Applies consistent date formats (`YYYY-MM-DD`)
- ✅ Follows `FILE-NAMING.md` conventions

### 3. **Git Hygiene**
- ✅ Stages organized files
- ✅ Removes untracked temporary files
- ✅ Clean commit with detailed message
- ✅ Preserves tracked file history

### 4. **Structure**
```
project/
├── README.md              # Main project docs
├── CHANGELOG.md           # Keep in root
├── docs/
│   ├── analysis/          # All analysis documents
│   ├── sessions/          # Session summaries
│   ├── content/           # Content files
│   ├── planning/          # Planning docs
│   ├── design/            # Design assets
│   ├── reference/         # Reference materials
│   └── archive/           # Obsolete but kept for reference
├── app/                   # Application code
└── assets/                # Static assets
```

## Clean-Desk Principles

1. **One Home Per Item** - Every file has exactly one logical location
2. **Clear Naming** - Names immediately convey purpose
3. **No Stale Items** - Remove or archive obsolete files
4. **Related Together** - Group by purpose (analysis, sessions, planning)
5. **Git Hygiene** - Track it, ignore it, or remove it

## Files Typically Moved

### To `docs/analysis/`
- `*PROBABILITY*.md` - Probability analysis documents
- `*DISTRIBUTION*.md` - Distribution analysis
- `*ANALYSIS*.md` - General analysis files
- `FIX_RESULTS.md` - Results fix documentation
- `PROPOSED_QUESTIONS.md` - Question proposals
- `ROLE_IMPACT_ANALYSIS.md` - Role impact analysis

### To `docs/sessions/`
- `SESSION-SUMMARY-*.md` - Session summaries
- `END-OF-DAY-*.md` - Daily wrap-ups

### Stay in Root
- `README.md` - Main project documentation
- `CHANGELOG.md` - Change history
- `DEPLOYMENT.md` - Deployment instructions
- `GIT-WORKFLOW.md` - Git workflow guide
- `FILE-NAMING.md` - Naming conventions
- `vercel.json` - Configuration files

## When to Run Housekeeping

**Recommended times:**
- ✅ Before major releases
- ✅ After completing feature branches
- ✅ Weekly during active development
- ✅ When `git status` shows >5 untracked files
- ✅ When root directory has >10 .md files
- ✅ Before code reviews/audits

**Triggers:**
```bash
# Check if housekeeping needed
ls -1 *.md | wc -l  # If >10, consider cleanup
git status --short | grep "^??" | wc -l  # If >5, cleanup recommended
```

## Safety Features

- 🛡️ **Dry-run mode** - Preview before changes
- 🛡️ **Git-aware** - Uses `git mv` for tracked files
- 🛡️ **No data loss** - Archives instead of deleting
- 🛡️ **Cross-reference updates** - Fixes broken links
- 🛡️ **User confirmation** - For aggressive operations

## Examples

### Example 1: Standard Cleanup
```bash
# Preview changes
/housekeeping --dry-run

# Review output, then apply
/housekeeping

# Review git status
git status

# Commit
git commit -m "chore: Project housekeeping - organize documentation"
```

### Example 2: Pre-Release Cleanup
```bash
# Full cleanup including aggressive pruning
/housekeeping --aggressive

# Update README with new structure
# Edit README.md to reflect organized docs

# Create comprehensive commit
git add -A
git commit -m "chore: Pre-release housekeeping

- Organize all documentation by purpose
- Archive obsolete analysis files
- Harmonize file naming conventions
- Update cross-references"
```

### Example 3: Weekly Maintenance
```bash
# Quick check
git status --short | grep "^??"

# If lots of untracked files, run cleanup
/housekeeping

# Continue work with clean workspace
```

## Post-Cleanup Tasks

After running housekeeping:

1. **Update README.md**
   ```markdown
   ## Documentation
   
   - [Analysis](docs/analysis/) - All analysis documents
   - [Sessions](docs/sessions/) - Development session summaries
   - [Planning](docs/planning/) - Project planning docs
   ```

2. **Create docs/README.md** (navigation guide)
   ```bash
   # Add overview of docs structure
   ```

3. **Update .gitignore** if needed
   ```bash
   # Consider ignoring archive/
   echo "docs/archive/" >> .gitignore
   ```

4. **Run tests**
   ```bash
   cd app && npm test
   ```

## Troubleshooting

### Broken References After Cleanup
```bash
# Find all markdown links
grep -r "\[.*\](.*\.md)" . --include="*.md"

# Update paths manually or use bulk replace
find . -name "*.md" -exec sed -i '' 's|PROBABILITY_ANALYSIS.md|docs/analysis/probability-analysis.md|g' {} +
```

### Accidentally Moved Important File
```bash
# Revert specific file
git checkout HEAD -- path/to/file.md

# Or undo entire commit
git reset --soft HEAD^
```

### Want to Keep Old Names
```bash
# Revert rename but keep move
cd docs/analysis/
git mv probability-analysis.md PROBABILITY_ANALYSIS.md
```

## Integration with Git Workflow

The housekeeping skill integrates with your git workflow:

```bash
# Before starting feature
git checkout -b feature/new-feature
/housekeeping  # Start with clean workspace

# During development
# ... work on feature ...

# Before committing feature
/housekeeping  # Organize any docs created

# Commit everything together
git add -A
git commit -m "feat: New feature with organized docs"
```

## Configuration

Customize behavior by editing `.claude/housekeeping-impl.sh`:

```bash
# Change target directories
ANALYSIS_DIR="docs/analysis"
SESSION_DIR="docs/sessions"
ARCHIVE_DIR="docs/archive"

# Set aggressive mode default
AGGRESSIVE=true

# Add custom file patterns
CUSTOM_PATTERNS="*TODO*.md *TEMP*.md"
```

## Script Location

- **Skill definition**: `~/.claude/skills/housekeeping.md`
- **Implementation**: `.claude/housekeeping-impl.sh`
- **This README**: `.claude/HOUSEKEEPING.md`

## Related Skills

- `/update-config` - Manage Claude Code settings
- `/verify` - Verify changes work correctly
- `/code-review` - Review code quality

## Contributing

To improve the housekeeping system:

1. Test changes with `--dry-run` first
2. Document new patterns in this README
3. Update the skill definition in `housekeeping.md`
4. Share improvements with the team

---

**Pro tip**: Run `/housekeeping --dry-run` regularly to keep an eye on project cleanliness without making changes. It's like a tidy desk check!
