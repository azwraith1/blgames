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
var ceby;
(function (ceby) {
    var CEBYAutoGameMediator = (function (_super) {
        __extends(CEBYAutoGameMediator, _super);
        function CEBYAutoGameMediator() {
            return _super.call(this, CEBYAutoGameMediator.NAME) || this;
        }
        CEBYAutoGameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_CEBY_AUTO_PANEL,
                PanelNotify.CLOSE_CEBY_AUTO_PANEL
            ];
        };
        CEBYAutoGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        CEBYAutoGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new ceby.CEBYAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CEBYAutoGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_CEBY_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_CEBY_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CEBYAutoGameMediator.NAME = "CEBYAutoGameMediator";
        CEBYAutoGameMediator.type = "panel";
        return CEBYAutoGameMediator;
    }(BaseMediator));
    ceby.CEBYAutoGameMediator = CEBYAutoGameMediator;
    __reflect(CEBYAutoGameMediator.prototype, "ceby.CEBYAutoGameMediator");
})(ceby || (ceby = {}));
