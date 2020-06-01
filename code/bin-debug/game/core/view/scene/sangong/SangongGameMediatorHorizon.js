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
var sangong;
(function (sangong) {
    var SangongGameMediatorHorizon = (function (_super) {
        __extends(SangongGameMediatorHorizon, _super);
        function SangongGameMediatorHorizon() {
            var _this = _super.call(this, SangongGameMediatorHorizon.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SangongGameMediatorHorizon.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SANGONG_GAME_HORIZON,
                SceneNotify.CLOSE_SANGONG_GAME_HORIZON
            ];
        };
        SangongGameMediatorHorizon.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        SangongGameMediatorHorizon.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            egret.MainContext.instance.stage.setContentSize(1280, 720);
            this.viewComponent = new sangong.SangongGameSceneHorizon();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SangongGameMediatorHorizon.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_SANGONG_GAME_HORIZON:
                    RotationLoading.instance.load(["sangong_game"], "", function () {
                        RES.loadGroup("sangong_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_SANGONG_GAME_HORIZON:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        SangongGameMediatorHorizon.NAME = "SangongGameMediatorHorizon";
        return SangongGameMediatorHorizon;
    }(BaseMediator));
    sangong.SangongGameMediatorHorizon = SangongGameMediatorHorizon;
    __reflect(SangongGameMediatorHorizon.prototype, "sangong.SangongGameMediatorHorizon");
})(sangong || (sangong = {}));
