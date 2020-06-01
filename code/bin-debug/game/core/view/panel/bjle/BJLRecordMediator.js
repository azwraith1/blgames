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
var BJLRecordMediator = (function (_super) {
    __extends(BJLRecordMediator, _super);
    function BJLRecordMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, BJLRecordMediator.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    BJLRecordMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_BJL_RECORD,
            PanelNotify.CLOSE_BJL_RECORD
        ];
    };
    BJLRecordMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    BJLRecordMediator.prototype.showViewComponent = function (num) {
        if (this.viewComponent) {
            return;
        }
        this.viewComponent = new BJLRecordPanel(num);
        this.showUI(this.viewComponent, false, 0, 0, 0);
    };
    BJLRecordMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_BJL_RECORD:
                if (this.viewComponent) {
                    return;
                }
                else {
                    this.showViewComponent(notification.getBody());
                }
                break;
            case PanelNotify.CLOSE_BJL_RECORD:
                this.closeViewComponent(1);
                break;
        }
    };
    BJLRecordMediator.NAME = "BJLRecordMediator";
    return BJLRecordMediator;
}(BaseMediator));
__reflect(BJLRecordMediator.prototype, "BJLRecordMediator");
