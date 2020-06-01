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
    var GYZJHelpMediator = (function (_super) {
        __extends(GYZJHelpMediator, _super);
        function GYZJHelpMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, GYZJHelpMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        GYZJHelpMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_GYZJ_HELP,
                PanelNotify.CLOSE_GYZJ_HELP
            ];
        };
        GYZJHelpMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        GYZJHelpMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.GYZJHelpPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        GYZJHelpMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_GYZJ_HELP:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_GYZJ_HELP:
                    this.closeViewComponent(1);
                    break;
            }
        };
        GYZJHelpMediator.NAME = "GYZJHelpMediator";
        return GYZJHelpMediator;
    }(BaseMediator));
    majiang.GYZJHelpMediator = GYZJHelpMediator;
    __reflect(GYZJHelpMediator.prototype, "majiang.GYZJHelpMediator");
})(majiang || (majiang = {}));
