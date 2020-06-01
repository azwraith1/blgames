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
    var HZMJGameMediator = (function (_super) {
        __extends(HZMJGameMediator, _super);
        function HZMJGameMediator() {
            var _this = _super.call(this, HZMJGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HZMJGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HZMJ,
                SceneNotify.CLOSE_HZMJ,
                SceneNotify.FLUSH_HZMJ
            ];
        };
        HZMJGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HZMJGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new majiang.HZMJGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HZMJGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_HZMJ:
                    RotationLoading.instance.load(["hzmj_game"], "", function () {
                        RES.loadGroup("hzmj_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_HZMJ:
                    this.closeViewComponent(1);
                    break;
                case SceneNotify.FLUSH_HZMJ:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                        // Global.gameProxy.clearRoomInfo();
                        this.showViewComponent();
                    }
                    break;
            }
        };
        HZMJGameMediator.NAME = "HZMJGameMediator";
        return HZMJGameMediator;
    }(BaseMediator));
    majiang.HZMJGameMediator = HZMJGameMediator;
    __reflect(HZMJGameMediator.prototype, "majiang.HZMJGameMediator");
})(majiang || (majiang = {}));
