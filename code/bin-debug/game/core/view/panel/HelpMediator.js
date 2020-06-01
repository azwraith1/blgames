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
 * @Author: he bing
 * @Date: 2018-07-31 15:26:27
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-27 11:19:36
 * @Description:
 */
var HelpMediator = (function (_super) {
    __extends(HelpMediator, _super);
    function HelpMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, HelpMediator.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    HelpMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_HELP,
            PanelNotify.CLOSE_HELP
        ];
    };
    HelpMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    HelpMediator.prototype.showViewComponent = function (type) {
        if (type === void 0) { type = 7; }
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new HelpPanel();
        this.showUI(this.viewComponent, false, 0, 0, 0);
    };
    HelpMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_HELP:
                this.showViewComponent();
                break;
            case PanelNotify.CLOSE_HELP:
                this.closeViewComponent(1);
                break;
        }
    };
    HelpMediator.NAME = "HelpMediator";
    return HelpMediator;
}(BaseMediator));
__reflect(HelpMediator.prototype, "HelpMediator");
