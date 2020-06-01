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
var majiang;
(function (majiang) {
    var HZMJHallMedior = (function (_super) {
        __extends(HZMJHallMedior, _super);
        function HZMJHallMedior() {
            var _this = _super.call(this, HZMJHallMedior.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        HZMJHallMedior.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_HZMJ_HALL,
                SceneNotify.CLOSE_HZMJ_HALL
            ];
        };
        HZMJHallMedior.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new majiang.HZMJGameMediator());
            this.facade.registerMediator(new majiang.HZMJMathingMedior());
            this.facade.registerMediator(new majiang.HZMJOverMedior());
            this.facade.registerMediator(new majiang.HZMJGameRecordMediator());
            this.facade.registerMediator(new majiang.HZMJHelpMediator());
        };
        /**
         * 固有写法
         */
        HZMJHallMedior.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HZMJHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        HZMJHallMedior.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_HZMJ_HALL:
                    RES.loadGroup("majiang_game");
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_HZMJ_HALL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HZMJHallMedior.NAME = "HZMJHallMediator";
        return HZMJHallMedior;
    }(BaseMediator));
    majiang.HZMJHallMedior = HZMJHallMedior;
    __reflect(HZMJHallMedior.prototype, "majiang.HZMJHallMedior");
})(majiang || (majiang = {}));
