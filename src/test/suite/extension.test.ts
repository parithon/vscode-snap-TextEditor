import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as ext from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	const file1 = path.join(__dirname, 'index.js');
	const file2 = path.join(__dirname, 'index.js.map');

	setup(async () => {

		for (let i = 0; i < vscode.workspace.textDocuments.length; i++) {
			await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
		}

		await vscode.window.showTextDocument(vscode.Uri.file(file1), {preview: false});
		await vscode.window.showTextDocument(vscode.Uri.file(file2), {preview: false});

	});

	test('Text Editor Snaps Up', async () => {
		
		try {
			await ext.snapTextEditor(vscode.window.activeTextEditor!, ext.SnapDirection.Up);
			assert.equal(vscode.window.visibleTextEditors.length, 2);
			
			const textEditorLeft = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.One)];
			const textEditorRight = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.Two)];

			assert.equal(textEditorLeft.document.fileName, file2);
			assert.equal(textEditorRight.document.fileName, file1);
		}
		catch(err) {
			assert.fail(err);
		}

	});
	
	test('Text Editor Snaps Down', async () => {
		
		try {
			await ext.snapTextEditor(vscode.window.activeTextEditor!, ext.SnapDirection.Down);
			assert.equal(vscode.window.visibleTextEditors.length, 2);
			
			const textEditorLeft = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.One)];
			const textEditorRight = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.Two)];

			assert.equal(textEditorLeft.document.fileName, file1);
			assert.equal(textEditorRight.document.fileName, file2);
		}
		catch(err) {
			assert.fail(err);
		}

	});
	
	test('Text Editor Snaps Left', async () => {
		
		try {
			await ext.snapTextEditor(vscode.window.activeTextEditor!, ext.SnapDirection.Left);
			assert.equal(vscode.window.visibleTextEditors.length, 2);
			
			const textEditorLeft = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.One)];
			const textEditorRight = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.Two)];

			assert.equal(textEditorLeft.document.fileName, file2);
			assert.equal(textEditorRight.document.fileName, file1);
		}
		catch(err) {
			assert.fail(err);
		}

	});

	test('Text Editor Snaps Right', async () => {
		
		try {
			await ext.snapTextEditor(vscode.window.activeTextEditor!, ext.SnapDirection.Right);
			
			assert.equal(vscode.window.visibleTextEditors.length, 2);

			const textEditorLeft = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.One)];
			const textEditorRight = vscode.window.visibleTextEditors[vscode.window.visibleTextEditors.findIndex(te =>  te.viewColumn === vscode.ViewColumn.Two)];

			assert.equal(textEditorLeft.document.fileName, file1);
			assert.equal(textEditorRight.document.fileName, file2);
		}
		catch(err) {
			assert.fail(err);
		}

	});
});
