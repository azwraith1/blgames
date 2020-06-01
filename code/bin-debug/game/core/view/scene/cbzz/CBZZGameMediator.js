/*
 * @Author: wangtao
 * @Date: 2019-05-08 11:26:12
 * @Last Modified by: wangtao
 * @Last Modified time: 2019-05-08 11:31:10
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
var cbzz;
(function (cbzz) {
    var CBZZGameMediator = (function (_super) {
        __extends(CBZZGameMediator, _super);
        function CBZZGameMediator() {
            var _this = _super.call(this, CBZZGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        CBZZGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_CBZZ,
                SceneNotify.CLOSE_CBZZ
            ];
        };
        CBZZGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new game.LaohujiHallMediator());
            // this.facade.registerMediator(new SDXLTipsPanelMediator());
            this.facade.registerMediator(new SettingMediator());
            this.facade.registerMediator(new game.CloseLaohuMediator());
            this.facade.registerMediator(new cbzz.CBZZautoGamelMediator());
            this.facade.registerMediator(new MainHallMediator());
            this.facade.registerMediator(new dntg.DNTGGameRecordMediator());
            this.facade.registerMediator(new cbzz.CBZZTipsPanelMediator());
        };
        CBZZGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new cbzz.CBZZMainScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        CBZZGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_CBZZ:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_CBZZ:
                    this.closeViewComponent(1);
                    break;
            }
        };
        CBZZGameMediator.NAME = "CBZZGameMediator";
        return CBZZGameMediator;
    }(BaseMediator));
    cbzz.CBZZGameMediator = CBZZGameMediator;
    __reflect(CBZZGameMediator.prototype, "cbzz.CBZZGameMediator");
})(cbzz || (cbzz = {}));
