var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FrameUtils = (function () {
    function FrameUtils() {
    }
    FrameUtils.iframeload = function () {
        var isOk = true;
        if (window.parent) {
            try {
                window.parent['checkSafiraStart']; //如果跨域就报错
            }
            catch (e) {
                console.log("关闭上滑全屏");
                isOk = false;
            }
        }
        this.iframeIsOk = isOk;
    };
    FrameUtils.postMessage = function (msg) {
        if (!FrameUtils.iframeIsOk) {
            return;
        }
        if (!window.parent) {
            return;
        }
        if (FrameUtils.isError) {
            return;
        }
        // if(GameConfig.CURRENT_ISSHU){
        // 	return;
        // }
        try {
            if (window.parent && window.parent['showTips']) {
                window.parent['showTips'](msg);
                return;
            }
        }
        catch (e) {
            FrameUtils.isError = true;
        }
    };
    FrameUtils.checkSafariStart = function () {
        if (!FrameUtils.iframeIsOk) {
            return;
        }
        if (FrameUtils.isError) {
            return;
        }
        try {
            if (window.parent && window.parent['checkSafiraStart']) {
                window.parent['checkSafiraStart']();
                return true;
            }
            return false;
        }
        catch (e) {
            FrameUtils.isError = true;
            return false;
        }
    };
    FrameUtils.showTips = function (msg) {
        if (!FrameUtils.iframeIsOk) {
            return;
        }
        if (FrameUtils.isError) {
            return;
        }
        try {
            if (window.parent && window.parent['showTips']) {
                window.parent['showTips'](msg);
                return true;
            }
            return false;
        }
        catch (e) {
            FrameUtils.isError = true;
            return false;
        }
    };
    FrameUtils.tipsToggle = function () {
        if (!FrameUtils.iframeIsOk) {
            return;
        }
        if (FrameUtils.isError) {
            return;
        }
        try {
            if (window.parent && window.parent['toggle']) {
                window.parent['toggle']();
                return true;
            }
            return false;
        }
        catch (e) {
            FrameUtils.isError = true;
            return false;
        }
    };
    FrameUtils.iphoneXScreen = function (width, height) {
        if (width == 1280 && (height >= 735 && height <= 780)) {
            this.showTips(0);
        }
        else if (width == 1436 && height == 720) {
            this.showTips(1);
        }
        else if (width == 1468 && height == 720) {
            this.showTips(1);
        }
        else if (width == 1594 && height == 720) {
            this.showTips(0);
        }
        else if ((width >= 1630 && width <= 1740) && height == 720) {
            this.showTips(0);
        }
        else if ((width >= 1570 && width <= 1630) && height == 720) {
            this.showTips(0);
        }
        else {
            this.showTips(1);
        }
    };
    FrameUtils.flushWindow = function () {
        // if (FrameUtils.isError) {
        // 	return;
        // }
        if (window.parent) {
            window.location.reload();
            // window.parent.location.href = window.parent.location.href;
        }
        else {
            window.location.reload();
        }
    };
    FrameUtils.goRecharge = function () {
        if (ServerConfig.RECHARGE_URL && ServerConfig.RECHARGE_URL != "null") {
            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(72), function () {
                window.open(ServerConfig.RECHARGE_URL);
            }, null);
        }
    };
    FrameUtils.goHome = function () {
        if (ServerConfig.HOME_PAGE_URL && ServerConfig.HOME_PAGE_URL != "null") {
            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(73), function () {
                window.open(ServerConfig.HOME_PAGE_URL);
            }, null);
        }
    };
    FrameUtils.eventResize = function () {
        var _this = this;
        GameConfig.WINSIZE_WIDTH = GameConfig.curStage().stageWidth;
        GameConfig.WINSIZE_HEIGHT = GameConfig.curStage().stageHeight;
        var beforeData = { wBili: GameConfig.WINSIZE_BILI_WIDTH, hBili: GameConfig.WINSIZE_BILI_HEIGHT };
        GameConfig.WINSIZE_BILI_WIDTH = GameConfig.WINSIZE_WIDTH / 1280;
        GameConfig.WINSIZE_BILI_HEIGHT = GameConfig.WINSIZE_HEIGHT / 720;
        CF.dP(ENo.EVENT_RESIZE, beforeData);
        if (this.resetZise) {
            egret.clearTimeout(this.resetZise);
            this.resetZise = null;
        }
        this.resetZise = egret.setTimeout(function () {
            GameConfig.CURRENT_WIDTH = GameConfig.curStage().stageWidth;
            GameConfig.CURRENT_HEIGHT = GameConfig.curStage().stageHeight;
            _this.resetZise = null;
        }, this, 500);
    };
    FrameUtils.changeBgImage = function (image) {
        if (NativeApi.instance.IsPC) {
            if (image) {
                document.getElementById("bgDiv").style.cssText = "background:url(" + image + ") no-repeat scroll center center/cover rgba(0, 0, 0, .1);";
                document.getElementById("bgDiv").style.display = "";
                // 
            }
            else {
                document.getElementById("bgDiv").style.cssText = "";
                document.getElementById("bgDiv").style.display = "none";
            }
        }
    };
    FrameUtils.isError = false;
    FrameUtils.topFrame = "http://192.168.2.5:9023";
    FrameUtils.iframeIsOk = false;
    return FrameUtils;
}());
__reflect(FrameUtils.prototype, "FrameUtils");
