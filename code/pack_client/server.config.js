const PACKAGES_DIR = './packages';

module.exports = {
    inner: {
        host: '192.168.2.100',
        username: 'root',
        password: '1',
        dest: '/root/packages'
    },
    local: {
        host: '192.144.157.29',
        username: 'root',
        password: 'Bolin123456',
        remotePath: '/opt/packages'
    },
    // 预发布服务器
    publish_game: {
        host: '52.68.191.231',
        username: 'bole',
        privateKey: require('fs').readFileSync('./key/bole'),
        passphrase: 'd2uLxfmCWZX90WKj',
        dest: PACKAGES_DIR,
        port: 58000,
    },
    // google正式服
    google_publish: {
        host: '119.23.37.174', //master
        // host: '13.230.40.185', //slave
        username: 'bole',
        password: 'HCBrk$jT0%$zd6B@81$Tj2%lnu',
        dest: PACKAGES_DIR,
        port: 10085,
    },
    // 日本专线测试服
    google_publish_jp: {
        host: '203.105.78.7', //master
        username: 'bole',
        password: 'nuR0^MzW9Sygvd*iMPij#Xtn##',
        dest: PACKAGES_DIR,
        port: 58000,
    },
    // CQ9正式环境
    cq9: {
        host: '203.105.78.7',
        username: 'bole',
        password: 'nuR0^MzW9Sygvd*iMPij#Xtn##',
        dest: PACKAGES_DIR,
        port: 58000,
    },

    // CQ9测试环境
    cqtest_game: {
        host: '52.196.47.132',
        username: 'bole',
        privateKey: require('fs').readFileSync('./key/bole'),
        passphrase: 'd2uLxfmCWZX90WKj',
        dest: PACKAGES_DIR,
        port: 58000,
    },
    // CQ阿里备用环境
    cq9_ali: {
        host: '120.78.182.19',
        username: 'linyang',
        // privateKey: require('fs').readFileSync('./key/cq9.pem'),
        // passphrase: 'lin8888YNG',
        password: 'HCBrk$jT0%$zd6B@81$Tj2%lnu',
        dest: PACKAGES_DIR,
        port: 10085,
    },

    // 外网体验服
    demo_game: {
        host: '52.196.171.51',
        username: 'bole',
        privateKey: require('fs').readFileSync('./key/bole'),
        passphrase: 'd2uLxfmCWZX90WKj',
        dest: PACKAGES_DIR,
        port: 58000,
    },

    // 国际体验服
    intdemo_game: {
        host: '3.0.218.143',
        username: 'ec2-user',
        privateKey: require('fs').readFileSync('./key/ec2-user-intdemo-game.pem'),
        // passphrase: 'd2uLxfmCWZX90WKj',
        dest: PACKAGES_DIR,
        port: 22,
    },

    // QA测试服
    test_game: {
        host: '52.192.52.83',
        username: 'bole',
        privateKey: require('fs').readFileSync('./key/bole'),
        passphrase: 'd2uLxfmCWZX90WKj',
        dest: PACKAGES_DIR,
        port: 58000,
    },
};