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
 * @Date: 2019-11-28 14:43:44
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-13 16:24:23
 * @Description: 比赛的排行榜数据
 */
var MatchRankPanel = (function (_super) {
    __extends(MatchRankPanel, _super);
    function MatchRankPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchRankPanelSkin();
        return _this;
    }
    Object.defineProperty(MatchRankPanel, "instance", {
        get: function () {
            if (!MatchRankPanel._instance) {
                MatchRankPanel._instance = new MatchRankPanel();
            }
            return MatchRankPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    MatchRankPanel.prototype.clubInvite = function (e) {
    };
    MatchRankPanel.prototype.show = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.showWorldInfo();
    };
    /**
     * 显示世界排行
     */
    MatchRankPanel.prototype.showWorldInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var matchItemData, roomInfo, reqData, resp, datas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        matchItemData = Global.gameProxy.matchItemData;
                        this.nameLabel.text = matchItemData.title;
                        roomInfo = Global.gameProxy.roomInfo;
                        reqData = { id: roomInfo.activityId };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_userHandler_c_scoreRank, reqData)];
                    case 1:
                        resp = _a.sent();
                        //返回扣牌成功
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                        }
                        else {
                            // this.maxTouchShoupai = 3;
                            this.myRankLabel.text = resp.myRank;
                            CF.dP(ENo.RANK_FLUSH, resp.myRank);
                            datas = _.sortBy(resp.rankInfoArray, function (data1) {
                                return data1['rank'];
                            });
                            this.list.dataProvider = new eui.ArrayCollection(datas);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MatchRankPanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        MatchRankPanel._instance = null;
    };
    MatchRankPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.list.dataProvider = null;
        this.list.itemRenderer = MatchRankListItem;
    };
    MatchRankPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.closeBtn:
                this.hide();
                break;
        }
    };
    return MatchRankPanel;
}(BaseScalePanel));
__reflect(MatchRankPanel.prototype, "MatchRankPanel");
