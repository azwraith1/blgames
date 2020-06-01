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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// TypeScript file
var ClubListItem = (function (_super) {
    __extends(ClubListItem, _super);
    function ClubListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubListItemSkin" + CF.tis;
        return _this;
    }
    ClubListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        // this.clubItemGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.joinThisClub, this);
        // this.quitClubBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quitClub, this);
    };
    ClubListItem.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.touchRect:
                this.joinThisClub();
                break;
            case this.quitClubBtn:
                this.quitClub();
                break;
        }
    };
    ClubListItem.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_HALL_QUIT, this.quit, this);
    };
    ClubListItem.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        // this.clubItemGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.joinThisClub, this);
        // this.quitClubBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.quitClub, this);
        CF.rE(ENo.CLUB_HALL_QUIT, this.quit, this);
    };
    ClubListItem.prototype.dataChanged = function () {
        this.updateShow(this.data);
    };
    ClubListItem.prototype.joinThisClub = function () {
        var _this = this;
        ClubConfigPanel.clubId = this.thisClubiD;
        egret.Tween.get(this.clubItemGroup).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(function () {
            CF.dP(ENo.CLUB_JOIN_CLUB, { club: _this.data });
        });
    };
    ClubListItem.prototype.updateShow = function (data) {
        if (data) {
            this.clubContains.text = "" + data.playerNum;
            this.clubCreator.text = "" + data.clubCreator;
            this.clubId.text = data.clubId + "";
            this.thisClubiD = data.clubId;
            this.clubName.text = data.name + "";
            this.clubIcon.source = "club_icon_" + data.iconId + "_png";
            this.clubDesks.text = data.tableNum + "";
            this.clubIden.text = "" + this.clubrole(data.role) + "";
        }
    };
    ClubListItem.prototype.clubrole = function (role) {
        switch (role) {
            case 1:
                return TextUtils.instance.getCurrentTextById(45);
            case 2:
                return TextUtils.instance.getCurrentTextById(46);
            case 3:
                this.quitClubBtn.visible = true;
                return TextUtils.instance.getCurrentTextById(47);
        }
    };
    ClubListItem.prototype.quitClub = function () {
        CF.dP(ENo.CLUB_HALL_QUIT_TOUCH, { clubId: this.thisClubiD });
    };
    ClubListItem.prototype.quit = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data1, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data1 = { clubId: e.data.clubId };
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_quitClub, data1)];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            if (resp.error && (resp.error.code != 0)) {
                                if (resp.error.code == ErrorCode.BUSY_REQUEST) {
                                    return [2 /*return*/];
                                }
                                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                return [2 /*return*/];
                            }
                            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
                            if (ClubQuitTips._instance) {
                                game.UIUtils.removeSelf(ClubQuitTips._instance);
                                ClubQuitTips._instance = null;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClubListItem;
}(game.BaseItemRender));
__reflect(ClubListItem.prototype, "ClubListItem");
