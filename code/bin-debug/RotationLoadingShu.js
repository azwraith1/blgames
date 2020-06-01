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
var RotationLoadingShu = (function (_super) {
    __extends(RotationLoadingShu, _super);
    function RotationLoadingShu() {
        var _this = _super.call(this) || this;
        _this.zOrder = 0;
        if (RotationLoadingShu._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new RotationLoadingShuSkin();
        return _this;
    }
    Object.defineProperty(RotationLoadingShu, "instance", {
        get: function () {
            if (!RotationLoadingShu._instance) {
                RotationLoadingShu._instance = new RotationLoadingShu();
            }
            return RotationLoadingShu._instance;
        },
        enumerable: true,
        configurable: true
    });
    RotationLoadingShu.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    RotationLoadingShu.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    /**
     * 加载资源组名，背景图片，回调
     * @param  {string} resGroup
     * @param  {string} bgSource
     * @param  {Function} callback
     */
    RotationLoadingShu.prototype.load = function (resGroup, bgSource, callback, zOrder) {
        if (zOrder === void 0) { zOrder = 0; }
        game.UIUtils.changeResize(2);
        this.zOrder = zOrder;
        this.groupName = RESUtils.combGroupName(resGroup);
        if (RES.isGroupLoaded(this.groupName)) {
            game.UIUtils.removeFromParent(this);
            RotationLoadingShu._instance = null;
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
    RotationLoadingShu.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 开始加载资源
     */
    RotationLoadingShu.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.groupName, this.zOrder);
    };
    RotationLoadingShu.prototype.onResourceLoadComplete = function (e) {
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
    RotationLoadingShu.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.groupName) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.progressLabel.text = rate + "%";
        }
    };
    RotationLoadingShu.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.callback = null;
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                egret.Tween.removeTweens(this.rotationImage);
                game.UIUtils.removeFromParent(this);
                RotationLoadingShu._instance = null;
                break;
        }
    };
    RotationLoadingShu.prototype.onResourceLoadOver = function () {
        egret.Tween.removeTweens(this.rotationImage);
        game.UIUtils.removeFromParent(this);
        RotationLoadingShu._instance = null;
        this.callback && this.callback();
    };
    return RotationLoadingShu;
}(game.BaseComponent));
__reflect(RotationLoadingShu.prototype, "RotationLoadingShu");
