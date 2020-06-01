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
    var HNMJGameMediator = (function (_super) {
        __extends(HNMJGameMediator, _super);
        function HNMJGameMediator() {
            var _this = _super.call(this, HNMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HNMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HNMJ,
                SceneNotify.CLOSE_HNMJ,
                SceneNotify.CLOSE_MJ_JIESSUAN
            ];
        };
        HNMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HNMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.HNMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HNMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HNMJ:
                    RotationLoading.instance.load(["hnmj_game"], "", function () {
                        RES.loadGroup("hnmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HNMJ:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HNMJGameMediator.NAME = "HNMJGameMediator";
        return HNMJGameMediator;
    }(BaseMediator));
    majiang.HNMJGameMediator = HNMJGameMediator;
    __reflect(HNMJGameMediator.prototype, "majiang.HNMJGameMediator");
})(majiang || (majiang = {}));
