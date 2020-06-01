/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:46
 @Description: 选择游戏场景控制层
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
var majiang;
(function (majiang) {
    var XZDDHallMediator = (function (_super) {
        __extends(XZDDHallMediator, _super);
        function XZDDHallMediator() {
            var _this = _super.call(this, XZDDHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XZDDHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXZDD_HALL,
                SceneNotify.CLOSE_MJXZDD_HALL
            ];
        };
        XZDDHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.XZDDMatchingMediator());
            this.facade.registerMediator(new majiang.XZDDGameMediator());
            this.facade.registerMediator(new majiang.XZDDOverMediator());
        };
        /**
         * 固有写法
         */
        XZDDHallMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.XZDDHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XZDDHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXZDD_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_MJXZDD_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XZDDHallMediator.NAME = "XZDDHallMediator";
        return XZDDHallMediator;
    }(BaseMediator));
    majiang.XZDDHallMediator = XZDDHallMediator;
    __reflect(XZDDHallMediator.prototype, "majiang.XZDDHallMediator");
})(majiang || (majiang = {}));
