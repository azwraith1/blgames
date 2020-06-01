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
    var SangongGameMediator = (function (_super) {
        __extends(SangongGameMediator, _super);
        function SangongGameMediator() {
            var _this = _super.call(this, SangongGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SangongGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SANGONG_GAME,
                SceneNotify.CLOSE_SANGONG_GAME
            ];
        };
        SangongGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        SangongGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new sangong.SangongGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SangongGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_SANGONG_GAME:
                    RotationLoadingShu.instance.load(["sangong_game"], "", function () {
                        RES.loadGroup("sangong_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_SANGONG_GAME:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        SangongGameMediator.NAME = "SangongGameMediator";
        return SangongGameMediator;
    }(BaseMediator));
    sangong.SangongGameMediator = SangongGameMediator;
    __reflect(SangongGameMediator.prototype, "sangong.SangongGameMediator");
})(sangong || (sangong = {}));
