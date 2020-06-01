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
var ClubMemberPanel = (function (_super) {
    __extends(ClubMemberPanel, _super);
    function ClubMemberPanel() {
        var _this = _super.call(this) || this;
        _this.memberID = [];
        _this.clubItems = [];
        _this.isLock = false;
        _this.skinName = "ClubMemberPanelSkin" + CF.tis; //ClubMemberPanelSkin
        return _this;
    }
    Object.defineProperty(ClubMemberPanel, "instance", {
        get: function () {
            if (!ClubMemberPanel._instance) {
                ClubMemberPanel._instance = new ClubMemberPanel();
            }
            return ClubMemberPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubMemberPanel.prototype.setListBg = function (num) {
        if (this.currentID == MEMBER_NAME.CLUB_CHECK) {
            if (num > 0) {
                this.clubListBg.source = "club_mem_list_kuang_png";
            }
            else {
                this.clubListBg.source = "club_mem_check_no_png";
                TextUtils.instance.changeImage(this.clubListBg);
            }
        }
        else {
            this.clubListBg.source = "club_mem_list_kuang_png";
        }
    };
    ClubMemberPanel.prototype.createItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, temp, item;
            return __generator(this, function (_a) {
                for (i = 0; i < this.memberID.length; ++i) {
                    temp = this.memberID[i];
                    item = new ClubInnerRecordTabItem(temp);
                    item.showStatus(this.currentID == temp);
                    if (ClubManager.instance.currentClub.role != 1 && temp == MEMBER_NAME.CLUB_MANAGE || ClubManager.instance.currentClub.role != 1 && temp == MEMBER_NAME.CLUB_CHECK) {
                        item.visible = false;
                    }
                    else {
                        item.visible = true;
                    }
                    if (ClubManager.instance.currentClub.role == 2) {
                        item.visible = true;
                    }
                    if (ClubManager.instance.currentClub.role != 3 && temp == MEMBER_NAME.CLUB_CHECK) {
                        // let hander: any = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
                        // let resp: any = await game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId });
                        // if (resp.error && resp.error.code != 0) {
                        // 	Toast.launch(resp.error.msg, 1);
                        // }
                        // else {
                        // 	item.redPoint.visible = resp.length > 0;
                        // 	LogUtils.logD("成员审批" + JSON.stringify(resp));
                        // }
                        item.redPoint.visible = ClubManager.instance.canShowPoint;
                    }
                    this.btnGroup.addChild(item);
                    this.clubItems.push(item);
                }
                return [2 /*return*/];
            });
        });
    };
    ClubMemberPanel.prototype.getCheckItem = function () {
        for (var i = 0; i < this.clubItems.length; ++i) {
            var item = this.clubItems[i];
            if (item.gameID == MEMBER_NAME.CLUB_CHECK) {
                return item;
            }
        }
    };
    ClubMemberPanel.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.closeBtn:
                this.hide();
                break;
            default:
                break;
        }
    };
    ClubMemberPanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        ClubMemberPanel._instance = null;
    };
    ClubMemberPanel.prototype.show = function () {
        GameLayerManager.gameLayer().panelLayer.addChild(this);
        this.createItems();
        this.content1.hide();
        this.sendRequest();
    };
    ClubMemberPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);
        /**smart 有新成员加入 */
        CF.rE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
    };
    ClubMemberPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.innerRecordItemTouch, this);
        /**smart 有新成员加入 */
        CF.aE(ServerNotify.s_pushNewApprovalMessagesEvent, this.s_pushNewApprovalMessagesEvent, this);
    };
    ClubMemberPanel.prototype.s_pushNewApprovalMessagesEvent = function (e) {
        ClubManager.instance.canShowPoint = true;
        if (ClubManager.instance.currentClub.role != 3) {
            this.getCheckItem().redPoint.visible = true;
        }
    };
    ClubMemberPanel.prototype.innerRecordItemTouch = function (e) {
        var data = e.data;
        if (this.isLock)
            return;
        this.currentID = data.gameID;
        for (var i = 0; i < this.clubItems.length; i++) {
            var club = this.clubItems[i];
            club.showStatus(club == data);
        }
        this.content1.hide();
        this.sendRequest();
    };
    ClubMemberPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.currentID = MEMBER_NAME.CLUB_LIST;
        this.memberID = [MEMBER_NAME.CLUB_LIST, MEMBER_NAME.CLUB_CHECK, MEMBER_NAME.CLUB_MANAGE];
        this.content1.setRoot(this);
        this.setListBg(-1);
    };
    ClubMemberPanel.prototype.sendRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, resp, _a, listData, listData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isLock)
                            return [2 /*return*/];
                        this.isLock = true;
                        _a = this.currentID;
                        switch (_a) {
                            case MEMBER_NAME.CLUB_LIST: return [3 /*break*/, 1];
                            case MEMBER_NAME.CLUB_CHECK: return [3 /*break*/, 3];
                            case MEMBER_NAME.CLUB_MANAGE: return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1:
                        this.setListBg(-1);
                        hander = ServerPostPath.hall_clubHandler_c_getClubPlayers;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 2:
                        resp = _b.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("成员列表：" + JSON.stringify(resp));
                            listData = _.values(resp);
                            this.content1.setData(listData, this.currentID);
                        }
                        return [3 /*break*/, 7];
                    case 3:
                        hander = ServerPostPath.hall_clubHandler_c_getClubApprovalMessages;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 4:
                        resp = _b.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("成员审批" + JSON.stringify(resp));
                            this.setListBg(resp.length);
                            listData = _.values(resp);
                            this.content1.setData(listData, this.currentID);
                        }
                        return [3 /*break*/, 7];
                    case 5:
                        this.setListBg(-1);
                        hander = ServerPostPath.hall_clubHandler_c_getClubMembersAdministerInfo;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 6:
                        resp = _b.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            // LogUtils.logD("成员审批" + JSON.stringify(resp));
                            // let listData = _.values(resp);
                            this.content1.setData(resp, this.currentID);
                        }
                        return [3 /*break*/, 7];
                    case 7:
                        this.isLock = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClubMemberPanel;
}(BaseInstanceScence));
__reflect(ClubMemberPanel.prototype, "ClubMemberPanel");
var MEMBER_NAME = {
    CLUB_LIST: 1,
    CLUB_CHECK: 2,
    CLUB_MANAGE: 3,
};
