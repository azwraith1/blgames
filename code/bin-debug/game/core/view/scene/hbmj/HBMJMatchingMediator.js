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
    var HBMJMatchingMediator = (function (_super) {
        __extends(HBMJMatchingMediator, _super);
        function HBMJMatchingMediator() {
            var _this = _super.call(this, HBMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HBMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HBMJ_MATCHING,
                SceneNotify.CLOSE_HBMJ_MATCHING
            ];
        };
        HBMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HBMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HBMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HBMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HBMJ_MATCHING:
                    RotationLoading.instance.load(["hbmj_game"], "", function () {
                        RES.loadGroup("hbmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HBMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HBMJMatchingMediator.NAME = "HBMJMatchingMediator";
        return HBMJMatchingMediator;
    }(BaseMediator));
    majiang.HBMJMatchingMediator = HBMJMatchingMediator;
    __reflect(HBMJMatchingMediator.prototype, "majiang.HBMJMatchingMediator");
})(majiang || (majiang = {}));
