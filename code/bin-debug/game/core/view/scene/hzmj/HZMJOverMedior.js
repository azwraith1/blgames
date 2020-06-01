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
    var HZMJOverMedior = (function (_super) {
        __extends(HZMJOverMedior, _super);
        function HZMJOverMedior() {
            var _this = _super.call(this, HZMJOverMedior.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HZMJOverMedior.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HZMJ_OVER,
                SceneNotify.CLOSE_HZMJ_OVER
            ];
        };
        HZMJOverMedior.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HZMJOverMedior.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HZMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HZMJOverMedior.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_HZMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_HZMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HZMJOverMedior.NAME = "HZMJOverMediator";
        return HZMJOverMedior;
    }(BaseMediator));
    majiang.HZMJOverMedior = HZMJOverMedior;
    __reflect(HZMJOverMedior.prototype, "majiang.HZMJOverMedior");
})(majiang || (majiang = {}));
