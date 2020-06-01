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
var PMDComponent = (function (_super) {
    __extends(PMDComponent, _super);
    function PMDComponent() {
        var _this = _super.call(this) || this;
        if (PMDComponent._instance) {
            throw new Error("DateTimer使用单例");
        }
        _this.skinName = new PublicNoticeComponentGameSkin();
        return _this;
    }
    Object.defineProperty(PMDComponent, "instance", {
        get: function () {
            if (!PMDComponent._instance) {
                PMDComponent._instance = new PMDComponent();
            }
            return PMDComponent._instance;
        },
        enumerable: true,
        configurable: true
    });
    PMDComponent.prototype.createChildren = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.createChildren.call(this);
                this.visible = false;
                this.scaleY = 0;
                this.rects.visible = true;
                this.publicNoticeLable.mask = this.rects; //定义遮罩。
                return [2 /*return*/];
            });
        });
    };
    PMDComponent.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_broadcast, this.paomadeng, this);
    };
    PMDComponent.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_broadcast, this.paomadeng, this);
    };
    PMDComponent.prototype.paomadeng = function (e) {
        var data = e.data;
        if (!data) {
            return;
        }
        if (data.enable == 0) {
            this.showCloseAni();
            PMDFactory.instance.deleteMsg();
            this.runTime = 0;
            return;
        }
        if (data.expire_time * 1000 < game.DateTimeManager.instance.now) {
            this.showCloseAni();
            PMDFactory.instance.deleteMsg();
            this.runTime = 0;
            return;
        }
        if (data.type == 2) {
            if (data.gameId == "mjxzdd") {
                data.gameId = "mjxlch";
            }
            if (data.gameId != PMDComponent.currentRunningScene) {
                return;
            }
            if (data.gameId != "slot") {
                return;
            }
        }
        var pmd = new PMDBean();
        pmd.type = data.type;
        pmd.key = data.gameId;
        if (data.type == 1) {
            pmd.text = '<font color="#FEDD00" size="22"   >' + data.content + '</font>';
            pmd.time = 3;
            pmd.time2 = 15000;
            PMDFactory.instance.addPMD(pmd);
        }
        else if (data.type == 2) {
            var template = data.template;
            var content = data.content;
            if (!content.gold) {
                return;
            }
            var money = content.gold.toFixed(2);
            var sceneId = data.sceneId;
            var sceneName = '<font color="#FEDD00" size="22"   >' + content.sceneName + '</font>';
            var nameFont = '<font color="#FEDD00" size="22"   >' + content.nickname + '</font>';
            var gold = '<font color="#FEDD00" size="22"   >' + money + '</font>';
            template = template.replace("{%nickname%}", nameFont);
            template = template.replace("{%sceneName%}", sceneName);
            template = template.replace("{%gold%}", gold);
            pmd.text = template;
            pmd.time = 1;
            pmd.time2 = 8000;
            if (data.gameId == "slot") {
                CF.dP(ENo.SLOT_HALL_ICON_GOLD, { sceneName: content.sceneName, sceneId: sceneId });
                pmd.time2 = 12000;
            }
            if (game.LaohuUtils.currentSceneId) {
                if (sceneId == game.LaohuUtils.currentSceneId) {
                    PMDFactory.instance.addPMD(pmd);
                }
            }
            else {
                PMDFactory.instance.addPMD(pmd);
            }
        }
    };
    PMDComponent.prototype.showAni = function () {
        if (this.runTime > 0) {
            this.publicNoticeLable.x = 450;
            this.movieLable();
        }
        else {
            PMDFactory.instance.goNext();
            var size = PMDFactory.instance.getSize();
            if (size < 1) {
                this.showCloseAni();
            }
        }
    };
    PMDComponent.prototype.showCloseAni = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleY: 0 }, 100, egret.Ease.bounceInOut).call(function () {
            _this.visible = false;
        });
    };
    PMDComponent.prototype.show = function (pmdData) {
        if (pmdData.text == undefined) {
            return;
        }
        this.currentPMD = pmdData;
        this.publicNoticeLable.textFlow = (new egret.HtmlTextParser).parser(pmdData.text); // ;
        this.runTime = pmdData.time;
        this.showAni();
    };
    PMDComponent.prototype.movieLable = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        if (!this.visible) {
            this.scaleY = 0;
            this.visible = true;
        }
        egret.Tween.get(this).to({ scaleY: 1 }, 100, egret.Ease.bounceInOut).call(function () {
            egret.Tween.get(_this.publicNoticeLable).to({ x: _this.rects.x - _this.publicNoticeLable.width }, _this.currentPMD.time2).call(function () {
                _this.publicNoticeLable.x = 450;
                _this.runTime--;
                _this.showAni();
            });
        }, this);
    };
    PMDComponent.currentRunningScene = "";
    return PMDComponent;
}(game.BaseUI));
__reflect(PMDComponent.prototype, "PMDComponent");
