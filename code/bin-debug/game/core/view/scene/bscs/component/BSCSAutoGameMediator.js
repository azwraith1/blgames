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
var bscs;
(function (bscs) {
    var BSCSAutoMediator = (function (_super) {
        __extends(BSCSAutoMediator, _super);
        function BSCSAutoMediator() {
            var _this = _super.call(this, BSCSAutoMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        BSCSAutoMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_BSCS_AUTO_PANEL,
                PanelNotify.CLOSE_BSCS_AUTO_PANEL
            ];
        };
        BSCSAutoMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        BSCSAutoMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bscs.BSCSAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BSCSAutoMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BSCS_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BSCS_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BSCSAutoMediator.NAME = "BSCSAutoMediator";
        return BSCSAutoMediator;
    }(BaseMediator));
    bscs.BSCSAutoMediator = BSCSAutoMediator;
    __reflect(BSCSAutoMediator.prototype, "bscs.BSCSAutoMediator");
})(bscs || (bscs = {}));
