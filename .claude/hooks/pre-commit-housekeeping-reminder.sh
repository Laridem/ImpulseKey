#!/bin/bash
# Pre-commit hook to remind about housekeeping
# To install: cp .claude/hooks/pre-commit-housekeeping-reminder.sh .git/hooks/pre-commit
# Then: chmod +x .git/hooks/pre-commit

# Count markdown files in root (excluding README and CHANGELOG)
root_md_count=$(find . -maxdepth 1 -type f -name "*.md" ! -name "README.md" ! -name "CHANGELOG.md" | wc -l | tr -d ' ')

# Count untracked files
untracked_count=$(git status --short | grep "^??" | wc -l | tr -d ' ')

# Thresholds
MD_THRESHOLD=10
UNTRACKED_THRESHOLD=5

needs_housekeeping=false

if [ "$root_md_count" -gt "$MD_THRESHOLD" ]; then
    needs_housekeeping=true
    echo "⚠️  Warning: $root_md_count .md files in root directory (threshold: $MD_THRESHOLD)"
fi

if [ "$untracked_count" -gt "$UNTRACKED_THRESHOLD" ]; then
    needs_housekeeping=true
    echo "⚠️  Warning: $untracked_count untracked files (threshold: $UNTRACKED_THRESHOLD)"
fi

if [ "$needs_housekeeping" = true ]; then
    echo ""
    echo "💡 Consider running housekeeping to organize your project:"
    echo "   /housekeeping --dry-run    # Preview changes"
    echo "   /housekeeping              # Apply cleanup"
    echo ""
    echo "Press Enter to continue with commit, or Ctrl+C to cancel and cleanup first"
    read -r
fi

exit 0
