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
var ClubGainPanel = (function (_super) {
    __extends(ClubGainPanel, _super);
    function ClubGainPanel() {
        var _this = _super.call(this) || this;
        _this.msg = {};
        _this.gainType = 1;
        _this.clubItems = [];
        _this.isLock = false;
        _this.skinName = "ClubGainPanelSkin" + CF.tis; //"ClubGainPanelSkin";
        return _this;
    }
    ClubGainPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);
    };
    ClubGainPanel.prototype.flushUI = function () {
        var clubIds = ClubManager.instance.clubIds;
        this.flushId(clubIds[0]);
        for (var i = 0; i < clubIds.length; i++) {
            var item = new ClubInnerRecordTabItem(clubIds[i]);
            this.tabItemGroup.addChild(item);
            item.showStatus(clubIds[i] == this.currentId);
            this.clubItems.push(item);
        }
    };
    ClubGainPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);
    };
    ClubGainPanel.prototype.innerRecordItemTouch = function (e) {
        if (this.isLock)
            return;
        var data = e.data;
        for (var i = 0; i < this.clubItems.length; i++) {
            var club = this.clubItems[i];
            club.showStatus(club == data);
        }
        this.flushId(data.gameID);
        this.init();
    };
    ClubGainPanel.prototype.flushId = function (org) {
        this.currentId = org;
        this.msg["gameId"] = this.currentId;
    };
    ClubGainPanel.prototype.onTouchTap = function (e) {
        _super.prototype.onTouchTap.call(this, e);
        e.stopPropagation();
        switch (e.target) {
            case this.closeBtn:
                this.hide();
                break;
            case this.personBtn:
                if (this.isLock)
                    return;
                this.personBtn.currentState = "down";
                this.clubBtn.currentState = "up";
                this.setClubType(1);
                this.init();
                break;
            case this.clubBtn:
                if (this.isLock)
                    return;
                this.clubBtn.currentState = "down";
                this.personBtn.currentState = "up";
                this.setClubType(2);
                this.init();
                break;
        }
    };
    /**1是个人战绩 2是俱乐部战绩
     * 默认显示俱乐部战绩
     */
    ClubGainPanel.prototype.setClubType = function (type) {
        this.msg["type"] = type;
        this.gainType = type;
    };
    Object.defineProperty(ClubGainPanel, "instance", {
        get: function () {
            if (!ClubGainPanel._instance) {
                ClubGainPanel._instance = new ClubGainPanel();
            }
            return ClubGainPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubGainPanel.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                GameLayerManager.gameLayer().panelLayer.addChild(this);
                if (ClubManager.instance.currentClub.role == 3) {
                    this.touchBtnGroup.visible = false;
                }
                else {
                    this.touchBtnGroup.visible = true;
                }
                this.personBtn.currentState = "down";
                this.clubBtn.currentState = "up";
                this.setClubType(1);
                this.flushUI();
                this.init();
                return [2 /*return*/];
            });
        });
    };
    ClubGainPanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        ClubGainPanel._instance = null;
    };
    //======下面是私有方法====================================================
    ClubGainPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.list.dataProvider = null;
        this.list.itemRenderer = ClubPlayerGainItem;
        this.msg = {
            clubId: ClubManager.instance.currentClub.clubId,
            gameId: this.currentId,
            skip: 0,
            limit: 50,
            type: this.gainType
        };
        this.scroller.scrollPolicyH = "off";
    };
    ClubGainPanel.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, reportInfo, listData, key, clubIncome, incomeVal, totalVal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLock = true;
                        this.list.dataProvider = null;
                        this.hander = ServerPostPath.hall_clubHandler_c_getClubReportInfo;
                        return [4 /*yield*/, game.PomeloManager.instance.request(this.hander, this.msg)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                            // return;
                        }
                        else {
                            LogUtils.logD("===战绩===" + JSON.stringify(resp));
                            reportInfo = resp["reportInfo"];
                            listData = _.sortBy(reportInfo, function (item) {
                                return item["roomInfo"]["create_time"];
                            });
                            if (reportInfo.length <= 0) {
                                this.listBg.source = "club_mem_kong_png";
                                TextUtils.instance.changeImage(this.listBg);
                            }
                            else {
                                this.listBg.source = "clug_gain_listbg_png";
                            }
                            for (key in listData) {
                                listData[key]["gainType"] = this.gainType;
                                listData[key]["currentID"] = this.currentId;
                            }
                            if (ClubManager.instance.currentClub.role == 1 && this.gainType == 2) {
                                this.inComeGroup.visible = true;
                                clubIncome = resp["ClubIncomeInfo"];
                                incomeVal = clubIncome["curGainGold"];
                                totalVal = Owen.Utils.additionFun(clubIncome["totalGainGold"], incomeVal);
                                this.clubIncomeTxt.font = this.setTxtFont(incomeVal);
                                this.clubIncomeTxt.text = incomeVal;
                                this.clubIncomeTotalTxt.font = this.setTxtFont(totalVal);
                                this.clubIncomeTotalTxt.text = totalVal + "";
                            }
                            else {
                                this.inComeGroup.visible = false;
                            }
                            this.list.dataProvider = new eui.ArrayCollection(listData.reverse());
                        }
                        this.isLock = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubGainPanel.prototype.setTxtFont = function (val) {
        if (val >= 0) {
            return "club_win_fnt";
        }
        else {
            return "club_lose_fnt";
        }
    };
    return ClubGainPanel;
}(BaseInstanceScence));
__reflect(ClubGainPanel.prototype, "ClubGainPanel");
