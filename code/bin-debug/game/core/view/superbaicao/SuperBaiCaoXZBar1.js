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
var SuperBaiCaoXZBar1 = (function (_super) {
    __extends(SuperBaiCaoXZBar1, _super);
    function SuperBaiCaoXZBar1() {
        var _this = _super.call(this) || this;
        _this.currentScore = 0;
        _this.xzVisible = false;
        _this.canTouchCoin = true;
        _this.skinName = "SuperBaiCaoXZBarSkin";
        return _this;
    }
    SuperBaiCaoXZBar1.prototype.setRoot = function (root) {
        this.rootName = root;
    };
    /**
 * 选择
 * @param  {number} index
 */
    SuperBaiCaoXZBar1.prototype.selectByIndex = function (index) {
        for (var i = 1; i <= 4; i++) {
            var coin = this["coin" + i];
            coin.setSelected(i == index);
            if (i == index) {
                this.betIndex = coin.BetIndex;
                // this.currentScore = coin.score;
            }
        }
    };
    SuperBaiCaoXZBar1.prototype.hide = function (needAni) {
        var _this = this;
        if (needAni === void 0) { needAni = true; }
        egret.Tween.get(this).to({
            verticalCenter: 1700,
            alpha: 0
        }, 400, egret.Ease.quadOut);
        this.setAutoTimeout(function () {
            egret.Tween.removeTweens(_this);
            _this.verticalCenter = 1700;
            _this.xzVisible = false;
        }, 200, this);
        if (Global.runBack) {
            egret.Tween.removeTweens(this);
            this.verticalCenter = 1700;
            this.xzVisible = false;
        }
        if (needAni == false) {
            egret.Tween.removeTweens(this);
            this.verticalCenter = 1700;
            this.xzVisible = false;
        }
    };
    Object.defineProperty(SuperBaiCaoXZBar1.prototype, "xzBarVis", {
        get: function () {
            return this.xzVisible;
        },
        enumerable: true,
        configurable: true
    });
    SuperBaiCaoXZBar1.prototype.show = function () {
        var _this = this;
        this.visible = true;
        egret.Tween.get(this).to({
            verticalCenter: 532,
            alpha: 1
        }, 400, egret.Ease.quadOut);
        this.setAutoTimeout(function () {
            _this.verticalCenter = 532;
            _this.xzVisible = true;
            _this.alpha = 1;
            _this.visible = true;
        }, 200, this);
    };
    SuperBaiCaoXZBar1.prototype.initWithArr = function (xzArr, betBase, genzhuVal) {
        for (var i = 0; i < xzArr.length; i++) {
            var coinNumber = xzArr[i];
            var coin = this["coin" + (i + 1)];
            var realCoinVal = new Big(coinNumber * betBase).add(genzhuVal); //coinNumber * betBase + genzhuVal;
            coin.showBaiCaoCoin("superbaicao_cm_" + (i + 1), realCoinVal, i); //coinNumber * betBase
            coin.kImage.source = "superbaicao_cm_on_" + (i + 1) + "_png";
        }
        this.selectByIndex(1);
        this.setFlowBtnTxt(genzhuVal);
    };
    SuperBaiCaoXZBar1.prototype.setFlowBtnTxt = function (val) {
        var targetTxt = this.genZhuBtn.commonTxt;
        targetTxt.size = 24;
        targetTxt.verticalCenter = 15;
        targetTxt.textColor = 0xfef9d3;
        targetTxt.bold = true;
        var realVal = val;
        targetTxt.text = NumberFormat.formatGold_scence(val);
        targetTxt.visible = val > 0;
        LogUtils.logD("=====vis====" + targetTxt.visible + "val:" + val);
    };
    // private onTouch
    SuperBaiCaoXZBar1.prototype.onTouchTap = function (e) {
        if (this.canTouchCoin == false)
            return;
        switch (e.target) {
            case this.coin1:
                this.selectByIndex(1);
                this.onTouchJiaZhu();
                break;
            case this.coin2:
                this.selectByIndex(2);
                this.onTouchJiaZhu();
                break;
            case this.coin3:
                this.selectByIndex(3);
                this.onTouchJiaZhu();
                break;
            case this.coin4:
                this.selectByIndex(4);
                this.onTouchJiaZhu();
                break;
            case this.genZhuBtn:
                this.onTouchFollow();
                break;
        }
    };
    SuperBaiCaoXZBar1.prototype.onTouchJiaZhu = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            type: 3,
                            betIndex: this.betIndex,
                        };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        //成功
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            this.hide();
                            this.rootName.hideGiveBtn();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    SuperBaiCaoXZBar1.prototype.onTouchFollow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {
                            type: 2
                        };
                        return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_superBaiCaoHandler_c_oprate, data)];
                    case 1:
                        resp = _a.sent();
                        Global.pomelo.clearLastLock();
                        //成功
                        if (resp.error && resp.error.code != 0) {
                            Toast.launch(resp.error.msg, 1);
                        }
                        else {
                            this.hide();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return SuperBaiCaoXZBar1;
}(game.BaseUI));
__reflect(SuperBaiCaoXZBar1.prototype, "SuperBaiCaoXZBar1");
