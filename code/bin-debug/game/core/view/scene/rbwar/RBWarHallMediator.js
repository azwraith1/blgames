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
var rbwar;
(function (rbwar) {
    var RBWarHallMediator = (function (_super) {
        __extends(RBWarHallMediator, _super);
        function RBWarHallMediator() {
            var _this = _super.call(this, RBWarHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        RBWarHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_RBWAR_HALL,
                SceneNotify.CLOSE_RBWAR_HALL
            ];
        };
        RBWarHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new rbwar.RBWarGameMediator());
            this.facade.registerMediator(new rbwar.RBWRecordMediator());
            this.facade.registerMediator(new rbwar.RBWSetMediator());
        };
        /**
     * 固有写法
     */
        RBWarHallMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(1);
            this.viewComponent = new rbwar.RBWarHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        RBWarHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_RBWAR_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_RBWAR_HALL:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        RBWarHallMediator.NAME = "RBWarHallMediator";
        return RBWarHallMediator;
    }(BaseMediator));
    rbwar.RBWarHallMediator = RBWarHallMediator;
    __reflect(RBWarHallMediator.prototype, "rbwar.RBWarHallMediator");
})(rbwar || (rbwar = {}));
