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
var BDZHallSceneMediator = (function (_super) {
    __extends(BDZHallSceneMediator, _super);
    function BDZHallSceneMediator() {
        var _this = _super.call(this, BDZHallSceneMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BDZHallSceneMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BDZ_HALL,
            SceneNotify.CLOSE_BDZ_HALL
        ];
    };
    BDZHallSceneMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new BDZMatchingSceneMediator());
        this.facade.registerMediator(new BDZGameSceneMediator());
    };
    /**
 * 固有写法
 */
    BDZHallSceneMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(1);
        //egret.MainContext.instance.stage.setContentSize(720, 1280);
        this.viewComponent = new BDZHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BDZHallSceneMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_BDZ_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_BDZ_HALL:
                if (this.viewComponent) {
                    // game.UIUtils.changeResize(1);
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BDZHallSceneMediator.NAME = "BDZHallSceneMediator";
    return BDZHallSceneMediator;
}(BaseMediator));
__reflect(BDZHallSceneMediator.prototype, "BDZHallSceneMediator");
