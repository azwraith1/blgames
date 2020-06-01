/*
 * @Author: real MC Lee
 * @Date: 2019-06-04 16:24:40
 * @Last Modified by:   real MC Lee
 * @Last Modified time: 2019-06-04 16:24:40
 * @Description:
 */
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
var bskg;
(function (bskg) {
    var BSKGGameMediator = (function (_super) {
        __extends(BSKGGameMediator, _super);
        function BSKGGameMediator() {
            var _this = _super.call(this, BSKGGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        BSKGGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_BSKG,
                SceneNotify.CLOSE_BSKG
            ];
        };
        BSKGGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new bskg.BSKGTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new bskg.BSKGautoGamelMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
        };
        BSKGGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bskg.BSKGMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BSKGGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_BSKG:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_BSKG:
                    this.closeViewComponent(1);
                    break;
            }
        };
        BSKGGameMediator.NAME = "BSKGGameMediator";
        return BSKGGameMediator;
    }(BaseMediator));
    bskg.BSKGGameMediator = BSKGGameMediator;
    __reflect(BSKGGameMediator.prototype, "bskg.BSKGGameMediator");
})(bskg || (bskg = {}));
