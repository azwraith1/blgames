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
var niuniu;
(function (niuniu) {
    var NiuniuJSMatchingMediator = (function (_super) {
        __extends(NiuniuJSMatchingMediator, _super);
        function NiuniuJSMatchingMediator() {
            var _this = _super.call(this, NiuniuJSMatchingMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        NiuniuJSMatchingMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_NIUNIU_JSMATCHING,
                SceneNotify.CLOSE_NIUNIU_JSMATCHING
            ];
        };
        NiuniuJSMatchingMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        /**
     * 固有写法
     */
        NiuniuJSMatchingMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            this.viewComponent = new niuniu.NiuniuJSMatchingScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NiuniuJSMatchingMediator.prototype.handleNotification = function (notification) {
            var _this = this;
            switch (notification.getName()) {
                case SceneNotify.OPEN_NIUNIU_JSMATCHING:
                    RotationLoadingShu.instance.load(["niuniu_game"], "", function () {
                        RES.loadGroup("niuniu_back");
                        _this.showViewComponent();
                    });
                    break;
                case SceneNotify.CLOSE_NIUNIU_JSMATCHING:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        NiuniuJSMatchingMediator.NAME = "NiuniuJSMatchingMediator";
        return NiuniuJSMatchingMediator;
    }(BaseMediator));
    niuniu.NiuniuJSMatchingMediator = NiuniuJSMatchingMediator;
    __reflect(NiuniuJSMatchingMediator.prototype, "niuniu.NiuniuJSMatchingMediator");
})(niuniu || (niuniu = {}));
