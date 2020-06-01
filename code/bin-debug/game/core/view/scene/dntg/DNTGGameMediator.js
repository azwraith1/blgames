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
// TypeScript file
var game;
(function (game) {
    var DNTGGameMediator = (function (_super) {
        __extends(DNTGGameMediator, _super);
        function DNTGGameMediator() {
            var _this = _super.call(this, DNTGGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        DNTGGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_DNTG,
                SceneNotify.CLOSE_DNTG
            ];
        };
        DNTGGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.TipsPanelMediator());
        };
        DNTGGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new dntg.DNTGMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DNTGGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_DNTG:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_DNTG:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DNTGGameMediator.NAME = "DNTGGameMediator";
        return DNTGGameMediator;
    }(BaseMediator));
    game.DNTGGameMediator = DNTGGameMediator;
    __reflect(DNTGGameMediator.prototype, "game.DNTGGameMediator");
})(game || (game = {}));
