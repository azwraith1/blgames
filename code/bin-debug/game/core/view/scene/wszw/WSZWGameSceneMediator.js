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
var wszw;
(function (wszw) {
    var WSZWMainMediator = (function (_super) {
        __extends(WSZWMainMediator, _super);
        function WSZWMainMediator() {
            var _this = _super.call(this, WSZWMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        WSZWMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_WSZW,
                SceneNotify.CLOSE_WSZW
            ];
        };
        WSZWMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new wszw.WSZWAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        WSZWMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new wszw.WSZWGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        WSZWMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_WSZW:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_WSZW:
                    this.closeViewComponent(1);
                    break;
            }
        };
        WSZWMainMediator.NAME = "WSZWMainMediator";
        return WSZWMainMediator;
    }(BaseMediator));
    wszw.WSZWMainMediator = WSZWMainMediator;
    __reflect(WSZWMainMediator.prototype, "wszw.WSZWMainMediator");
})(wszw || (wszw = {}));
