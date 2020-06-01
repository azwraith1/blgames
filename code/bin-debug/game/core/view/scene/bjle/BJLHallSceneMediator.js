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
    var BJLHallSceneMediator = (function (_super) {
        __extends(BJLHallSceneMediator, _super);
        function BJLHallSceneMediator() {
            var _this = _super.call(this, BJLHallSceneMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        BJLHallSceneMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_BJLHALL,
                SceneNotify.CLOSE_BJLHALL
            ];
        };
        BJLHallSceneMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new bjle.BJLGameSceneMediator());
            this.facade.registerMediator(new BJLRecordMediator());
        };
        /**
     * 固有写法
     */
        BJLHallSceneMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(2);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new bjle.BJLHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        BJLHallSceneMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_BJLHALL:
                    RotationLoadingShu.instance.load(["bjl_hall"], "", function () {
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_BJLHALL:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        BJLHallSceneMediator.NAME = "BJLHallSceneMediator";
        return BJLHallSceneMediator;
    }(BaseMediator));
    bjle.BJLHallSceneMediator = BJLHallSceneMediator;
    __reflect(BJLHallSceneMediator.prototype, "bjle.BJLHallSceneMediator");
})(bjle || (bjle = {}));
