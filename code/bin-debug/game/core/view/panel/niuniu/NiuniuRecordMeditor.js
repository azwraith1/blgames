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
var niuniu;
(function (niuniu) {
    var NiuniuRecordMeditor = (function (_super) {
        __extends(NiuniuRecordMeditor, _super);
        function NiuniuRecordMeditor(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, NiuniuRecordMeditor.NAME, viewComponent) || this;
            _this.type = "panel";
            return _this;
        }
        NiuniuRecordMeditor.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_NIUGAMERECORD,
                PanelNotify.CLOSE_NIUGAMERECORD
            ];
        };
        NiuniuRecordMeditor.prototype.onRegister = function () {
            _super.prototype.onRegister.call(this);
        };
        NiuniuRecordMeditor.prototype.showViewComponent = function (num) {
            var _this = this;
            if (this.viewComponent) {
                return;
            }
            RotationLoadingShu.instance.load(["record"], "", function () {
                _this.viewComponent = new niuniu.NiuniuRecordPanl(num);
                _this.showUI(_this.viewComponent, false, 0, 0, 0);
            });
        };
        NiuniuRecordMeditor.prototype.handleNotification = function (notification) {
            switch (notification.getName()) {
                case PanelNotify.OPEN_NIUGAMERECORD:
                    if (this.viewComponent) {
                        return;
                    }
                    else {
                        this.showViewComponent(notification.getBody());
                    }
                    break;
                case PanelNotify.CLOSE_NIUGAMERECORD:
                    this.closeViewComponent(1);
                    break;
            }
        };
        NiuniuRecordMeditor.NAME = "NiuniuRecordMeditor";
        return NiuniuRecordMeditor;
    }(BaseMediator));
    niuniu.NiuniuRecordMeditor = NiuniuRecordMeditor;
    __reflect(NiuniuRecordMeditor.prototype, "niuniu.NiuniuRecordMeditor");
})(niuniu || (niuniu = {}));
