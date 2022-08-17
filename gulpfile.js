import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import uglify from 'gulp-uglify';
import prefix from 'gulp-autoprefixer';
import minify from 'gulp-clean-css';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// minimize the images
async function imageMin() {
    gulp.src('src/images/*.{jpg,png,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
};

// compile the desktop images
async function desktopImages() {
    gulp.src('src/images/desktop/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/desktop'));
};

// compile the mobile images
async function mobileImages() {
    gulp.src('src/images/mobile/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/mobile'));
};

// Compile sass
async function compileSass(){ 
    gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix())
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
};


async function watchTask() {
    gulp.watch('src/images/*.{jpg,png,svg}', imageMin);
    gulp.watch('src/images/desktop/*', desktopImages);
    gulp.watch('src/images/mobile/*', mobileImages);
    gulp.watch('src/styles/*.scss', compileSass);
};

gulp.task('default', gulp.series(imageMin, mobileImages, desktopImages, compileSass, watchTask));
