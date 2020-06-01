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
var ClubMemerManage = (function (_super) {
    __extends(ClubMemerManage, _super);
    function ClubMemerManage(gameid) {
        return _super.call(this, gameid) || this;
        //this.skinName = "ClubMemberManageSkin";
    }
    ClubMemerManage.prototype.renderUI = function (data) {
        _super.prototype.renderUI.call(this, data);
        var role = data["role"];
        this.role = role;
        switch (role) {
            case 1://老板
                this.btnGroup.visible = false;
                break;
            case 2://管理员
                this.btnGroup.visible = true;
                this.jzImg.source = "club_mem_jiangzhi_png";
                break;
            case 3://成员
                this.btnGroup.visible = true;
                this.jzImg.source = "club_mem_shenzhi_png";
                break;
        }
        this.setPlayType(role);
    };
    ClubMemerManage.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.kickBtn.skinName = "NewButtonSkin";
        this.headerImage.mask = this.headerMask;
        var src = "club_mem_tichu" + CF.tic;
        this.kickBtn.setUpImg(src, src);
        // TextUtils.instance.changeImage(this.kickBtn.upImg);
        // this.tichuImg.touchEnabled = true;
        // this.tichuImg.source = "club_mem_tichu_png";
        // TextUtils.instance.changeImage(this.tichuImg);
    };
    ClubMemerManage.prototype.onTouchTap = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var data, hander, resp, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.stopPropagation();
                        data = {
                            clubId: ClubManager.instance.currentClub.clubId,
                            playerUid: this.playerId,
                        };
                        hander = ServerPostPath.hall_clubHandler_c_clubMembersAdminister;
                        _a = e.target;
                        switch (_a) {
                            case this.jzImg: return [3 /*break*/, 1];
                            case this.kickBtn: return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (this.role == 3) {
                            data["operate"] = 0;
                        }
                        else if (this.role == 2) {
                            data["operate"] = 1;
                        }
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, data)];
                    case 2:
                        resp = _b.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("成员 管理" + JSON.stringify(resp));
                            this.root.setData(resp, this.gameID);
                        }
                        //同意
                        return [3 /*break*/, 5];
                    case 3:
                        data["operate"] = 2;
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, data)];
                    case 4:
                        resp = _b.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("成员 管理" + JSON.stringify(resp));
                            this.root.setData(resp, this.gameID);
                        }
                        //拒绝
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ClubMemerManage;
}(BaseClubMemberRender));
__reflect(ClubMemerManage.prototype, "ClubMemerManage");
