# How to Publish to GitHub

I have created the necessary files for a GitHub repository:
- `.gitignore`: Ignores `node_modules`, build artifacts, etc.
- `.github/workflows/ci.yml`: A GitHub Action to automatically run tests on push.

## Steps to Push

1.  **Initialize Git**
    Run this in your terminal:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create Repository on GitHub**
    - Go to [GitHub.com](https://github.com) and create a new repository named `byteflags`.
    - Do **not** initialize with README, license, or gitignore (we already have them).

3.  **Push Code**
    Copy the commands GitHub gives you, which will look like this:
    ```bash
    git remote add origin https://github.com/<YOUR_USERNAME>/byteflags.git
    git branch -M main
    git push -u origin main
    ```

## CI/CD
Once pushed, click the "Actions" tab on your GitHub repository page. You should see a workflow running that builds your project and runs the tests.
