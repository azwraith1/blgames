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
    var HZMJMathingMedior = (function (_super) {
        __extends(HZMJMathingMedior, _super);
        function HZMJMathingMedior() {
            var _this = _super.call(this, HZMJMathingMedior.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HZMJMathingMedior.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HZMJ_MATCHING,
                SceneNotify.CLOSE_HZMJ_MATCHING
            ];
        };
        HZMJMathingMedior.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HZMJMathingMedior.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HZMJMathingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HZMJMathingMedior.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HZMJ_MATCHING:
                    RotationLoading.instance.load(["hzmj_game"], "", function () {
                        RES.loadGroup("hzmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HZMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HZMJMathingMedior.NAME = "HZMJMatchingMediator";
        return HZMJMathingMedior;
    }(BaseMediator));
    majiang.HZMJMathingMedior = HZMJMathingMedior;
    __reflect(HZMJMathingMedior.prototype, "majiang.HZMJMathingMedior");
})(majiang || (majiang = {}));
