/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:18
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
    var XLCHHallMediator = (function (_super) {
        __extends(XLCHHallMediator, _super);
        function XLCHHallMediator() {
            var _this = _super.call(this, XLCHHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XLCHHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXLCH_HALL,
                SceneNotify.CLOSE_MJXLCH_HALL
            ];
        };
        XLCHHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.XLCHMatchingMediator());
            this.facade.registerMediator(new majiang.XLCHMediator());
            this.facade.registerMediator(new majiang.XLCHOverMediator());
            this.facade.registerMediator(new majiang.GameRecordMediator());
        };
        /**
         * 固有写法
         */
        XLCHHallMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.XLCHHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XLCHHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXLCH_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_MJXLCH_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XLCHHallMediator.NAME = "XLCHHallMediator";
        return XLCHHallMediator;
    }(BaseMediator));
    majiang.XLCHHallMediator = XLCHHallMediator;
    __reflect(XLCHHallMediator.prototype, "majiang.XLCHHallMediator");
})(majiang || (majiang = {}));
