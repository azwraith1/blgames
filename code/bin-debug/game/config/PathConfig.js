var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: li mengchan
 * @Date: 2018-09-11 10:57:15
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-17 11:44:13
 * @Description:
 */
var PathTypeEnum;
(function (PathTypeEnum) {
    //192.168.2.98
    PathTypeEnum[PathTypeEnum["NEI_TEST1"] = 0] = "NEI_TEST1";
    //192.168.2.188
    PathTypeEnum[PathTypeEnum["NEI_TEST"] = 1] = "NEI_TEST";
    //192.168.2.100
    PathTypeEnum[PathTypeEnum["NEI_TEST3"] = 2] = "NEI_TEST3";
    //外网测试 35.221.192.46
    PathTypeEnum[PathTypeEnum["WAI_TEST"] = 3] = "WAI_TEST";
    //外网正式 
    PathTypeEnum[PathTypeEnum["WAI_PRODUCT"] = 4] = "WAI_PRODUCT";
    //QA专用测试
    PathTypeEnum[PathTypeEnum["QA_TEST"] = 5] = "QA_TEST";
    //预发布服务器
    PathTypeEnum[PathTypeEnum["PUBLISH_TEST"] = 6] = "PUBLISH_TEST";
    //国际外网测试服
    PathTypeEnum[PathTypeEnum["INTDEMO_TEST"] = 7] = "INTDEMO_TEST";
    //国内外测试服
    PathTypeEnum[PathTypeEnum["DEMO_TEST"] = 8] = "DEMO_TEST";
    PathTypeEnum[PathTypeEnum["ZIDINGYI"] = 9] = "ZIDINGYI";
    PathTypeEnum[PathTypeEnum["NEI_TEST2"] = 10] = "NEI_TEST2";
})(PathTypeEnum || (PathTypeEnum = {}));
var PathConfig = (function () {
    function PathConfig() {
        //http 或者 https
        this.httpPath = "";
        this.socketPath = "";
        //是否使用oss
        this.use_oss = false;
        this.debug_model = false;
        this.token_login = false;
    }
    return PathConfig;
}());
__reflect(PathConfig.prototype, "PathConfig");
var PathConfigFac = (function () {
    function PathConfigFac() {
    }
    PathConfigFac.getPathByType = function (type) {
        var pathConfig = new PathConfig();
        pathConfig.log_level = 2;
        switch (type) {
            case PathTypeEnum.NEI_TEST2:
                pathConfig.httpPath = "http://192.168.3.101:3002";
                pathConfig.use_oss = false;
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.debug_model = true;
                Const.LAST_TIME_RACE = 800 * 60 * 1000;
                break;
            case PathTypeEnum.NEI_TEST1:
                pathConfig.httpPath = "http://192.168.3.234:3002";
                pathConfig.use_oss = false;
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.debug_model = true;
                break;
            case PathTypeEnum.NEI_TEST:
                pathConfig.httpPath = "http://192.168.3.188:3002"; //188
                pathConfig.use_oss = false;
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.debug_model = false;
                Const.LAST_TIME_RACE = 5 * 60 * 1000;
                break;
            case PathTypeEnum.NEI_TEST3:
                pathConfig.httpPath = "http://192.168.2.100:3002";
                pathConfig.use_oss = false;
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.debug_model = false;
                break;
            case PathTypeEnum.WAI_PRODUCT:
                pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
                pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
                pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
                pathConfig.log_level = LogUtils.INFO;
                pathConfig.debug_model = false;
                pathConfig.token_login = true;
                return pathConfig;
            //国外测试服
            case PathTypeEnum.INTDEMO_TEST:
                pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
                pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
                pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
                pathConfig.log_level = LogUtils.INFO;
                pathConfig.debug_model = false;
                break;
            //国内测试服
            case PathTypeEnum.DEMO_TEST:
                pathConfig.httpPath = "https://demo-game.qiweise.com";
                pathConfig.log_level = LogUtils.INFO;
                pathConfig.debug_model = false;
                break;
            //QA测试测试服	
            case PathTypeEnum.QA_TEST:
                pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
                pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
                pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
                pathConfig.debug_model = false;
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.token_login = true;
                break;
            //预发布服务器	
            case PathTypeEnum.PUBLISH_TEST:
                pathConfig.serverVersion = decodeURIComponent(game.Utils.getURLQueryString("ver"));
                pathConfig.httpPath = decodeURIComponent(game.Utils.getURLQueryString("gate"));
                pathConfig.socketPath = decodeURIComponent(game.Utils.getURLQueryString("ws"));
                pathConfig.log_level = LogUtils.INFO;
                pathConfig.debug_model = false;
                pathConfig.token_login = true;
                break;
            case PathTypeEnum.ZIDINGYI:
                pathConfig.log_level = LogUtils.DEBUG;
                pathConfig.debug_model = true;
                break;
        }
        var windowHerf = window.location.href;
        if (windowHerf.indexOf("127.0.0.1") > -1 || windowHerf.indexOf("192.168") > -1) {
            pathConfig.log_level = LogUtils.DEBUG;
            pathConfig.debug_model = true;
        }
        return pathConfig;
    };
    return PathConfigFac;
}());
__reflect(PathConfigFac.prototype, "PathConfigFac");
