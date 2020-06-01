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
    var XZDDOverMediator = (function (_super) {
        __extends(XZDDOverMediator, _super);
        function XZDDOverMediator() {
            var _this = _super.call(this, XZDDOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XZDDOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXZDD_OVER,
                SceneNotify.CLOSE_MJXZDD_OVER
            ];
        };
        XZDDOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XZDDOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.XZDDOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XZDDOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXZDD_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_MJXZDD_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        XZDDOverMediator.NAME = "XZDDOverMediator";
        return XZDDOverMediator;
    }(BaseMediator));
    majiang.XZDDOverMediator = XZDDOverMediator;
    __reflect(XZDDOverMediator.prototype, "majiang.XZDDOverMediator");
})(majiang || (majiang = {}));
