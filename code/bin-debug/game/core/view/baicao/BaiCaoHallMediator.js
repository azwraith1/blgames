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
// TypeScript file
var BaiCaoHallMediator = (function (_super) {
    __extends(BaiCaoHallMediator, _super);
    function BaiCaoHallMediator() {
        var _this = _super.call(this, BaiCaoHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BaiCaoHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BAICAO_HALL,
            SceneNotify.CLOSE_BAICAO_HALL
        ];
    };
    BaiCaoHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new BaiCaoMatchingMediator());
        this.facade.registerMediator(new BaiCaoGameMediator());
    };
    /**
 * 固有写法
 */
    BaiCaoHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(2);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new BaiCaoHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BaiCaoHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_BAICAO_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_BAICAO_HALL:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BaiCaoHallMediator.NAME = "BaiCaoHallMediator";
    return BaiCaoHallMediator;
}(BaseMediator));
__reflect(BaiCaoHallMediator.prototype, "BaiCaoHallMediator");
