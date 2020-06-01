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
var rbwar;
(function (rbwar) {
    var RBWSetMediator = (function (_super) {
        __extends(RBWSetMediator, _super);
        function RBWSetMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, RBWSetMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        RBWSetMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RBWARSET,
                PanelNotify.CLOSE_RBWARSET
            ];
        };
        RBWSetMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        RBWSetMediator.prototype.showViewComponent = function () {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new rbwar.RBWSetPanl();
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        RBWSetMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_RBWARSET:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_RBWARSET:
                    this.closeViewComponent(1);
                    break;
            }
        };
        RBWSetMediator.NAME = "RBWSetMediator";
        return RBWSetMediator;
    }(BaseMediator));
    rbwar.RBWSetMediator = RBWSetMediator;
    __reflect(RBWSetMediator.prototype, "rbwar.RBWSetMediator");
})(rbwar || (rbwar = {}));
