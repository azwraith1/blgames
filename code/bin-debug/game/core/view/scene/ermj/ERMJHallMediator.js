/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-14 10:38:19
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
    var ERMJHallMediator = (function (_super) {
        __extends(ERMJHallMediator, _super);
        function ERMJHallMediator() {
            var _this = _super.call(this, ERMJHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ERMJHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ERMJ_HALL,
                SceneNotify.CLOSE_ERMJ_HALL
            ];
        };
        ERMJHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.ERMJGameMediator());
            this.facade.registerMediator(new majiang.ERMJMatchingMediator());
            this.facade.registerMediator(new majiang.ERMJOverMediator());
        };
        /**
         * 固有写法
         */
        ERMJHallMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.ERMJHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ERMJHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_ERMJ_HALL:
                    RES.loadGroup("majiang_game");
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_ERMJ_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ERMJHallMediator.NAME = "ERMJHallMediator";
        return ERMJHallMediator;
    }(BaseMediator));
    majiang.ERMJHallMediator = ERMJHallMediator;
    __reflect(ERMJHallMediator.prototype, "majiang.ERMJHallMediator");
})(majiang || (majiang = {}));
