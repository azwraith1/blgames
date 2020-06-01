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
    var ERMJGameMediator = (function (_super) {
        __extends(ERMJGameMediator, _super);
        function ERMJGameMediator() {
            var _this = _super.call(this, ERMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ERMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ERMJ,
                SceneNotify.CLOSE_ERMJ,
                SceneNotify.FLUSH_MAJIANG
            ];
        };
        ERMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ERMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.ERMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ERMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_ERMJ:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("ermj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_ERMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_MAJIANG:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        // Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        ERMJGameMediator.NAME = "ERMJGameMediator";
        return ERMJGameMediator;
    }(BaseMediator));
    majiang.ERMJGameMediator = ERMJGameMediator;
    __reflect(ERMJGameMediator.prototype, "majiang.ERMJGameMediator");
})(majiang || (majiang = {}));
