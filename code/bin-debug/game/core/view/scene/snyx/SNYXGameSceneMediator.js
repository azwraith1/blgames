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
var snyx;
(function (snyx) {
    var SNYXMainMediator = (function (_super) {
        __extends(SNYXMainMediator, _super);
        function SNYXMainMediator() {
            var _this = _super.call(this, SNYXMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SNYXMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SNYX,
                SceneNotify.CLOSE_SNYX
            ];
        };
        SNYXMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new snyx.SNYXTipsPanelMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new snyx.SNYXAutoGameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        SNYXMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new snyx.SNYXGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SNYXMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SNYX:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SNYX:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SNYXMainMediator.NAME = "SNYXMainMediator";
        return SNYXMainMediator;
    }(BaseMediator));
    snyx.SNYXMainMediator = SNYXMainMediator;
    __reflect(SNYXMainMediator.prototype, "snyx.SNYXMainMediator");
})(snyx || (snyx = {}));
