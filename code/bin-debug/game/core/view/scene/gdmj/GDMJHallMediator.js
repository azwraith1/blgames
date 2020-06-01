/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:21
 @Description: 选择游戏场景控制层
 */
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
var GDMJHallMediator = (function (_super) {
    __extends(GDMJHallMediator, _super);
    function GDMJHallMediator() {
        var _this = _super.call(this, GDMJHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    GDMJHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_GDMJ_HALL,
            SceneNotify.CLOSE_GDMJ_HALL
        ];
    };
    GDMJHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new majiang.GDMJGameMediator());
        this.facade.registerMediator(new majiang.GDMJMatchingMediator());
        this.facade.registerMediator(new majiang.GDMJOverMediator());
    };
    /**
     * 固有写法
     */
    GDMJHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new GDMJHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    GDMJHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_GDMJ_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_GDMJ_HALL:
                this.closeViewComponent(1);
                break;
        }
    };
    GDMJHallMediator.NAME = "GDMJHallMediator";
    return GDMJHallMediator;
}(BaseMediator));
__reflect(GDMJHallMediator.prototype, "GDMJHallMediator");
