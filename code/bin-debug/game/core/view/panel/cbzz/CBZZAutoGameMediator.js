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
var cbzz;
(function (cbzz) {
    var CBZZautoGamelMediator = (function (_super) {
        __extends(CBZZautoGamelMediator, _super);
        function CBZZautoGamelMediator() {
            var _this = _super.call(this, CBZZautoGamelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        CBZZautoGamelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_CBZZ_AUTO_PANEL,
                PanelNotify.CLOSE_CBZZ_AUTO_PANEL
            ];
        };
        CBZZautoGamelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new sdxl.SDXLGameMediator());
        };
        CBZZautoGamelMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new cbzz.CBZZAutoGamePanel();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CBZZautoGamelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_CBZZ_AUTO_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_CBZZ_AUTO_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CBZZautoGamelMediator.NAME = "CBZZautoGamelMediator";
        return CBZZautoGamelMediator;
    }(BaseMediator));
    cbzz.CBZZautoGamelMediator = CBZZautoGamelMediator;
    __reflect(CBZZautoGamelMediator.prototype, "cbzz.CBZZautoGamelMediator");
})(cbzz || (cbzz = {}));
