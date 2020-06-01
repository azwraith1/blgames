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
var majiang;
(function (majiang) {
    var MajiangTestScene = (function (_super) {
        __extends(MajiangTestScene, _super);
        function MajiangTestScene() {
            var _this = _super.call(this) || this;
            _this.shoupais = [];
            _this.skinName = new MajiangTestSkin();
            return _this;
        }
        MajiangTestScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.mainGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.mainGroupTouchEnded, this);
        };
        /**
         *
         */
        MajiangTestScene.prototype.initData = function () {
            return __awaiter(this, void 0, void 0, function () {
                var resp, cardArr, i, card;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Global.pomelo.request("game.mjHandler.c_gmGetPublicCards", null)];
                        case 1:
                            resp = _a.sent();
                            cardArr = resp.cards;
                            for (i = 0; i < cardArr.length; i++) {
                                card = new majiang.MineShoupai(cardArr[i]);
                                card.touchEnabled = false;
                                this.shoupais.push(card);
                                this.mainGroup.addChild(card);
                                card.removeTouch();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MajiangTestScene.prototype.mainGroupTouchEnded = function (e) {
            var x = e.stageX;
            var y = e.stageY;
            var po = new egret.Point(x, y);
            var findMj = _.find(this.shoupais, function (shoupai) {
                var rect = new egret.Rectangle(shoupai.x, shoupai.y, shoupai.width, shoupai.height);
                return rect.containsPoint(po);
            });
            if (findMj) {
                if (this.touchOn) {
                    if (this.touchOn == findMj) {
                        this.touchOn.alpha = 1;
                        this.touchOn = null;
                        return;
                    }
                    //对换
                    var value1 = this.touchOn.value;
                    var value2 = findMj.value;
                    this.touchOn.resetValue(value2);
                    findMj.resetValue(value1);
                    this.touchOn.alpha = 1;
                    findMj.alpha = 1;
                    this.touchOn = null;
                }
                else {
                    findMj.alpha = 0.5;
                    this.touchOn = findMj;
                }
            }
        };
        MajiangTestScene.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.enterBtn:
                    this.enterBtnTouch();
                    break;
                case this.cacelBtn:
                    game.UIUtils.removeSelf(this);
                    break;
            }
        };
        MajiangTestScene.prototype.enterBtnTouch = function () {
            return __awaiter(this, void 0, void 0, function () {
                var arr, i, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            arr = [];
                            for (i = 0; i < this.shoupais.length; i++) {
                                arr.push(this.shoupais[i].value);
                            }
                            data = { cards: arr };
                            return [4 /*yield*/, Global.pomelo.request("game.mjHandler.c_gmSetPublicCards", data)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error.code == 0) {
                                TipsCompoment.instance.show("设置成功");
                                game.UIUtils.removeSelf(this);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MajiangTestScene;
    }(game.BaseComponent));
    majiang.MajiangTestScene = MajiangTestScene;
    __reflect(MajiangTestScene.prototype, "majiang.MajiangTestScene");
})(majiang || (majiang = {}));
