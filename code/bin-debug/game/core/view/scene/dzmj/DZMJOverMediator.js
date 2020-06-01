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
    var DZMJOverMediator = (function (_super) {
        __extends(DZMJOverMediator, _super);
        function DZMJOverMediator() {
            var _this = _super.call(this, DZMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        DZMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_DZMJ_OVER,
                SceneNotify.CLOSE_DZMJ_OVER
            ];
        };
        DZMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DZMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.DZMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DZMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_DZMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_DZMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DZMJOverMediator.NAME = "DZMJOverMediator";
        return DZMJOverMediator;
    }(BaseMediator));
    majiang.DZMJOverMediator = DZMJOverMediator;
    __reflect(DZMJOverMediator.prototype, "majiang.DZMJOverMediator");
})(majiang || (majiang = {}));
