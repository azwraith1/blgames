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
    var NiuniuJSGameMediator = (function (_super) {
        __extends(NiuniuJSGameMediator, _super);
        function NiuniuJSGameMediator() {
            var _this = _super.call(this, NiuniuJSGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        NiuniuJSGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_NIUNIUJSGAMES,
                SceneNotify.CLOSE_NIUNIUJSGAMES
            ];
        };
        NiuniuJSGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        NiuniuJSGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new niuniu.NiuniuJSGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NiuniuJSGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_NIUNIUJSGAMES:
                    RotationLoadingShu.instance.load(["niuniu_game"], "", function () {
                        RES.loadGroup("niuniu_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_NIUNIUJSGAMES:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        NiuniuJSGameMediator.NAME = "NiuniuJSGameMediator";
        return NiuniuJSGameMediator;
    }(BaseMediator));
    niuniu.NiuniuJSGameMediator = NiuniuJSGameMediator;
    __reflect(NiuniuJSGameMediator.prototype, "niuniu.NiuniuJSGameMediator");
})(niuniu || (niuniu = {}));
