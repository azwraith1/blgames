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
    var ZajinhuaSetMediator = (function (_super) {
        __extends(ZajinhuaSetMediator, _super);
        function ZajinhuaSetMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ZajinhuaSetMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        ZajinhuaSetMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_ZJHSET,
                PanelNotify.CLOSE_ZJHSET
            ];
        };
        ZajinhuaSetMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        ZajinhuaSetMediator.prototype.showViewComponent = function () {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new zajinhua.ZajinhuaSetPanl();
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        ZajinhuaSetMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_ZJHSET:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                        //this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_ZJHSET:
                    this.closeViewComponent(1);
                    break;
            }
        };
        ZajinhuaSetMediator.NAME = "ZajinhuaSetMediator";
        return ZajinhuaSetMediator;
    }(BaseMediator));
    zajinhua.ZajinhuaSetMediator = ZajinhuaSetMediator;
    __reflect(ZajinhuaSetMediator.prototype, "zajinhua.ZajinhuaSetMediator");
})(zajinhua || (zajinhua = {}));
