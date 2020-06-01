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
  * 游戏容器类
  * 框架显示对象层级
  * Main-GameScene（sceneLayer、mainLayer、popLayer、effectLayer、maskLayer、loadLayer）
  *
  */
var GameLayerManager = (function (_super) {
    __extends(GameLayerManager, _super);
    // public hotBar
    //构造方法
    function GameLayerManager() {
        var _this = _super.call(this) || this;
        // 场景层 如 战场、主城、副本战场之类的
        _this.sceneLayer = new eui.UILayer();
        // 主UI层 如 底部功能栏
        _this.mainLayer = new eui.UILayer();
        // 弹窗层 如 设置、背包、装备之类的
        _this.panelLayer = new eui.UILayer();
        // 特效层 如 闪烁、飘字之类的
        _this.effectLayer = new eui.UILayer();
        // 通讯遮罩层 和服务器通讯UI
        _this.maskLayer = new eui.UILayer();
        //弹窗层
        _this.tipsLayer = new eui.UILayer();
        // 加载遮罩层 场景切换的时候加载资源UI
        _this.loadLayer = new eui.UILayer();
        _this.init();
        return _this;
    }
    //游戏容器管理器单例
    GameLayerManager.gameLayer = function () {
        if (!this._instance) {
            this._instance = new GameLayerManager();
        }
        return this._instance;
    };
    //初始化场景类
    GameLayerManager.prototype.init = function () {
        this.touchThrough = true;
        this.sceneLayer.touchThrough = true;
        this.mainLayer.touchThrough = true;
        this.panelLayer.touchThrough = true;
        this.effectLayer.touchThrough = true;
        this.maskLayer.touchThrough = true;
        this.tipsLayer.touchThrough = true;
        this.loadLayer.touchThrough = true;
        this.addChild(this.sceneLayer);
        this.addChild(this.mainLayer);
        this.addChild(this.panelLayer);
        this.addChild(this.effectLayer);
        this.addChild(this.maskLayer);
        this.addChild(this.tipsLayer);
        this.addChild(this.loadLayer);
        Toast.init(this.effectLayer);
        if (ServerConfig.PATH_CONFIG.debug_model) {
            var label = new eui.Label("断开连接");
            label.size = 30;
            label.addEventListener(egret.TouchEvent.TOUCH_END, this.labelTouchEnded, this);
            this.loadLayer.addChild(label);
        }
    };
    GameLayerManager.prototype.createNetStatus = function () {
        this.netStatus = new NetStatus();
    };
    Object.defineProperty(GameLayerManager.prototype, "hotBar", {
        get: function () {
            if (!this.hotHallBar) {
                this.hotHallBar = new HotHallBar();
                var ui_a = game.Utils.getURLQueryString("ui_a");
                if (ui_a == "1") {
                    this.hotHallBar.visible = false;
                }
            }
            return this.hotHallBar;
        },
        enumerable: true,
        configurable: true
    });
    GameLayerManager.prototype.showPingTime = function () {
        if (this.netStatus) {
            this.netStatus.changePings(game.PomeloManager.instance.ping);
        }
    };
    GameLayerManager.prototype.labelTouchEnded = function () {
        Global.pomelo.disConnect();
    };
    return GameLayerManager;
}(eui.UILayer));
__reflect(GameLayerManager.prototype, "GameLayerManager");
