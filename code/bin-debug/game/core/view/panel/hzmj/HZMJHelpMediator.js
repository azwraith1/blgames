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
    var HZMJHelpMediator = (function (_super) {
        __extends(HZMJHelpMediator, _super);
        function HZMJHelpMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, HZMJHelpMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        HZMJHelpMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_HZMJ_HELP,
                PanelNotify.CLOSE_HZMJ_HELP
            ];
        };
        HZMJHelpMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HZMJHelpMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HZMJHelpPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        HZMJHelpMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_HZMJ_HELP:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_HZMJ_HELP:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HZMJHelpMediator.NAME = "HZMJHelpMediator";
        return HZMJHelpMediator;
    }(BaseMediator));
    majiang.HZMJHelpMediator = HZMJHelpMediator;
    __reflect(HZMJHelpMediator.prototype, "majiang.HZMJHelpMediator");
})(majiang || (majiang = {}));
