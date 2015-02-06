var gulp = require('gulp');
var filter = require('gulp-filter');
var kclean = require('gulp-kclean');
var modulex = require('gulp-modulex');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var cwd = process.cwd();
var src = path.resolve(cwd, 'lib');
var build = path.resolve(cwd, 'build');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var replace = require('gulp-replace');
var gulpXTemplate = require('gulp-xtemplate');
var XTemplate = require('xtemplate');
var tap = require('gulp-tap');

// uc first
function ucfirst(str) {

	str = str.replace('-debug', '').replace(/\-(\w)/, function(nul, match) {
		return match.toUpperCase();	
	});

	var uppers = ['dom', 'ua', 'io', 'json'];

	if (-1 === uppers.indexOf(str)) {
		return str.slice(0, 1).toUpperCase() + str.slice(1);
	} else {
		return str.toUpperCase();
	}

}

// 转换 modulex 为 kissy
function modulexToKissy(str, filepath) {

	var reg = /\/([\w\-]+)\/([\w\-]+)(-debug)*\.js/;
	var match = filepath.match(reg);

	if (match && match[2]) {

		var name = ucfirst(match[2]);

		var prefix = match[1];

		if ('build' !== prefix) {
			if ('dom' === prefix) {
				name = 'DOM';
			} else {
				name = ucfirst(prefix) + name;
			}
		}

		if ('EventDomBase' === name) {
			name = 'Event';
		}

		if ('AnimTransition' === name) {
			name = 'Anim';
		}

		if ('Util' === name) {
			str = str.replace(/(callbacks\[i\]\()\);/g, '$1KISSY);');
		}

		// 替换 modulex 为 define
		return str.replace(/\b(modulex\.add|define)\(/g, 'define(')
				  // 增加 S 参数
				  //.replace(/function\(require,/g, 'function(S, require,')
    
				  // 移除各模块 debug 参数
				  .replace(/_debug\:\s*(['"])@DEBUG@\1,/g, '')

				  // 增加版本
				  .replace(/"(component)\//g, '"kg/$1/0.0.1/')
				  // 增加 xtemplate 版本号
				  .replace(/"(xtemplate)\//g, '"kg/$1/4.1.4/')
				  // 增加 dd 版本号
				  .replace(/"(dd)\//g, '"kg/$1/0.1.1/')

				  // 移除个模块版本号
				  .replace(/\b(\w+\.)+version\s*=\s*(['"])\d+\.\d+\.\d+\2;/g, '')
				  .replace(/version\:\s*(['"])\d+\.\d+\.\d+\1,/g, '')
				
				  // 替换配置项
				  
				  .replace(/modulex.config\(([^)]+)\)/g, function(nul, match) {
					//console.log('KISSY.config({' + match.replace(/"requires"\s*,/, '"modules":') + '});');
					return 'KISSY.config({' + match.replace(/"requires"\s*,/, '"modules":') + '});';	  
				  })

				  // 替换 resizeable 版本
				  .replace(/"resizable"/g, '"kg/resizable/0.0.1/"')

				  // 替换 modulex- 为 kissy -
				  .replace(/(["'])modulex\-([^"']+)\1/g, '$1$2$1');

	} else {

		console.error('模块编译出错！！！ modulex to kissy....');

	}

}

gulp.task('lint', function () {
    return gulp.src(['./lib/**/*.js', '!./lib/**/xtpl/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('clean', function () {
    return gulp.src(build, {
        read: false
    }).pipe(clean());
});

gulp.task('tag', function (done) {
    var cp = require('child_process');
    var version = packageInfo.version;
    cp.exec('git tag ' + version + ' | git push origin ' + version + ':' + version + ' | git push origin master:master', done);
});

var wrapper = require('gulp-wrapper');
var date = new Date();
var header = ['//!',
        'Copyright ' + date.getFullYear() + ', ' + packageInfo.name + '@' + packageInfo.version,
        packageInfo.license + ' Licensed,',
        'build time: ' + (date.toGMTString()),
    '\n'].join(' ');
    
gulp.task('build', ['lint','xtpl'], function () {
    var mods = {
        'component/control': undefined,
        'component/container': ['component/control'],
        'component/extension/delegate-children': ['component/control'],
        'component/extension/shim': undefined,
        'component/extension/content-box': undefined,
        'component/extension/align': undefined,
        'component/plugin/drag': undefined,
        'component/plugin/resize': undefined
    };

    Object.keys(mods).forEach(function (tag) {
        var packages = {};
        packages[tag] = {
            base: path.resolve(src, tag)
        };
        var base = path.basename(tag);
        var dirname = path.dirname(tag);
        return gulp.src('./lib/' + tag + '.js')
            .pipe(modulex({
                modulex: {
                    packages: packages
                },
                excludeModules: mods[tag]
            }))
            .pipe(kclean({
                files: [
                    {
                        src: './lib/' + tag + '-debug.js',
                        outputModule: tag
                    }
                ]
            }))
            .pipe(replace(/@VERSION@/g, packageInfo.version))
            .pipe(wrapper({
                    header: header
                }))
			.pipe(tap(function(file) {
				file.contents = new Buffer(modulexToKissy(file.contents.toString(), file.path));
			 }))
			.pipe(rename(function(path){
				 path.basename = path.basename.replace('-debug', '');
			 }))
            .pipe(gulp.dest(path.resolve(build,dirname.replace(/component\/*/, ''))))
            .pipe(filter(base + '.js'))
            .pipe(replace(/@DEBUG@/g, ''))
            .pipe(uglify({
				preserveComments: 'some'
			 }))
			.pipe(rename(function(path){
				 path.extname = '-min.js';
			 }))
            .pipe(gulp.dest(path.resolve(build,dirname.replace(/component\/*/, ''))));
    });
});

gulp.task('xtpl', function () {
    gulp.src('lib/**/*.xtpl').pipe(gulpXTemplate({
        wrap: false,
        runtime: 'xtemplate/runtime',
        suffix: '.xtpl',
        XTemplate: XTemplate
    })).pipe(gulp.dest('lib'))
});

gulp.task('mx', function () {
    var aggregateBower = require('aggregate-bower');
    aggregateBower('bower_components/', 'mx_modules/');
});

gulp.task('auto-d', function () {
    require('auto-deps')(cwd);
});

gulp.task('watch', function () {
    gulp.watch('lib/**/*.xtpl', ['xtpl']);
});

gulp.task('default', ['build']);
