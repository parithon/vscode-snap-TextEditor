import * as vscode from 'vscode';

export enum SnapDirection {
  Up='workbench.action.splitEditorUp',
  Right='workbench.action.splitEditorRight',
  Down='workbench.action.splitEditorDown',
  Left='workbench.action.splitEditorLeft'
}

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("snapTextEditor.snapUp", (textEditor: vscode.TextEditor) => {
      snapTextEditor(textEditor, SnapDirection.Up);
    }),
    vscode.commands.registerTextEditorCommand("snapTextEditor.snapDown", (textEditor: vscode.TextEditor) => {
      snapTextEditor(textEditor, SnapDirection.Down);
    }),
    vscode.commands.registerTextEditorCommand("snapTextEditor.snapLeft", (textEditor: vscode.TextEditor) => {
      snapTextEditor(textEditor, SnapDirection.Left);
    }),
    vscode.commands.registerTextEditorCommand("snapTextEditor.snapRight", (textEditor: vscode.TextEditor) => {
      snapTextEditor(textEditor, SnapDirection.Right);
    })
  );

}

async function snapTextEditor(textEditor: vscode.TextEditor, snapDirection: SnapDirection) {
  const viewColumn = snapDirection === SnapDirection.Left ? vscode.ViewColumn.Two : vscode.ViewColumn.One;
  await vscode.commands.executeCommand(snapDirection, textEditor);
  await vscode.window.showTextDocument(textEditor.document, viewColumn, false);
  await vscode.commands.executeCommand('workbench.action.closeActiveEditor', textEditor);
}

export function deactivate() {}
