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
var lucky7;
(function (lucky7) {
    var LUCKY7MainMediator = (function (_super) {
        __extends(LUCKY7MainMediator, _super);
        function LUCKY7MainMediator() {
            var _this = _super.call(this, LUCKY7MainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        LUCKY7MainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_LUCKY7,
                SceneNotify.CLOSE_LUCKY7
            ];
        };
        LUCKY7MainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new lucky7.LUCKY7AutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        LUCKY7MainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new lucky7.LUCKY7GameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LUCKY7MainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_LUCKY7:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_LUCKY7:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LUCKY7MainMediator.NAME = "LUCKY7MainMediator";
        return LUCKY7MainMediator;
    }(BaseMediator));
    lucky7.LUCKY7MainMediator = LUCKY7MainMediator;
    __reflect(LUCKY7MainMediator.prototype, "lucky7.LUCKY7MainMediator");
})(lucky7 || (lucky7 = {}));
