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
var bjle;
(function (bjle) {
    var BJLGameSceneMediator = (function (_super) {
        __extends(BJLGameSceneMediator, _super);
        function BJLGameSceneMediator() {
            var _this = _super.call(this, BJLGameSceneMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        BJLGameSceneMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_BJLGAME,
                SceneNotify.CLOSE_BJLGAME
            ];
        };
        BJLGameSceneMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        BJLGameSceneMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            RES.loadGroup("bjl_back");
            //egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new bjle.BJLGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BJLGameSceneMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_BJLGAME:
                    //this.showViewComponent();
                    RotationLoadingShu.instance.load(["bjl_game"], "", function () {
                        //RES.loadGroup("bjl_game");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_BJLGAME:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        BJLGameSceneMediator.NAME = "BJLGameSceneMediator";
        return BJLGameSceneMediator;
    }(BaseMediator));
    bjle.BJLGameSceneMediator = BJLGameSceneMediator;
    __reflect(BJLGameSceneMediator.prototype, "bjle.BJLGameSceneMediator");
})(bjle || (bjle = {}));
