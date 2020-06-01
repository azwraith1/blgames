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
/*
 * @Author: he bing
 * @Date: 2018-07-31 15:56:09
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-27 11:22:59
 * @Description:
 */
var SettingMediator = (function (_super) {
    __extends(SettingMediator, _super);
    function SettingMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, SettingMediator.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    SettingMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_SETTING,
            PanelNotify.CLOSE_SETTING
        ];
    };
    SettingMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    SettingMediator.prototype.showViewComponent = function (setIndex) {
        var _this = this;
        if (this.viewComponent) {
            return;
        }
        if (GameConfig.CURRENT_ISSHU) {
            RotationLoadingShu.instance.load(["set"], "", function () {
                _this.viewComponent = new SettingPanel(setIndex);
                _this.showUI(_this.viewComponent, false, 0, 0, 66);
            });
            return;
        }
        else {
            RotationLoading.instance.load(["set"], "", function () {
                _this.viewComponent = new SettingPanel(setIndex);
                _this.showUI(_this.viewComponent, false, 0, 0, 66);
            });
        }
    };
    SettingMediator.prototype.handleNotification = function (notification) {
        switch (notification.getName()) {
            case PanelNotify.OPEN_SETTING:
                if (!notification.getBody()) {
                    notification.setBody({});
                }
                var setIndex = notification.getBody().setIndex;
                this.showViewComponent(setIndex);
                break;
            case PanelNotify.CLOSE_SETTING:
                this.closeViewComponent(0);
                break;
        }
    };
    SettingMediator.NAME = "SettingMediator";
    return SettingMediator;
}(BaseMediator));
__reflect(SettingMediator.prototype, "SettingMediator");
