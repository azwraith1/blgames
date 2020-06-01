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
var ClubHallMediator = (function (_super) {
    __extends(ClubHallMediator, _super);
    function ClubHallMediator() {
        var _this = _super.call(this, ClubHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    ClubHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_CLUB_HALL,
            SceneNotify.CLOSE_CLUB_HALL
        ];
    };
    ClubHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new MainHallMediator());
        this.facade.registerMediator(new SettingMediator());
    };
    ClubHallMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new ClubHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    ClubHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_CLUB_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_CLUB_HALL:
                this.closeViewComponent(1);
                break;
        }
    };
    ClubHallMediator.NAME = "ClubHallMediator";
    return ClubHallMediator;
}(BaseMediator));
__reflect(ClubHallMediator.prototype, "ClubHallMediator");
