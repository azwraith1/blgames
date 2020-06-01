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
    var GYZJMatchingMediator = (function (_super) {
        __extends(GYZJMatchingMediator, _super);
        function GYZJMatchingMediator() {
            var _this = _super.call(this, GYZJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GYZJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GYZJ_MATCHING,
                SceneNotify.CLOSE_GYZJ_MATCHING
            ];
        };
        GYZJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GYZJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GYZJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GYZJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_GYZJ_MATCHING:
                    RotationLoading.instance.load(["gyzjmj_game"], "", function () {
                        RES.loadGroup("gyzjmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_GYZJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GYZJMatchingMediator.NAME = "GYZJMatchingMediator";
        return GYZJMatchingMediator;
    }(BaseMediator));
    majiang.GYZJMatchingMediator = GYZJMatchingMediator;
    __reflect(GYZJMatchingMediator.prototype, "majiang.GYZJMatchingMediator");
})(majiang || (majiang = {}));
