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
var MatchHallMediator = (function (_super) {
    __extends(MatchHallMediator, _super);
    function MatchHallMediator() {
        var _this = _super.call(this, MatchHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    MatchHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_MATCH_HALL,
            SceneNotify.CLOSE_MATCH_HALL
        ];
    };
    MatchHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new MatchXZDDMediator());
    };
    /**
 * 固有写法
 */
    MatchHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new MatchHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    MatchHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_MATCH_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_MATCH_HALL:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    MatchHallMediator.NAME = "MatchHallMediator";
    return MatchHallMediator;
}(BaseMediator));
__reflect(MatchHallMediator.prototype, "MatchHallMediator");
