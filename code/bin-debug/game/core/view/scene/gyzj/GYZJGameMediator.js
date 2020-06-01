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
    var GYZJGameMediator = (function (_super) {
        __extends(GYZJGameMediator, _super);
        function GYZJGameMediator() {
            var _this = _super.call(this, GYZJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GYZJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GYZJMJ,
                SceneNotify.CLOSE_GYZJMJ,
                SceneNotify.FLUSH_GYZJMJ
            ];
        };
        GYZJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GYZJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.GYZJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GYZJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_GYZJMJ:
                    RotationLoading.instance.load(["gyzjmj_game"], "", function () {
                        RES.loadGroup("gyzjmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_GYZJMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_GYZJMJ:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        GYZJGameMediator.NAME = "GYZJGameMediator";
        return GYZJGameMediator;
    }(BaseMediator));
    majiang.GYZJGameMediator = GYZJGameMediator;
    __reflect(GYZJGameMediator.prototype, "majiang.GYZJGameMediator");
})(majiang || (majiang = {}));
