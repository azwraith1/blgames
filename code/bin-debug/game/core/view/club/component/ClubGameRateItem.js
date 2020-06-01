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
var ClubGameRateItem = (function (_super) {
    __extends(ClubGameRateItem, _super);
    function ClubGameRateItem() {
        var _this = _super.call(this) || this;
        _this.per = "%";
        _this.clubItems = [];
        _this.isLock = false;
        _this.isSaveLock = false;
        _this.isSave = false;
        return _this;
        //this.skinName = "ClubGameRateSkin";
    }
    /**隐藏税率设置 */
    ClubGameRateItem.prototype.hideRateSet = function (isShow) {
        this.clubSetTitle.visible = isShow;
        this.ClubRateShowItemGroup.visible = isShow;
        this.setBtn.visible = isShow;
    };
    ClubGameRateItem.prototype.flushUI = function () {
        this.ClubRateShowItemGroup.removeChildren();
        this.clubItems = [];
        var clubIds = ClubManager.instance.clubIds;
        for (var i = 0; i < clubIds.length; i++) {
            var item = new ClubRateShowItem(clubIds[i]);
            this.ClubRateShowItemGroup.addChild(item);
            this.clubItems.push(item);
        }
    };
    ClubGameRateItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.inPutGold.addEventListener(egret.Event.CHANGE, this.onChange, this);
        this.initInputGold();
    };
    ClubGameRateItem.prototype.onChange = function (e) {
        this.inPutGold.text = Owen.UtilsString.ForceTrim(this.inPutGold.text, 1);
    };
    ClubGameRateItem.prototype.initInputGold = function () {
        var editable = this.inPutGold.textDisplay;
        this.inPutGold.restrict = ".0-9";
        editable.textColor = 0xad5f34;
        editable.size = 24;
    };
    ClubGameRateItem.prototype.onTouchTap = function (e) {
        _super.prototype.onTouchTap.call(this, e);
        if (e.target != this.setBtn)
            this.clubRate.visible = false;
        if (e.target == this.touchTiQu)
            this.tiQuTip.visible = false;
        e.stopPropagation();
        switch (e.target) {
            case this.saveBtn:
                if (this.isSaveLock)
                    return;
                this.setClubConfig();
                break;
            case this.setBtn:
                this.clubRate.visible = true;
                this.clubRate.flushInputRate(this.inputRateValue);
                break;
            case this.okBtn:
                this.receiveClubIncome();
                this.tiQuTip.visible = false;
                break;
            case this.tiQuBtn:
                this.tiQuTip.visible = true;
                this.inPutGold.text = this.incomeGoldTxt.text;
                break;
        }
    };
    /**获取金币 */
    ClubGameRateItem.prototype.getClubIncome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hander = ServerPostPath.hall_clubHandler_c_getClubIncomeInfo;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, {})];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                        }
                        else {
                            LogUtils.logD("getClubIncome" + JSON.stringify(resp));
                            this.incomeGoldTxt.text = "" + resp["curGainGold"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**领取金币 */
    ClubGameRateItem.prototype.receiveClubIncome = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, val, msg, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hander = ServerPostPath.hall_clubHandler_c_receiveClubIncome;
                        val = Number(this.inPutGold.text);
                        msg = {
                            "receiveGold": val
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, msg)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            Toast.launch(TextUtils.instance.getCurrentTextById(25), 1);
                            LogUtils.logD("receiveClubIncome" + JSON.stringify(resp));
                            Global.playerProxy.playerData.gold = resp["ownGold"];
                            CF.dP(ServerNotify.s_payGold, { "ownGold": resp["ownGold"] });
                            this.incomeGoldTxt.text = "" + resp["curGainGold"];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(ClubGameRateItem.prototype, "requestLock", {
        get: function () {
            return this.isLock;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClubGameRateItem.prototype, "inputRateValue", {
        get: function () {
            var rateData = {};
            for (var i = 0; i < this.clubItems.length; ++i) {
                var club = this.clubItems[i];
                rateData[club.gameId] = club.rateVal;
            }
            return rateData;
        },
        enumerable: true,
        configurable: true
    });
    ClubGameRateItem.prototype.getClubConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, resp, gameClubPumpRates, i, club;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLock = true;
                        this.clubRate.flushUI();
                        hander = ServerPostPath.hall_clubHandler_c_getClubConfig;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp.error && resp.error.code != 0) {
                            this.panel.hide();
                            Toast.launch(resp.error.msg, 1);
                            // return;
                        }
                        else {
                            GameLayerManager.gameLayer().panelLayer.addChild(this.panel);
                            LogUtils.logD("getClubConfig" + JSON.stringify(resp));
                            this.resp = resp;
                            gameClubPumpRates = resp["gameClubPumpRates"];
                            this.hideRateSet(this.resp["bossIsPump"]);
                            //smart
                            this.flushUI();
                            //smart
                            for (i = 0; i < this.clubItems.length; ++i) {
                                club = this.clubItems[i];
                                club.setRateVal(gameClubPumpRates);
                            }
                            this.memCheckBtn.selected = this.resp["approvalSwitch"] == 1;
                            this.seatBtn.selected = this.resp["isOpen"] == 0;
                            this.platPumpRate = resp["platPumpRate"];
                        }
                        this.isLock = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubGameRateItem.prototype.setRoot = function (target) {
        this.panel = target;
    };
    ClubGameRateItem.prototype.setTxt = function (type, target1, data) {
        var _id = "" + type;
        var _val = data[_id];
        target1.text = Owen.Utils.multipleFun(_val, 100) + this.per;
    };
    ClubGameRateItem.prototype.setClubConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, clubRate, rateData, i, club, _x, _y, data, isSeat, isOpen, msg, resp, hander_1, resp1, gameClubPumpRates, i, club;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isSaveLock = true;
                        hander = ServerPostPath.hall_clubHandler_c_setClubConfig;
                        clubRate = this.clubRate;
                        rateData = {};
                        for (i = 0; i < this.clubItems.length; ++i) {
                            club = this.clubItems[i];
                            _x = new Big(Number(club.rateVal));
                            _y = new Big(100);
                            rateData[club.gameId] = _x.div(_y); // / 100
                        }
                        LogUtils.logD("rateData" + JSON.stringify(rateData));
                        data = this.inputRateValue;
                        isSeat = this.memCheckBtn.selected ? 1 : 0;
                        isOpen = this.seatBtn.selected ? 0 : 1;
                        msg = {
                            clubId: ClubManager.instance.currentClub.clubId,
                            config: { "platPumpRate": this.resp["platPumpRate"], "notice": this.resp["notice"], "gameClubPumpRates": rateData, "isOpen": isOpen, "isRank": this.resp["isRank"], "clubName": this.resp["clubName"], approvalSwitch: isSeat } //this.resp["isOpen"]
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, msg)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (!(resp.error && resp.error.code != 0)) return [3 /*break*/, 3];
                        Toast.launch(resp.error.msg, 1);
                        this.isSaveLock = false;
                        //===>重置为之前的值
                        this.isLock = true;
                        hander_1 = ServerPostPath.hall_clubHandler_c_getClubConfig;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander_1, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 2:
                        resp1 = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp1.error && resp1.error.code != 0) {
                            this.panel.hide();
                            Toast.launch(resp1.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("getClubConfig" + JSON.stringify(resp));
                            this.resp = resp1;
                            gameClubPumpRates = resp1["gameClubPumpRates"];
                            for (i = 0; i < this.clubItems.length; ++i) {
                                club = this.clubItems[i];
                                club.setRateVal(gameClubPumpRates);
                            }
                            this.platPumpRate = resp1["platPumpRate"];
                        }
                        this.isLock = false;
                        return [3 /*break*/, 4];
                    case 3:
                        this.isSaveLock = false;
                        this.isSave = true;
                        LogUtils.logD("setClubConfig" + JSON.stringify(resp));
                        Toast.launch(TextUtils.instance.getCurrentTextById(61), 1);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ClubGameRateItem;
}(game.BaseComponent));
__reflect(ClubGameRateItem.prototype, "ClubGameRateItem");
