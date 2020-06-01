/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-21 17:56:16
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
    var GYZJHallMediator = (function (_super) {
        __extends(GYZJHallMediator, _super);
        function GYZJHallMediator() {
            var _this = _super.call(this, GYZJHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GYZJHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GYZJMJ_HALL,
                SceneNotify.CLOSE_GYZJMJ_HALL
            ];
        };
        GYZJHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.GYZJMatchingMediator());
            this.facade.registerMediator(new majiang.GYZJGameMediator());
            this.facade.registerMediator(new majiang.GYZJOverMediator());
            this.facade.registerMediator(new majiang.GameRecordMediator());
        };
        /**
         * 固有写法
         */
        GYZJHallMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GYZJHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GYZJHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_GYZJMJ_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_GYZJMJ_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GYZJHallMediator.NAME = "GYZJHallMediator";
        return GYZJHallMediator;
    }(BaseMediator));
    majiang.GYZJHallMediator = GYZJHallMediator;
    __reflect(GYZJHallMediator.prototype, "majiang.GYZJHallMediator");
})(majiang || (majiang = {}));
