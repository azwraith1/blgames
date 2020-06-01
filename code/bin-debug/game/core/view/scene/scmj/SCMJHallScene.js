/*
 * @Author: He Bing
 * @Date: 2018-07-03 14:11:47
 * @Last Modified time: 2018-07-06 11:53:44
 * @Description: 游戏选择场景。
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
    var SCMJHallScene = (function (_super) {
        __extends(SCMJHallScene, _super);
        function SCMJHallScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "mjxlch";
            _this.hallId = "scmj";
            /**
             * 头像前缀
             */
            _this.headerFront = "hall_header";
            /**
             * 背景音乐
             */
            _this.bgMusic = "home_bg_mp3";
            /**
             * 关闭当前界面的通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_SCMJ_HALL;
            /**
             * 进入正确匹配的通知
             */
            _this.MATCHING_NOTIFY = SceneNotify.OPEN_SCMJ_MATCHING;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_HELP;
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_GAMERECORD;
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = null;
            /**
             * 需要加载的资源组
             */
            _this.loadGroups = ['majiang_game'];
            /**
             * @param  {egret.TouchEvent} e父类方法，自己知道调
             * 全屏的放大
             *本界面里的所有点击事件。
             *
             */
            _this.times = 0; //点击次数。
            _this.skinName = "SCMJHallSceneSkin";
            return _this;
        }
        SCMJHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
        };
        SCMJHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
        };
        /**
         * 检查回到界面
         */
        SCMJHallScene.prototype.checkReconnectScene = function () {
            var _this = this;
            var roomState = Global.gameProxy.roomState;
            if (roomState && roomState.state == 1) {
                RotationLoading.instance.load(["majiang_game"], "", function () {
                    _this.enterScene({ data: roomState });
                });
            }
        };
        /**
         * 进入匹配或者重新获取数据
         * @param  {egret.Event} e?
         */
        SCMJHallScene.prototype.enterScene = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data;
                return __generator(this, function (_a) {
                    if (this.lockEnter) {
                        return [2 /*return*/];
                    }
                    this.lockEnter = true;
                    data = event.data;
                    RotationLoading.instance.load(this.loadGroups, "", function () { return __awaiter(_this, void 0, void 0, function () {
                        var handler, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    handler = ServerPostPath.hall_sceneHandler_c_enter;
                                    return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                                case 1:
                                    resp = _a.sent();
                                    if (this.enterSceneCall(resp, data)) {
                                        Global.gameProxy.lastGameConfig = data;
                                        Global.gameProxy.lastGameConfig.gameId = data.gameId;
                                    }
                                    ;
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        SCMJHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //给玩家的数据赋值
            this.showName(Global.playerProxy.playerData.nickname);
            //给游戏选场数据列表赋值
            RES.loadGroup("majiang_game");
            RES.loadGroup("majiang_back");
            var gid = ServerConfig.gid;
            if (gid == "mjxzdd") {
                this.choseGameType("mjxzdd");
                this.visibleTorF(2);
                Global.gameProxy.diWen = "mjxzdd";
            }
        };
        /**
         * 渲染按钮
         */
        SCMJHallScene.prototype.showHallBars = function () {
            if (Global.gameProxy.gameType == 0) {
                this.choseGameType("mjxlch");
                this.visibleTorF(1);
                Global.gameProxy.diWen = "mjxlch";
            }
            else if (Global.gameProxy.gameType == 1) {
                this.choseGameType("mjxzdd");
                this.visibleTorF(2);
                Global.gameProxy.diWen = "mjxzdd";
            }
            this.sjmj_title.alpha = 0;
            egret.Tween.get(this.sjmj_title).to({ alpha: 0 }, 50).to({ alpha: 1 }, 600);
            this.rightGroup.x = 1208;
            egret.Tween.get(this.rightGroup).to({ horizontalCenter: 1161 }, 50).to({ horizontalCenter: 70 }, 300);
        };
        SCMJHallScene.prototype.onTouchTap = function (event) {
            _super.prototype.onTouchTap.call(this, event);
            switch (event.target) {
                //血流成河 
                case this.img_ch_down:
                case this.img_ch_up:
                case this.img_men0:
                    majiang.MajiangUtils.playClick(); //管理声音的
                    Global.gameProxy.gameType = 0;
                    Global.gameProxy.diWen = "mjxlch";
                    this.contentGroup.visible = true;
                    this.visibleTorF(1);
                    this.choseGameType("mjxlch");
                    break;
                //血战到底
                case this.img_dd_down:
                case this.img_dd_up:
                case this.img_men1:
                    majiang.MajiangUtils.playClick(); //管理声音的
                    Global.gameProxy.gameType = 1;
                    Global.gameProxy.diWen = "mjxzdd";
                    this.visibleTorF(2);
                    this.choseGameType("mjxzdd");
                    break;
                case this.headerImage:
                case this.playerIcon:
                    majiang.MajiangUtils.playClick();
                    CF.sN(PanelNotify.OPEN_HEADER);
                    break;
            }
        };
        /**
         * 游戏类型选择，1，血流成河，2血战到底。
         */
        SCMJHallScene.prototype.choseGameType = function (gameType) {
            this.contentGroup.removeChildren();
            var index = 0;
            var item;
            for (var i in Global.gameProxy.gameNums) {
                if (gameType == i) {
                    var games = Global.gameProxy.gameNums[i];
                    for (var j in games) {
                        item = new majiang.SCMJHallBar(games[j], gameType);
                        this.contentGroup.addChild(item);
                        item.x = item.width / 2 + index * (item.width + 20);
                        index++;
                        item.alpha = 0;
                        egret.Tween.get(item).to({ alpha: 0 }, 100).to({ alpha: 1 }, 200);
                    }
                }
            }
        };
        /**
         * 隐藏or打开
         */
        SCMJHallScene.prototype.visibleTorF = function (visibleType) {
            if (visibleType == 1) {
                this.img_ch_down.visible = true;
                this.img_dd_up.visible = true;
                this.img_ch_up.visible = false;
                this.img_dd_down.visible = false;
            }
            else {
                this.img_ch_down.visible = false;
                this.img_dd_up.visible = false;
                this.img_ch_up.visible = true;
                this.img_dd_down.visible = true;
            }
        };
        SCMJHallScene.prototype.showName = function (nickname) {
            this.nameLabel.text = nickname;
            if (this.nameLabel.width > 200) {
                this.nameDb.width = this.nameLabel.width + 40;
                this.nameLabel.size = 20;
            }
            else if (this.nameLabel.width > 300) {
                this.nameDb.width = this.nameLabel.width;
                this.nameLabel.size = 16;
            }
            else {
                this.nameLabel.size = 20;
            }
        };
        return SCMJHallScene;
    }(game.BaseHallScene));
    majiang.SCMJHallScene = SCMJHallScene;
    __reflect(SCMJHallScene.prototype, "majiang.SCMJHallScene");
})(majiang || (majiang = {}));
