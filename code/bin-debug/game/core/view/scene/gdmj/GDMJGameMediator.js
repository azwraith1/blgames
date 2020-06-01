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
    var GDMJGameMediator = (function (_super) {
        __extends(GDMJGameMediator, _super);
        function GDMJGameMediator() {
            var _this = _super.call(this, GDMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        GDMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_GDMJ,
                SceneNotify.CLOSE_GDMJ,
                SceneNotify.FLUSH_GDMJ
            ];
        };
        GDMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GDMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.GDMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        GDMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_GDMJ:
                    RotationLoading.instance.load(["gdmj_game"], "", function () {
                        RES.loadGroup("gdmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_GDMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_GDMJ:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        // Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        GDMJGameMediator.NAME = "GDMJGameMediator";
        return GDMJGameMediator;
    }(BaseMediator));
    majiang.GDMJGameMediator = GDMJGameMediator;
    __reflect(GDMJGameMediator.prototype, "majiang.GDMJGameMediator");
})(majiang || (majiang = {}));
