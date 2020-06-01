const VERSION = typeof (window) != "undefined" ? window : module.exports;

//发布渠道类型定义
const PLATFORM_TYPE = {
    LOCAL: 'local', //本地
    INNER: 'inner', //公司内部测试平台
    GOOGLE_PUBLISH: 'google_publish', //t9正式平台
    CQ9: 'cq9', //CQ正式平台
    CQTEST_GAME: 'cqtest_game', // CQ测试服
    PUBLISH_GAME: 'publish_game', //预发布服
    DEMO_GAME: 'demo_game',// 外网体验服
    INTDEMO_GAME: 'intdemo_game',// 国际体验服
    TEST_GAME: 'test_game', // QA测试服
};

//发布版本类型标识
const VERSION_TYPE = {
    BASE: 'base',
    ALPHA: 'alpha',
    BETA: 'beta',
    RC: 'rc',
    RELEASE: 'release',
};

VERSION.CONFIG = {
    //产品商标
    PRODUCT_IDENTIFY: 'BL',

    // 发布渠道
    PUB_PLATFORM: PLATFORM_TYPE.INNER,

    //发布版本类型
    PUB_VERSION_TYPE: VERSION_TYPE.RELEASE,

    //发布版本
    PUB_VERSION_NO: '1.16.45',

    //发布版本时间
    PUB_VERSION_TIME: '20190923_185725',
};