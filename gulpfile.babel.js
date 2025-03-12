/**
 * Gulpfile
 *
 * Implements:
 *      1. Live reloads browser with BrowserSync.
 *      2. CSS: Sass to CSS conversion, error catching, Autoprefixing, Sourcemaps,
 *         CSS minification, and Merge Media Queries.
 *      3. JS: Concatenates & uglifies JS files.
 *      4. Images: Minifies PNG, JPEG, GIF and SVG images.
 *      5. Watches files for changes in CSS or JS.
 *      6. Watches files for changes in PHP.
 *      7. Corrects the line endings.
 *      8. InjectCSS instead of browser page reload.
 *      9. Generates .pot file for i18n and l10n.
 *
 */

/**
 * Load Gulp Configuration.
 */
const config = require('./gulp.config.js');

/**
 * Load Plugins.
 *
 * Load gulp plugins and passing them semantic names.
 */
const gulp = require('gulp');

// CSS related plugins.
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const postcss = require('gulp-postcss');
const rtlcss = require('gulp-rtlcss');

// JS related plugins.
const webpack = require('webpack-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// Utility related plugins.
const rename = require('gulp-rename');
const lineec = require('gulp-line-ending-corrector');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const cache = require('gulp-cache');
const plumber = require('gulp-plumber');
const beep = require('beepbeep');
const gulpif = require('gulp-if');
const argv = require('yargs').argv;

// Variables Used within Build Process
const isProduction = (argv.production !== undefined);
const postCssProd = [cssnext(), cssnano()];
const postCssDev = [cssnext()];

/**
 * Custom Error Handler.
 *
 * @param {*} r
 */
const errorHandler = r => {
	notify.onError('\n\n===> ERROR: <%= error.message %>\n')(r);
	beep();
};

/**
 * Task: `browser-sync`.
 *
 * Live Reloads, CSS injections, Localhost tunneling.
 * @see http://www.browsersync.io/docs/options/
 *
 * @param {function} done
 */

const browsersync = done => {
	browserSync.init({
		proxy: config.projectURL,
		open: config.browserAutoOpen,
		injectChanges: config.injectChanges,
		watchEvents: ['change', 'add', 'unlink', 'addDir', 'unlinkDir'],
	});
	done();
};

// Helper function to allow browser reload with Gulp 4.
const reload = done => {
	browserSync.reload(() => {});
	done();
};

/**
 * Task: `styles`.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    3. Writes Sourcemaps for it
 *    4. Auto-prefixes it and generates style.css
 *    5. Renames the CSS file with suffix .min.css
 *    6. Minifies the CSS file and generates style.min.css
 *    7. Injects CSS or reloads the browser via browserSync
 */
gulp.task('styles', () => {
	return gulp
		.src(config.styleSRC, {allowEmpty: true})
		.pipe(plumber())
		.pipe(sourcemaps.init({}))
		.pipe(
			sass({
				errLogToConsole: config.errLogToConsole,
				outputStyle: config.outputStyle,
				precision: config.precision,
			}).on('error', sass.logError),
		)
		.pipe(gulpif(isProduction, postcss(postCssProd), postcss(postCssDev)))
		.pipe(sourcemaps.write('./', {includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./', {}))
		.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
		.pipe(gulp.dest(config.styleDestination))
		.pipe(filter('**/*.css')) // Filtering stream to only css files.
		.pipe(gulpif(!isProduction, browserSync.stream())) // Reloads style.css if that is enqueued.
		.pipe(notify({message: '\n\n===> Styles Compiled\n', onLast: true}));
});

/**
 * Task: `stylesRTL`.
 *
 * Compiles Sass, Autoprefixes it, Generates RTL stylesheet, and Minifies CSS.
 *
 * This task does the following:
 *    1. Gets the source scss file
 *    2. Compiles Sass to CSS
 *    4. Auto-prefixes it and generates style.css
 *    5. Renames the CSS file with suffix -rtl and generates style-rtl.css
 *    6. Writes Sourcemaps for style-rtl.css
 *    7. Renames the CSS files with suffix .min.css
 *    8. Minifies the CSS file and generates style-rtl.min.css
 *    9. Injects CSS or reloads the browser via browserSync
 */
gulp.task('stylesRTL', () => {
	return gulp
		.src(config.styleSRC, {allowEmpty: true})
		.pipe(plumber(errorHandler))
		.pipe(sourcemaps.init({}))
		.pipe(
			sass({
				errLogToConsole: config.errLogToConsole,
				outputStyle: config.outputStyle,
				precision: config.precision,
			}),
		)
		.on('error', sass.logError)
		.pipe(gulpif(isProduction, postcss(postCssProd), postcss(postCssDev)))
		.pipe(sourcemaps.write('./', {includeContent: false}))
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
		.pipe(rename({suffix: '-rtl'})) // Append "-rtl" to the filename.
		.pipe(rtlcss()) // Convert to RTL.
		.pipe(sourcemaps.write('./', {})) // Output sourcemap for style-rtl.css.
		.pipe(gulp.dest(config.styleDestination))
		.pipe(filter('**/*.css')) // Filtering stream to only css files.
		.pipe(gulpif(!isProduction, browserSync.stream())) // Reloads style.css or style-rtl.css, if that is enqueued.
		.pipe(notify({message: '\n\n===> Styles RTL Compiled\n', onLast: true}));
});

/**
 * Task: `customJS`.
 *
 * Concatenate and uglify custom JS scripts.
 *
 * This task does the following:
 *     1. Gets the source folder for JS custom files
 *     2. Concatenates all the files and generates custom.js
 *     3. Renames the JS file with suffix .min.js
 *     4. Uglifies/Minifies the JS file and generates custom.min.js
 */
gulp.task('customJS', () => {
	return gulp
		.src(config.jsCustomSRC, {allowEmpty: true}) // Only run on changed files.
		.pipe(plumber(errorHandler))
		.pipe(webpack({mode: isProduction ? 'production' : 'development'}))
		.pipe(
			babel({
				presets: [
					[
						'@babel/preset-env', // Preset to compile your modern JS to ES5.
						{
							targets: {browsers: config.BROWSERS_LIST}, // Target browser list to support.
						},
					],
				],
				compact: isProduction,
			}),
		)
		.pipe(concat(config.jsCustomFile + '.js'))
		.pipe(gulpif(isProduction, uglify()))
		.pipe(lineec()) // Consistent Line Endings for non UNIX systems.
		.pipe(gulp.dest(config.jsCustomDestination))
		.pipe(notify({message: '\n\n===> JavaScript Compiled\n', onLast: true}));
});

const watchFiles = () => {
	gulp.watch(config.watchStyles, gulp.series('styles', reload));
	gulp.watch(config.watchJsCustom, gulp.series('customJS', reload));
	gulp.watch(config.watchPhp, gulp.series(reload));
};

/**
 * Build for Production.
 *
 * Watches for file changes and runs specific tasks.
 */
gulp.task('production', gulp.parallel('styles', 'customJS'));
gulp.task('default', gulp.parallel('styles', 'customJS', browsersync, watchFiles));