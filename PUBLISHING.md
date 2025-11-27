# How to Publish ByteFlags to NPM

Follow these steps to publish your package to the NPM registry.

## Prerequisites
- You must have an [NPM account](https://www.npmjs.com/signup).
- You must be logged in to NPM in your terminal.

## Steps

1.  **Login to NPM**
    ```bash
    npm login
    ```
    Follow the prompts to authenticate.

2.  **Build the Project**
    Ensure you have the latest build.
    ```bash
    npm run build
    ```

3.  **Run Tests**
    Make sure all tests pass.
    ```bash
    npm test
    ```

4.  **Update Version (Optional)**
    If you have already published a version, you need to increment the version number in `package.json`.
    ```bash
    npm version patch # or minor, or major
    ```

5.  **Publish**
    ```bash
    npm publish --access public
    ```
    Note: `--access public` is required for scoped packages (e.g., `@username/package`), but good practice for new public packages anyway. Since your package name is `byteflags` (unscoped), it defaults to public, but if that name is taken, you might need to rename it to `@your-username/byteflags` in `package.json`.

## Troubleshooting

- **403 Forbidden**: The package name `byteflags` might already be taken by someone else on NPM.
    - **Solution**: Change the `"name"` in `package.json` to something unique, like `@<your-username>/byteflags` or `byteflags-ts-lib`.
