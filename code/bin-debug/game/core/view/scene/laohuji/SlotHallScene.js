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
 * @Author: reel MC Lee
 * @Date: 2019-11-11 14:46:26
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-03 17:29:46
 * @Description:
 */
var slot;
(function (slot) {
    var SlotHallScene = (function (_super) {
        __extends(SlotHallScene, _super);
        function SlotHallScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "slot";
            _this.buttonList = [];
            _this.skinName = new SlotHallSkin();
            return _this;
        }
        SlotHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            game.UIUtils.changeResize(1);
            this.userName.text = Global.playerProxy.playerData.nickname;
            var headerImage = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
            this.headImag.source = headerImage;
            var m = new egret.Shape();
            m.graphics.beginFill(0xffffff);
            m.graphics.drawCircle(0, 0, 54);
            m.touchEnabled = false;
            m.x = 86, m.y = 64;
            m.graphics.endFill();
            this.userGroup.addChild(m);
            this.headImag.mask = m;
            this.updateGold();
            this.scrollerGroup.scrollPolicyV = "off";
            this.scrollerGroup.bounces = true;
            this.initList();
            this.scrollerGroup.addEventListener(egret.Event.CHANGE, this.scrollerAlphaSet, this);
            this.initHallAni();
            SoundManager.getInstance().playMusic("slot_hall_bg_mp3");
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 10;
            this.resizeGroup.addChild(publicMsg);
        };
        SlotHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.SLOT_HALL_CLICK, this.enterSlotGame, this);
            CF.aE(ENo.SLOT_HALL_ICON_GOLD, this.addSlotGoldAni, this);
            CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            CF.aE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
        };
        SlotHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.SLOT_HALL_CLICK, this.enterSlotGame, this);
            CF.rE(ENo.SLOT_HALL_ICON_GOLD, this.addSlotGoldAni, this);
            CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            CF.rE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
        };
        SlotHallScene.prototype.s_pushRaceInvite = function () {
            egret.setTimeout(function () {
                MatchInvitePanel.instance.show();
            }, this, 2000);
        };
        /**
         * slot 大厅灯光，人物特效
         */
        SlotHallScene.prototype.initHallAni = function () {
            this.hallRoleAni = new DBComponent("slot_hall_role");
            this.hallLightAni = new DBComponent("slot_hall_light");
            this.hallKuangAni = new DBComponent("slot_hall_kuang_ani");
            this.rankAni = DBComponent.create("slot_hall_rank", "slot_hall_rank");
            this.rankAni.play("", 0);
            this.rank_btn.addChild(this.rankAni);
            this.rankAni.resetPosition();
            this.hallLightAni.bottom = 0;
            this.hallLightAni.horizontalCenter = 0;
            this.hallRoleAni.bottom = -70;
            this.hallRoleAni.left = -160;
            this.hallRoleAni.scaleX = this.hallRoleAni.scaleY = 0.8;
            this.hallLightAni.scaleX = this.hallLightAni.scaleY = 2;
            this.hallRoleAni.play("", 0);
            this.hallLightAni.play("", 0);
            this.effectGroup.addChild(this.hallLightAni);
            this.hallLightAni.resetPosition();
            this.resizeGroup.addChild(this.hallRoleAni);
            this.hallRoleAni.resetPosition();
            this.hallRoleAni.touchEnabled = false;
            this.hallKuangAni.play("", 0);
            this.hallKuangAni.bottom = 355;
            this.hallKuangAni.horizontalCenter = -12;
            this.hallKuangAni.touchEnabled = false;
            this.effectGroup.addChild(this.hallKuangAni);
            this.hallKuangAni.resetPosition();
        };
        SlotHallScene.prototype.onTouchTap = function (e) {
            switch (e.target) {
                case this.record_btn:
                    CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
                    break;
                case this.full_screen_btn:
                    // game.UIUtils.fullscreen(this.resizeGroup);
                    game.UIUtils.windowFullscreen();
                    break;
                case this.setting_btn:
                    CF.sN(PanelNotify.OPEN_SETTING);
                    break;
                case this.close_slothall_btn:
                    CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                    CF.sN(SceneNotify.OPEN_MAIN_HALL);
                    break;
                case this.userGroup:
                    CF.sN(PanelNotify.OPEN_HEADER);
                    break;
                case this.rank_btn:
                    this.rankPanel();
                    break;
            }
        };
        /**
         * 初始化icon
         */
        SlotHallScene.prototype.initList = function () {
            for (var i = 0; i < game.LaohuUtils.slotIndexs.length; i++) {
                var hallbtn = this.slotHallBtn(game.LaohuUtils.slotIndexs[i], game.LaohuUtils.grades[i]);
                if (i % 2 == 0) {
                    hallbtn.x = Math.floor(i / 2) * 301 + 140;
                    hallbtn.y = 20;
                    this.itemGroup.addChild(hallbtn);
                    this.buttonList.push(hallbtn);
                }
                else {
                    hallbtn.x = Math.floor(i / 2) * 301 + 140;
                    hallbtn.y = 291;
                    this.itemGroup.addChild(hallbtn);
                    this.buttonList.push(hallbtn);
                }
            }
        };
        SlotHallScene.prototype.changHeader = function (e) {
            var data = e.data;
            this.headImag.source = "hall_header_" + data.sex + "_" + data.figureUrl + "_png";
            Global.playerProxy.playerData.figure_url = data.figureUrl;
            Global.playerProxy.playerData.sex = data.sex;
        };
        /**
         * 创建icon
         * @param  {} index
         * @param  {} grade
         */
        SlotHallScene.prototype.slotHallBtn = function (index, grade) {
            var hallbtn = new slot.SlotHallItem(index, grade);
            return hallbtn;
        };
        /**
         * 点击icon进入游戏
         * @param  {egret.Event} e
         */
        SlotHallScene.prototype.enterSlotGame = function (e) {
            var data = e.data.gameId;
            enterSlotScene(data);
        };
        /**
         * 大厅icon渐隐（未使用）
         */
        SlotHallScene.prototype.scrollerAlphaSet = function () {
            var s = this.scrollerGroup.viewport.scrollH;
            for (var i = 0; i < this.buttonList.length; i++) {
                var button = this.buttonList[i];
                button.checkAlapa(s, this.itemGroup.width);
            }
        };
        SlotHallScene.prototype.addSlotGoldAni = function (e) {
            var gameId = game.LaohuUtils.gamename(e.data.sceneName);
            for (var i = 0; i < this.buttonList.length; i++) {
                var button = this.buttonList[i];
                if (button.index == gameId) {
                    button.iconGoldAni();
                }
            }
        };
        //排行榜类型
        // RANK_TYPE: {
        //     ALL: 0,
        //     HU_CARD: 1, //胡牌榜
        //     WIN_GOLD: 2,//赢钱榜
        //     WIN_GOLD_DAILY: 3,//每日赢钱榜
        // },
        SlotHallScene.prototype.rankPanel = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    CF.sN(PanelNotify.OPEN_SLOT_RANK);
                    return [2 /*return*/];
                });
            });
        };
        return SlotHallScene;
    }(game.BaseScene));
    slot.SlotHallScene = SlotHallScene;
    __reflect(SlotHallScene.prototype, "slot.SlotHallScene");
})(slot || (slot = {}));
