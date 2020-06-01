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
    var HBMJGameMediator = (function (_super) {
        __extends(HBMJGameMediator, _super);
        function HBMJGameMediator() {
            var _this = _super.call(this, HBMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HBMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HBMJ,
                SceneNotify.CLOSE_HBMJ,
                SceneNotify.CLOSE_MJ_JIESSUAN
            ];
        };
        HBMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HBMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.HBMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HBMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HBMJ:
                    RotationLoading.instance.load(["hbmj_game"], "", function () {
                        RES.loadGroup("hbmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HBMJ:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HBMJGameMediator.NAME = "HBMJGameMediator";
        return HBMJGameMediator;
    }(BaseMediator));
    majiang.HBMJGameMediator = HBMJGameMediator;
    __reflect(HBMJGameMediator.prototype, "majiang.HBMJGameMediator");
})(majiang || (majiang = {}));
