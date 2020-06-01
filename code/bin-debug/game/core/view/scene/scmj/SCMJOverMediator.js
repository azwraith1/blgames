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
    var SCMJOverMediator = (function (_super) {
        __extends(SCMJOverMediator, _super);
        function SCMJOverMediator() {
            var _this = _super.call(this, SCMJOverMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SCMJOverMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SCMJ_OVER,
                SceneNotify.CLOSE_SCMJ_OVER
            ];
        };
        SCMJOverMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SCMJOverMediator.prototype.showViewComponent = function (nums) {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.SCMJOverScene(nums);
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SCMJOverMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SCMJ_OVER:
                    this.showViewComponent(notification.getBody());
                    break;
                case SceneNotify.CLOSE_SCMJ_OVER:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SCMJOverMediator.NAME = "SCMJOverMediator";
        return SCMJOverMediator;
    }(BaseMediator));
    majiang.SCMJOverMediator = SCMJOverMediator;
    __reflect(SCMJOverMediator.prototype, "majiang.SCMJOverMediator");
})(majiang || (majiang = {}));
