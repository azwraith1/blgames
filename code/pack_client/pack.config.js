// const PROJECT_BASE_DIR = '../bl_client/code/bin-release/web/1'
const PROJECT_BASE_DIR = './../';

let VERSION = null;
try {
    VERSION = require(`${PROJECT_BASE_DIR}/upload/version`);
    VERSION = VERSION.CONFIG;
} catch (error) {
    console.log(`项目目录${PROJECT_BASE_DIR}配置不正确`, error);
}

const PUB_PLATFORM = VERSION.PUB_PLATFORM;

console.log('==================PUB_PLATFORM=', VERSION, PUB_PLATFORM);

const SERVER_CONFIG = require('./server.config');

const BUILD_DIR = 'build/client';

module.exports = {
    //git 版本
    gitTag: 'v1.0.0',
    //项目目录
    PROJECT_BASE_DIR: PROJECT_BASE_DIR,
    //项目版本
    VERSION: VERSION,

    input: {
        full: [
            // [`${PROJECT_BASE_DIR}/bin-release/web/1/lib*/**/*.*`, BUILD_DIR],
            // [`${PROJECT_BASE_DIR}/bin-release/web/1/record*/**/*.*`, BUILD_DIR],
        ],

        fix: [
            // [`${PROJECT_BASE_DIR}/bin-release/web/1/static*/**/*.*`, BUILD_DIR],
            [`${PROJECT_BASE_DIR}/upload/version.js`, BUILD_DIR],
            [`${PROJECT_BASE_DIR}/bin-release/web/1/**/*.*`, BUILD_DIR]
        ],

        zip: BUILD_DIR + '/**/*',
    },
    output: {
        dist: BUILD_DIR,
        origin: 'origin',
        sourcemap: 'map',
        zip: './packages/',
    },
    // scp: SERVER_CONFIG[PUB_PLATFORM],
    upload: [{
        host: '171.244.35.40',
        username: 'root',
        password: 'JYvdwVUZrEvwFkyTDYPx',
        paths: [{
            localPath: 'C:/Users/Administrator/Desktop/BUG/room/servers.json',
            remotePath: '/home/fishjoy_test/server/fishjoyPublish/room/config'
        }]
    }],
    download: [{
        host: '171.244.35.38',
        username: 'root',
        password: 'JYvdwVUZrEvwFkyTDYPx',
        localPath: '',
        remotePath: ''
    },]
};