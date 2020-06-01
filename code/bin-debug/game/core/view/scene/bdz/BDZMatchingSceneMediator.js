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
var BDZMatchingSceneMediator = (function (_super) {
    __extends(BDZMatchingSceneMediator, _super);
    function BDZMatchingSceneMediator() {
        var _this = _super.call(this, BDZMatchingSceneMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BDZMatchingSceneMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BDZ_MATCHING,
            SceneNotify.CLOSE_BDZ_MATCHING
        ];
    };
    BDZMatchingSceneMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
 * 固有写法
 */
    BDZMatchingSceneMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(1);
        //egret.MainContext.instance.stage.setContentSize(720, 1280);
        this.viewComponent = new BDZMatchingScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BDZMatchingSceneMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_BDZ_MATCHING:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_BDZ_MATCHING:
                if (this.viewComponent) {
                    // game.UIUtils.changeResize(1);
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BDZMatchingSceneMediator.NAME = "BDZMatchingSceneMediator";
    return BDZMatchingSceneMediator;
}(BaseMediator));
__reflect(BDZMatchingSceneMediator.prototype, "BDZMatchingSceneMediator");
