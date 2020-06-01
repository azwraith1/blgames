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
    var HBMJOverMediator = (function (_super) {
        __extends(HBMJOverMediator, _super);
        function HBMJOverMediator() {
            var _this = _super.call(this, HBMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HBMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HBMJ_OVER,
                SceneNotify.CLOSE_HBMJ_OVER
            ];
        };
        HBMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HBMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                this.closeViewComponent(1);
                // return;
            }
            this.viewComponent = new majiang.HBMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HBMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_HBMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_HBMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HBMJOverMediator.NAME = "HBMJOverMediator";
        return HBMJOverMediator;
    }(BaseMediator));
    majiang.HBMJOverMediator = HBMJOverMediator;
    __reflect(HBMJOverMediator.prototype, "majiang.HBMJOverMediator");
})(majiang || (majiang = {}));
