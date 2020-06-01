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
var BDZGameSceneMediator = (function (_super) {
    __extends(BDZGameSceneMediator, _super);
    function BDZGameSceneMediator() {
        var _this = _super.call(this, BDZGameSceneMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BDZGameSceneMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BDZ,
            SceneNotify.CLOSE_BDZ
        ];
    };
    /**
     * 这里是注册的意思
     */
    BDZGameSceneMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    BDZGameSceneMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new BDZGameScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BDZGameSceneMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_BDZ:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_BDZ:
                this.closeViewComponent(1);
                break;
        }
    };
    BDZGameSceneMediator.NAME = "BDZGameSceneMediator";
    return BDZGameSceneMediator;
}(BaseMediator));
__reflect(BDZGameSceneMediator.prototype, "BDZGameSceneMediator");
