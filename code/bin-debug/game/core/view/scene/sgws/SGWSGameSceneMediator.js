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
var sgws;
(function (sgws) {
    var SGWSMainMediator = (function (_super) {
        __extends(SGWSMainMediator, _super);
        function SGWSMainMediator() {
            var _this = _super.call(this, SGWSMainMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SGWSMainMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SGWS,
                SceneNotify.CLOSE_SGWS
            ];
        };
        SGWSMainMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new sgws.SGWSTipsPanelMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new sgws.SGWSAutoGameMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
        };
        SGWSMainMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sgws.SGWSGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SGWSMainMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SGWS:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SGWS:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SGWSMainMediator.NAME = "SGWSMainMediator";
        return SGWSMainMediator;
    }(BaseMediator));
    sgws.SGWSMainMediator = SGWSMainMediator;
    __reflect(SGWSMainMediator.prototype, "sgws.SGWSMainMediator");
})(sgws || (sgws = {}));
