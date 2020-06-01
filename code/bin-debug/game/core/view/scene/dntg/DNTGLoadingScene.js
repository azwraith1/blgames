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
var DNTGLoadingScene = (function (_super) {
    __extends(DNTGLoadingScene, _super);
    function DNTGLoadingScene() {
        var _this = _super.call(this) || this;
        if (DNTGLoadingScene._instance) {
            throw new Error("SceneLoading使用单例");
        }
        _this.skinName = new DNTGLoadingSkin();
        return _this;
    }
    Object.defineProperty(DNTGLoadingScene, "instance", {
        get: function () {
            if (!DNTGLoadingScene._instance) {
                DNTGLoadingScene._instance = new DNTGLoadingScene();
            }
            return DNTGLoadingScene._instance;
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
    DNTGLoadingScene.prototype.load = function (resGroup, callback) {
        this.resGroup = RESUtils.combGroupName(resGroup);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    DNTGLoadingScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var isPC = NativeApi.instance.IsPC();
        if (isPC) {
            mouse.enable(this.stage);
        }
        this.clickDb = DBComponent.create("dntg_click", "click");
        this.clickDb.y = 80;
        this.clickDb.x = 250;
        this.clickGroup2.addChild(this.clickDb);
        this.clickDb.resetPosition();
    };
    /**
     * 开始加载资源
     */
    DNTGLoadingScene.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    DNTGLoadingScene.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
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
    DNTGLoadingScene.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            this.progressBar.width = (rate / 100) * 629;
        }
    };
    DNTGLoadingScene.prototype.onResourceLoadOver = function () {
        this.tipLabel.visible = this.m_pProgressGroup.visible = false;
        this.clickIma.visible = this.startText.visible = true;
        this.showClickAni();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterDNTG, this);
    };
    DNTGLoadingScene.prototype.showClickAni = function () {
        var _this = this;
        this.startText.alpha = 1;
        egret.Tween.get(this.startText).to({ alpha: 0 }, 2000).call(function () {
            _this.clickDb.play("", 1);
        });
        this.clickDb.callback = function () {
            return _this.showClickAni();
        };
    };
    DNTGLoadingScene.prototype.enterDNTG = function () {
        this.callback && this.callback();
        game.UIUtils.removeFromParent(this);
        DNTGLoadingScene._instance = null;
        this.startText.alpha = 1;
    };
    return DNTGLoadingScene;
}(game.BaseComponent));
__reflect(DNTGLoadingScene.prototype, "DNTGLoadingScene");
