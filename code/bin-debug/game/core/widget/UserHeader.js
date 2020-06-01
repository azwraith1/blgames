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
// TypeScript file\
/**
 * 更换玩家头像类
 */
var UserHeader = (function (_super) {
    __extends(UserHeader, _super);
    function UserHeader() {
        var _this = _super.call(this) || this;
        _this.lock = false;
        _this.imageList = [];
        _this.skinName = "UserHeaderSkin" + CF.tis;
        return _this;
    }
    UserHeader.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        this.choseSex = Number(Global.playerProxy.playerData.sex);
        this.choseUrl = Number(Global.playerProxy.playerData.figure_url);
        this.choseBorG(this.choseSex);
        this.ImagesList(this.choseSex);
        egret.setTimeout(function () {
            _this.lock = true;
        }, this, 1000);
    };
    UserHeader.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.CHANG_PLAYER, this.rbwarTouch, this);
    };
    UserHeader.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.CHANG_PLAYER, this.rbwarTouch, this);
    };
    UserHeader.prototype.rbwarTouch = function (e) {
        this.data = e.data;
        this.choseUrl = this.data.figureUrl;
        this.showTouchValue(this.choseUrl);
        CF.dP(ENo.CHANG_PLAYER_HEADER, this.data);
    };
    /**
     * 用户选择的头像，那个对应的头像发亮。
     */
    UserHeader.prototype.showTouchValue = function (value) {
        var header;
        for (var i = 0; i < this.imageList.length; i++) {
            header = this.imageList[i];
            header.setTouchon(value);
        }
    };
    UserHeader.prototype.onTouchTap = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, gatePath, json, resp, json1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        e.stopPropagation();
                        _a = e.target;
                        switch (_a) {
                            case this.closeBtn: return [3 /*break*/, 1];
                            case this.close_rect: return [3 /*break*/, 1];
                            case this.boyGroup: return [3 /*break*/, 3];
                            case this.girlGroup: return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1:
                        if (!this.data) {
                            this.close_rect.visible = false;
                            CF.sN(PanelNotify.CLOSE_HEADER);
                            return [2 /*return*/];
                        }
                        gatePath = ServerConfig.PATH_CONFIG.httpPath;
                        json = { token: Global.playerProxy.token, figureUrl: this.data.figureUrl, sex: this.data.sex };
                        return [4 /*yield*/, Global.netProxy.sendRequestAsync(gatePath + "/gate/clientApi/setPlayerinfo", json)];
                    case 2:
                        resp = _b.sent();
                        if (resp.error) {
                            Global.alertMediator.addAlert("update header error", function () {
                            }, null, true);
                            this.showTouchValue(0);
                            json1 = { figureUrl: this.choseUrl, sex: this.choseSex };
                            CF.dP(ENo.CHANG_PLAYER_HEADER, json1);
                            this.headers.defut();
                        }
                        else {
                            Global.playerProxy.playerData.figure_url = this.data.figureUrl;
                            Global.playerProxy.playerData.sex = this.data.sex;
                            this.close_rect.visible = false;
                            CF.sN(PanelNotify.CLOSE_HEADER);
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        majiang.MajiangUtils.playClick();
                        this.choseBorG(1);
                        this.ImagesList(1);
                        return [3 /*break*/, 5];
                    case 4:
                        majiang.MajiangUtils.playClick();
                        this.choseBorG(2);
                        this.ImagesList(2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 选择男或者女
     */
    UserHeader.prototype.choseBorG = function (num) {
        if (num == 2) {
            for (var i = 1; i <= 4; i++) {
                var boy = this["boy_" + i];
                var girl = this["girl_" + i];
                boy.visible = i <= 2 ? true : false;
                girl.visible = i <= 2 ? false : true;
            }
        }
        else {
            for (var i = 1; i <= 4; i++) {
                var boy = this["boy_" + i];
                var girl = this["girl_" + i];
                boy.visible = i <= 2 ? false : true;
                girl.visible = i <= 2 ? true : false;
            }
        }
    };
    /**
     * 渲染头像组
     * sex:根据性别1男2女
     */
    UserHeader.prototype.ImagesList = function (sex) {
        this.imageList = [];
        this.headerGroup.removeChildren();
        var header;
        for (var i = 1; i <= 10; i++) {
            header = new UserheaderBar();
            header.setContent(i, sex);
            if (this.data) {
                if (this.choseUrl == i && this.data.sex == sex) {
                    this.headers = header;
                    header.defut();
                }
            }
            else {
                if (this.choseUrl == i && this.choseSex == sex) {
                    this.headers = header;
                    header.defut();
                }
            }
            this.headerGroup.addChild(header);
            this.imageList.push(header);
        }
    };
    return UserHeader;
}(game.BaseComponent));
__reflect(UserHeader.prototype, "UserHeader");
