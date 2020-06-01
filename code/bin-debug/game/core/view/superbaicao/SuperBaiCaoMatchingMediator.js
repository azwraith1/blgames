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
var SuperBaiCaoMatchingMediator = (function (_super) {
    __extends(SuperBaiCaoMatchingMediator, _super);
    function SuperBaiCaoMatchingMediator() {
        var _this = _super.call(this, SuperBaiCaoMatchingMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    SuperBaiCaoMatchingMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_SUPERBAICAO_MATCHING,
            SceneNotify.CLOSE_SUPERBAICAO_MATCHING
        ];
    };
    SuperBaiCaoMatchingMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
     * 固有写法
     */
    SuperBaiCaoMatchingMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(2);
        this.viewComponent = new SuperBaiCaoMatchingScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    SuperBaiCaoMatchingMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_SUPERBAICAO_MATCHING:
                RotationLoadingShu.instance.load(["superbaicao_game"], "", function () {
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_SUPERBAICAO_MATCHING:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    SuperBaiCaoMatchingMediator.NAME = "SuperBaiCaoMatchingMediator";
    return SuperBaiCaoMatchingMediator;
}(BaseMediator));
__reflect(SuperBaiCaoMatchingMediator.prototype, "SuperBaiCaoMatchingMediator");
