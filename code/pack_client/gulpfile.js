const gulp = require('gulp');
const zip = require('gulp-zip'); //zip压缩
const scp = require('gulp-scp2');
const runSequence = require('run-sequence');
const path = require('path');
const del = require('del');
const moment = require('moment');
const PackConfig = require('./pack.config');
const PUB_PLATFORM = PackConfig.VERSION.PUB_PLATFORM;
const PRODUCT_IDENTIFY = PackConfig.VERSION.PRODUCT_IDENTIFY;
const PUB_VERSION_TYPE = PackConfig.VERSION.PUB_VERSION_TYPE;
const HotUpdate = require(`${PackConfig.PROJECT_BASE_DIR}/upload/hotUpdate`);


let pkgName = '';
let firstPack = false;

// 清理、不混肴压缩发布、打包、上传
gulp.task('default', function (cb) {
    runSequence('genVersion', 'clean', ['copyStatics'], 'zip', 'scp', cb);
});

// 全量包
gulp.task('full', function (cb) {
    firstPack = true;
    runSequence('genVersion', 'clean', ['copyStatics'], 'zip', 'scp', cb);
});


gulp.task('genVersion', function (cb) {
    const { execFile } = require('child_process');
    const child = execFile('bash.exe', ['genVersion.sh'], { cwd: `${PackConfig.PROJECT_BASE_DIR}/upload`}, (error, stdout, stderr) => {
        if (error) {
            throw error;
        }
        console.log(stdout);
        cb();
    });

});

//gulp 功能业务配置
gulp.task('clean', function () {
    return del([
        //删除
        PackConfig.output.dist,
        //保留
        '!dist/**/*.json'
    ]);
});

gulp.task('copyStatics', function () {
    let task = null;
    console.log('PackConfig.input=%j', PackConfig.input);
    console.log('PackConfig.input.statics=%j', PackConfig.input.fix);
    let statics = PackConfig.input.fix;
    if (firstPack) {
        statics = PackConfig.input.fix.concat(PackConfig.input.full);
    }

    console.log(statics);
    statics.forEach(function (item) {
        task = gulp.src(item[0])
            .pipe(gulp.dest(item[1]));
    });
    return task;
});

gulp.task('zip', function () {
    let timeStamp = moment().format("YYYYMMDD_HHmmss");
    const version = HotUpdate.reloadFile(path.join(__dirname, `${PackConfig.PROJECT_BASE_DIR}/upload/version.js`));
    console.log('=================version',version)
    const PUB_VERSION_NO = version.value.CONFIG.PUB_VERSION_NO;
    pkgName = `${PRODUCT_IDENTIFY}.client.${PUB_PLATFORM}.${PUB_VERSION_TYPE}.v${PUB_VERSION_NO}_${timeStamp}.zip`;
    console.info('pkgName:', pkgName);
    return gulp.src(PackConfig.input.zip)
        .pipe(zip(pkgName))
        .pipe(gulp.dest(PackConfig.output.zip));
});

gulp.task('scp', function () {
    return gulp.src(PackConfig.output.zip + pkgName)
        .pipe(scp(PackConfig.scp))
        .on('error', function (err) {
            console.info(err);
        });
});