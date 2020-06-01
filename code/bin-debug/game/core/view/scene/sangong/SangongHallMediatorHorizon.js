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
    var SangongHallMediatorHorizon = (function (_super) {
        __extends(SangongHallMediatorHorizon, _super);
        function SangongHallMediatorHorizon() {
            var _this = _super.call(this, SangongHallMediatorHorizon.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SangongHallMediatorHorizon.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SANGONG_HALL_HORIZON,
                SceneNotify.CLOSE_SANGONG_HALL_HORIZON
            ];
        };
        SangongHallMediatorHorizon.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new sangong.SangongGameMediatorHorizon);
            this.facade.registerMediator(new sangong.SangongMatchingMediatorHorizon);
            this.facade.registerMediator(new HelpMediatorHorizon());
        };
        /**
     * 固有写法
     */
        SangongHallMediatorHorizon.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new sangong.SangongHallSceneHorizon();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SangongHallMediatorHorizon.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SANGONG_HALL_HORIZON:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SANGONG_HALL_HORIZON:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        SangongHallMediatorHorizon.NAME = "SangongHallMediatorHorizon";
        return SangongHallMediatorHorizon;
    }(BaseMediator));
    sangong.SangongHallMediatorHorizon = SangongHallMediatorHorizon;
    __reflect(SangongHallMediatorHorizon.prototype, "sangong.SangongHallMediatorHorizon");
})(sangong || (sangong = {}));
