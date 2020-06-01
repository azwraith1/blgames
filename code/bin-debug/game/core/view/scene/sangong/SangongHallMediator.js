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
    var SangongHallMediator = (function (_super) {
        __extends(SangongHallMediator, _super);
        function SangongHallMediator() {
            var _this = _super.call(this, SangongHallMediator.NAME) || this;
            _this.type = "scene";
            return _this;
        }
        SangongHallMediator.prototype.listNotificationInterests = function () {
            return [
                SceneNotify.OPEN_SANGONG_HALL,
                SceneNotify.CLOSE_SANGONG_HALL
            ];
        };
        SangongHallMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
            this.facade.registerMediator(new sangong.SangongGameMediator);
            this.facade.registerMediator(new sangong.SangongMatchingMediator);
        };
        /**
     * 固有写法
     */
        SangongHallMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            game.UIUtils.changeResize(2);
            this.viewComponent = new sangong.SangongHallScene();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SangongHallMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case SceneNotify.OPEN_SANGONG_HALL:
                    this.showViewComponent();
                    break;
                case SceneNotify.CLOSE_SANGONG_HALL:
                    if (this.viewComponent) {
                        this.closeViewComponent(1);
                    }
                    break;
            }
        };
        SangongHallMediator.NAME = "SangongHallMediator";
        return SangongHallMediator;
    }(BaseMediator));
    sangong.SangongHallMediator = SangongHallMediator;
    __reflect(SangongHallMediator.prototype, "sangong.SangongHallMediator");
})(sangong || (sangong = {}));
