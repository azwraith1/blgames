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
    var NiuniuHallMediator = (function (_super) {
        __extends(NiuniuHallMediator, _super);
        function NiuniuHallMediator() {
            var _this = _super.call(this, NiuniuHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        NiuniuHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_NIUNIUSELECT,
                SceneNotify.CLOSE_NIUNIUSELECT
            ];
        };
        NiuniuHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new niuniu.NiuniuSGameMediator());
            this.facade.registerMediator(new niuniu.NiuniuJSGameMediator());
            this.facade.registerMediator(new niuniu.NiuniuJSMatchingMediator());
            this.facade.registerMediator(new niuniu.NiuniuMatchingMediator());
            this.facade.registerMediator(new niuniu.NiuniuRecordMeditor());
        };
        /**
     * 固有写法
     */
        NiuniuHallMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(2);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new niuniu.NiuniuHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NiuniuHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_NIUNIUSELECT:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_NIUNIUSELECT:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        NiuniuHallMediator.NAME = "NiuniuHallMediator";
        return NiuniuHallMediator;
    }(BaseMediator));
    niuniu.NiuniuHallMediator = NiuniuHallMediator;
    __reflect(NiuniuHallMediator.prototype, "niuniu.NiuniuHallMediator");
})(niuniu || (niuniu = {}));
