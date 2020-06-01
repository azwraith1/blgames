/*
 * @Author: Li MengChan
 * @Date: 2018-06-25 14:23:06
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-13 15:41:32
 * @Description: 游戏配置
 */
var GameConfig;
(function (GameConfig) {
    GameConfig.WINSIZE_WIDTH = 1280;
    GameConfig.WINSIZE_HEIGHT = 720;
    GameConfig.CURRENT_WIDTH = 1280;
    GameConfig.CURRENT_HEIGHT = 720;
    GameConfig.PC_WINSIZE_WIDTH = 1280;
    GameConfig.PC_WINSIZE_HEIGHT = 720;
    GameConfig.WINSIZE_BILI_WIDTH = 1;
    GameConfig.WINSIZE_BILI_HEIGHT = 1;
    GameConfig.IS_RUNNING = true;
    GameConfig.CURRENT_DIRECTION = "landscape";
    GameConfig.CURRENT_ISSHU = false;
    GameConfig.SHOW_INVITE = false;
    //获得浏览器类型 pc android ios -- 可扩展为其他 如 微信、qqzone、qq、微博、校内、facebook
    function systemType() {
        var ua = window.navigator.userAgent.toLowerCase();
        var microStr = "" + ua.match(/MicroMessenger/i);
        if (("" + ua.match(/windows nt/i)) == "windows nt") {
            return "windows";
        }
        else if (("" + ua.match(/iphone/i)) == "iphone") {
            return "ios";
        }
        else if (("" + ua.match(/android/i)) == "android") {
            return "android";
        }
        else if (("" + ua.match(/ipad/i)) == "ipad") {
            return "ipad";
        }
        else if (("" + ua.match(/linux/i)) == "linux") {
            return "linux";
        }
        else if (("" + ua.match(/mac/i)) == "mac") {
            return "mac";
        }
        else if (("" + ua.match(/ucbrower/i)) == "ucbrower") {
            return "ucbrower";
        }
        else {
            LogUtils.logD("未知系统类型");
        }
    }
    GameConfig.systemType = systemType;
    //获得平台类型 如 微信、qqzone、qq、微博、校内、facebook
    function platformType() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (("" + ua.match(/micromessenger/i)) == "micromessenger") {
            return "micromessenger";
        }
        else if (("" + ua.match(/qzone/i)) == "qzone") {
            return "qzone";
        }
        else if (("" + ua.match(/weibo/i)) == "weibo") {
            return "weibo";
        }
        else if (("" + ua.match(/qq/i)) == "qq") {
            return "qq";
        }
        else if (("" + ua.match(/renren/i)) == "renren") {
            return "renren";
        }
        else if (("" + ua.match(/txmicroblog/i)) == "txmicroblog") {
            return "txmicroblog";
        }
        else if (("" + ua.match(/douban/i)) == "douban") {
            return "douban";
        }
        else {
            return "other";
        }
    }
    GameConfig.platformType = platformType;
    //当前舞台
    function curStage() {
        return egret.MainContext.instance.stage;
    }
    GameConfig.curStage = curStage;
    //当前游戏宽度
    function curWidth() {
        return egret.MainContext.instance.stage.stageWidth;
    }
    GameConfig.curWidth = curWidth;
    //当前游戏宽度
    function curHeight() {
        return egret.MainContext.instance.stage.stageHeight;
    }
    GameConfig.curHeight = curHeight;
    GameConfig.time_config = {
        500: 500,
        200: 100,
        100: 100,
        1000: 1000,
        300: 300,
        400: 400,
    };
    GameConfig.MUSIC_NAME = "music_flag";
    GameConfig.SOUND_NAME = "sound_flag";
    GameConfig.SOUND_VOMULE = "sound_vomule";
    GameConfig.EFFECT_VOMULE = "effect_vomule";
    GameConfig.DEFUALT_NAME = "login_name2";
})(GameConfig || (GameConfig = {}));
