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
    var SCMJGameMediator = (function (_super) {
        __extends(SCMJGameMediator, _super);
        function SCMJGameMediator() {
            var _this = _super.call(this, SCMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SCMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SCMJ,
                SceneNotify.CLOSE_SCMJ,
                SceneNotify.FLUSH_MAJIANG
            ];
        };
        SCMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SCMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.SCMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SCMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_SCMJ:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("majiang_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_SCMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_MAJIANG:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        SCMJGameMediator.NAME = "SCMJGameMediator";
        return SCMJGameMediator;
    }(BaseMediator));
    majiang.SCMJGameMediator = SCMJGameMediator;
    __reflect(SCMJGameMediator.prototype, "majiang.SCMJGameMediator");
})(majiang || (majiang = {}));
