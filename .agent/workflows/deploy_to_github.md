# Clean Build & GitHub Push Workflow

## Goal
Document steps to verify a clean build and push code to GitHub.

## Steps

### 1. Clean Local Build (Testing)
-   Rule of thumb: We don't push the build folder (`.next`) to GitHub, but we run a build locally to check for errors.
-   Command:
    ```bash
    npm run build
    ```
-   If this passes without red errors, your code is safe.

### 2. Prepare Git
-   The `.gitignore` file already excludes:
    -   `/node_modules` (Heavy libraries)
    -   `/.next` (Build artifacts)
    -   `.env` (Secrets)
-   This means you don't need to manually delete folders; Git will ignore them automatically.

### 3. Push to GitHub
-   Initialize repo (if new):
    ```bash
    git init
    git add .
    git commit -m "First commit: Portfolio complete"
    git branch -M main
    git remote add origin https://github.com/USERNAME/REPO_NAME.git
    git push -u origin main
    ```
-   Update repo (if exists):
    ```bash
    git add .
    git commit -m "Update portfolio with carousel and print fixes"
    git push
    ```

## Verification
-   Run `npm run build` in terminal.
-   If success, proceed with Git commands.
