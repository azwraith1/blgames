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
    var NiuniuHallMediator_Landscape = (function (_super) {
        __extends(NiuniuHallMediator_Landscape, _super);
        function NiuniuHallMediator_Landscape() {
            var _this = _super.call(this, NiuniuHallMediator_Landscape.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        NiuniuHallMediator_Landscape.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE,
                SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE
            ];
        };
        NiuniuHallMediator_Landscape.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new niuniu.NiuniuSGameMediator());
            this.facade.registerMediator(new niuniu.NiuniuMatchingMediator());
            this.facade.registerMediator(new niuniu.NiuniuRecordMeditorHorizon());
        };
        /**
     * 固有写法
     */
        NiuniuHallMediator_Landscape.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new niuniu.NiuniuHallScene_Landscape();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        NiuniuHallMediator_Landscape.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_NIUNIUSELECT_LANDSCAPE:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_NIUNIUSELECT_LANDSCAPE:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        NiuniuHallMediator_Landscape.NAME = "NiuniuHallMediator_Landscape";
        return NiuniuHallMediator_Landscape;
    }(BaseMediator));
    niuniu.NiuniuHallMediator_Landscape = NiuniuHallMediator_Landscape;
    __reflect(NiuniuHallMediator_Landscape.prototype, "niuniu.NiuniuHallMediator_Landscape");
})(niuniu || (niuniu = {}));
