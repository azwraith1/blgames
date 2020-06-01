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
    var GDMJOverMediator = (function (_super) {
        __extends(GDMJOverMediator, _super);
        function GDMJOverMediator() {
            var _this = _super.call(this, GDMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GDMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GDMJ_OVER,
                SceneNotify.CLOSE_GDMJ_OVER
            ];
        };
        GDMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GDMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GDMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GDMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_GDMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_GDMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GDMJOverMediator.NAME = "GDMJOverMediator";
        return GDMJOverMediator;
    }(BaseMediator));
    majiang.GDMJOverMediator = GDMJOverMediator;
    __reflect(GDMJOverMediator.prototype, "majiang.GDMJOverMediator");
})(majiang || (majiang = {}));
