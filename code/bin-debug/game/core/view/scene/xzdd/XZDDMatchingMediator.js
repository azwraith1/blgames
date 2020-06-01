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
    var XZDDMatchingMediator = (function (_super) {
        __extends(XZDDMatchingMediator, _super);
        function XZDDMatchingMediator() {
            var _this = _super.call(this, XZDDMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XZDDMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXZDD_MATCHING,
                SceneNotify.CLOSE_MJXZDD_MATCHING
            ];
        };
        XZDDMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XZDDMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.XZDDMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XZDDMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXZDD_MATCHING:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("majiang_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_MJXZDD_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XZDDMatchingMediator.NAME = "XZDDMatchingMediator";
        return XZDDMatchingMediator;
    }(BaseMediator));
    majiang.XZDDMatchingMediator = XZDDMatchingMediator;
    __reflect(XZDDMatchingMediator.prototype, "majiang.XZDDMatchingMediator");
})(majiang || (majiang = {}));
