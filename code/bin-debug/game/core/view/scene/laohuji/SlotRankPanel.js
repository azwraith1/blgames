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
var slot;
(function (slot) {
    var SlotRankPanel = (function (_super) {
        __extends(SlotRankPanel, _super);
        function SlotRankPanel(scene) {
            var _this = _super.call(this) || this;
            _this.skinName = "SlotRankPanelSkin";
            if (scene) {
                _this.scene = scene;
            }
            return _this;
        }
        SlotRankPanel.getInstance = function () {
            if (SlotRankPanel._instance == null) {
                SlotRankPanel._instance = new SlotRankPanel();
            }
            return SlotRankPanel._instance;
        };
        SlotRankPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.rankScroller.scrollPolicyH = 'off';
            this.todayRank.touchEnabled = false;
            this.historyRank.touchEnabled = false;
            this.initRankList();
        };
        SlotRankPanel.prototype.initRankList = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, resp, data1, resp2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = {
                                rankType: 2, gameId: 10007, skip: 0, limit: 20
                            };
                            return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.rank_userHandler_c_getRank, data)];
                        case 1:
                            resp = _a.sent();
                            game.LaohuUtils.slotRankHistory = resp;
                            Global.pomelo.clearLastLock();
                            data1 = {
                                rankType: 3, gameId: 10007, skip: 0, limit: 20
                            };
                            return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.rank_userHandler_c_getRank, data1)];
                        case 2:
                            resp2 = _a.sent();
                            game.LaohuUtils.slotRankToday = resp2;
                            this.requstRankList(3);
                            return [2 /*return*/];
                    }
                });
            });
        };
        SlotRankPanel.prototype.requstRankList = function (type) {
            var resp2;
            if (type == 2) {
                this.rankToday();
                resp2 = game.LaohuUtils.slotRankHistory;
            }
            else {
                this.rankHistory();
                resp2 = game.LaohuUtils.slotRankToday;
            }
            var atr = [];
            for (var i in resp2.players) {
                atr.push(resp2.players[i]);
            }
            atr.pop();
            this.rankscrollerGroup.itemRenderer = slot.SlotRankItem;
            this.rankscrollerGroup.dataProvider = new eui.ArrayCollection(atr);
            this.myName.text = Global.playerProxy.playerData.nickname;
            var headerImage = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
            this.myHead.source = headerImage;
            if (resp2.my) {
                if (resp2.my.rank == 0) {
                    this.myrank.visible = false;
                    this.myRankImag.visible = true;
                }
                else {
                    this.myrank.text = resp2.my.rank + "";
                    this.myGold.text = resp2.my.score + "";
                }
            }
        };
        SlotRankPanel.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.closeBtn:
                    this.closeRankPanel();
                    break;
                case this.todayRank:
                    this.requstRankList(3);
                    break;
                case this.historyRank:
                    this.requstRankList(2);
                    break;
            }
        };
        SlotRankPanel.prototype.closeRankPanel = function () {
            game.LaohuUtils.slotRankToday = game.LaohuUtils.slotRankHistory = {};
            CF.sN(PanelNotify.CLOSE_SLOT_RANK);
            game.UIUtils.removeSelf(this);
        };
        SlotRankPanel.prototype.requestRank = function (scene) {
            this.scene = scene;
            this.requstRankList(3);
        };
        SlotRankPanel.prototype.rankToday = function () {
            this.todayRank.currentState = "down";
            this.historyRank.currentState = "up";
            this.historyRank.touchEnabled = false;
            this.todayRank.touchEnabled = true;
        };
        /**
         * 历史可以点击
         */
        SlotRankPanel.prototype.rankHistory = function () {
            this.historyRank.currentState = "down";
            this.historyRank.touchEnabled = true;
            this.todayRank.currentState = "up";
            this.todayRank.touchEnabled = false;
        };
        return SlotRankPanel;
    }(game.BaseComponent));
    slot.SlotRankPanel = SlotRankPanel;
    __reflect(SlotRankPanel.prototype, "slot.SlotRankPanel");
})(slot || (slot = {}));
