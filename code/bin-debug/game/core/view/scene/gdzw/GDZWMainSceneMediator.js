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
var gdzw;
(function (gdzw) {
    var GDZWMainMediator = (function (_super) {
        __extends(GDZWMainMediator, _super);
        function GDZWMainMediator() {
            var _this = _super.call(this, GDZWMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GDZWMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GDZW,
                SceneNotify.CLOSE_GDZW
            ];
        };
        GDZWMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new gdzw.GDZWTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new gdzw.GDZWAutoGameSetMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
        };
        GDZWMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new gdzw.GDZWMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GDZWMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_GDZW:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_GDZW:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GDZWMainMediator.NAME = "GDZWMainMediator";
        return GDZWMainMediator;
    }(BaseMediator));
    gdzw.GDZWMainMediator = GDZWMainMediator;
    __reflect(GDZWMainMediator.prototype, "gdzw.GDZWMainMediator");
})(gdzw || (gdzw = {}));
