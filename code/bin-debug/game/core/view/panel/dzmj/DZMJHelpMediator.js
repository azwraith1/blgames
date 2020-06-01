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
var dzmj;
(function (dzmj) {
    var DZMJHelpMediator = (function (_super) {
        __extends(DZMJHelpMediator, _super);
        function DZMJHelpMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, DZMJHelpMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        DZMJHelpMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_DZMJ_HELP,
                PanelNotify.CLOSE_DZMJ_HELP
            ];
        };
        DZMJHelpMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DZMJHelpMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new dzmj.DZMJHelpPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        DZMJHelpMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_DZMJ_HELP:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_DZMJ_HELP:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DZMJHelpMediator.NAME = "DZMJHelpMediator";
        return DZMJHelpMediator;
    }(BaseMediator));
    dzmj.DZMJHelpMediator = DZMJHelpMediator;
    __reflect(DZMJHelpMediator.prototype, "dzmj.DZMJHelpMediator");
})(dzmj || (dzmj = {}));
