/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:14
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
    var DZMJHallMediator = (function (_super) {
        __extends(DZMJHallMediator, _super);
        function DZMJHallMediator() {
            var _this = _super.call(this, DZMJHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        DZMJHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_DZMJ_HALL,
                SceneNotify.CLOSE_DZMJ_HALL
            ];
        };
        DZMJHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.DZMJGameMediator());
            this.facade.registerMediator(new majiang.DZMJMatchingMediator());
            this.facade.registerMediator(new majiang.DZMJOverMediator());
            this.facade.registerMediator(new dzmj.DZMJGameRecordMediator());
            this.facade.registerMediator(new dzmj.DZMJHelpMediator());
        };
        /**
         * 固有写法
         */
        DZMJHallMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.DZMJHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DZMJHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_DZMJ_HALL:
                    RES.loadGroup("majiang_game");
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_DZMJ_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DZMJHallMediator.NAME = "DZMJHallMediator";
        return DZMJHallMediator;
    }(BaseMediator));
    majiang.DZMJHallMediator = DZMJHallMediator;
    __reflect(DZMJHallMediator.prototype, "majiang.DZMJHallMediator");
})(majiang || (majiang = {}));
