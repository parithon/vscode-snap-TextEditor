import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {
	const os = process.env.AGENT_OS || 'Developer';
	const date = new Date()
		.toISOString()
		.replace(/:/g,'-')
		.replace(/\.\d+/, '');

	process.env.SUITE_NAME = `${os} Tests`;
	process.env.XUNIT_FILE = path.join(__dirname, 'results', `TEST-RESULTS-${os}-${date}.xml`);
	
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		timeout: 5000,
		reporter: 'spec-xunit-file'
	});
	mocha.useColors(true);

	const testsRoot = path.resolve(__dirname, '..');

	return new Promise((c, e) => {
		glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
			if (err) {
				return e(err);
			}

			// Add files to the test suite
			files.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

			try {
				// Run the mocha test
				mocha.run(failures => {
					if (failures > 0) {
						e(new Error(`${failures} tests failed.`));
					} else {
						c();
					}
				});
			} catch (err) {
				e(err);
			}
		});
	});
}
