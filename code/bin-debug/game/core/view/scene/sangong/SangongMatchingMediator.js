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
var sangong;
(function (sangong) {
    var SangongMatchingMediator = (function (_super) {
        __extends(SangongMatchingMediator, _super);
        function SangongMatchingMediator() {
            var _this = _super.call(this, SangongMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SangongMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SANGONG_WATING,
                SceneNotify.CLOSE_SANGONG_WATING
            ];
        };
        SangongMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        SangongMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            this.viewComponent = new sangong.SangongMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SangongMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_SANGONG_WATING:
                    RotationLoadingShu.instance.load(["sangong_game"], "", function () {
                        RES.loadGroup("sangong_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_SANGONG_WATING:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        SangongMatchingMediator.NAME = "SangongMatchingMediator";
        return SangongMatchingMediator;
    }(BaseMediator));
    sangong.SangongMatchingMediator = SangongMatchingMediator;
    __reflect(SangongMatchingMediator.prototype, "sangong.SangongMatchingMediator");
})(sangong || (sangong = {}));
