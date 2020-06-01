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
var BaiCaoMatchingMediator = (function (_super) {
    __extends(BaiCaoMatchingMediator, _super);
    function BaiCaoMatchingMediator() {
        var _this = _super.call(this, BaiCaoMatchingMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BaiCaoMatchingMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BAICAO_MATCHING,
            SceneNotify.CLOSE_BAICAO_MATCHING
        ];
    };
    BaiCaoMatchingMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
     * 固有写法
     */
    BaiCaoMatchingMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(2);
        this.viewComponent = new BaiCaoMatchingScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BaiCaoMatchingMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_BAICAO_MATCHING:
                RotationLoadingShu.instance.load(["baicao_game"], "", function () {
                    //	RES.loadGroup("baicao_back");
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_BAICAO_MATCHING:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BaiCaoMatchingMediator.NAME = "BaiCaoMatchingMediator";
    return BaiCaoMatchingMediator;
}(BaseMediator));
__reflect(BaiCaoMatchingMediator.prototype, "BaiCaoMatchingMediator");
