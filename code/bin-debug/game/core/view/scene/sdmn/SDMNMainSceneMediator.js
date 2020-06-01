/*
 * @Author: wangtao
 * @Date: 2019-05-08 11:26:12
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-05-30 16:09:36
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
var sdmn;
(function (sdmn) {
    var SDMNGameMediator = (function (_super) {
        __extends(SDMNGameMediator, _super);
        function SDMNGameMediator() {
            var _this = _super.call(this, SDMNGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SDMNGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SDMN,
                SceneNotify.CLOSE_SDMN
            ];
        };
        SDMNGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new sdmn.SDMNTipsMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new sdmn.SDMNautoGamelMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
        };
        SDMNGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdmn.SDMNMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDMNGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SDMN:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SDMN:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDMNGameMediator.NAME = "SDMNGameMediator";
        return SDMNGameMediator;
    }(BaseMediator));
    sdmn.SDMNGameMediator = SDMNGameMediator;
    __reflect(SDMNGameMediator.prototype, "sdmn.SDMNGameMediator");
})(sdmn || (sdmn = {}));
