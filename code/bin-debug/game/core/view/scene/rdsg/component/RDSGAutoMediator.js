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
var rdsg;
(function (rdsg) {
    var RDSGAutoMediator = (function (_super) {
        __extends(RDSGAutoMediator, _super);
        function RDSGAutoMediator() {
            var _this = _super.call(this, RDSGAutoMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        RDSGAutoMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RDSG_AUTO_PANEL,
                PanelNotify.CLOSE_RDSG_AUTO_PANEL
            ];
        };
        RDSGAutoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        RDSGAutoMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new rdsg.RDSGAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        RDSGAutoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_RDSG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_RDSG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        RDSGAutoMediator.NAME = "RDSGAutoMediator";
        return RDSGAutoMediator;
    }(BaseMediator));
    rdsg.RDSGAutoMediator = RDSGAutoMediator;
    __reflect(RDSGAutoMediator.prototype, "rdsg.RDSGAutoMediator");
})(rdsg || (rdsg = {}));
