/*
 * @Author: He Bing
 * @Date: 2018-07-06 16:29:49
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-07 18:44:59
 @Description: 麻将结算界面
 */
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
    var XZDDOverScene = (function (_super) {
        __extends(XZDDOverScene, _super);
        function XZDDOverScene(data) {
            var _this = _super.call(this) || this;
            //new
            /**
             * 打开游戏界面通知
             */
            _this.GAME_SCENE_NOTIFY = SceneNotify.CLOSE_MJXZDD;
            /**
             * 关闭游戏界面通知
             */
            _this.HALL_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD_HALL;
            /**
             * 关闭当前界面通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_MJXZDD_OVER;
            /**
             * 对应匹配界面通知
             */
            _this.MATCHING_SCENE_NOTIFY = SceneNotify.OPEN_MJXZDD_MATCHING;
            _this.values = data.players;
            _this.status = data.status;
            //	this.skinName = new MajiangJiesuanSceneSkin();
            _this.skinName = "MajiangJiesuanSceneNewSkin";
            return _this;
        }
        XZDDOverScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            Global.runGame = false;
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        XZDDOverScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
        };
        XZDDOverScene.prototype.resetPosition = function (e) {
            var data = e.data;
        };
        XZDDOverScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //clubnew
            this.isClubGame = Global.gameProxy.roomInfo.tableId != undefined;
            this.setNameStyle();
            this.show();
            this.alpha = 0;
            egret.Tween.get(this).to({
                alpha: 1
            }, 1000, egret.Ease.circIn);
        };
        XZDDOverScene.prototype.getJia = function (gaiGold) {
            if (gaiGold > 0) {
                return "+";
            }
            else {
                return "";
            }
        };
        /**设置名字的样式
             * samrt
            */
        XZDDOverScene.prototype.setNameStyle = function () {
            var text;
            for (var i = 1; i < 5; ++i) {
                text = this["player_" + i + "_name"];
                text.size = 11;
                text.textColor = 0xfdfdf3;
            }
        };
        XZDDOverScene.prototype.show = function () {
            var shuJiArr = this.values; //主方法
            if (shuJiArr != null) {
                for (var key in shuJiArr) {
                    var data = shuJiArr[key];
                    if (Global.gameProxy.checkIndexIsMe(key)) {
                        this.showMine(data, key); //是自己，要调用的方法。
                    }
                    else {
                        this.showOthers(data, key); //非自己调用的方法。
                    }
                }
            }
        };
        /**
         * 显示自己
         */
        XZDDOverScene.prototype.showMine = function (data, key) {
            if (data.bills.length == 0) {
                this.tips_text.visible = true;
            }
            else {
                for (var i = 0; i < data.bills.length; i++) {
                    if (data.bills[i]["type"] != 0) {
                        var item = new majiang.MajiangJiesuanRenderer(data.bills[i]); //这里是将每产生的一条信息加到这个组里面。
                        this.everyoneGroup.addChild(item);
                    }
                }
            }
            var header = Global.gameProxy.getPlayerByIndex(key).figure_url || Global.gameProxy.getPlayerByIndex(key)["figureUrl"];
            var headerSex = Global.gameProxy.getPlayerByIndex(key).sex || Global.gameProxy.getPlayerByIndex(key)["sex"];
            this.player_1.source = "hall_header_" + headerSex + "_" + header + "_png";
            var nums = data["gainGold"];
            this.winOrLoseImg(nums);
            Global.playerProxy.playerData.gold = data["ownGold"];
            this.player_1_name.text = Global.playerProxy.playerData.nickname; //Global.playerProxy.playerData全局变量，相当于cookie。
            if (data["gainGold"] > 0) {
                this.meWinOrLoseTextColor(data["gainGold"]);
                this.player_1_score.text = "+" + NumberFormat.formatGold_scence(data["gainGold"], 1);
            }
            else {
                this.meWinOrLoseTextColor(data["gainGold"]);
                this.player_1_score.text = NumberFormat.formatGold_scence(data["gainGold"], 1);
            }
        };
        /**
         * 其他玩家
         *
         */
        XZDDOverScene.prototype.showOthers = function (data, key) {
            this.directions = majiang.MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
            var players = Global.gameProxy.getPlayers();
            var header = Global.gameProxy.getPlayerByIndex(key).figure_url || Global.gameProxy.getPlayerByIndex(key)["figureUrl"];
            var headerSex = Global.gameProxy.getPlayerByIndex(key).sex || Global.gameProxy.getPlayerByIndex(key)["sex"];
            switch (this.directions[key]) {
                case "left":
                    this.img_bg_2.visible = true;
                    this.name_bg_2.visible = true;
                    this.player_2_name.text = players[key].nickname;
                    this.player_2.source = "hall_header_" + headerSex + "_" + header + "_png";
                    //this.player_2_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_2_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_2_score.textColor = this.socreW2L(data["gainGold"]);
                    break;
                case "right":
                    this.img_bg_4.visible = true;
                    this.name_bg_4.visible = true;
                    this.player_4_name.text = players[key].nickname;
                    this.player_4.source = "hall_header_" + headerSex + "_" + header + "_png";
                    //this.player_4_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_4_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_4_score.textColor = this.socreW2L(data["gainGold"]);
                    break;
                case "top":
                    this.img_bg_3.visible = true;
                    this.name_bg_3.visible = true;
                    this.player_3_name.text = players[key].nickname;
                    this.player_3.source = "hall_header_" + headerSex + "_" + header + "_png";
                    //	this.player_3_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_3_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
                    this.player_3_score.textColor = this.socreW2L(data["gainGold"]);
                    break;
            }
        };
        /**
         * 判断输赢图片
         */
        XZDDOverScene.prototype.winOrLoseImg = function (score) {
            if (score > 0) {
                this.win_lose_bgs.source = RES.getRes("js_win_bg_png");
                this.win_lose_title.source = RES.getRes("js_win_png");
                //	this.moiveC();
            }
            else if (score == 0) {
                this.win_lose_bgs.source = RES.getRes("js_ping_bg_png");
                this.win_lose_title.source = RES.getRes("js_ping_png");
                //	this.moiveC();
            }
            else {
                this.win_lose_bgs.source = RES.getRes("js_lose_bg_png");
                this.win_lose_title.source = RES.getRes("js_lose_png");
                this.win_lose_bgs.top = 20;
            }
        };
        /**
         * 动画
         */
        XZDDOverScene.prototype.moiveC = function () {
            // egret.Tween.get(this.bg_xuanzhuanguang, { loop: true }).to({ rotation: 360 }, 5000);
            // this.bg_xuanzhuanguang.mask = this.bg_xuanzhuanguang_rects;
        };
        /**
         * 判断输赢字体颜色。
         */
        XZDDOverScene.prototype.meWinOrLoseTextColor = function (fnt_color) {
            if (fnt_color > 0) {
                this.player_1_score.font = RES.getRes("win_text_fnt");
            }
            else {
                this.player_1_score.font = RES.getRes("lose_text_fnt");
            }
            //	this.player_1_score.textAlign = "center";
        };
        /**
    /**
         * 判断分数正负颜色 smart
         */
        XZDDOverScene.prototype.socreW2L = function (color) {
            if (color > 0) {
                return 0xf6b74b;
                //	return 0xfff729;
            }
            else {
                return 0xc4dfff;
                //	return 0xffffff;
            }
        };
        XZDDOverScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    e.stopPropagation();
                    switch (e.target) {
                        case this.restartBtn://下一局
                            if (this.isClubGame) {
                                this.back2ReadyScene(function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.GAME_SCENE_NOTIFY);
                                    XZDDClubReadyScene.instance.show(true);
                                }, function () {
                                    CF.sN(_this.CLOSE_NOTIFY);
                                    CF.sN(_this.GAME_SCENE_NOTIFY);
                                });
                                return [2 /*return*/];
                            }
                            this.restartBtnTouch();
                            break;
                        case this.backBtn: //退出
                        case this.closeBtn:
                            CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
                            CF.sN(this.CLOSE_NOTIFY);
                            break;
                    }
                    return [2 /*return*/];
                });
            });
        };
        XZDDOverScene.prototype.s_pushRaceInvite = function () {
        };
        /**
         * 返回对应游戏大厅
         */
        XZDDOverScene.prototype.backHall = function () {
            CF.sN(this.GAME_SCENE_NOTIFY);
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.HALL_SCENE_NOTIFY);
        };
        /**
         * 返回对应的匹配
         */
        XZDDOverScene.prototype.backMatching = function () {
            CF.sN(this.GAME_SCENE_NOTIFY);
            CF.sN(this.CLOSE_NOTIFY);
            CF.sN(this.MATCHING_SCENE_NOTIFY);
        };
        return XZDDOverScene;
    }(game.BaseGameScene));
    majiang.XZDDOverScene = XZDDOverScene;
    __reflect(XZDDOverScene.prototype, "majiang.XZDDOverScene");
})(majiang || (majiang = {}));
