/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-08 17:27:38
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
    var SCMJHallMediator = (function (_super) {
        __extends(SCMJHallMediator, _super);
        function SCMJHallMediator() {
            var _this = _super.call(this, SCMJHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SCMJHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SCMJ_HALL,
                SceneNotify.CLOSE_SCMJ_HALL
            ];
        };
        SCMJHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.SCMJMatchingMediator());
            this.facade.registerMediator(new majiang.SCMJGameMediator());
            this.facade.registerMediator(new majiang.SCMJOverMediator());
        };
        /**
         * 固有写法
         */
        SCMJHallMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.SCMJHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SCMJHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SCMJ_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SCMJ_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SCMJHallMediator.NAME = "SCMJHallMediator";
        return SCMJHallMediator;
    }(BaseMediator));
    majiang.SCMJHallMediator = SCMJHallMediator;
    __reflect(SCMJHallMediator.prototype, "majiang.SCMJHallMediator");
})(majiang || (majiang = {}));
