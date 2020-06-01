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
    var DZMJGameRecordMediator = (function (_super) {
        __extends(DZMJGameRecordMediator, _super);
        function DZMJGameRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, DZMJGameRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        DZMJGameRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_DZMJRECORD,
                PanelNotify.CLOSE_DZMJRECORD
            ];
        };
        DZMJGameRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        DZMJGameRecordMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new dzmj.DZMJGameRecordPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        DZMJGameRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_DZMJRECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_DZMJRECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        DZMJGameRecordMediator.NAME = "DZMJGameRecordMediator";
        return DZMJGameRecordMediator;
    }(BaseMediator));
    dzmj.DZMJGameRecordMediator = DZMJGameRecordMediator;
    __reflect(DZMJGameRecordMediator.prototype, "dzmj.DZMJGameRecordMediator");
})(dzmj || (dzmj = {}));
