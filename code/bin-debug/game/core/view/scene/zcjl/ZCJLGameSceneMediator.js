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
var zcjl;
(function (zcjl) {
    var ZCJLMainMediator = (function (_super) {
        __extends(ZCJLMainMediator, _super);
        function ZCJLMainMediator() {
            var _this = _super.call(this, ZCJLMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ZCJLMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ZCJL,
                SceneNotify.CLOSE_ZCJL
            ];
        };
        ZCJLMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new zcjl.ZCJLAutogameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        ZCJLMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new zcjl.ZCJLGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ZCJLMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_ZCJL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_ZCJL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ZCJLMainMediator.NAME = "ZCJLMainMediator";
        return ZCJLMainMediator;
    }(BaseMediator));
    zcjl.ZCJLMainMediator = ZCJLMainMediator;
    __reflect(ZCJLMainMediator.prototype, "zcjl.ZCJLMainMediator");
})(zcjl || (zcjl = {}));
