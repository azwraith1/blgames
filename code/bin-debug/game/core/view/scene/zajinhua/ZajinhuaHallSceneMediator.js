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
    var ZajinhuaHallSceneMediator = (function (_super) {
        __extends(ZajinhuaHallSceneMediator, _super);
        function ZajinhuaHallSceneMediator() {
            var _this = _super.call(this, ZajinhuaHallSceneMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ZajinhuaHallSceneMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ZJHSELECT,
                SceneNotify.CLOSE_ZJHSELECT
            ];
        };
        ZajinhuaHallSceneMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new zajinhua.ZajinhuaGameMediator());
            this.facade.registerMediator(new zajinhua.ZajinhuaMatchingMediator());
            this.facade.registerMediator(new zajinhua.ZajinhuaHelpMediator());
            this.facade.registerMediator(new zajinhua.ZajinhuaRecordMediator());
            this.facade.registerMediator(new zajinhua.ZajinhuaSetMediator());
        };
        /**
     * 固有写法
     */
        ZajinhuaHallSceneMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            //egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new zajinhua.ZajinhuaHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ZajinhuaHallSceneMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_ZJHSELECT:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_ZJHSELECT:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        ZajinhuaHallSceneMediator.NAME = "ZajinhuaHallSceneMediator";
        return ZajinhuaHallSceneMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaHallSceneMediator = ZajinhuaHallSceneMediator;
    __reflect(ZajinhuaHallSceneMediator.prototype, "zajinhua.ZajinhuaHallSceneMediator");
})(zajinhua || (zajinhua = {}));
