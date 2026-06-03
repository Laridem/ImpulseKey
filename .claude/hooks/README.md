# Housekeeping Hooks

Optional git hooks to help maintain project cleanliness.

## Available Hooks

### Pre-Commit Housekeeping Reminder

Warns you before committing if the project needs housekeeping.

**Triggers:**
- More than 10 .md files in root directory
- More than 5 untracked files

**Installation:**
```bash
cp .claude/hooks/pre-commit-housekeeping-reminder.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Usage:**
The hook runs automatically before each commit. If thresholds are exceeded:
- Shows warning message
- Suggests running `/housekeeping`
- Allows you to continue or cancel

**Customize Thresholds:**
Edit `.claude/hooks/pre-commit-housekeeping-reminder.sh`:
```bash
MD_THRESHOLD=10              # Max .md files in root
UNTRACKED_THRESHOLD=5        # Max untracked files
```

## Future Hooks

Other hooks that could be added:
- `post-merge` - Run housekeeping after merging branches
- `pre-push` - Verify docs are organized before pushing
- `post-checkout` - Remind about housekeeping on branch switch

## Disabling

To disable the hook:
```bash
rm .git/hooks/pre-commit
```

Or make it always pass:
```bash
echo "exit 0" > .git/hooks/pre-commit
```
