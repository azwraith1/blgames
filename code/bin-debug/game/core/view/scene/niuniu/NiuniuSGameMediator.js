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
var niuniu;
(function (niuniu) {
    var NiuniuSGameMediator = (function (_super) {
        __extends(NiuniuSGameMediator, _super);
        function NiuniuSGameMediator() {
            var _this = _super.call(this, NiuniuSGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        NiuniuSGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_NIUNIUGAMES,
                SceneNotify.CLOSE_NIUNIUGAMES
            ];
        };
        NiuniuSGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        NiuniuSGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new niuniu.NiuniuSGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NiuniuSGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_NIUNIUGAMES:
                    RotationLoadingShu.instance.load(["niuniu_game"], "", function () {
                        RES.loadGroup("niuniu_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_NIUNIUGAMES:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        NiuniuSGameMediator.NAME = "NiuniuSGameMediator";
        return NiuniuSGameMediator;
    }(BaseMediator));
    niuniu.NiuniuSGameMediator = NiuniuSGameMediator;
    __reflect(NiuniuSGameMediator.prototype, "niuniu.NiuniuSGameMediator");
})(niuniu || (niuniu = {}));
