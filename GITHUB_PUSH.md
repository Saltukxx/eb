# GitHub Push Guide

When the user says **"push"**, run these commands to commit and push all changes:

```bash
cd "c:\Users\satog\OneDrive\Desktop\eb"
git add -A
git status
git commit -m "<descriptive message based on changes>"
git push origin main
```

## Repository Info

- **Repo:** https://github.com/Saltukxx/eb.git
- **Branch:** `main`
- **Workspace:** `c:\Users\satog\OneDrive\Desktop\eb`

## Notes

- Use PowerShell on Windows (avoid `&&`; use `;` to chain commands)
- Commit message should describe the changes in Turkish or English
- Credentials are stored in Git credential manager (no need to enter each time)
