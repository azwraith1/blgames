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
    var HNMJOverMediator = (function (_super) {
        __extends(HNMJOverMediator, _super);
        function HNMJOverMediator() {
            var _this = _super.call(this, HNMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HNMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HNMJ_OVER,
                SceneNotify.CLOSE_HNMJ_OVER
            ];
        };
        HNMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HNMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HNMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HNMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_HNMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_HNMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HNMJOverMediator.NAME = "HNMJOverMediator";
        return HNMJOverMediator;
    }(BaseMediator));
    majiang.HNMJOverMediator = HNMJOverMediator;
    __reflect(HNMJOverMediator.prototype, "majiang.HNMJOverMediator");
})(majiang || (majiang = {}));
