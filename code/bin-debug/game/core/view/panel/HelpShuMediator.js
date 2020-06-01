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
var HelpShuMediator = (function (_super) {
    __extends(HelpShuMediator, _super);
    function HelpShuMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, HelpShuMediator.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    HelpShuMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_HELP_SHU,
            PanelNotify.CLOSE_HELP_SHU
        ];
    };
    HelpShuMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    HelpShuMediator.prototype.showViewComponent = function (type) {
        var _this = this;
        if (this.viewComponent) {
            return;
        }
        RotationLoadingShu.instance.load(["help"], "", function () {
            _this.viewComponent = new HelpShuPanel(type);
            _this.showUI(_this.viewComponent, false, 0, 0, 0);
        });
    };
    HelpShuMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_HELP_SHU:
                var type = notification.getBody().type;
                this.showViewComponent(type);
                break;
            case PanelNotify.CLOSE_HELP_SHU:
                this.closeViewComponent(1);
                break;
        }
    };
    HelpShuMediator.NAME = "HelpShuMediator";
    return HelpShuMediator;
}(BaseMediator));
__reflect(HelpShuMediator.prototype, "HelpShuMediator");
