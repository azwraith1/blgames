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
    var ERMJOverMediator = (function (_super) {
        __extends(ERMJOverMediator, _super);
        function ERMJOverMediator() {
            var _this = _super.call(this, ERMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ERMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ERMJ_OVER,
                SceneNotify.CLOSE_ERMJ_OVER
            ];
        };
        ERMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ERMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.ERMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ERMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_ERMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_ERMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ERMJOverMediator.NAME = "ERMJOverMediator";
        return ERMJOverMediator;
    }(BaseMediator));
    majiang.ERMJOverMediator = ERMJOverMediator;
    __reflect(ERMJOverMediator.prototype, "majiang.ERMJOverMediator");
})(majiang || (majiang = {}));
