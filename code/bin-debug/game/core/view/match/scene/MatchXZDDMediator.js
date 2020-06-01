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
var MatchXZDDMediator = (function (_super) {
    __extends(MatchXZDDMediator, _super);
    function MatchXZDDMediator() {
        var _this = _super.call(this, MatchXZDDMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    MatchXZDDMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_MATCH_MJXZDD,
            SceneNotify.CLOSE_MATCH_MJXZDD
        ];
    };
    MatchXZDDMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
 * 固有写法
 */
    MatchXZDDMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new majiang.MatchXZDDGameScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    MatchXZDDMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_MATCH_MJXZDD:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_MATCH_MJXZDD:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    MatchXZDDMediator.NAME = "MatchXZDDMediator";
    return MatchXZDDMediator;
}(BaseMediator));
__reflect(MatchXZDDMediator.prototype, "MatchXZDDMediator");
