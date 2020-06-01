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
 * @Date: 2019-12-17 10:43:29
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-08 15:05:22
 * @Description: 比赛场条条
 */
var MatchHallListRender = (function (_super) {
    __extends(MatchHallListRender, _super);
    function MatchHallListRender() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchHallItemListSkin();
        return _this;
    }
    MatchHallListRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchHallListRender.prototype.dataChanged = function () {
        this.itemData = this.data;
        //投注额
        this.totalBet = this.itemData.totalBet;
        this.titleLabel.text = this.itemData.title;
        this.currentLabel.text = this.itemData.currentNum;
        var state = this.itemData.state;
        var joinTypeAndGold = this.itemData.joinTypeAndGold;
        if (joinTypeAndGold[0] == 1) {
            this.typeLabel.text = "满足投注额可免费报名";
            this.type2Label.text = "查看比赛详情";
            this.joinType = 1;
        }
        else {
            this.joinType = 2;
            this.typeLabel.text = "查看比赛详情";
            this.type2Label.text = "总奖金：" + this.itemData.contest_allreward;
        }
        this.flushState();
        this.showBisaiTime();
    };
    MatchHallListRender.prototype.flushReward = function () {
        this.type2Label.text = "总奖金：" + this.itemData.contest_allreward;
    };
    /**
     * 刷新
     */
    MatchHallListRender.prototype.flushState = function () {
        if (this.itemData.lock == 1) {
            this.showLock();
            return;
        }
        var joinTypeAndGold = this.itemData.joinTypeAndGold;
        var joinType = joinTypeAndGold[0];
        if (joinType == 1) {
            //免费赛
            this.showState();
        }
        else {
            //报名赛
            this.showBaoMingState();
        }
    };
    MatchHallListRender.prototype.showBaoMingState = function () {
        var state = this.itemData.state;
        this.minCountLabel.text = "\u4E0D\u5C11\u4E8E" + this.itemData.cutoffNum + "\u4EBA";
        if (state == 0) {
            //没有报名
            if (this.clickDb) {
                this.clickDb.visible = false;
            }
            this.group2.visible = false;
            this.group1.visible = true;
            this.diImage.source = RES.getRes("match_hall_bar5_png");
            var joinTypeAndGold = this.itemData.joinTypeAndGold;
            var joinType = joinTypeAndGold[0];
            var gold = joinTypeAndGold[1];
            this.touzhuLabel.text = "" + gold;
            this.status = 0;
        }
        else if (state == 1) {
            var joinTypeAndGold = this.itemData.joinTypeAndGold;
            var joinType = joinTypeAndGold[0];
            var gold = joinTypeAndGold[1];
            if (joinType == 2) {
                this.touzhuLabel.textColor = 0X51FF48;
                this.touzhuLabel.text = "已报名";
            }
            //报名了
            this.showBaoMingStatus();
        }
        this.joinTimeLabel.text = "";
    };
    MatchHallListRender.prototype.showLock = function () {
        this.group2.visible = false;
        this.group1.visible = true;
        var joinTypeAndGold = this.itemData.joinTypeAndGold;
        var joinType = joinTypeAndGold[0];
        if (joinType == 1) {
            this.diImage.source = RES.getRes("match_hall_bar4_png");
        }
        else {
            this.diImage.source = RES.getRes("match_hall_bar8_png");
        }
        this.status = 5;
        this.touzhuLabel.textColor = 0X51FF48;
        var startRaceTime = this.itemData.startRaceTime;
        this.touzhuLabel.text = "";
        this.minCountLabel.text = "\u4E0D\u5C11\u4E8E" + this.itemData.cutoffNum + "\u4EBA";
        this.joinTimeLabel.text = game.Utils.dateFormatMS("MM.dd", +startRaceTime) + "号开放";
    };
    MatchHallListRender.prototype.getMianFeiType = function (type) {
        switch (type) {
            case 1:
                return "本日投注额:";
            case 2:
                return "本周投注额:";
            case 3:
                return "本月投注额:";
        }
    };
    /**
     * 展示参赛按钮和投注额状态，当日投注额≥配置额，显示为绿色。反之为红色。未
       满足投注额，点击后提示：投注额不足，无法参赛。
     */
    MatchHallListRender.prototype.showState = function () {
        var state = this.itemData.state;
        this.minCountLabel.text = "\u4E0D\u5C11\u4E8E" + this.itemData.cutoffNum + "\u4EBA";
        var joinTypeAndGold = this.itemData.joinTypeAndGold;
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
        var type = joinTypeAndGold[2];
        if (state == 0) {
            //没有报名
            if (this.clickDb) {
                this.clickDb.visible = false;
            }
            this.group2.visible = false;
            this.group1.visible = true;
            this.diImage.source = RES.getRes("match_hall_bar1_png");
            var needGold = Math.floor(this.totalBet[type - 1]);
            if (joinType == 1) {
                //投注额
                if (needGold >= gold) {
                    this.touzhuLabel.textColor = 0X51FF48;
                    this.touzhuLabel.text = this.getMianFeiType(type) + "已达标";
                }
                else {
                    this.touzhuLabel.text = this.getMianFeiType(type) + (needGold + "/" + gold);
                    this.touzhuLabel.textColor = 0XFFF10B;
                }
            }
            this.status = 0;
        }
        else if (state == 1) {
            if (joinType == 1) {
                this.touzhuLabel.textColor = 0X51FF48;
                this.touzhuLabel.text = this.getMianFeiType(type) + "已达标";
            }
            //报名了
            this.showBaoMingStatus();
        }
        this.joinTimeLabel.text = "";
    };
    MatchHallListRender.prototype.checkJoinDb = function () {
        if (!this.clickDb) {
            this.clickDb = new DBComponent("bsc_click", false);
            this["group3"].addChild(this.clickDb);
            this.clickDb.playByFilename(-1);
            this.clickDb.x = this.diImage.width / 2;
            this.clickDb.y = this.diImage.height / 2;
        }
        this.clickDb.visible = true;
    };
    MatchHallListRender.prototype.showBaoMingStatus = function () {
        var startRaceTime = this.itemData.startRaceTime;
        var cha = startRaceTime - game.DateTimeManager.instance.now;
        if (cha >= Const.LAST_TIME_RACE) {
            //还早
            this.status = 1;
            this.diImage.source = RES.getRes("match_hall_bar2_png");
            this.group2.visible = false;
            this.group1.visible = true;
            if (this.clickDb) {
                this.clickDb.visible = false;
            }
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
    MatchHallListRender.prototype.checkOutTime = function () {
        var startRaceTime = this.itemData.startRaceTime;
        var now = game.DateTimeManager.instance.now;
        return now >= startRaceTime;
    };
    MatchHallListRender.prototype.showBisaiTime = function () {
        var startRaceTime = this.itemData.startRaceTime;
        // let raceType = startRaceTime[0];
        // if (raceType == 1) {
        // 	//每天
        // 	this.startLabel.text = startRaceTime[1] + ":00";
        // }
        this.startLabel.text = game.Utils.dateFormatMS("MM-dd hh:mm", +startRaceTime);
    };
    MatchHallListRender.prototype.showJoinType = function (joinTypeAndGold) {
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
    };
    MatchHallListRender.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.touchRect:
                this.touchRectTouch();
                break;
            case this.touchRect1:
                if (this.joinType == 1) {
                    this.mianfeiBaoming();
                }
                else {
                    this.useBaomingfei();
                }
                // MatchInfoPanel.instance.show(this);
                break;
        }
    };
    MatchHallListRender.prototype.mianfeiBaoming = function () {
        if (this.status == 1) {
            Global.alertMediator.addAlert("开赛前5分钟才能进入比赛，请耐心等待", null, null, true);
            return;
        }
        if (this.status == 2) {
            CF.dP(ENo.ENTER_MATCH, this.itemData);
            return;
        }
        if (this.status == 5) {
            var startRaceTime = this.itemData.startRaceTime;
            var kaifangTime = game.Utils.dateFormatMS("MM-dd", +startRaceTime);
            Global.alertMediator.addAlert("\u8BE5\u573A\u6B21\u5C06\u5728" + kaifangTime + "\u53F7\u5F00\u653E\u62A5\u540D,\u8BF7\u8010\u5FC3\u7B49\u5F85", null, null, true);
            return;
        }
        this.baoming();
    };
    /**
     * 使用报名费
     */
    MatchHallListRender.prototype.useBaomingfei = function () {
        var _this = this;
        var joinTypeAndGold = this.itemData.joinTypeAndGold;
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
        Global.alertMediator.addAlert("\u9700\u8981\u82B1\u8D39" + gold + "\u91D1\u5E01\u62A5\u540D", function () {
            _this.baoming();
        }, null, true);
    };
    MatchHallListRender.prototype.baoming = function () {
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
                        if (resp.ownGold != undefined) {
                            Global.playerProxy.playerData.gold = resp.ownGold;
                            CF.dP(ServerNotify.s_payGold, { ownGold: resp.ownGold });
                        }
                        this.joinType = 1;
                        if (this.joinType == 1) {
                            Global.alertMediator.addAlert("报名成功,须开赛前5分钟进入,超时视为放弃比赛.", null, null, true);
                            this.itemData.state = resp.state;
                            this.flushState();
                        }
                        else {
                            //todu直接进入比赛等待
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchHallListRender.prototype.touchRectTouch = function () {
        var joinTypeAndGold = this.itemData.joinTypeAndGold[0];
        var joinType = joinTypeAndGold[0];
        var gold = joinTypeAndGold[1];
        // if (this.totalBet < gold) {
        // 	Global.alertMediator.addAlert("投注额不足，无法参赛.", null, null, true);
        // 	return;
        // }
        // //可以进入游戏
        MatchInfoPanel.instance.show(this);
    };
    return MatchHallListRender;
}(game.BaseItemRender));
__reflect(MatchHallListRender.prototype, "MatchHallListRender");
