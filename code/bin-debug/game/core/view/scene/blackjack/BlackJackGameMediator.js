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
var BlackJackGameMediator = (function (_super) {
    __extends(BlackJackGameMediator, _super);
    function BlackJackGameMediator() {
        var _this = _super.call(this, BlackJackGameMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BlackJackGameMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BLACKJ_GAME,
            SceneNotify.CLOSE_BLACKJ_GAME
        ];
    };
    BlackJackGameMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
 * 固有写法
 */
    BlackJackGameMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(2);
        RES.loadGroup("blackjack_back");
        this.viewComponent = new BlackJackGameScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BlackJackGameMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_BLACKJ_GAME:
                //this.showViewComponent();
                RotationLoadingShu.instance.load(["blackjack_game"], "", function () {
                    //RES.loadGroup("bjl_game");
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_BLACKJ_GAME:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BlackJackGameMediator.NAME = "BlackJackGameMediator";
    return BlackJackGameMediator;
}(BaseMediator));
__reflect(BlackJackGameMediator.prototype, "BlackJackGameMediator");
