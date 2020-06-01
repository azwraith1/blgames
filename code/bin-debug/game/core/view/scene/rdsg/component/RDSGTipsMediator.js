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
var rdsg;
(function (rdsg) {
    var RDSGTipsMediator = (function (_super) {
        __extends(RDSGTipsMediator, _super);
        function RDSGTipsMediator() {
            var _this = _super.call(this, RDSGTipsMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        RDSGTipsMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RDSG_TIPS_PANEL,
                PanelNotify.CLOSE_RDSG_TIPS_PANEL
            ];
        };
        RDSGTipsMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        RDSGTipsMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new rdsg.RDSGTips();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        RDSGTipsMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_RDSG_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_RDSG_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        RDSGTipsMediator.NAME = "RDSGTipsMediator";
        return RDSGTipsMediator;
    }(BaseMediator));
    rdsg.RDSGTipsMediator = RDSGTipsMediator;
    __reflect(RDSGTipsMediator.prototype, "rdsg.RDSGTipsMediator");
})(rdsg || (rdsg = {}));
