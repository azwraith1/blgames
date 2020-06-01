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
    var XCBSTipsMediator = (function (_super) {
        __extends(XCBSTipsMediator, _super);
        function XCBSTipsMediator() {
            var _this = _super.call(this, XCBSTipsMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        XCBSTipsMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_XCBS_TIPS_PANEL,
                PanelNotify.CLOSE_XCBS_TIPS_PANEL
            ];
        };
        XCBSTipsMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XCBSTipsMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new xcbs.XCBSTipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XCBSTipsMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_XCBS_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_XCBS_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XCBSTipsMediator.NAME = "XCBSTipsMediator";
        return XCBSTipsMediator;
    }(BaseMediator));
    xcbs.XCBSTipsMediator = XCBSTipsMediator;
    __reflect(XCBSTipsMediator.prototype, "xcbs.XCBSTipsMediator");
})(xcbs || (xcbs = {}));
