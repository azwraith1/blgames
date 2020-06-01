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
// TypeScript file
var UserHeaderMediator = (function (_super) {
    __extends(UserHeaderMediator, _super);
    function UserHeaderMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, UserHeaderMediator.NAME, viewComponent) || this;
        _this.type = "scene";
        return _this;
    }
    UserHeaderMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_HEADER,
            PanelNotify.CLOSE_HEADER
        ];
    };
    UserHeaderMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    UserHeaderMediator.prototype.showViewComponent = function () {
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new UserHeader();
        this.showUI(this.viewComponent, false, 0, 0, 1);
    };
    UserHeaderMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_HEADER:
                this.showViewComponent();
                break;
            case PanelNotify.CLOSE_HEADER:
                this.closeViewComponent(0);
                break;
        }
    };
    UserHeaderMediator.NAME = "UserHeaderMediator";
    return UserHeaderMediator;
}(BaseMediator));
__reflect(UserHeaderMediator.prototype, "UserHeaderMediator");
