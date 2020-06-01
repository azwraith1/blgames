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
    var DZMJGameMediator = (function (_super) {
        __extends(DZMJGameMediator, _super);
        function DZMJGameMediator() {
            var _this = _super.call(this, DZMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        DZMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_DZMJ,
                SceneNotify.CLOSE_DZMJ,
                SceneNotify.FLUSH_DZMJ
            ];
        };
        DZMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DZMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.DZMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        DZMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_DZMJ:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("dzmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_DZMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_DZMJ:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        // Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        DZMJGameMediator.NAME = "DZMJGameMediator";
        return DZMJGameMediator;
    }(BaseMediator));
    majiang.DZMJGameMediator = DZMJGameMediator;
    __reflect(DZMJGameMediator.prototype, "majiang.DZMJGameMediator");
})(majiang || (majiang = {}));
