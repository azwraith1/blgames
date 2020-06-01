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
var ClubInvitedPanel = (function (_super) {
    __extends(ClubInvitedPanel, _super);
    function ClubInvitedPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubInvitedPanelSkin" + CF.tis;
        return _this;
    }
    Object.defineProperty(ClubInvitedPanel, "instance", {
        get: function () {
            if (!ClubInvitedPanel._instance) {
                ClubInvitedPanel._instance = new ClubInvitedPanel();
            }
            return ClubInvitedPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubInvitedPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
    };
    ClubInvitedPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
    };
    ClubInvitedPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (GameConfig.CURRENT_ISSHU) {
            this.currentState = "shu";
            this.validateNow();
        }
        else {
            this.currentState = "heng";
        }
    };
    ClubInvitedPanel.prototype.initData = function (e) {
        this.data = e.data;
        var tx = new eui.Label();
        ;
        tx.x = tx.y = 0;
        tx.size = 30;
        tx.width = 360;
        tx.height = 90;
        this.gameData = e.data;
        tx.textColor = 0xa67044;
        var data = {
            "1": '<font color="#FBEB87" size="30">' + e.data.clubId + " " + e.data.clubName + '</font>',
            "2": '<font color="#FBEB87" size="30">' + e.data.invitePlayer + '</font>',
            "3": '<font color="#6FE6D9" size="30">' + this.gameName(e.data.gameId) + '</font>'
        };
        var text = TextUtils.instance.setTextById(85, data);
        tx.textFlow = (new egret.HtmlTextParser).parser(text);
        this.invitedGroup.addChild(tx);
    };
    ClubInvitedPanel.prototype.gameName = function (id) {
        switch (id) {
            case 10005:
                return "炸金花";
            case 10002:
                return "血战到底";
            case 10003:
                return "抢庄牛牛";
            case 10020:
                return "二人麻将";
            case 10018:
                return "卡五星";
            case 10015:
                return "广东麻将";
            case 10009:
                return TextUtils.instance.getCurrentTextById(32);
        }
    };
    ClubInvitedPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.refuseBtn:
                this.refuse();
                game.UIUtils.removeSelf(this);
                break;
            case this.acceptBtn:
                this.acceptInvite();
                break;
        }
    };
    ClubInvitedPanel.prototype.refuse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            tableId: this.gameData.tableId,
                            clubId: this.gameData.clubId,
                            inviterId: this.gameData.inviterId
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_refuseInviteGame, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp) {
                            if (resp.error && resp.error.code) {
                                return [2 /*return*/];
                            }
                            ClubManager.instance.currentClub = resp;
                        }
                        game.UIUtils.removeSelf(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubInvitedPanel.prototype.acceptInvite = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp, i, clubId, innerHall;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            tableId: this.gameData.tableId,
                            clubId: this.gameData.clubId
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_enterClubHall, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        if (resp) {
                            if (resp.error && resp.error.code != 0) {
                                game.UIUtils.removeSelf(this);
                                Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                                return [2 /*return*/];
                            }
                            //smart 给游戏大厅数复制
                            ClubManager.instance.currentClub = this.data;
                            //smart role赋值
                            if (!ClubManager.instance.currentClub.role) {
                                if (ClubManager.instance.list) {
                                    for (i = 0; i < ClubManager.instance.list.length; ++i) {
                                        clubId = ClubManager.instance.list[i]["clubId"];
                                        if (clubId == ClubManager.instance.currentClub.clubId) {
                                            ClubManager.instance.currentClub.role = ClubManager.instance.list[i]["role"];
                                        }
                                    }
                                }
                            }
                            ClubManager.instance.setClubData(resp);
                            if (resp.clubInfo) {
                                ClubManager.instance.currentClub = resp.clubInfo;
                            }
                            innerHall = ClubInnerHallScene.instance;
                            innerHall.joinScene(this.gameData);
                            game.UIUtils.removeSelf(this);
                            GameLayerManager.gameLayer().tipsLayer.removeChildren();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClubInvitedPanel;
}(game.BaseComponent));
__reflect(ClubInvitedPanel.prototype, "ClubInvitedPanel");
