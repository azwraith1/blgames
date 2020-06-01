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
var game;
(function (game) {
    var LogoMediator = (function (_super) {
        __extends(LogoMediator, _super);
        function LogoMediator() {
            var _this = _super.call(this, LogoMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        LogoMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_LOADING,
                SceneNotify.CLOSE_LOADING
            ];
        };
        /**
         * 这里是注册的意思
         */
        LogoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new UserHeaderMediator());
        };
        LogoMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            var webviewType = game.Utils.getURLQueryString("webview");
            var gid = game.Utils.getURLQueryString("gid");
            var scene = game.Utils.getURLQueryString("scene");
            if (webviewType == "app" && gid == "slot" && scene != undefined) {
                this.viewComponent = new BaseSlotLoadingScene(scene);
            }
            else {
                this.viewComponent = new game.LogoScene();
            }
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LogoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_LOADING:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_LOADING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LogoMediator.NAME = "LogoMediator";
        return LogoMediator;
    }(BaseMediator));
    game.LogoMediator = LogoMediator;
    __reflect(LogoMediator.prototype, "game.LogoMediator");
})(game || (game = {}));
