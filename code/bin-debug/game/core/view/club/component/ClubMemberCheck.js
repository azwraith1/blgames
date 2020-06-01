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
var ClubMemberCheck = (function (_super) {
    __extends(ClubMemberCheck, _super);
    function ClubMemberCheck(gameid) {
        return _super.call(this, gameid) || this;
        //this.skinName = "ClubMemberCheckSkin";
    }
    ClubMemberCheck.prototype.renderUI = function (data) {
        this.IPValue.text = "ip：" + data.apply_player_ip;
        this.showPlayerDatas(data);
    };
    ClubMemberCheck.prototype.showPlayerDatas = function (playerData) {
        this.playerId = playerData["playerUid"] || playerData["id"];
        this.nameLabel.text = playerData.apply_player_nickname;
        this.headerImage.source = "hall_header_" + playerData.apply_player_sex + "_" + playerData.apply_player_figureUrl + "_png";
    };
    ClubMemberCheck.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.headerImage.mask = this.headerMask;
    };
    ClubMemberCheck.prototype.onTouchTap = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hander, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        e.stopPropagation();
                        data = {
                            clubId: ClubManager.instance.currentClub.clubId,
                            playerUid: this.playerId,
                        };
                        hander = ServerPostPath.hall_clubHandler_c_clubMembersApproval;
                        switch (e.target) {
                            case this.rejectBtn:
                                data["operate"] = 0;
                                //同意
                                break;
                            case this.agreeBtn:
                                data["operate"] = 1;
                                //拒绝
                                break;
                        }
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("成员 审批" + JSON.stringify(resp));
                            this.root.setData(resp, this.gameID);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClubMemberCheck;
}(BaseClubMemberRender));
__reflect(ClubMemberCheck.prototype, "ClubMemberCheck");
