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
var ayls;
(function (ayls) {
    var AYLSMainMediator = (function (_super) {
        __extends(AYLSMainMediator, _super);
        function AYLSMainMediator() {
            var _this = _super.call(this, AYLSMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        AYLSMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_AYLS,
                SceneNotify.CLOSE_AYLS
            ];
        };
        AYLSMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new ayls.AYLSTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new ayls.AYLSAutoMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
        };
        AYLSMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new ayls.AYLSMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        AYLSMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_AYLS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_AYLS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        AYLSMainMediator.NAME = "AYLSMainMediator";
        return AYLSMainMediator;
    }(BaseMediator));
    ayls.AYLSMainMediator = AYLSMainMediator;
    __reflect(AYLSMainMediator.prototype, "ayls.AYLSMainMediator");
})(ayls || (ayls = {}));
