# Git Sync Workflow for IMPULSE KEYS Project

## 📍 Current Setup
- **Local Directory**: `/Users/I549685/Documents/SAPTI`
- **Remote Repo**: `https://github.tools.sap/I549685/impulse-keys`
- **Current Branch**: `develop/react-setup`
- **Main Branch**: `main`

---

## 🔄 Common Git Workflows

### **1. SYNC YOUR CHANGES TO GITHUB** (Most Common)

When you edit files locally and want to push to GitHub:

```bash
cd /Users/I549685/Documents/SAPTI

# Step 1: Check what changed
git status

# Step 2: Stage all changes (or specific files)
git add -A                    # Add ALL changes
# OR
git add file1.md file2.tsx    # Add specific files

# Step 3: Commit with a message
git commit -m "Your commit message describing changes"

# Step 4: Push to GitHub
git push origin develop/react-setup
# OR if you're on main:
# git push origin main
```

**One-liner version:**
```bash
git add -A && git commit -m "Update project files" && git push
```

---

### **2. PULL CHANGES FROM GITHUB** (When others made changes)

When you want to get the latest changes from GitHub:

```bash
cd /Users/I549685/Documents/SAPTI

# Check current branch
git branch

# Pull latest changes
git pull origin develop/react-setup
# OR
git pull origin main
```

---

### **3. CHECK CURRENT STATUS**

See what files you changed:

```bash
git status              # See modified/new/deleted files
git diff                # See line-by-line changes
git log --oneline -5    # See last 5 commits
```

---

### **4. CREATE A NEW BRANCH FOR CHANGES**

Best practice: Create a new branch for each feature:

```bash
# Create and switch to new branch
git checkout -b feature/add-landing-page

# Make your changes...
# Then commit and push
git add -A
git commit -m "Add landing page component"
git push origin feature/add-landing-page
```

---

### **5. MERGE BRANCH TO MAIN**

When your feature is ready to merge:

```bash
# Switch to main branch
git checkout main

# Pull latest main
git pull origin main

# Merge your feature branch
git merge develop/react-setup

# Push merged changes
git push origin main
```

**OR** use GitHub Pull Request (recommended):
1. Push your branch: `git push origin develop/react-setup`
2. Go to GitHub: https://github.tools.sap/I549685/impulse-keys
3. Click "Compare & pull request"
4. Review changes and click "Create pull request"
5. Merge the PR

---

## 🚨 **Common Scenarios & Solutions**

### **Scenario A: "I edited files, how do I sync?"**

```bash
git add -A
git commit -m "Updated results.md and questions"
git push
```

### **Scenario B: "Error: Your branch is behind"**

This means GitHub has newer changes than your local:

```bash
# Pull first, then push
git pull origin develop/react-setup
git push origin develop/react-setup
```

### **Scenario C: "Merge Conflict!"**

When you and someone else edited the same file:

```bash
# Step 1: Git will show conflict markers in the file
# Open the file and look for:
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name

# Step 2: Manually edit to keep what you want
# Step 3: Remove conflict markers
# Step 4: Stage and commit
git add conflicted-file.md
git commit -m "Resolve merge conflict"
git push
```

### **Scenario D: "I want to undo my changes"**

**Undo uncommitted changes:**
```bash
git restore file.md              # Undo changes to one file
git restore .                    # Undo all changes (CAREFUL!)
```

**Undo last commit (but keep changes):**
```bash
git reset --soft HEAD~1          # Undo commit, keep changes staged
git reset HEAD~1                 # Undo commit, keep changes unstaged
```

**Undo last commit (delete changes):**
```bash
git reset --hard HEAD~1          # CAREFUL! Deletes changes permanently
```

---

## ⚡ **Quick Reference Commands**

```bash
# See what changed
git status

# Stage all changes
git add -A

# Commit changes
git commit -m "Your message"

# Push to GitHub
git push

# Pull from GitHub  
git pull

# See commit history
git log --oneline

# Create new branch
git checkout -b branch-name

# Switch branches
git checkout branch-name

# See all branches
git branch -a

# Delete local branch
git branch -d branch-name
```

---

## 📋 **Typical Daily Workflow**

### **Morning: Start work**
```bash
cd /Users/I549685/Documents/SAPTI
git pull origin develop/react-setup    # Get latest changes
```

### **During day: Save progress**
```bash
# Every hour or after completing a feature
git add -A
git commit -m "Descriptive message"
git push origin develop/react-setup
```

### **End of day: Final sync**
```bash
git add -A
git commit -m "End of day: completed X feature"
git push origin develop/react-setup
```

---

## 🎯 **Best Practices**

1. ✅ **Commit often** - Small, focused commits are better than huge ones
2. ✅ **Write clear commit messages** - "Add landing page" not "changes"
3. ✅ **Pull before push** - Always pull latest before pushing
4. ✅ **Use branches** - Don't work directly on `main`
5. ✅ **Check status** - Run `git status` before committing
6. ✅ **Review changes** - Run `git diff` to see what you changed
7. ❌ **Don't commit secrets** - Never commit .env files or API keys

---

## 🔍 **Check Before You Commit**

```bash
# Always run these before committing:
git status                # What files changed?
git diff                  # What did I change?
git log --oneline -3      # What was my last commit?
```

---

## 🆘 **Need Help?**

If you get stuck, just ask me:
- "I made changes to results.md, how do I sync?"
- "How do I undo my last commit?"
- "How do I create a new branch?"
- "I have a merge conflict, help!"

I can run the commands for you! 🚀
