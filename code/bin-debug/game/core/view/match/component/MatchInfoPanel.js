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
 * @Last Modified time: 2020-04-08 15:05:08
 * @Description:
 */
var MatchInfoPanel = (function (_super) {
    __extends(MatchInfoPanel, _super);
    function MatchInfoPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchInfoSkin();
        return _this;
    }
    Object.defineProperty(MatchInfoPanel, "instance", {
        get: function () {
            if (!MatchInfoPanel._instance) {
                MatchInfoPanel._instance = new MatchInfoPanel();
            }
            return MatchInfoPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchInfoPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchInfoPanel.prototype.show = function (item) {
        this.showGroup(1);
        this.item = item;
        this.itemData = item.itemData;
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showGroup1Data();
        this.showGroup2Data();
        this.showGroup3Data();
        if (this.itemData.state == 1) {
            this.enterImage.visible = true;
            this.enterBtn.visible = false;
        }
        if (this.itemData.lock == 1) {
            this.enterBtn.visible = false;
            this.enterImage.visible = false;
        }
    };
    MatchInfoPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.closeBtnTouch();
                break;
            case this.tab1:
                this.showGroup(1);
                break;
            case this.tab2:
                this.showGroup(2);
                break;
            case this.tab3:
                this.showGroup(3);
                break;
            case this.enterBtn:
                this.enterBtnTouch();
                break;
        }
    };
    MatchInfoPanel.prototype.showGroup = function (number) {
        for (var i = 1; i <= 3; i++) {
            var group = this["group" + i];
            group.visible = number == i;
            var button = this["tab" + i];
            button.currentState = number == i ? "disabled" : "up";
            button.touchEnabled = !(number == i);
        }
    };
    MatchInfoPanel.prototype.showGroup1Data = function () {
        this.label1.text = this.itemData.title;
        this.label2.text = game.Utils.dateFormatMS("MM-dd hh:mm", this.itemData.startRaceTime);
        var joinType = this.itemData.joinTypeAndGold[0];
        var gold = this.itemData.joinTypeAndGold[1];
        if (joinType == 1) {
            this.label3.text = "\u91D1\u5E01\u573A\u6295\u6CE8\u989D>=" + gold + "\u5373\u53EF\u514D\u8D39\u53C2\u8D5B";
        }
        else {
            this.label3.text = "\u9700\u4F7F\u7528" + gold + "\u8D2D\u4E70\u53C2\u8D5B\u8D44\u683C";
        }
        this.label4.text = "\u4E0D\u5C11\u4E8E" + this.itemData.cutoffNum + "\u4EBA";
    };
    MatchInfoPanel.prototype.showGroup2Data = function () {
        var totalMoney = this.itemData.contest_allreward;
        var rewards = this.itemData.contest_rankreward;
        var first = rewards[0], second = rewards[1], third = rewards[2];
        var count1 = first[1] - first[0] + 1;
        this.reward1.text = Math.floor(totalMoney * first[2] / count1 / 100) + "y";
        ;
        this.countLabel1.text = count1 == 1 ? "" + first[0] : first[0] + "-" + first[1];
        if (second) {
            var count2 = second[1] - second[0] + 1;
            this.reward2.text = Math.floor(totalMoney * second[2] / count2 / 100) + "y";
            this.countLabel2.text = count2 == 1 ? "" + second[0] : second[0] + "-" + second[1];
        }
        if (third) {
            var count3 = third[1] - third[0] + 1;
            this.reward3.text = Math.floor(totalMoney * third[2] / count3 / 100) + "y";
            this.countLabel3.text = count3 == 1 ? "" + third[0] : third[0] + "-" + third[1];
        }
        for (var i = 3; i < rewards.length; i++) {
            var rewardData = rewards[i];
            var countNumber = rewardData[1] - rewardData[0] + 1;
            var gold = Math.floor(totalMoney * rewardData[2] / countNumber / 100);
            var label = new eui.Label();
            label.textColor = 0X935e3d;
            label.size = 26;
            var countStr = countNumber == 1 ? "" + rewardData[0] : rewardData[0] + "-" + rewardData[1];
            label.text = "\u7B2C" + countStr + "\u540D:" + gold + "\u5143";
            this.otherGroup.addChild(label);
        }
        // let count = 1;
        // this.rankLabel1.text = `第${count}名:${first[2]}元`;
        // count += first[1];
        // this.rankLabel2.text = `第${count}-${count + second[1]}名:${second[2]}元`;
        // count += second[1];
        // this.rankLabel3.text = `第${count}-${count + third[1]}名:${third[2]}元`;
    };
    MatchInfoPanel.prototype.showGroup3Data = function () {
    };
    MatchInfoPanel.prototype.closeBtnTouch = function () {
        if (MatchInfoPanel._instance) {
            egret.Tween.removeTweens(this.scaleGroup);
            game.UIUtils.removeSelf(this);
            MatchInfoPanel._instance = null;
        }
    };
    /**
     * 报名按钮
     */
    MatchInfoPanel.prototype.enterBtnTouch = function () {
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
                        this.enterBtn.visible = false;
                        this.enterImage.visible = true;
                        this.item.flushState();
                        return [2 /*return*/];
                }
            });
        });
    };
    return MatchInfoPanel;
}(BaseScalePanel));
__reflect(MatchInfoPanel.prototype, "MatchInfoPanel");
