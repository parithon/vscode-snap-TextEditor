# Change Log

## Released

### [v0.1.5]

- Added a configuration option to hide the 'View: Snap Right' button

### [v0.1.4]

- Completed release cycle to include a CI/CD pipeline using Azure Pipelines.
- Azure Pipelines will build our extension, test the extension, generate release notes via the CHANGELOG.md and package our extension into the VSIX and publish to Azure Artifacts for our release pipeline to publish to Github and the Visual Studio Code marketplace.
- Removed unneccessary job matrix' from our pipeline and using the explicit version of node to use which matches the version vscode uses.

[v0.1.5]: https://github.com/parithon/vscode-snap-TextEditor/compare/v0.1.4...v0.1.5
[v0.1.4]: https://github.com/parithon/vscode-snap-TextEditor/compare/v0.1.0...v0.1.4
