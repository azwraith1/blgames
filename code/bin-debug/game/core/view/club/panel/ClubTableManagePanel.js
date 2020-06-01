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
var ClubTableManagePanel = (function (_super) {
    __extends(ClubTableManagePanel, _super);
    function ClubTableManagePanel() {
        var _this = _super.call(this) || this;
        _this.tableDiFenData = [];
        /**初始化底分的值 */
        _this.point = ",";
        _this.betBase = [];
        _this.maxTableNum = 10;
        _this.skinName = "ClubTableManagePanelSkin" + CF.tis; //"ClubTableManagePanelSkin";
        return _this;
    }
    Object.defineProperty(ClubTableManagePanel, "instance", {
        get: function () {
            if (!ClubTableManagePanel._instance) {
                ClubTableManagePanel._instance = new ClubTableManagePanel();
            }
            return ClubTableManagePanel._instance;
        },
        enumerable: true,
        configurable: true
    });
    ClubTableManagePanel.prototype.onTouchTap = function (e) {
        e.stopPropagation();
        switch (e.target) {
            case this.setBtn:
                this.difenSetGroup.visible = true;
                this.clubDifenSet.setInputArr(this.tableDiFenData);
                // this.hide();
                break;
            case this.saveBtn:
                this.onTouchSaveBtn();
                break;
            case this.touchRect:
                this.difenSetGroup.visible = false;
                break;
            case this.rects:
                this.hide();
                break;
            case this.closeBtn:
                this.hide();
                break;
            default:
                break;
        }
    };
    ClubTableManagePanel.prototype.initDiFen = function (data) {
        this.tableDiFenData = data;
        var text = "";
        var current;
        var next;
        for (var i = 0; i < this.tableDiFenData.length; ++i) {
            current = this.tableDiFenData[i];
            next = this.tableDiFenData[i + 1];
            if (next) {
                text = text + current + this.point;
            }
            else {
                text = text + current;
            }
        }
        this.difenTxt.text = text;
        var betBase = [];
        if (this.tableDiFenData.length > 0) {
            var txtArr = text.split(this.point);
            for (var i = 0; i < txtArr.length; ++i) {
                var tempt = Number(new Big(txtArr[i]));
                betBase.push(tempt);
            }
        }
        this.betBase = betBase;
    };
    ClubTableManagePanel.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.tableNumTxt.restrict = "0-9";
        this.clubDifenSet.setRoot(this);
        this.tableNumTxt.addEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
    };
    ClubTableManagePanel.prototype.onFouceOut = function (e) {
        var nameInput = e.target;
        if (!nameInput.text || nameInput.text == "") {
            nameInput.text = 0 + "";
        }
        if (Number(nameInput.text) > this.maxTableNum) {
            nameInput.text = this.maxTableNum.toString();
        }
    };
    ClubTableManagePanel.prototype.hide = function () {
        game.UIUtils.removeSelf(this);
        ClubTableManagePanel._instance = null;
    };
    ClubTableManagePanel.prototype.show = function () {
        this.sendRequest();
    };
    ClubTableManagePanel.prototype.onTouchSaveBtn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, msg, resp, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hander = ServerPostPath.hall_clubHandler_c_setClubTableConfig;
                        msg = {
                            clubId: ClubManager.instance.currentClub.clubId,
                            gameId: ClubManager.instance.lastClubGameId,
                            config: {
                                initNum: Number(this.tableNumTxt.text),
                                betBases: this.betBase,
                            }
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, msg)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            data = resp["tableSetting"]["games"]["" + ClubManager.instance.lastClubGameId];
                            Toast.launch(TextUtils.instance.getCurrentTextById(61), 1);
                            this.refreshUI(data);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubTableManagePanel.prototype.showClubTable = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handler, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handler = ServerPostPath.hall_clubHandler_c_enterClubHall;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, { clubId: ClubManager.instance.currentClub.clubId })];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Global.alertMediator.addAlert(resp.error.msg, null, null, true);
                            this.hide();
                            ClubInnerHallScene.instance.hide();
                            CF.sN(SceneNotify.OPEN_CLUB_HALL);
                            return [2 /*return*/];
                        }
                        ClubManager.instance.setClubData(resp);
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubTableManagePanel.prototype.sendRequest = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hander, msg, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hander = ServerPostPath.hall_clubHandler_c_getClubTableConfig;
                        msg = {
                            clubId: ClubManager.instance.currentClub.clubId,
                            gameId: ClubManager.instance.lastClubGameId
                        };
                        return [4 /*yield*/, game.PomeloManager.instance.request(hander, msg)];
                    case 1:
                        resp = _a.sent();
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            LogUtils.logD("===牌桌管理===" + JSON.stringify(resp));
                            this.refreshUI(resp);
                            //添加UI
                            GameLayerManager.gameLayer().panelLayer.addChild(this);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClubTableManagePanel.prototype.refreshUI = function (resp) {
        this.tableDiFenData = resp["betBases"];
        this.betBase = this.tableDiFenData;
        //设置初始底分
        this.initDiFen(this.tableDiFenData);
        //设置初始桌数
        this.tableNumTxt.text = resp["initNum"];
    };
    return ClubTableManagePanel;
}(game.BaseComponent));
__reflect(ClubTableManagePanel.prototype, "ClubTableManagePanel");
