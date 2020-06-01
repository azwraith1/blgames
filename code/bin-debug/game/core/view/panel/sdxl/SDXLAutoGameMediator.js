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
/*
 * @Author: wangtao
 * @Date: 2019-04-08 12:07:23
 * @Last Modified by:   wangtao
 * @Last Modified time: 2019-04-08 12:07:23
 * @Description:
 */
var sdxl;
(function (sdxl) {
    var SDXLautoGamelMediator = (function (_super) {
        __extends(SDXLautoGamelMediator, _super);
        function SDXLautoGamelMediator() {
            var _this = _super.call(this, SDXLautoGamelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SDXLautoGamelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SDXL_AUTO_PANEL,
                PanelNotify.CLOSE_SDXL_AUTO_PANEL
            ];
        };
        SDXLautoGamelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        SDXLautoGamelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdxl.SDXLAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDXLautoGamelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SDXL_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SDXL_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDXLautoGamelMediator.NAME = "SDXLautoGamelMediator";
        return SDXLautoGamelMediator;
    }(BaseMediator));
    sdxl.SDXLautoGamelMediator = SDXLautoGamelMediator;
    __reflect(SDXLautoGamelMediator.prototype, "sdxl.SDXLautoGamelMediator");
})(sdxl || (sdxl = {}));
