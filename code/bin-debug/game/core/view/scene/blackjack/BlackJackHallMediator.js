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
var BlackJackHallMediator = (function (_super) {
    __extends(BlackJackHallMediator, _super);
    function BlackJackHallMediator() {
        var _this = _super.call(this, BlackJackHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BlackJackHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BLACKJ_HALL,
            SceneNotify.CLOSE_BLACKJ_HALL
        ];
    };
    BlackJackHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new BlackJackMatchingMediator());
        this.facade.registerMediator(new BlackJackGameMediator());
    };
    /**
 * 固有写法
 */
    BlackJackHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(2);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new BlackJackHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BlackJackHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_BLACKJ_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_BLACKJ_HALL:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BlackJackHallMediator.NAME = "BlackJackHallMediator";
    return BlackJackHallMediator;
}(BaseMediator));
__reflect(BlackJackHallMediator.prototype, "BlackJackHallMediator");
