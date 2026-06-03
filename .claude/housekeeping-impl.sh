#!/bin/bash
# Housekeeping implementation script
# This script can be called by the housekeeping skill or run standalone

set -e

DRY_RUN=false
AGGRESSIVE=false

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --aggressive)
            AGGRESSIVE=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--dry-run] [--aggressive]"
            exit 1
            ;;
    esac
done

echo "🧹 Project Housekeeping"
echo "======================"
echo ""

if [ "$DRY_RUN" = true ]; then
    echo "🔍 DRY RUN MODE - No changes will be made"
    echo ""
fi

# Helper functions
run_cmd() {
    if [ "$DRY_RUN" = true ]; then
        echo "[DRY RUN] $*"
    else
        echo "▶ $*"
        eval "$@"
    fi
}

# Phase 1: Analyze current state
echo "📊 Phase 1: Analyzing Project Structure"
echo "----------------------------------------"

echo ""
echo "Root directory .md files (excluding README/CHANGELOG):"
find . -maxdepth 1 -type f \( -name "*.md" -o -name "*.txt" \) ! -name "README.md" ! -name "CHANGELOG.md" ! -name "vercel.json" | sort

echo ""
echo "Redundant analysis files:"
ls -1 *PROBABILITY* *DISTRIBUTION* *ANALYSIS* 2>/dev/null || echo "  (none found)"

echo ""
echo "Session summary files:"
ls -1 *SESSION* *END-OF-DAY* 2>/dev/null || echo "  (none found)"

echo ""
echo "Files with SCREAMING_CASE naming:"
find . -maxdepth 1 -type f -name "*[A-Z_][A-Z_]*.md" ! -name "README.md" ! -name "CHANGELOG.md" | sort

echo ""
echo "Untracked files:"
git status --short | grep "^??" || echo "  (none)"

echo ""
echo ""

# Phase 2: Create directory structure
echo "📁 Phase 2: Creating Directory Structure"
echo "-----------------------------------------"

run_cmd mkdir -p docs/analysis
run_cmd mkdir -p docs/sessions
run_cmd mkdir -p docs/archive

echo ""
echo ""

# Phase 3: Move and organize files
echo "📦 Phase 3: Organizing Files"
echo "----------------------------"

echo ""
echo "Moving session summaries..."
if ls SESSION-SUMMARY-*.md 1> /dev/null 2>&1; then
    for file in SESSION-SUMMARY-*.md; do
        run_cmd git mv "$file" docs/sessions/ 2>/dev/null || run_cmd mv "$file" docs/sessions/
    done
else
    echo "  (no session summaries found)"
fi

if ls END-OF-DAY-*.md 1> /dev/null 2>&1; then
    for file in END-OF-DAY-*.md; do
        run_cmd git mv "$file" docs/sessions/ 2>/dev/null || run_cmd mv "$file" docs/sessions/
    done
else
    echo "  (no end-of-day summaries found)"
fi

echo ""
echo "Moving analysis files..."

# Move distribution and analysis files
for pattern in "*DISTRIBUTION*.md" "*ANALYSIS*.md" "FIX_RESULTS.md" "PROPOSED_QUESTIONS.md"; do
    shopt -s nullglob
    for file in $pattern; do
        if [ -f "$file" ]; then
            # Convert to kebab-case
            newname=$(echo "$(basename "$file")" | tr 'A-Z_' 'a-z-')
            echo "  $file → docs/analysis/$newname"
            if [ "$DRY_RUN" = false ]; then
                if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
                    git mv "$file" "docs/analysis/$newname" 2>/dev/null
                else
                    mv "$file" "docs/analysis/$newname"
                    git add "docs/analysis/$newname"
                fi
            fi
        fi
    done
    shopt -u nullglob
done

echo ""
echo "Converting PROBABILITY files..."
if ls *PROBABILITY*.md *PROBABILITY*.txt 1> /dev/null 2>&1; then
    for file in *PROBABILITY*.md *PROBABILITY*.txt; do
        if [ -f "$file" ]; then
            newname=$(echo "$(basename "$file")" | tr 'A-Z_' 'a-z-' | sed 's/\.txt$/.md/')
            echo "  $file → docs/analysis/$newname"
            if [ "$DRY_RUN" = false ]; then
                if git ls-files --error-unmatch "$file" > /dev/null 2>&1; then
                    git mv "$file" "docs/analysis/$newname" 2>/dev/null
                else
                    mv "$file" "docs/analysis/$newname"
                    git add "docs/analysis/$newname"
                fi
            fi
        fi
    done
else
    echo "  (no probability files found)"
fi

echo ""
echo ""

# Phase 4: Check for broken references
echo "🔗 Phase 4: Checking References"
echo "--------------------------------"

if [ "$DRY_RUN" = false ]; then
    echo "Scanning for potential broken links..."
    grep -r "\[.*\](.*\.md)" . --include="*.md" 2>/dev/null | grep -v node_modules | grep -v ".git" | head -10 || echo "  (no issues detected)"
else
    echo "  (skipped in dry-run mode)"
fi

echo ""
echo ""

# Phase 5: Summary
echo "✅ Phase 5: Summary"
echo "-------------------"

echo ""
echo "Directory structure:"
if command -v tree > /dev/null 2>&1; then
    tree docs/ -L 2 -I node_modules
else
    find docs/ -type f | sort
fi

echo ""
if [ "$DRY_RUN" = true ]; then
    echo "✨ Dry run complete! No changes were made."
    echo "   Run without --dry-run to apply these changes."
else
    echo "✨ Housekeeping complete!"
    echo ""
    echo "Next steps:"
    echo "  1. Review changes: git status"
    echo "  2. Update README.md with new docs structure"
    echo "  3. Commit changes: git commit -m 'chore: Project housekeeping'"
fi

echo ""
