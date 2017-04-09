var gulp = require("gulp");
var jade = require("gulp-jade");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var es = require('event-stream');
//var jslint = require("gulp-jslint");
//var recess = require("gulp-recess");

var dir = {
    assets: "assets/",
    src: "src/",
    dest: "dest/",
    bower: "bower_components/"
};

gulp.task("js", function() {
    es.concat(
            gulp.src(dir.src + dir.assets + "js/**/*.js")
    )
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dest + dir.assets + "js/"));
});

gulp.task("jade", function () {
    var locations = [
        {
            src: "*.jade",
            dest: ""
        },
        {
            src: "templates/**/*jade",
            dest: "templates/"
        }
    ];
    for(var i = 0; i < locations.length; i++) {
        gulp.src(dir.src + locations[i].src)
            .pipe(plumber())
            .pipe(jade({
                pretty: true,
                doctype: "HTML"
            }))
            .pipe(gulp.dest(dir.dest + locations[i].dest));
    }
});

gulp.task("less", function() {
    gulp.src(dir.src + dir.assets + "less/master.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dir.dest + dir.assets + "css/"));
});

gulp.task("css", function() {
    gulp.src(dir.src + dir.assets + "css/**/*.css")
        .pipe(gulp.dest(dir.dest + dir.assets + "css/"));
});

gulp.task("bower_components", function() {
    gulp.src(dir.src + "../bower_components/**/*")
        .pipe(gulp.dest(dir.dest + "bower_components/"));
});


gulp.task("compile", ["jade", "js", "less", "css", "bower_components"]);

gulp.task("default", ["jade", "js", "less", "css", "bower_components"], function() {
    gulp.watch(dir.src + dir.assets + "js/**/*.js", function() {
        gulp.run("js");
    });
    gulp.watch(dir.src + dir.assets + "less/**/*.less", function() {
        gulp.run("less");
    });
    gulp.watch(dir.src + "/**/*.jade", function() {
        gulp.run("jade");
    });
    gulp.watch(dir.src + dir.assets + "css/**/*.css", function() {
        gulp.run("css");
    });
    gulp.watch(dir.src + "../bower_components/**/*", function() {
        gulp.run("bower_components");
    });
});
