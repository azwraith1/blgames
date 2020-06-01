/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:36:22
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-10-10 18:31:35
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
var HNMJHallMediator = (function (_super) {
    __extends(HNMJHallMediator, _super);
    function HNMJHallMediator() {
        var _this = _super.call(this, HNMJHallMediator.NAME) || this;
        _this.type = "scene";
        return _this;
    }
    HNMJHallMediator.prototype.listNotificationInterests = function () {
        return [
            SceneNotify.OPEN_HNMJ_HALL,
            SceneNotify.CLOSE_HNMJ_HALL
        ];
    };
    HNMJHallMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
        this.facade.registerMediator(new majiang.HNMJGameMediator());
        this.facade.registerMediator(new majiang.HNMJMatchingMediator());
        this.facade.registerMediator(new majiang.HNMJOverMediator());
    };
    /**
     * 固有写法
     */
    HNMJHallMediator.prototype.showViewComponent = function () {
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new HNMJHallScene();
        var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
        sceneLayer.addChild(this.viewComponent);
    };
    HNMJHallMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case SceneNotify.OPEN_HNMJ_HALL:
                this.showViewComponent();
                break;
            case SceneNotify.CLOSE_HNMJ_HALL:
                this.closeViewComponent(1);
                break;
        }
    };
    HNMJHallMediator.NAME = "HNMJHallMediator";
    return HNMJHallMediator;
}(BaseMediator));
__reflect(HNMJHallMediator.prototype, "HNMJHallMediator");
