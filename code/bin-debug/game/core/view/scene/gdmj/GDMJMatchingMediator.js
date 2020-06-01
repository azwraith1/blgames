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
    var GDMJMatchingMediator = (function (_super) {
        __extends(GDMJMatchingMediator, _super);
        function GDMJMatchingMediator() {
            var _this = _super.call(this, GDMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GDMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GDMJ_MATCHING,
                SceneNotify.CLOSE_GDMJ_MATCHING
            ];
        };
        GDMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GDMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GDMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GDMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_GDMJ_MATCHING:
                    RotationLoading.instance.load(["gdmj_game"], "", function () {
                        RES.loadGroup("gdmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_GDMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GDMJMatchingMediator.NAME = "GDMJMatchingMediator";
        return GDMJMatchingMediator;
    }(BaseMediator));
    majiang.GDMJMatchingMediator = GDMJMatchingMediator;
    __reflect(GDMJMatchingMediator.prototype, "majiang.GDMJMatchingMediator");
})(majiang || (majiang = {}));
