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
 * @Date: 2020-03-02 11:22:14
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-03 14:20:50
 * @Description: 奖金池玩法
 */
var MatchJackeyResultPanel = (function (_super) {
    __extends(MatchJackeyResultPanel, _super);
    function MatchJackeyResultPanel() {
        var _this = _super.call(this) || this;
        _this.lockReq = false;
        _this.skinName = new MatchJackeyResultPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchJackeyResultPanel, "instance", {
        get: function () {
            if (!MatchJackeyResultPanel._instance) {
                MatchJackeyResultPanel._instance = new MatchJackeyResultPanel();
            }
            return MatchJackeyResultPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchJackeyResultPanel.prototype.clubInvite = function (e) {
    };
    MatchJackeyResultPanel.prototype.s_pushRaceInvite = function () {
    };
    MatchJackeyResultPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchJackeyResultPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLOSE_ALL, this.hide, this);
    };
    MatchJackeyResultPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLOSE_ALL, this.hide, this);
    };
    MatchJackeyResultPanel.prototype.checkGoldBySHow = function (winGold, closeCallback) {
        var _this = this;
        this.closeCallback = closeCallback;
        var dbName;
        if (winGold > 0) {
            dbName = "jjc_win";
        }
        else {
            dbName = "jjc_lose";
        }
        var db = new DBComponent(dbName, false);
        this.dbGroup.addChild(db);
        db.playNamesAndLoop([dbName, dbName + "_loop"]);
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        egret.setTimeout(function () {
            if (winGold > 0) {
                _this.winGroup.visible = true;
                _this.winLabel.text = winGold + "";
            }
            _this.buttonGroup.visible = true;
        }, this, 500);
    };
    MatchJackeyResultPanel.prototype.hide = function () {
        if (MatchJackeyResultPanel._instance) {
            game.UIUtils.removeSelf(this);
            MatchJackeyResultPanel._instance = null;
        }
    };
    MatchJackeyResultPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.backBtn:
                this.backBtnTouch();
                break;
            case this.restartBtn:
                this.restartBtnTouch();
                break;
        }
    };
    MatchJackeyResultPanel.prototype.backBtnTouch = function () {
        MatchManager.instance.clearSelect();
        this.closeCallback && this.closeCallback();
        game.AppFacade.instance.sendNotification(SceneNotify.OPEN_MATCH_HALL);
        this.hide();
    };
    MatchJackeyResultPanel.prototype.restartBtnTouch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var route, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        route = ServerPostPath.hall_luckyHandler_c_joinLuckyGame;
                        data = {
                            gameId: MatchManager.instance.selectGameId,
                            entryFeeGold: MatchManager.instance.selectGameGold,
                            sceneIndex: MatchManager.instance.selectIndex
                        };
                        return [4 /*yield*/, Global.pomelo.request(route, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            this.backBtnTouch();
                            return [2 /*return*/];
                        }
                        else {
                            MatchManager.instance.tablePlayers = resp;
                            MatchManager.instance.matchConfig = data;
                            MatchManager.instance.redirectScene(function () {
                                _this.closeCallback && _this.closeCallback();
                                _this.hide();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return MatchJackeyResultPanel;
}(game.BaseScene));
__reflect(MatchJackeyResultPanel.prototype, "MatchJackeyResultPanel");
