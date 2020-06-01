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
/*
 * @Author: MC Lee
 * @Date: 2019-11-25 18:09:21
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-08 15:05:13
 * @Description:
 */
var MatchHallListItem = (function (_super) {
    __extends(MatchHallListItem, _super);
    function MatchHallListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchHallItemListSkin();
        return _this;
    }
    MatchHallListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchHallListItem.prototype.initWithData = function (data, totalBet) {
        this.itemData = data;
        this.totalBet = totalBet;
        this.titleLabel.text = data.title;
        this.currentLabel.text = data.currentNum;
        var state = data.state;
        var joinTypeAndGold = data.joinTypeAndGold;
        this.showState();
        this.showBisaiTime();
    };
    /**
     * 刷新
     */
    MatchHallListItem.prototype.flushState = function () {
        this.itemData.lock = 1;
        if (this.itemData.lock == 1) {
            this.showLock();
            return;
        }
        if (this.itemData.state == 0) {
            return;
        }
        this.showState();
    };
    MatchHallListItem.prototype.showLock = function () {
        this.group2.visible = false;
        this.group1.visible = true;
        this.diImage.source = RES.getRes("match_hall_bar4_png");
        this.status = 5;
        this.touzhuLabel.textColor = 0X51FF48;
        // this.touzhuLabel.text = 
    };
    /**
     * 展示参赛按钮和投注额状态，当日投注额≥配置额，显示为绿色。反之为红色。未
       满足投注额，点击后提示：投注额不足，无法参赛。
     */
    MatchHallListItem.prototype.showState = function () {
        var state = this.itemData.state;
        this.minCountLabel.text = "\u4E0D\u5C11\u4E8E" + this.itemData.cutoffNum + "\u4EBA";
        if (state == 0) {
            //没有报名
            this.group2.visible = false;
            this.group1.visible = true;
            this.diImage.source = RES.getRes("match_hall_bar2_png");
            var joinTypeAndGold = this.itemData.joinTypeAndGold;
            var joinType = joinTypeAndGold[0];
            var gold = joinTypeAndGold[1];
            if (joinType == 1) {
                //投注额
                if (this.totalBet >= gold) {
                    this.touzhuLabel.textColor = 0X51FF48;
                    this.touzhuLabel.text = "已达标";
                }
                else {
                    this.touzhuLabel.text = Math.floor(this.totalBet) + ("/" + gold);
                    this.touzhuLabel.textColor = 0XFFF10B;
                }
            }
            this.status = 0;
        }
        else if (state == 1) {
            var joinTypeAndGold = this.itemData.joinTypeAndGold;
            var joinType = joinTypeAndGold[0];
            var gold = joinTypeAndGold[1];
            if (joinType == 1) {
                this.touzhuLabel.textColor = 0X51FF48;
                this.touzhuLabel.text = "已达标";
            }
            //报名了
            this.showBaoMingStatus();
        }
    };
    MatchHallListItem.prototype.checkJoinDb = function () {
        if (!this.clickDb) {
            this.clickDb = new DBComponent("bsc_click", false);
            this["group3"].addChild(this.clickDb);
            this.clickDb.playByFilename(-1);
            this.clickDb.x = this.diImage.width / 2;
            this.clickDb.y = this.diImage.height / 2;
        }
    };
    MatchHallListItem.prototype.showBaoMingStatus = function () {
        var startRaceTime = this.itemData.startRaceTime;
        var cha = startRaceTime - game.DateTimeManager.instance.now;
        if (cha >= Const.LAST_TIME_RACE) {
            //还早
            this.status = 1;
            this.diImage.source = RES.getRes("match_hall_bar1_png");
            this.group2.visible = false;
            this.group1.visible = true;
        }
        else {
            //可以进入
            this.status = 2;
            this.diImage.source = RES.getRes("match_hall_bar3_png");
            this.group1.visible = false;
            this.group2.visible = true;
            if (cha > 0) {
                var timeArr = NumberFormat.getTimeDaojishi(cha);
                this.fenLabel.text = timeArr[0] + "";
                this.miaoLabel.text = timeArr[1] + "";
            }
            else {
                this.fenLabel.text = "00";
                this.miaoLabel.text = "00";
            }
            this.checkJoinDb();
        }
    };
    MatchHallListItem.prototype.checkOutTime = function () {
        var startRaceTime = this.itemData.startRaceTime;
        var now = game.DateTimeManager.instance.now;
        return now >= startRaceTime;
    };
    MatchHallListItem.prototype.showBisaiTime = function () {
        var startRaceTime = this.itemData.startRaceTime;
        // let raceType = startRaceTime[0];
        // if (raceType == 1) {
        // 	//每天
        // 	this.startLabel.text = startRaceTime[1] + ":00";
        // }
        this.startLabel.text = game.Utils.dateFormatMS("MM-dd hh:mm", +startRaceTime);
    };
    MatchHallListItem.prototype.showJoinType = function (joinTypeAndGold) {
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
    };
    MatchHallListItem.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.touchRect:
                this.touchRectTouch();
                break;
            case this.touchRect1:
                if (this.status == 1) {
                    Global.alertMediator.addAlert("开赛前5分钟才能进入比赛，请耐心等待", null, null, true);
                    return;
                }
                if (this.status == 2) {
                    CF.dP(ENo.ENTER_MATCH, this.itemData);
                    return;
                }
                this.baoming();
                // MatchInfoPanel.instance.show(this);
                break;
        }
    };
    MatchHallListItem.prototype.baoming = function () {
        return __awaiter(this, void 0, void 0, function () {
            var path, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = ServerPostPath.hall_userHandler_c_joinRace;
                        return [4 /*yield*/, Global.pomelo.request(path, { id: this.itemData.activityId })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            if (resp.error.code == -306) {
                                Global.alertMediator.addAlert("投注额不足，无法参赛(参与金币对局可增加投注额)", null, null, true);
                                return [2 /*return*/];
                            }
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            return [2 /*return*/];
                        }
                        Global.alertMediator.addAlert("报名成功,须开赛前5分钟进入,超时视为放弃比赛.", null, null, true);
                        this.itemData.state = resp.state;
                        this.flushState();
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchHallListItem.prototype.touchRectTouch = function () {
        var joinTypeAndGold = this.itemData.joinTypeAndGold[0];
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
        // if (this.totalBet < gold) {
        // 	Global.alertMediator.addAlert("投注额不足，无法参赛.", null, null, true);
        // 	return;
        // }
        // //可以进入游戏
        // MatchInfoPanel.instance.show(this);
    };
    return MatchHallListItem;
}(game.BaseUI));
__reflect(MatchHallListItem.prototype, "MatchHallListItem");
