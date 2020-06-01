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
    var SGWSTipsPanelMediator = (function (_super) {
        __extends(SGWSTipsPanelMediator, _super);
        function SGWSTipsPanelMediator() {
            var _this = _super.call(this, SGWSTipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SGWSTipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SGWS_TIPS_PANEL,
                PanelNotify.CLOSE_SGWS_TIPS_PANEL
            ];
        };
        SGWSTipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SGWSTipsPanelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sgws.SGWSTipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SGWSTipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SGWS_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SGWS_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SGWSTipsPanelMediator.NAME = "SGWSTipsPanelMediator";
        return SGWSTipsPanelMediator;
    }(BaseMediator));
    sgws.SGWSTipsPanelMediator = SGWSTipsPanelMediator;
    __reflect(SGWSTipsPanelMediator.prototype, "sgws.SGWSTipsPanelMediator");
})(sgws || (sgws = {}));
