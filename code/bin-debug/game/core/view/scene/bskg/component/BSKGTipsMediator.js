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
var bskg;
(function (bskg) {
    var BSKGTipsMediator = (function (_super) {
        __extends(BSKGTipsMediator, _super);
        function BSKGTipsMediator() {
            var _this = _super.call(this, BSKGTipsMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        BSKGTipsMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_BSKG_TIPS_PANEL,
                PanelNotify.CLOSE_BSKG_TIPS_PANEL
            ];
        };
        BSKGTipsMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        BSKGTipsMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bskg.BSKGTips();
            var sceneLayer = GameLayerManager.gameLayer().panelLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BSKGTipsMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_BSKG_TIPS_PANEL:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_BSKG_TIPS_PANEL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BSKGTipsMediator.NAME = "BSKGTipsMediator";
        return BSKGTipsMediator;
    }(BaseMediator));
    bskg.BSKGTipsMediator = BSKGTipsMediator;
    __reflect(BSKGTipsMediator.prototype, "bskg.BSKGTipsMediator");
})(bskg || (bskg = {}));
