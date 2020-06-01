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
var BlackJackMatchingMediator = (function (_super) {
    __extends(BlackJackMatchingMediator, _super);
    function BlackJackMatchingMediator() {
        var _this = _super.call(this, BlackJackMatchingMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    BlackJackMatchingMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_BLACKJ_MATCHING,
            SceneNotify.CLOSE_BLACKJ_MATCHING
        ];
    };
    BlackJackMatchingMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    /**
     * 固有写法
     */
    BlackJackMatchingMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        game.UIUtils.changeResize(2);
        this.viewComponent = new BlackJackMatchingScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    BlackJackMatchingMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case SceneNotify.OPEN_BLACKJ_MATCHING:
                RotationLoadingShu.instance.load(["blackjack_game"], "", function () {
                    RES.loadGroup("blackjack_back");
                    _this.showViewComponent();
                });
                break;
            case SceneNotify.CLOSE_BLACKJ_MATCHING:
                if (this.viewComponent) {
                    this.closeViewComponent(1);
                }
                break;
        }
    };
    BlackJackMatchingMediator.NAME = "BlackJackMatchingMediator";
    return BlackJackMatchingMediator;
}(BaseMediator));
__reflect(BlackJackMatchingMediator.prototype, "BlackJackMatchingMediator");
