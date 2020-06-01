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
    var HZMJGameRecordMediator = (function (_super) {
        __extends(HZMJGameRecordMediator, _super);
        function HZMJGameRecordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, HZMJGameRecordMediator.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        HZMJGameRecordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_DZMJRECORD,
                PanelNotify.CLOSE_DZMJRECORD
            ];
        };
        HZMJGameRecordMediator.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        HZMJGameRecordMediator.prototype.showViewComponent = function () {
            if (this.viewComponent) {
                return;
            }
            this.viewComponent = new majiang.HZMJGameRecordPanel();
            this.showUI(this.viewComponent, false, 0, 0, 0);
        };
        HZMJGameRecordMediator.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_HZMJRECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent();
                    }
                    break;
                case PanelNotify.CLOSE_HZMJRECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        HZMJGameRecordMediator.NAME = "HZMJGameRecordMediator";
        return HZMJGameRecordMediator;
    }(BaseMediator));
    majiang.HZMJGameRecordMediator = HZMJGameRecordMediator;
    __reflect(HZMJGameRecordMediator.prototype, "majiang.HZMJGameRecordMediator");
})(majiang || (majiang = {}));
