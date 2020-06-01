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
    var RBWRecordMediator = (function (_super) {
        __extends(RBWRecordMediator, _super);
        function RBWRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, RBWRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        RBWRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_RBWARJL,
                PanelNotify.CLOSE_RBWARJL
            ];
        };
        RBWRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        RBWRecordMediator.prototype.showViewComponent = function () {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoading.instance.load(["record"], "", function () {
                _this.viewComponent = new rbwar.RBWRecordPanl();
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        RBWRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_RBWARJL:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_RBWARJL:
                    this.closeViewComponent(1);
                    break;
            }
        };
        RBWRecordMediator.NAME = "RBWRecordMediator";
        return RBWRecordMediator;
    }(BaseMediator));
    rbwar.RBWRecordMediator = RBWRecordMediator;
    __reflect(RBWRecordMediator.prototype, "rbwar.RBWRecordMediator");
})(rbwar || (rbwar = {}));
