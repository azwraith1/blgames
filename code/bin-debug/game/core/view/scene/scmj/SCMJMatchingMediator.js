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
    var SCMJMatchingMediator = (function (_super) {
        __extends(SCMJMatchingMediator, _super);
        function SCMJMatchingMediator() {
            var _this = _super.call(this, SCMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SCMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SCMJ_MATCHING,
                SceneNotify.CLOSE_SCMJ_MATCHING
            ];
        };
        SCMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SCMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.SCMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SCMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_SCMJ_MATCHING:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("majiang_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_SCMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SCMJMatchingMediator.NAME = "SCMJMatchingMediator";
        return SCMJMatchingMediator;
    }(BaseMediator));
    majiang.SCMJMatchingMediator = SCMJMatchingMediator;
    __reflect(SCMJMatchingMediator.prototype, "majiang.SCMJMatchingMediator");
})(majiang || (majiang = {}));
