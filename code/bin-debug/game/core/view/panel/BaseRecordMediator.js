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
var BaseRecordMediator = (function (_super) {
    __extends(BaseRecordMediator, _super);
    function BaseRecordMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        var _this = _super.call(this, BaseRecordMediator.NAME, viewComponent) || this;
        _this.type = "panel";
        return _this;
    }
    BaseRecordMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_BASE_RECORD,
            PanelNotify.CLOSE_BASE_RECORD
        ];
    };
    BaseRecordMediator.prototype.onRegister = function () {
        _super.prototype.onRegister.call(this);
    };
    BaseRecordMediator.prototype.showViewComponent = function (gameId) {
        if (this.viewComponent) {
            return;
        }
        switch (gameId) {
            case Global.gameProxy.gameIds["blackjack"]:
            case "blackjack":
            case 10024:
            case 10025:
                this.viewComponent = new BlackJRecordPanel(gameId);
                break;
            case "dzmj":
            case "gdmj":
                this.viewComponent = new BaseMajiangRecordScene(gameId);
                break;
            default:
                this.viewComponent = new BaseMajiangRecordScene(gameId);
                break;
        }
        if (this.viewComponent) {
            this.showUI(this.viewComponent, false, 0, 0, 0);
        }
    };
    BaseRecordMediator.prototype.handleNotification = function (notification) {
        var _this = this;
        switch (notification.getName()) {
            case PanelNotify.OPEN_BASE_RECORD:
                var inded_1 = notification.getBody();
                if (GameConfig.CURRENT_ISSHU) {
                    this.showViewComponent(inded_1);
                }
                else {
                    RotationLoading.instance.load(["majiang_common"], "", function () {
                        _this.showViewComponent(inded_1);
                    });
                }
                break;
            case PanelNotify.CLOSE_BASE_RECORD:
                this.closeViewComponent(0);
                break;
        }
    };
    BaseRecordMediator.NAME = "BaseRecordMediator";
    return BaseRecordMediator;
}(BaseMediator));
__reflect(BaseRecordMediator.prototype, "BaseRecordMediator");
