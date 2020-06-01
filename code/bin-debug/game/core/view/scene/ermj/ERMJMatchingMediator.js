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
    var ERMJMatchingMediator = (function (_super) {
        __extends(ERMJMatchingMediator, _super);
        function ERMJMatchingMediator() {
            var _this = _super.call(this, ERMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ERMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ERMJ_MATCHING,
                SceneNotify.CLOSE_ERMJ_MATCHING
            ];
        };
        ERMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ERMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.ERMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ERMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_ERMJ_MATCHING:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("ermj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_ERMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ERMJMatchingMediator.NAME = "ERMJMatchingMediator";
        return ERMJMatchingMediator;
    }(BaseMediator));
    majiang.ERMJMatchingMediator = ERMJMatchingMediator;
    __reflect(ERMJMatchingMediator.prototype, "majiang.ERMJMatchingMediator");
})(majiang || (majiang = {}));
