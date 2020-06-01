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
/*
 * @Author: wangtao
 * @Date: 2019-05-08 11:04:16
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-05-08 11:46:32
 * @Description:
 */
// TypeScript file
var CBZZLoading = (function (_super) {
    __extends(CBZZLoading, _super);
    function CBZZLoading() {
        var _this = _super.call(this) || this;
        if (CBZZLoading._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new CBZZLaodingSkin();
        return _this;
    }
    Object.defineProperty(CBZZLoading, "instance", {
        get: function () {
            if (!CBZZLoading._instance) {
                CBZZLoading._instance = new CBZZLoading();
            }
            return CBZZLoading._instance;
        },
        enumerable: true,
        configurable: true
    });
    CBZZLoading.prototype.load = function (resGroup, callback) {
        this.resGroup = RESUtils.combGroupName(resGroup);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    CBZZLoading.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    CBZZLoading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.clickDb = DBComponent.create("cbzz_click", "click");
        this.clickDb.x = 250;
        this.clickDb.y = 0;
        this.clickGroup.addChild(this.clickDb);
        this.clickDb.resetPosition();
    };
    CBZZLoading.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    CBZZLoading.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    };
    CBZZLoading.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.processBar.width = rate / 100 * 762;
            this.percentLabel.text = "正在加载..." + rate + "%";
        }
    };
    CBZZLoading.prototype.onResourceLoadOver = function () {
        this.loadingBarGroup.visible = false;
        this.clickGroup.visible = true;
        this.showClickAni();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterCBZZ, this);
    };
    CBZZLoading.prototype.showClickAni = function () {
        var _this = this;
        this.clickStart.alpha = 1;
        egret.Tween.get(this.clickStart).to({ alpha: 0 }, 2000).call(function () {
            _this.clickDb.play("", 1);
        });
        this.clickDb.callback = function () {
            return _this.showClickAni();
        };
    };
    CBZZLoading.prototype.enterCBZZ = function () {
        this.callback && this.callback();
        game.UIUtils.removeFromParent(this);
        CBZZLoading._instance = null;
        this.clickStart.alpha = 1;
    };
    return CBZZLoading;
}(game.BaseComponent));
__reflect(CBZZLoading.prototype, "CBZZLoading");
