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
var ClubCreatePanel = (function (_super) {
    __extends(ClubCreatePanel, _super);
    function ClubCreatePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubCreatePanelSkin" + CF.tis;
        return _this;
    }
    ClubCreatePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    Object.defineProperty(ClubCreatePanel, "instance", {
        get: function () {
            if (!ClubCreatePanel._instance) {
                ClubCreatePanel._instance = new ClubCreatePanel();
            }
            return ClubCreatePanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubCreatePanel.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CLUB_CHANGE_ICON, this.flashIcon, this);
    };
    ClubCreatePanel.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CLUB_CHANGE_ICON, this.flashIcon, this);
    };
    ClubCreatePanel.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.cancelCreateClub:
                this.cancel();
                break;
            case this.clubIcon:
                this.changeClubIcon();
                break;
            case this.clubCreateClose:
                this.cancel();
                break;
        }
    };
    ClubCreatePanel.prototype.creatClub = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clubName, rate, iconid, data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clubName = this.clubName.text;
                        if (clubName.length <= 0) {
                            Toast.launch(TextUtils.instance.getCurrentTextById(86), 1);
                            return [2 /*return*/];
                        }
                        else if (clubName.length > 6) {
                            Toast.launch(TextUtils.instance.setTextById(87, { "1": 6 }), 1);
                            return [2 /*return*/];
                        }
                        rate = parseInt(this.clubRate.text) / 100;
                        if (!rate || rate == NaN) {
                            rate = 0.05;
                        }
                        ;
                        iconid = ClubIconItem.clubIconIdex;
                        if (!iconid)
                            iconid = 1;
                        data = { clubName: clubName, config: { pumpRate: rate }, iconId: iconid };
                        return [4 /*yield*/, game.PomeloManager.instance.request(ServerPostPath.hall_ubHandler_c_createClub, data)];
                    case 1:
                        resp = _a.sent();
                        if (resp.clubId) {
                            Toast.launch(TextUtils.instance.getCurrentTextById(88), 1);
                            CF.dP(ENo.CLUB_FLASH_CLUB_LIST);
                        }
                        else {
                            Toast.launch(resp.error.msg, 1);
                            return [2 /*return*/];
                        }
                        this.cancel();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubCreatePanel.prototype.changeClubIcon = function () {
        var changeHeadPanel = ClubChangeIconPanel.instance;
        this.resizeGroup.addChild(changeHeadPanel);
    };
    ClubCreatePanel.prototype.cancel = function () {
        // this[`headBg`].visible = false;
        this.clubIcon.source = "club_create_change_png";
        this.clubIcon.horizontalCenter = 0;
        this.clubIcon.y = 161;
        game.UIUtils.removeSelf(this);
        game.UIUtils.removeSelf(ClubCreatePanel._instance);
        ClubCreatePanel._instance = null;
        ClubIconItem.clubIconIdex = 3;
    };
    ClubCreatePanel.prototype.flashIcon = function () {
        if (ClubIconItem.clubIconIdex) {
            // this[`headBg`].visible = true;
            this.clubIcon.source = "club_icon_" + ClubIconItem.clubIconIdex + "_png";
            this.clubIcon.horizontalCenter = 0;
            this.clubIcon.scaleX = this.clubIcon.scaleY = 0.75;
        }
    };
    return ClubCreatePanel;
}(game.BaseComponent));
__reflect(ClubCreatePanel.prototype, "ClubCreatePanel");
