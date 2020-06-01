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
    var SGWSAutoGameMediator = (function (_super) {
        __extends(SGWSAutoGameMediator, _super);
        function SGWSAutoGameMediator() {
            return _super.call(this, SGWSAutoGameMediator.NAME) || this;
        }
        SGWSAutoGameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SGWS_AUTO_PANEL,
                PanelNotify.CLOSE_SGWS_AUTO_PANEL
            ];
        };
        SGWSAutoGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        SGWSAutoGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sgws.SGWSAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SGWSAutoGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SGWS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SGWS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SGWSAutoGameMediator.NAME = "SGWSAutoGameMediator";
        SGWSAutoGameMediator.type = "panel";
        return SGWSAutoGameMediator;
    }(BaseMediator));
    sgws.SGWSAutoGameMediator = SGWSAutoGameMediator;
    __reflect(SGWSAutoGameMediator.prototype, "sgws.SGWSAutoGameMediator");
})(sgws || (sgws = {}));
