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
var rbwar;
(function (rbwar) {
    var RBWarGameMediator = (function (_super) {
        __extends(RBWarGameMediator, _super);
        function RBWarGameMediator() {
            var _this = _super.call(this, RBWarGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        RBWarGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_RBWAR_GAME,
                SceneNotify.CLOSE_RBWAR_GAME
            ];
        };
        RBWarGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new rbwar.RBWarZSMediator());
            this.facade.registerMediator(new rbwar.RbwPlayerListMediator());
            this.facade.registerMediator(new rbwar.RBWHelpPanlMediator());
        };
        /**
     * 固有写法
     */
        RBWarGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new rbwar.RBWarGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        RBWarGameMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_RBWAR_GAME:
                    RES.loadGroup("rbwar_back");
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_RBWAR_GAME:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        RBWarGameMediator.NAME = "RBWarGameMediator";
        return RBWarGameMediator;
    }(BaseMediator));
    rbwar.RBWarGameMediator = RBWarGameMediator;
    __reflect(RBWarGameMediator.prototype, "rbwar.RBWarGameMediator");
})(rbwar || (rbwar = {}));
