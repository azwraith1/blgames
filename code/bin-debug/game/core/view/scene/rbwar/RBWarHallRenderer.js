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
/*
 * @Author: He Bing
 * @Date: 2019-01-03 16:16:13
 * @Last Modified by: li mengchan
 * @Last Modified time: 2018-11-07 15:12:03
 @Description:游戏玩法赋值
 */
var rbwar;
(function (rbwar) {
    var RBWarHallRenderer = (function (_super) {
        __extends(RBWarHallRenderer, _super);
        function RBWarHallRenderer(data, gameType) {
            var _this = _super.call(this) || this;
            _this.lock = false;
            _this.data = data;
            _this.gameType = gameType;
            return _this;
        }
        RBWarHallRenderer.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var data = this.data;
            var db = GameCacheManager.instance.getCache("db_mj" + data.icon);
            if (!db) {
                db = new DBComponent("db_mj");
                GameCacheManager.instance.setCache("db_mj" + data.icon, db);
            }
            db.touchEnabled = false;
            db.touchChildren = false;
            db.play("ani" + data.icon, -1);
            this.bar.addChild(db);
            db.x = db.width / 2;
            db.y = db.height / 2;
            this.dizhu.text = this.data["bet_base"];
            this.dizhu.stroke = 2;
            this.dzGroup.horizontalCenter = 0;
            this.zuidiGold = this.data["gold_min"];
            this.zhunru.text = "准入:" + this.data["gold_min"];
            game.UIUtils.setAnchorPot(this);
            this.sceneId = data.id;
        };
        /**
         * 底注，文字赋值不同的颜色
         */
        RBWarHallRenderer.prototype.showColor = function (num) {
            switch (num) {
                case 1:
                    return 0x9dff86;
                case 2:
                    return 0xfcd743;
                case 3:
                    return 0xffc1b9;
                case 4:
                    return 0xfebaff;
            }
        };
        /**
         *文字描边
         */
        RBWarHallRenderer.prototype.showColor1 = function (num) {
            switch (num) {
                case 1:
                    return 0x216132;
                case 2:
                    return 0x924700;
                case 3:
                    return 0x810f00;
                case 4:
                    return 0x760075;
            }
        };
        /**
         * 检查回到界面
         */
        RBWarHallRenderer.prototype.checkReconnectScene = function () {
            return __awaiter(this, void 0, void 0, function () {
                var roomState, resp, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            roomState = Global.gameProxy.roomState;
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.hall_sceneHandler_c_queryGameState, null)];
                        case 1:
                            resp = _a.sent();
                            Global.gameProxy.roomState = resp;
                            if (resp && resp.state == 1) {
                                text = GameConfig.GAME_CONFIG['long_config']['10004'].content;
                                Global.alertMediator.addAlert(text, function () {
                                    CF.dP(ENo.ENTER_GOLD_SCENE, resp);
                                });
                            }
                            else {
                                CF.dP(ENo.ENTER_GOLD_SCENE, { gameId: this.gameType, sceneId: this.sceneId, diFen: this.data["bet_base"] });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        RBWarHallRenderer.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            majiang.MajiangUtils.playClick(); //管理声音的
            if (this.lock) {
                return;
            }
            this.lock = true;
            egret.setTimeout(function () {
                this.lock = false;
            }, this, 1000);
            var playerGold = Global.playerProxy.playerData.gold;
            if (playerGold < this.zuidiGold) {
                var text = GameConfig.GAME_CONFIG['long_config']['10003'].content || "金币不足,无法进入";
                Global.alertMediator.addAlert(text, null, null, true);
                return;
            }
            this.checkReconnectScene();
            egret.Tween.get(this).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }, 50);
        };
        return RBWarHallRenderer;
    }(game.BaseUI));
    rbwar.RBWarHallRenderer = RBWarHallRenderer;
    __reflect(RBWarHallRenderer.prototype, "rbwar.RBWarHallRenderer");
})(rbwar || (rbwar = {}));
