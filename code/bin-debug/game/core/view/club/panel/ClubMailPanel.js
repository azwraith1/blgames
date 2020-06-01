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
var CLubMailPanel = (function (_super) {
    __extends(CLubMailPanel, _super);
    function CLubMailPanel() {
        var _this = _super.call(this) || this;
        _this.mailNum = 0;
        _this.skinName = "ClubHallEmailSkin" + CF.tis;
        return _this;
    }
    Object.defineProperty(CLubMailPanel, "instance", {
        get: function () {
            if (!CLubMailPanel._instance) {
                CLubMailPanel._instance = new CLubMailPanel();
            }
            return CLubMailPanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    CLubMailPanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.emailList.itemRenderer = ClubMailItem;
        this.initList();
    };
    CLubMailPanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_FLASH_MAILS, this.flashMails, this);
    };
    CLubMailPanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_FLASH_MAILS, this.flashMails, this);
    };
    CLubMailPanel.prototype.initList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, atr, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_userHandler_c_getMailList, {})];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        atr = [];
                        this["nomessageGroup"].visible = resp.length == 0;
                        if (resp) {
                            CLubMailPanel.instance.mailNum = resp.length;
                            for (i = 0; i < resp.length; i++) {
                                atr.push(resp[i]);
                            }
                            this.emailList.itemRenderer = ClubMailItem;
                            this.emailList.dataProvider = new eui.ArrayCollection(atr);
                        }
                        this.emailList.dataProvider = new eui.ArrayCollection(atr);
                        return [2 /*return*/];
                }
            });
        });
    };
    CLubMailPanel.prototype.flashMails = function () {
        this.initList();
    };
    CLubMailPanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.clearBtn:
                this.clearAllMail();
                break;
            case this.closeBtn:
                game.UIUtils.removeSelf(this);
                game.UIUtils.removeSelf(CLubMailPanel._instance);
                CLubMailPanel._instance = null;
                break;
        }
    };
    CLubMailPanel.prototype.clearAllMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_userHandler_c_cleanMail, {})];
                    case 1:
                        resp = _a.sent();
                        CLubMailPanel.instance.mailNum = 0;
                        this.flashMails();
                        return [2 /*return*/];
                }
            });
        });
    };
    return CLubMailPanel;
}(game.BaseComponent));
__reflect(CLubMailPanel.prototype, "CLubMailPanel");
