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
var SuperBaiCaoGameMediator = (function (_super) {
    __extends(SuperBaiCaoGameMediator, _super);
    function SuperBaiCaoGameMediator() {
        var _this = _super.call(this, SuperBaiCaoGameMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    SuperBaiCaoGameMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_SUPERBAICAO_GAME,
            SceneNotify.CLOSE_SUPERBAICAO_GAME
        ];
    };
    SuperBaiCaoGameMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
 * 固有写法
 */
    SuperBaiCaoGameMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(2);
        this.viewComponent = new SuperBaiCaoGameScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    SuperBaiCaoGameMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_SUPERBAICAO_GAME:
                RotationLoadingShu.instance.load(["superbaicao_game"], "", function () {
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_SUPERBAICAO_GAME:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    SuperBaiCaoGameMediator.NAME = "SuperBaiCaoGameMediator";
    return SuperBaiCaoGameMediator;
}(BaseMediator));
__reflect(SuperBaiCaoGameMediator.prototype, "SuperBaiCaoGameMediator");
