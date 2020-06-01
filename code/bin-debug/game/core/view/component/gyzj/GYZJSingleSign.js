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
var GYZJSingleSign = (function (_super) {
    __extends(GYZJSingleSign, _super);
    function GYZJSingleSign() {
        var _this = _super.call(this) || this;
        _this.skinName = "GYZJSingleSignSkin";
        return _this;
    }
    GYZJSingleSign.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    GYZJSingleSign.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    // public initDB() {
    // 	this.initchickDB(this.chongDB);
    // 	this.initchickDB(this.zeDB);
    // }
    /**1 冲锋鸡 2责任鸡 */
    GYZJSingleSign.prototype.setChickType = function (type) {
        var res = null;
        switch (type) {
            case 1:
                res = "gyzj_game_chong_png";
                break;
            case 2:
                res = "gyzj_game_ze_png";
                break;
        }
        this.chickenImg.source = RES.getRes(res);
        //	LogUtils.logD("RES NAME===" + res, "是否有资源" + this.chickenImg.source);
    };
    /**
    *鸡牌的一个动画
    * @param  {eui.Component} penggang
    * @param  {} x
    * @param  {} y
    */
    GYZJSingleSign.prototype.chickDB = function (name, afterfinish, thisobj) {
        var db = new DBComponent(name);
        db.callback = function () {
            if (afterfinish)
                afterfinish.call(thisobj);
            game.UIUtils.removeSelf(db);
            db = null;
        };
        this.addChild(db);
        db.playByFilename(1);
        // db.resetPosition();
        db.scaleX = 0.9;
        db.scaleY = 0.9;
        db.x = 20;
        db.y = 10;
    };
    return GYZJSingleSign;
}(eui.Component));
__reflect(GYZJSingleSign.prototype, "GYZJSingleSign", ["eui.UIComponent", "egret.DisplayObject"]);
