/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:30:40
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
var HBMJHallMediator = (function (_super) {
    __extends(HBMJHallMediator, _super);
    function HBMJHallMediator() {
        var _this = _super.call(this, HBMJHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    HBMJHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_HBMJ_HALL,
            SceneNotify.CLOSE_HBMJ_HALL
        ];
    };
    HBMJHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new majiang.HBMJGameMediator());
        this.facade.registerMediator(new majiang.HBMJMatchingMediator());
        this.facade.registerMediator(new majiang.HBMJOverMediator());
    };
    /**
     * 固有写法
     */
    HBMJHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new HBMJHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    HBMJHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_HBMJ_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_HBMJ_HALL:
                this.closeViewComponent(1);
                break;
        }
    };
    HBMJHallMediator.NAME = "HBMJHallMediator";
    return HBMJHallMediator;
}(BaseMediator));
__reflect(HBMJHallMediator.prototype, "HBMJHallMediator");
