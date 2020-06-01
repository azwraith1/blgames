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
    var XZDDGameMediator = (function (_super) {
        __extends(XZDDGameMediator, _super);
        function XZDDGameMediator() {
            var _this = _super.call(this, XZDDGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        XZDDGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_MJXZDD,
                SceneNotify.CLOSE_MJXZDD,
                SceneNotify.FLUSH_MAJIANG
            ];
        };
        XZDDGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        XZDDGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.XZDDGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        XZDDGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_MJXZDD:
                    RotationLoading.instance.load(["majiang_game"], "", function () {
                        RES.loadGroup("majiang_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_MJXZDD:
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
        XZDDGameMediator.NAME = "XZDDGameMediator";
        return XZDDGameMediator;
    }(BaseMediator));
    majiang.XZDDGameMediator = XZDDGameMediator;
    __reflect(XZDDGameMediator.prototype, "majiang.XZDDGameMediator");
})(majiang || (majiang = {}));
