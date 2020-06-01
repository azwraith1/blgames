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
var xcbs;
(function (xcbs) {
    var XCBSAutoGameMediator = (function (_super) {
        __extends(XCBSAutoGameMediator, _super);
        function XCBSAutoGameMediator() {
            return _super.call(this, XCBSAutoGameMediator.NAME) || this;
        }
        XCBSAutoGameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_XCBS_AUTO_PANEL,
                PanelNotify.CLOSE_XCBS_AUTO_PANEL
            ];
        };
        XCBSAutoGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        XCBSAutoGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new xcbs.XCBSAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XCBSAutoGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_XCBS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_XCBS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XCBSAutoGameMediator.NAME = "XCBSAutoGameMediator";
        XCBSAutoGameMediator.type = "panel";
        return XCBSAutoGameMediator;
    }(BaseMediator));
    xcbs.XCBSAutoGameMediator = XCBSAutoGameMediator;
    __reflect(XCBSAutoGameMediator.prototype, "xcbs.XCBSAutoGameMediator");
})(xcbs || (xcbs = {}));
