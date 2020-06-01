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
/*
 * @Author: real MC Lee
 * @Date: 2019-05-29 11:45:07
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-12-13 16:26:25
 * @Description:
 */
var slot;
(function (slot) {
    var SlotRankPanelMediator = (function (_super) {
        __extends(SlotRankPanelMediator, _super);
        function SlotRankPanelMediator() {
            var _this = _super.call(this, SlotRankPanelMediator.NAME) || this;
            _this.type = "panel";
            return _this;
        }
        SlotRankPanelMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_SLOT_RANK,
                PanelNotify.CLOSE_SLOT_RANK
            ];
        };
        SlotRankPanelMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        SlotRankPanelMediator.prototype.showViewComponent = function () {
            game.UIUtils.changeResize(1);
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new slot.SlotRankPanel();
            var sceneLayer = GameLayerManager.gameLayer().sceneLayer;
            sceneLayer.addChild(this.viewComponent);
        };
        SlotRankPanelMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_SLOT_RANK:
                    this.showViewComponent();
                    break;
                case PanelNotify.CLOSE_SLOT_RANK:
                    this.closeViewComponent(1);
                    break;
            }
        };
        SlotRankPanelMediator.NAME = "SlotRankPanelMediator";
        return SlotRankPanelMediator;
    }(BaseMediator));
    slot.SlotRankPanelMediator = SlotRankPanelMediator;
    __reflect(SlotRankPanelMediator.prototype, "slot.SlotRankPanelMediator");
})(slot || (slot = {}));
