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
    var DZMJMatchingMediator = (function (_super) {
        __extends(DZMJMatchingMediator, _super);
        function DZMJMatchingMediator() {
            var _this = _super.call(this, DZMJMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        DZMJMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_DZMJ_MATCHING,
                SceneNotify.CLOSE_DZMJ_MATCHING
            ];
        };
        DZMJMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DZMJMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.DZMJMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DZMJMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_DZMJ_MATCHING:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("dzmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_DZMJ_MATCHING:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DZMJMatchingMediator.NAME = "DZMJMatchingMediator";
        return DZMJMatchingMediator;
    }(BaseMediator));
    majiang.DZMJMatchingMediator = DZMJMatchingMediator;
    __reflect(DZMJMatchingMediator.prototype, "majiang.DZMJMatchingMediator");
})(majiang || (majiang = {}));
