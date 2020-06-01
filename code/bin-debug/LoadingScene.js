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
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        var _this = _super.call(this) || this;
        _this.totalLoader = 0;
        _this.currentLoader = 0;
        if (LoadingScene._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new LoadingSkin();
        return _this;
    }
    ;
    Object.defineProperty(LoadingScene, "instance", {
        get: function () {
            if (!LoadingScene._instance) {
                LoadingScene._instance = new LoadingScene();
            }
            return LoadingScene._instance;
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
    LoadingScene.prototype.load = function (resGroup, bgSource, callback) {
        this.resGroups = resGroup;
        this.totalLoader = RESUtils.getGroupTotal(this.resGroups);
        this.currentLoader = 0;
        this.resGroups = resGroup;
        this.callback = callback;
        this.loadingbg.source = RES.getRes(bgSource);
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    LoadingScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    /**
     * 开始加载资源
     */
    LoadingScene.prototype.beganLoadResGroup = function () {
        this.resGroup = RESUtils.combGroupName(this.resGroup);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    LoadingScene.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            if (this.resGroups.length > 0) {
                this.beganLoadResGroup();
            }
            else {
                this.onResourceLoadOver();
            }
        }
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    LoadingScene.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.progressBar.scaleX = rate / 100;
        }
    };
    LoadingScene.prototype.onResourceLoadOver = function () {
        game.UIUtils.removeFromParent(this);
        this.callback && this.callback();
    };
    return LoadingScene;
}(game.BaseComponent));
__reflect(LoadingScene.prototype, "LoadingScene");
