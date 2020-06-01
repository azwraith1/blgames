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
    var GYZJOverMediator = (function (_super) {
        __extends(GYZJOverMediator, _super);
        function GYZJOverMediator() {
            var _this = _super.call(this, GYZJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GYZJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GYZJMJ_OVER,
                SceneNotify.CLOSE_GYZJMJ_OVER
            ];
        };
        GYZJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GYZJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GYZJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GYZJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_GYZJMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_GYZJMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GYZJOverMediator.NAME = "GYZJOverMediator";
        return GYZJOverMediator;
    }(BaseMediator));
    majiang.GYZJOverMediator = GYZJOverMediator;
    __reflect(GYZJOverMediator.prototype, "majiang.GYZJOverMediator");
})(majiang || (majiang = {}));
