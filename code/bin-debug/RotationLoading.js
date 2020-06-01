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
/**
 * 场景转换时候的资源加载
 */
var RotationLoading = (function (_super) {
    __extends(RotationLoading, _super);
    function RotationLoading() {
        var _this = _super.call(this) || this;
        if (RotationLoading._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new RotationLoadingSkin();
        return _this;
    }
    Object.defineProperty(RotationLoading, "instance", {
        get: function () {
            if (!RotationLoading._instance) {
                RotationLoading._instance = new RotationLoading();
            }
            return RotationLoading._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 加载资源组名，背景图片，回调
     * @param  {string} resGroup
     * @param  {string} bgSource
     * @param  {Function} callback
     */
    RotationLoading.prototype.load = function (resGroup, bgSource, callback, zOrder) {
        if (zOrder === void 0) { zOrder = 0; }
        this.zOrder = zOrder;
        game.UIUtils.changeResize(1);
        this.groupName = RESUtils.combGroupName(resGroup);
        if (RES.isGroupLoaded(this.groupName)) {
            game.UIUtils.removeFromParent(this);
            RotationLoading._instance = null;
            callback && callback();
            return;
        }
        this.progressLabel.text = "0%";
        egret.Tween.removeTweens(this);
        egret.Tween.get(this.rotationImage, { loop: true }).to({
            rotation: this.rotationImage.rotation - 360
        }, 1500);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    /**
    * 开始加载资源
    */
    RotationLoading.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.groupName, this.zOrder);
    };
    RotationLoading.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    RotationLoading.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.callback = null;
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                egret.Tween.removeTweens(this.rotationImage);
                game.UIUtils.removeFromParent(this);
                RotationLoading._instance = null;
                break;
        }
    };
    RotationLoading.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.groupName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    RotationLoading.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.groupName) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.progressLabel.text = rate + "%";
        }
    };
    RotationLoading.prototype.onResourceLoadOver = function () {
        egret.Tween.removeTweens(this.rotationImage);
        game.UIUtils.removeFromParent(this);
        RotationLoading._instance = null;
        this.callback && this.callback();
    };
    return RotationLoading;
}(game.BaseComponent));
__reflect(RotationLoading.prototype, "RotationLoading");
