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
    var ZajinhuaMatchingMediator = (function (_super) {
        __extends(ZajinhuaMatchingMediator, _super);
        function ZajinhuaMatchingMediator() {
            var _this = _super.call(this, ZajinhuaMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        ZajinhuaMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_ZJH_MATCHING,
                SceneNotify.CLOSE_ZJH_MATCHING
            ];
        };
        ZajinhuaMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        ZajinhuaMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            //egret.MainContext.instance.stage.setContentSize(720, 1280);
            this.viewComponent = new zajinhua.ZajinhuaMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        ZajinhuaMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_ZJH_MATCHING:
                    RotationLoading.instance.load(["zhajinhua_game"], "", function () {
                        RES.loadGroup("zhajinhua_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_ZJH_MATCHING:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        ZajinhuaMatchingMediator.NAME = "ZajinhuaMatchingMediator";
        return ZajinhuaMatchingMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaMatchingMediator = ZajinhuaMatchingMediator;
    __reflect(ZajinhuaMatchingMediator.prototype, "zajinhua.ZajinhuaMatchingMediator");
})(zajinhua || (zajinhua = {}));
