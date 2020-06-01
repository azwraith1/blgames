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
    var XYSGAutogameMediator = (function (_super) {
        __extends(XYSGAutogameMediator, _super);
        function XYSGAutogameMediator() {
            var _this = _super.call(this, XYSGAutogameMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        XYSGAutogameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_XYSG_AUTO_PANEL,
                PanelNotify.CLOSE_XYSG_AUTO_PANEL
            ];
        };
        XYSGAutogameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());\
        };
        XYSGAutogameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new xysg.XYSGAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XYSGAutogameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_XYSG_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_XYSG_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XYSGAutogameMediator.NAME = "XYSGAutogameMediator";
        return XYSGAutogameMediator;
    }(BaseMediator));
    xysg.XYSGAutogameMediator = XYSGAutogameMediator;
    __reflect(XYSGAutogameMediator.prototype, "xysg.XYSGAutogameMediator");
})(xysg || (xysg = {}));
