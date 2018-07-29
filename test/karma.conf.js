module.exports = function (config) {
	config.set({
		basePath : '',
		autoWatch : false,
		frameworks: ['jasmine'],
		browsers : ['ChromeHeadless'],
		files: [
			'../dist/atomic.js',
			'spec/*.js'
		],
		plugins : [
			'karma-chrome-launcher',
			'karma-spec-reporter',
			'karma-jasmine',
			'karma-coverage',
			'karma-htmlfile-reporter'
		],
		reporters : ['spec', 'coverage', 'html'],
		preprocessors: {
			'../src/**/*.js': 'coverage'
		},
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},
		htmlReporter: {
			outputFile: 'results/unit-tests.html'
		}
	});
};