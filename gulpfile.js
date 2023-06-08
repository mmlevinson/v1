const gulp = require('gulp');
const { src, dest, watch } = require('gulp');

function logError(error) {
	console.error.bind(error);
}

const paths = {
	styles: ['src/styles/*.styl'],
	pug: ['src/*.pug', 'src/templates/*.pug', 'src/includes/*.pug'],
};

/* We need to make gulp aware of any packages imported into our .styl files */
const stylus = require('gulp-stylus'); //save reference to this function
const typographic = require('typographic'); //packages
const nib = require('nib'); //packages
const rupture = require('rupture'); //packages
// const { functions } = require('stylus');


function stylToCSS() {
	return src(paths.styles) //the source directory
		.pipe(
			stylus({
				//run the gulp-stylus package
				use: [typographic(), nib(), rupture()],
			})
		)
		.on('error', logError)
		.pipe(dest('public/styles')); //output directory
}
gulp.task('stylToCSS', stylToCSS);
exports.stylToCSS = stylToCSS;



/* Richard Stibbard code */
const pug = require('gulp-pug');
function pugToHTML() {
	return src(paths.pug)
		.pipe(pug({ pretty: true }))
		.on('error', logError)
		.pipe(dest('public'));
}

gulp.task('pugToHTML', pugToHTML);
exports.pugToHTML = pugToHTML;

function launchGulp(cb) {
	console.log('Gulp is Watching');
	watch(paths.pug, pugToHTML);
	watch(paths.styles, stylToCSS);
	cb()
}

exports.default = launchGulp;

