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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaHelpMediator = (function (_super) {
        __extends(ZajinhuaHelpMediator, _super);
        function ZajinhuaHelpMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ZajinhuaHelpMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        ZajinhuaHelpMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_ZJHHELP,
                PanelNotify.CLOSE_ZJHHELP
            ];
        };
        ZajinhuaHelpMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ZajinhuaHelpMediator.prototype.showViewComponent = function () {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new zajinhua.ZajinhuaHelpPanl();
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        ZajinhuaHelpMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJHHELP:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_ZJHHELP:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ZajinhuaHelpMediator.NAME = "ZajinhuaHelpMediator";
        return ZajinhuaHelpMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaHelpMediator = ZajinhuaHelpMediator;
    __reflect(ZajinhuaHelpMediator.prototype, "zajinhua.ZajinhuaHelpMediator");
})(zajinhua || (zajinhua = {}));
