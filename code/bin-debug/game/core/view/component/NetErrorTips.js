var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var NetErrorTips = (function (_super) {
    __extends(NetErrorTips, _super);
    function NetErrorTips() {
        var _this = _super.call(this) || this;
        if (GameConfig.CURRENT_ISSHU && AlertShuSkin) {
            _this.skinName = new AlertShuSkin();
            return _this;
        }
        _this.skinName = new AlertSkin();
        return _this;
    }
    Object.defineProperty(NetErrorTips, "instance", {
        get: function () {
            if (!NetErrorTips._instance) {
                NetErrorTips._instance = new NetErrorTips();
                NetErrorTips._instance.name = "NetErrorTips";
                NetErrorTips._instance.visible = false;
                GameLayerManager.gameLayer().maskLayer.addChild(NetErrorTips._instance);
            }
            return NetErrorTips._instance;
        },
        enumerable: true,
        configurable: true
    });
    NetErrorTips.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.btnNo.visible = false;
        this.btnOk.horizontalCenter = 0;
        this.btnOk.addEventListener(egret.TouchEvent.TOUCH_END, this.btnOkTouch, this);
        this.tipsImage.source = RES.getRes("alert_wz" + CF.tic);
        this.btnOk.labelDisplay.text = TextUtils.instance.getCurrentTextById(83);
        this.btnNo.labelDisplay.text = TextUtils.instance.getCurrentTextById(104);
    };
    NetErrorTips.prototype.show = function (content) {
        this.labelTxt.text = content;
        this.visible = true;
    };
    NetErrorTips.prototype.hide = function () {
        this.visible = false;
    };
    NetErrorTips.prototype.btnOkTouch = function () {
        FrameUtils.flushWindow();
    };
    return NetErrorTips;
}(game.BaseComponent));
__reflect(NetErrorTips.prototype, "NetErrorTips");
