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
var SuperBaiCaoHallMediator = (function (_super) {
    __extends(SuperBaiCaoHallMediator, _super);
    function SuperBaiCaoHallMediator() {
        var _this = _super.call(this, SuperBaiCaoHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    SuperBaiCaoHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_SUPERBAICAO_HALL,
            SceneNotify.CLOSE_SUPERBAICAO_HALL
        ];
    };
    SuperBaiCaoHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new SuperBaiCaoMatchingMediator());
        this.facade.registerMediator(new SuperBaiCaoGameMediator());
    };
    /**
 * 固有写法
 */
    SuperBaiCaoHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(2);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new SuperBaiCaoHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    SuperBaiCaoHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_SUPERBAICAO_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_SUPERBAICAO_HALL:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    SuperBaiCaoHallMediator.NAME = "SuperBaiCaoHallMediator";
    return SuperBaiCaoHallMediator;
}(BaseMediator));
__reflect(SuperBaiCaoHallMediator.prototype, "SuperBaiCaoHallMediator");
