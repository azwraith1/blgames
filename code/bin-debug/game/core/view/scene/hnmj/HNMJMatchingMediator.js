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
    var HNMJMatchingMediator = (function (_super) {
        __extends(HNMJMatchingMediator, _super);
        function HNMJMatchingMediator() {
            var _this = _super.call(this, HNMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HNMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HNMJ_MATCHING,
                SceneNotify.CLOSE_HNMJ_MATCHING
            ];
        };
        HNMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HNMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HNMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HNMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HNMJ_MATCHING:
                    RotationLoading.instance.load(["hnmj_game"], "", function () {
                        RES.loadGroup("hnmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HNMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HNMJMatchingMediator.NAME = "HNMJMatchingMediator";
        return HNMJMatchingMediator;
    }(BaseMediator));
    majiang.HNMJMatchingMediator = HNMJMatchingMediator;
    __reflect(HNMJMatchingMediator.prototype, "majiang.HNMJMatchingMediator");
})(majiang || (majiang = {}));
