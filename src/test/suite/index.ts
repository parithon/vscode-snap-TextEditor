import * as path from 'path';
import * as Mocha from 'mocha';
import * as glob from 'glob';

export function run(): Promise<void> {	
	// Create the mocha test
	const mocha = new Mocha({
		ui: 'tdd',
		timeout: 5000,
		reporter: "mocha-multi-reporters",
		reporterOptions: {
			"reporterEnabled": "spec,mocha-junit-reporter",
			"mochaJunitReporterReporterOptions": {
				"rootSuiteTitle": `${process.env.AGENT_OS || 'Developer'}`,
				"mochaFile": path.join(__dirname, "..", "test-results-[hash].xml")
			}
		}
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
