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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaGameMediator = (function (_super) {
        __extends(ZajinhuaGameMediator, _super);
        function ZajinhuaGameMediator() {
            var _this = _super.call(this, ZajinhuaGameMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ZajinhuaGameMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ZJHGAME,
                SceneNotify.CLOSE_ZJHGAME
            ];
        };
        ZajinhuaGameMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        ZajinhuaGameMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            //egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new zajinhua.ZajinhuaGameScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ZajinhuaGameMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_ZJHGAME:
                    RotationLoading.instance.load(["zhajinhua_game"], "", function () {
                        RES.loadGroup("zhajinhua_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_ZJHGAME:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        ZajinhuaGameMediator.NAME = "ZajinhuaGameMediator";
        return ZajinhuaGameMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaGameMediator = ZajinhuaGameMediator;
    __reflect(ZajinhuaGameMediator.prototype, "zajinhua.ZajinhuaGameMediator");
})(zajinhua || (zajinhua = {}));
