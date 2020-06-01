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
var ClubJoinPanel = (function (_super) {
    __extends(ClubJoinPanel, _super);
    function ClubJoinPanel() {
        var _this = _super.call(this) || this;
        _this.inputIndex = 0;
        _this.skinName = "ClubJoinPanelSkin" + CF.tis;
        return _this;
    }
    Object.defineProperty(ClubJoinPanel, "instance", {
        get: function () {
            if (!ClubJoinPanel._instance) {
                ClubJoinPanel._instance = new ClubJoinPanel();
            }
            return ClubJoinPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubJoinPanel.prototype.onTouchTap = function (e) {
        var _this = this;
        if (e.target.name) {
            this.inputNum = parseInt(e.target.name);
            egret.Tween.get(e.target).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(function () {
                _this.textInput();
            });
        }
        else {
            switch (e.target) {
                case this.numclearall:
                    this.clearAllNum();
                    break;
                case this.numclear:
                    this.clearNum();
                    break;
                case this.backBtn:
                    this.quit();
                    break;
            }
        }
    };
    ClubJoinPanel.prototype.textInput = function () {
        if (this.inputIndex >= 7)
            return;
        this.inputIndex += 1;
        this["label" + this.inputIndex].text = this.inputNum + "";
        if (this.inputIndex == 7) {
            this.joinClub();
        }
    };
    ClubJoinPanel.prototype.clearAllNum = function () {
        for (var i = 1; i <= 7; i++) {
            this["label" + i].text = "";
            this.inputIndex = 0;
        }
    };
    ClubJoinPanel.prototype.clearNum = function () {
        if (this.inputNum < 0)
            return;
        this["label" + this.inputIndex].text = "";
        this.inputIndex -= 1;
    };
    ClubJoinPanel.prototype.quit = function () {
        this.inputIndex = 0;
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubJoinPanel._instance);
        ClubJoinPanel._instance = null;
    };
    ClubJoinPanel.prototype.joinClub = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clubId, i, clubId2, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clubId = "";
                        for (i = 1; i <= 7; i++) {
                            clubId = clubId.concat(this["label" + i].text);
                        }
                        clubId2 = parseInt(clubId);
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_joinClub, { clubId: clubId2 })];
                    case 1:
                        resp = _a.sent();
                        if (resp) {
                            if (resp.error.code) {
                                Toast.launch(resp.error.msg, 1);
                            }
                            else {
                                Toast.launch(TextUtils.instance.getCurrentTextById(16), 1);
                                this.quit();
                            }
                            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
                        }
                        else {
                            Toast.launch(resp.error.msg, 1);
                            this.quit();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return ClubJoinPanel;
}(game.BaseComponent));
__reflect(ClubJoinPanel.prototype, "ClubJoinPanel");
