/*
 * @Author: wangtao
 * @Date: 2019-04-08 12:06:56
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-04-08 16:02:48
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
var sdxl;
(function (sdxl) {
    var SDXLGameMediator = (function (_super) {
        __extends(SDXLGameMediator, _super);
        function SDXLGameMediator() {
            var _this = _super.call(this, SDXLGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SDXLGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SDXL,
                SceneNotify.CLOSE_SDXL
            ];
        };
        SDXLGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new sdxl.SDXLTipsPanelMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new game.LaohuAutoMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new sdxl.SDXLautoGamelMediator());
        };
        SDXLGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new sdxl.SDXLGameMain();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SDXLGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SDXL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SDXL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SDXLGameMediator.NAME = "SDXLGameMediator";
        return SDXLGameMediator;
    }(BaseMediator));
    sdxl.SDXLGameMediator = SDXLGameMediator;
    __reflect(SDXLGameMediator.prototype, "sdxl.SDXLGameMediator");
})(sdxl || (sdxl = {}));
