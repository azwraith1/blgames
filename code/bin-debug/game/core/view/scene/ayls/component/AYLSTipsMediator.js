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
var ayls;
(function (ayls) {
    var AYLSTipsMediator = (function (_super) {
        __extends(AYLSTipsMediator, _super);
        function AYLSTipsMediator() {
            var _this = _super.call(this, AYLSTipsMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        AYLSTipsMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_AYLS_TIPS_PANEL,
                PanelNotify.CLOSE_AYLS_TIPS_PANEL
            ];
        };
        AYLSTipsMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        AYLSTipsMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new ayls.AYLSTips();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        AYLSTipsMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_AYLS_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_AYLS_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        AYLSTipsMediator.NAME = "AYLSTipsMediator";
        return AYLSTipsMediator;
    }(BaseMediator));
    ayls.AYLSTipsMediator = AYLSTipsMediator;
    __reflect(AYLSTipsMediator.prototype, "ayls.AYLSTipsMediator");
})(ayls || (ayls = {}));
