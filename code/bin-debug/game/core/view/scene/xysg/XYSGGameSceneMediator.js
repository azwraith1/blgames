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
var xysg;
(function (xysg) {
    var XYSGMainMediator = (function (_super) {
        __extends(XYSGMainMediator, _super);
        function XYSGMainMediator() {
            var _this = _super.call(this, XYSGMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XYSGMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_XYSG,
                SceneNotify.CLOSE_XYSG
            ];
        };
        XYSGMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new xysg.XYSGAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        XYSGMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new xysg.XYSGGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XYSGMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_XYSG:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_XYSG:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XYSGMainMediator.NAME = "XYSGMainMediator";
        return XYSGMainMediator;
    }(BaseMediator));
    xysg.XYSGMainMediator = XYSGMainMediator;
    __reflect(XYSGMainMediator.prototype, "xysg.XYSGMainMediator");
})(xysg || (xysg = {}));
