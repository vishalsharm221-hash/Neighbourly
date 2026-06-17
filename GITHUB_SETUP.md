# GitHub Push Instructions

The code is ready to push, but we need GitHub authentication first.

## Option 1: Using Personal Access Token (Recommended)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token
5. Run in terminal:
```bash
git config --global credential.helper wincred
```
6. When prompted for password, use the token instead

## Option 2: Using SSH

1. Generate SSH key:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```
2. Add to SSH agent:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
ssh-agent -s
ssh-add ~/.ssh/id_ed25519
```
3. Add public key to GitHub:
   - Go to https://github.com/settings/keys
   - Paste contents of `~/.ssh/id_ed25519.pub`
4. Update git remote:
```bash
git remote set-url origin git@github.com:vishalsharm221-hash/Neighbourly.git
```

## Then Push:
```bash
cd c:\Users\LENOVO\Desktop\Neighbourly
git push -u origin main
```

---

Once authenticated, the code will be pushed automatically!
