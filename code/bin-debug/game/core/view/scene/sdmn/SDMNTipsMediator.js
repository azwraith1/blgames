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
 * @Author: real MC Lee
 * @Date: 2019-05-30 15:32:14
 * @Last Modified by:   real MC Lee
 * @Last Modified time: 2019-05-30 15:32:14
 * @Description:
 */
var sdmn;
(function (sdmn) {
    var SDMNTipsMediator = (function (_super) {
        __extends(SDMNTipsMediator, _super);
        function SDMNTipsMediator() {
            var _this = _super.call(this, SDMNTipsMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SDMNTipsMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SDMN_TIPS_PANEL,
                PanelNotify.CLOSE_SDMN_TIPS_PANEL
            ];
        };
        SDMNTipsMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SDMNTipsMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdmn.SDMNTips();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDMNTipsMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SDMN_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SDMN_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDMNTipsMediator.NAME = "SDMNTipsMediator";
        return SDMNTipsMediator;
    }(BaseMediator));
    sdmn.SDMNTipsMediator = SDMNTipsMediator;
    __reflect(SDMNTipsMediator.prototype, "sdmn.SDMNTipsMediator");
})(sdmn || (sdmn = {}));
