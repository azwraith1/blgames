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
    var SNYXAutoGameMediator = (function (_super) {
        __extends(SNYXAutoGameMediator, _super);
        function SNYXAutoGameMediator() {
            return _super.call(this, SNYXAutoGameMediator.NAME) || this;
        }
        SNYXAutoGameMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SNYX_AUTO_PANEL,
                PanelNotify.CLOSE_SNYX_AUTO_PANEL
            ];
        };
        SNYXAutoGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            // this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        SNYXAutoGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new snyx.SNYXAutoGame();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SNYXAutoGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SNYX_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SNYX_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SNYXAutoGameMediator.NAME = "SNYXAutoGameMediator";
        SNYXAutoGameMediator.type = "panel";
        return SNYXAutoGameMediator;
    }(BaseMediator));
    snyx.SNYXAutoGameMediator = SNYXAutoGameMediator;
    __reflect(SNYXAutoGameMediator.prototype, "snyx.SNYXAutoGameMediator");
})(snyx || (snyx = {}));
