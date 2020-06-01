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
 * @Date: 2019-05-29 11:45:07
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:23:19
 * @Description:
 */
var game;
(function (game) {
    var LaohujiHallMediator = (function (_super) {
        __extends(LaohujiHallMediator, _super);
        function LaohujiHallMediator() {
            var _this = _super.call(this, LaohujiHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        LaohujiHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_LAOHUJI_HALL,
                SceneNotify.CLOSE_LAOHUJI_HALL
            ];
        };
        LaohujiHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.DNTGGameMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new sdxl.SDXLGameMediator());
            this.facade.registerMediator(new cbzz.CBZZGameMediator());
            this.facade.registerMediator(new sdmn.SDMNGameMediator());
            this.facade.registerMediator(new bskg.BSKGGameMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new rdsg.RDSGMainSceneMediator());
            this.facade.registerMediator(new ayls.AYLSMainMediator());
            this.facade.registerMediator(new gdzw.GDZWMainMediator());
            this.facade.registerMediator(new bscs.BSCSMainMediator());
            this.facade.registerMediator(new ceby.CEBYMainMediator());
            this.facade.registerMediator(new zcjl.ZCJLMainMediator());
            this.facade.registerMediator(new wszw.WSZWMainMediator());
            this.facade.registerMediator(new lucky7.LUCKY7MainMediator());
            this.facade.registerMediator(new csd.CSDMainMediator());
            this.facade.registerMediator(new xysg.XYSGMainMediator());
            this.facade.registerMediator(new xcbs.XCBSMainMediator());
            this.facade.registerMediator(new sgws.SGWSMainMediator());
            this.facade.registerMediator(new slot.SlotRankPanelMediator());
            this.facade.registerMediator(new snyx.SNYXMainMediator());
        };
        LaohujiHallMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new slot.SlotHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        LaohujiHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_LAOHUJI_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_LAOHUJI_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        LaohujiHallMediator.NAME = "LaohujiHallMediator";
        return LaohujiHallMediator;
    }(BaseMediator));
    game.LaohujiHallMediator = LaohujiHallMediator;
    __reflect(LaohujiHallMediator.prototype, "game.LaohujiHallMediator");
})(game || (game = {}));
