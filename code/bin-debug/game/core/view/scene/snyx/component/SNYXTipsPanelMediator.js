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
var snyx;
(function (snyx) {
    var SNYXTipsPanelMediator = (function (_super) {
        __extends(SNYXTipsPanelMediator, _super);
        function SNYXTipsPanelMediator() {
            var _this = _super.call(this, SNYXTipsPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SNYXTipsPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SNYX_TIPS_PANEL,
                PanelNotify.CLOSE_SNYX_TIPS_PANEL
            ];
        };
        SNYXTipsPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SNYXTipsPanelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new snyx.SNYXTipsPanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SNYXTipsPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SNYX_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SNYX_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SNYXTipsPanelMediator.NAME = "SNYXTipsPanelMediator";
        return SNYXTipsPanelMediator;
    }(BaseMediator));
    snyx.SNYXTipsPanelMediator = SNYXTipsPanelMediator;
    __reflect(SNYXTipsPanelMediator.prototype, "snyx.SNYXTipsPanelMediator");
})(snyx || (snyx = {}));
