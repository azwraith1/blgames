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
 * @Author: real MC Lee
 * @Date: 2019-07-01 18:19:50
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-16 14:51:40
 * @Description:
 */
var SlotLoadingScene = (function (_super) {
    __extends(SlotLoadingScene, _super);
    function SlotLoadingScene(name) {
        var _this = _super.call(this) || this;
        _this.isQuited = false; //是否loading时退出
        _this.name = name;
        try {
            _this.skinName = name;
        }
        catch (error) {
            LogUtils.logE("皮肤" + name + "bucunzai");
        }
        //添加进度遮罩
        switch (_this.name) {
            case "GDZWLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 56);
                _this.processBar.mask = _this.maskRect;
                break;
            case "CSDLoadingsSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 26);
                _this.processBar.mask = _this.maskRect;
                break;
            case "SGWSLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 55);
                _this["processBar2"].mask = _this.maskRect;
                break;
            case "SNYXLoadingSkin":
                _this.maskRect = new egret.Rectangle(0, 0, 0, 21);
                _this["processBar2"].mask = _this.maskRect;
                break;
        }
        return _this;
    }
    SlotLoadingScene.getInstance = function (skinName) {
        if (!SlotLoadingScene._instance) {
            SlotLoadingScene._instance = new SlotLoadingScene(skinName);
        }
        return SlotLoadingScene._instance;
    };
    /**
     * 需要加载的资源组
     * @param  {string} resGroup
     * @param  {Function} callback
     */
    SlotLoadingScene.prototype.load = function (resGroup, callback) {
        if (RES.isGroupLoaded(resGroup)) {
            this.loadingBarGroup.visible = false;
        }
        else {
            this.loadingBarGroup.visible = true;
        }
        this.resGroup = RESUtils.combGroupName(resGroup);
        this.callback = callback;
        GameLayerManager.gameLayer().loadLayer.addChild(this);
        this.beganLoadResGroup();
    };
    SlotLoadingScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    SlotLoadingScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.quitBtn:
                if (ServerConfig.OP_RETURN_TYPE == "2") {
                    var alert_1 = new game.AlertPanel("");
                    alert_1.tipsText = "是否确定返回平台？";
                    alert_1.okCallback = function () { window.open(ServerConfig.HOME_PAGE_URL); };
                    alert_1.noCallback = function () { game.UIUtils.removeSelf(alert_1); };
                    this.resizeGroup.addChild(alert_1);
                    return;
                }
                else {
                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                    this.isQuited = true;
                    game.UIUtils.removeFromParent(this);
                    SlotLoadingScene._instance = null;
                    // this.clickStart.alpha = 1;
                }
                break;
        }
    };
    SlotLoadingScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (ServerConfig.OP_RETURN_TYPE == "3") {
            this.quitBtn.visible = false;
        }
        this.clickDb = DBComponent.create("cbzz_click", "click");
        this.clickDb.x = 250;
        this.clickDb.y = 0;
        this.clickGroup.addChild(this.clickDb);
        this.clickDb.resetPosition();
    };
    /**
     * 资源加载开始
     */
    SlotLoadingScene.prototype.beganLoadResGroup = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resGroup);
    };
    /**
     * 资源加载完成移除监听
     * @param  {RES.ResourceEvent} e
     */
    SlotLoadingScene.prototype.onResourceLoadComplete = function (e) {
        if (e.groupName == this.resGroup) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.onResourceLoadOver();
        }
    };
    /**
     * 资源加载进度条
     * @param  {RES.ResourceEvent} e
     */
    SlotLoadingScene.prototype.onResourceProgress = function (e) {
        if (e.groupName == this.resGroup) {
            var rate = Math.floor(e.itemsLoaded / e.itemsTotal * 100);
            switch (this.name) {
                case "DNTGLoadingSkin":
                    this.processBar.width = rate / 100 * 629;
                    break;
                case "SDXLLoadingSkin":
                    this.processBar.width = rate / 100 * 679;
                    break;
                case "SDMNLoadingSkin":
                    this.processBar.width = rate / 100 * 996;
                    break;
                case "CBZZLaodingSkin":
                    this.processBar.width = rate / 100 * 762;
                    break;
                case "BSKGLoadingSkin":
                    this.processBar.width = rate / 100 * 866;
                    break;
                case "RDSGLoadingSkin":
                    this.processBar.width = rate / 100 * 740;
                    break;
                case "AYLSLoadingSkin":
                    this.processBar.width = rate / 100 * 717;
                    break;
                case "GDZWLoadingSkin":
                    this.maskRect.width = rate / 100 * 721;
                    this.processBar.mask = this.maskRect;
                    break;
                case "BSCSLoadingSkin":
                    this.processBar.width = rate / 100 * 851;
                    break;
                case "CEBYLoadingSkin":
                    this.processBar.width = rate / 100 * 607;
                    break;
                case "ZCJLLoadingSkin":
                    this.processBar.width = rate / 100 * 941;
                    break;
                case "WSZWLoadingSkin":
                    this.processBar.width = rate / 100 * 935;
                    break;
                case "Lucky7LoadingSkin":
                    this.processBar.width = rate / 100 * 700;
                    break;
                case "CSDLoadingsSkin":
                    this.maskRect.width = rate / 100 * 795;
                    this.processBar.mask = this.maskRect;
                    break;
                case "XYSGLoadingSkin":
                    this.processBar.width = rate / 100 * 713;
                    break;
                case "XCBSLoadingSkin":
                    this.processBar.width = rate / 100 * 800;
                    break;
                case "SGWSLoadingSkin":
                    this.processBar.x = rate / 100 * 669;
                    this.maskRect.width = rate / 100 * 690;
                    this["processBar2"].mask = this.maskRect;
                    break;
                case "SNYXLoadingSkin":
                    this.processBar.x = rate / 100 * 826 - 6;
                    this.maskRect.width = rate / 100 * 826;
                    this["processBar2"].mask = this.maskRect;
                    break;
            }
            if (this.percentLabel) {
                if (this.percentLabel instanceof eui.BitmapLabel)
                    this.percentLabel.text = rate + "%";
                else
                    this.percentLabel.text = "正在加载..." + rate + "%";
            }
        }
    };
    /**
     * 资源加载完成
     */
    SlotLoadingScene.prototype.onResourceLoadOver = function () {
        if (this.isQuited)
            return;
        // game.releaseSlotRes.destoryLoadingScene();
        if (isFired)
            return;
        this.isQuited = true;
        this.loadingBarGroup.visible = false;
        this.clickGroup.visible = true;
        if (this.name == "SDMNLoadingSkin") {
            this.maskImag.visible = true;
            this.processBar.width = 996;
            this.clickDb.x = 640;
            this.clickDb.y = 50;
        }
        else if (this.name == "SGWSLoadingSkin") {
            this.processBar.x = 0;
        }
        else if (this.name == "SGWSLoadingSkin") {
            this.processBar.x = -6;
        }
        this.enterCBZZ();
    };
    /**
     * 展示点击开始动画
     */
    SlotLoadingScene.prototype.showClickAni = function () {
        var _this = this;
        GameConst.LOAD_INDEX = 0;
        this.clickStart.alpha = 1;
        egret.Tween.get(this.clickStart).to({ alpha: 0 }, 2000).call(function () {
            _this.clickDb.play("", 1);
        });
        this.clickDb.callback = function () {
            return _this.showClickAni();
        };
    };
    /**
     * 进入加载完成的游戏
     */
    SlotLoadingScene.prototype.enterCBZZ = function () {
        this.callback && this.callback();
        game.UIUtils.removeFromParent(this);
        SlotLoadingScene._instance = null;
        // this.clickStart.alpha = 1;
    };
    return SlotLoadingScene;
}(game.BaseComponent));
__reflect(SlotLoadingScene.prototype, "SlotLoadingScene");
var SLOT_LOADING_SKIN = {
    dntg: "DNTGLoadingSkin",
    sdxl: "SDXLLoadingSkin",
    cbzz: "CBZZLaodingSkin",
    sdmn: "SDMNLoadingSkin",
    bskg: "BSKGLoadingSkin",
    rdsg: "RDSGLoadingSkin",
    ayls: "AYLSLoadingSkin",
    gdzw: "GDZWLoadingSkin",
    bscs: "BSCSLoadingSkin",
    ceby: "CEBYLoadingSkin",
    xyxm: "XYXMLoadingSkin",
    zcjl: "ZCJLLoadingSkin",
    wszw: "WSZWLoadingSkin",
    lucky7: "Lucky7LoadingSkin",
    csd: "CSDLoadingsSkin",
    xysg: "XYSGLoadingSkin",
    xcbs: "XCBSLoadingSkin",
    sgws: "SGWSLoadingSkin",
    snyx: "SNYXLoadingSkin"
};
var isFired = false;
