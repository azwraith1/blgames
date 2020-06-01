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
var HelpMediatorHorizon = (function (_super) {
    __extends(HelpMediatorHorizon, _super);
    function HelpMediatorHorizon(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, HelpMediatorHorizon.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    HelpMediatorHorizon.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_HELP_SHU_HORIZON,
            PanelNotify.CLOSE_HELP_SHU_HORIZON
        ];
    };
    HelpMediatorHorizon.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    HelpMediatorHorizon.prototype.showViewComponent = function (type) {
        var _this = this;
        game.UIUtils.changeResize(1);
        if (this.viewComponent) {
            return;
        }
        RotationLoading.instance.load(["help"], "", function () {
            _this.viewComponent = new HelpPanelHorizon(type);
            LogUtils.logD("横板" + _this.viewComponent.skinName + "宽:" + _this.viewComponent.width, "高：" + _this.viewComponent.height);
            _this.showUI(_this.viewComponent, false, 0, 0, 0);
        });
    };
    HelpMediatorHorizon.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_HELP_SHU_HORIZON:
                var type = notification.getBody().type;
                this.showViewComponent(type);
                break;
            case PanelNotify.CLOSE_HELP_SHU_HORIZON:
                this.closeViewComponent(1);
                break;
        }
    };
    HelpMediatorHorizon.NAME = "HelpMediatorHorizon";
    return HelpMediatorHorizon;
}(BaseMediator));
__reflect(HelpMediatorHorizon.prototype, "HelpMediatorHorizon");
