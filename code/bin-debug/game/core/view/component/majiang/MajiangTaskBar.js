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
 * @Author: li mengchan
 * @Date: 2018-07-11 19:23:30
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-19 18:38:00
 * @Description: 麻将功能条
 */
var majiang;
(function (majiang) {
    var MajiangTaskBar = (function (_super) {
        __extends(MajiangTaskBar, _super);
        function MajiangTaskBar() {
            var _this = _super.call(this) || this;
            /**
             *
             * 根据DATA显示
             */
            _this.task1 = [];
            _this.task2 = [];
            _this.task3 = [];
            _this.task4 = [];
            _this.task5 = [];
            _this.task6 = [];
            _this.skinName = new TaskBarSkin();
            return _this;
        }
        MajiangTaskBar.prototype.setRoot = function (majiangScene) {
            this.majiangScene = majiangScene;
        };
        MajiangTaskBar.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.GANG_SELECT, this.gangSelect, this);
            CF.aE(ENo.CHI_SELECT, this.chiSelect, this);
        };
        MajiangTaskBar.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.GANG_SELECT, this.gangSelect, this);
            CF.rE(ENo.CHI_SELECT, this.chiSelect, this);
            // game.MCUtils.reclaim("gang_task", this.effect2);
            // game.MCUtils.reclaim("hu_task", this.effect1);
            // game.MCUtils.reclaim("peng_task", this.effect3);
        };
        MajiangTaskBar.prototype.gangSelect = function (e) {
            ;
            this.selectGang.visible = false;
            var value = e.data;
            this.sendGangReq(value);
        };
        MajiangTaskBar.prototype.chiSelect = function (e) {
            ;
            this.selectGang.visible = false;
            var value = e.data;
            this.sendChiReq(value);
        };
        /**
         * 胡碰杠
         * @param  {} direction
         * @param  {} effectName
         */
        MajiangTaskBar.prototype.addEffectAni = function (effectName, callback) {
            GameCacheManager.instance.getMcCache(effectName, "mine_" + effectName, function (mv) {
                callback && callback(mv);
            });
            // game.MCUtils.getMc(effectName, (mv: egret.MovieClip) => {
            // 	callback && callback(mv);
            // });
        };
        MajiangTaskBar.prototype.createEffect = function () {
            var _this = this;
            var roomInfo = Global.gameProxy.roomInfo;
            this.addEffectAni("gang_task", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    mv.scaleX = mv.scaleY = 1.5;
                    mv.x = _this.btn2.x - 116;
                    mv.y = _this.btn2.y - 89 - 5;
                    // game.UIUtils.setAnchorPot(mv);
                    _this.effect2 = mv;
                    mv.visible = false;
                    _this.btn2.alpha = 0;
                    mv.play(-1);
                }
            });
            this.addEffectAni("hu_task", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    mv.scaleX = mv.scaleY = 1.5;
                    mv.x = _this.btn1.x - 116;
                    mv.y = _this.btn1.y - 89 - 5;
                    // game.UIUtils.setAnchorPot(mv);
                    _this.effect1 = mv;
                    mv.visible = false;
                    _this.btn1.alpha = 0;
                    mv.play(-1);
                }
            });
            this.addEffectAni("peng_task", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    mv.scaleX = mv.scaleY = 1.5;
                    mv.x = _this.btn3.x - 116;
                    mv.y = _this.btn3.y - 89 - 5;
                    // game.UIUtils.setAnchorPot(mv);
                    _this.effect3 = mv;
                    mv.visible = false;
                    mv.play(-1);
                    _this.btn3.alpha = 0;
                }
            });
            this.addEffectAni("chi_task", function (mv) {
                if (mv) {
                    _this.addChild(mv);
                    mv.scaleX = mv.scaleY = 1.5;
                    mv.x = _this.btn4.x - 116;
                    mv.y = _this.btn4.y - 89 - 5;
                    // game.UIUtils.setAnchorPot(mv);
                    _this.effect4 = mv;
                    mv.visible = false;
                    _this.btn4.alpha = 0;
                    mv.play(-1);
                }
            });
            if (roomInfo.gameId == "dzmj" || roomInfo.gameId == "gyzjmj" || roomInfo.gameId == "ermj") {
                this.addEffectAni("ting_task", function (mv) {
                    if (mv) {
                        _this.addChild(mv);
                        mv.scaleX = mv.scaleY = 1.5;
                        mv.x = _this.btn5.x - 116;
                        mv.y = _this.btn5.y - 89 - 5;
                        // game.UIUtils.setAnchorPot(mv);
                        _this.effect5 = mv;
                        mv.visible = false;
                        _this.btn5.alpha = 0;
                        mv.play(-1);
                    }
                });
            }
            if (roomInfo.gameId == "hbmj") {
                this.addEffectAni("liangdao_task", function (mv) {
                    if (mv) {
                        _this.addChild(mv);
                        mv.scaleX = mv.scaleY = 1.3;
                        mv.x = _this.btn6.x - 116;
                        mv.y = -33;
                        // game.UIUtils.setAnchorPot(mv);
                        _this['effect6'] = mv;
                        mv.visible = false;
                        _this.btn6.alpha = 0;
                        mv.play(-1);
                    }
                });
            }
        };
        MajiangTaskBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.scaleX = this.scaleY = 0.8;
            this.createEffect();
            this.clearAllUi();
            this.selectGang.hide();
        };
        MajiangTaskBar.prototype.hideAllBtns = function () {
            var mineData = Global.gameProxy.getMineGameData();
            mineData.hangupTasks = {};
            this.clearAllUi();
            this.selectGang.hide();
        };
        MajiangTaskBar.prototype.clearAllUi = function () {
            for (var i_1 = 1; i_1 <= 10; i_1++) {
                if (this['btn' + i_1]) {
                    this['btn' + i_1].visible = false;
                }
            }
            for (var i = 1; i <= 10; i++) {
                if (this['effect' + i]) {
                    this['effect' + i].visible = false;
                    this['effect' + i].stop();
                }
            }
            this.selectGang.hide();
        };
        MajiangTaskBar.prototype.showBtnsByData = function (taskData) {
            this.clearAllUi();
            LogUtils.logDJ(taskData);
            var tasks = taskData.hangupTasks;
            var showPass = taskData.hidePass;
            this.taskIndex = taskData.taskIndex;
            this.task1 = [];
            this.task2 = [];
            this.task3 = [];
            this.task4 = [];
            this.task5 = [];
            this.task6 = [];
            var flag = false;
            for (var key in tasks) {
                var task = tasks[key];
                if (!this['task' + key]) {
                    this['task' + key] = [];
                }
                this['task' + key].push(task);
                if (this['btn' + key])
                    this['btn' + key].visible = true;
                flag = true;
            }
            // if(flag){
            this.visible = flag;
            // }
            this.btn10.visible = !showPass;
            this.setPositions();
        };
        MajiangTaskBar.prototype.showAllBtns = function () {
            for (var i = 1; i <= 10; i++) {
                if (this["btn" + i]) {
                    this["btn" + i].visible = true;
                }
            }
            this.setPositions();
        };
        MajiangTaskBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            switch (e.target) {
                case this.btn3:
                    this.playerPeng();
                    break;
                case this.btn2:
                    this.playerGang();
                    break;
                case this.btn1:
                    if (this.m_hzmjHuCallBack)
                        this.m_hzmjHuCallBack.call(this.m_thisObj);
                    this.PlayerHu();
                    break;
                case this.btn10:
                    this.playerPass();
                    break;
                case this.btn4:
                    this.playerChi();
                    break;
                case this.btn5:
                    this.playerTing();
                    break;
                case this.btn6:
                    this.playerLiangDao();
                    break;
            }
        };
        /**
         * 亮倒
         */
        MajiangTaskBar.prototype.playerLiangDao = function () {
            this.visible = false;
            // if (resp.error.code == 0) {
            this.majiangScene['playerBrights'](this.task6);
        };
        /**
         * 报听
         */
        MajiangTaskBar.prototype.playerTing = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    // let route = ServerPostPath.game_mjHandler_c_baoTing;
                    // let resp: any = await Global.pomelo.request(route, {});
                    this.visible = false;
                    // if (resp.error.code == 0) {
                    this.majiangScene['playerBaoTing'](this.task5);
                    return [2 /*return*/];
                });
            });
        };
        MajiangTaskBar.prototype.sendGangReq = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var route, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_gangTask;
                            this.visible = false;
                            data = { selectGang: value, taskIndex: this.taskIndex };
                            return [4 /*yield*/, Global.pomelo.request(route, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error.code == 0) {
                                this.hideAllBtns();
                                Global.gameProxy.clearTasks();
                                this.majiangScene.lockChupai = true;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MajiangTaskBar.prototype.sendChiReq = function (value) {
            return __awaiter(this, void 0, void 0, function () {
                var route, data, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_chiTask;
                            this.visible = false;
                            data = { selectCard: value, taskIndex: this.taskIndex };
                            return [4 /*yield*/, Global.pomelo.request(route, data)];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code == 0) {
                                // this.majiangScene.lockChupai = true;
                            }
                            else {
                                if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                                    this.setAutoTimeout(function () {
                                        CF.dP(ENo.TING_FLUSH, resp);
                                    }, this, 100);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MajiangTaskBar.prototype.playerGang = function () {
            return __awaiter(this, void 0, void 0, function () {
                var gangArray;
                return __generator(this, function (_a) {
                    gangArray = this.task2[0].gangArray;
                    // this.task2 = [{card: 22}, {card: 34}];
                    if (gangArray.length > 1) {
                        this.selectGang.visible = true;
                        this.selectGang.initWithTask(gangArray);
                        this.selectGang.x = -this.selectGang.getMaxWidth() / 2 - (gangArray.length * 25);
                        this.addChild(this.selectGang);
                        return [2 /*return*/];
                    }
                    this.sendGangReq(gangArray[0].card);
                    return [2 /*return*/];
                });
            });
        };
        MajiangTaskBar.prototype.playerChi = function () {
            return __awaiter(this, void 0, void 0, function () {
                var gangArray;
                return __generator(this, function (_a) {
                    gangArray = this.task4[0].maxCards;
                    // this.task2 = [{card: 22}, {card: 34}];
                    if (gangArray.length > 1) {
                        this.selectGang.visible = true;
                        this.selectGang.initWithChiTask(gangArray);
                        this.selectGang.x = -this.selectGang.getMaxWidth() / 2 - (gangArray.length * 25);
                        this.addChild(this.selectGang);
                        return [2 /*return*/];
                    }
                    this.sendChiReq(gangArray[0]);
                    return [2 /*return*/];
                });
            });
        };
        MajiangTaskBar.prototype.playerPeng = function () {
            return __awaiter(this, void 0, void 0, function () {
                var route, resp, gameConfig, mineData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_pengTask;
                            this.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(route, { taskIndex: this.taskIndex })];
                        case 1:
                            resp = _a.sent();
                            if (resp.error && resp.error.code == 0) {
                                this.hideAllBtns();
                                Global.gameProxy.clearTasks();
                                // this.majiangScene.lockChupai = true;
                                // Global.gameProxy.clearCurPlay();
                            }
                            else {
                                if (resp.outCardTingCards && resp.outCardTingCards.length > 0) {
                                    gameConfig = Global.gameProxy.lastGameConfig;
                                    mineData = Global.gameProxy.getMineGameData();
                                    //过滤 贵阳捉鸡 杭州麻将
                                    if (gameConfig.gameId == 10019 || gameConfig.gameId == "gyzjmj" || gameConfig.gameId == "hzmj" || gameConfig.gameId == 10017) {
                                        this.setAutoTimeout(function () {
                                            CF.dP(ENo.TING_FLUSH, resp);
                                        }, this, 100);
                                    }
                                    else {
                                        this.setAutoTimeout(function () {
                                            CF.dP(ENo.TING_FLUSH, resp);
                                        }, this, 100);
                                    }
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MajiangTaskBar.prototype.playerPass = function () {
            return __awaiter(this, void 0, void 0, function () {
                var route, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_passTask;
                            this.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(route, { taskIndex: this.taskIndex })];
                        case 1:
                            resp = _a.sent();
                            if (resp.error.code == 0) {
                                this.hideAllBtns();
                                // Global.gameProxy.clearTasks();
                                // this.majiangScene.lockChupai = true;
                                // Global.gameProxy.clearCurPlay();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        MajiangTaskBar.prototype.PlayerHu = function () {
            return __awaiter(this, void 0, void 0, function () {
                var route, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            route = ServerPostPath.game_mjHandler_c_huTask;
                            this.visible = false;
                            return [4 /*yield*/, Global.pomelo.request(route, { taskIndex: this.taskIndex })];
                        case 1:
                            resp = _a.sent();
                            if (resp.error.code == 0) {
                                this.hideAllBtns();
                                Global.gameProxy.clearTasks();
                                // this.majiangScene.lockChupai = true;
                                // Global.gameProxy.clearCurPlay();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**杭州麻将胡*/
        MajiangTaskBar.prototype.addHZMJPlayHuCallBack = function (playHu, thisObj) {
            this.m_hzmjHuCallBack = playHu;
            this.m_thisObj = thisObj;
        };
        MajiangTaskBar.prototype.setPositions = function () {
            // let number = 0;
            var number = 140;
            var index = 5;
            for (var i = 10; i >= 1; i--) {
                if (this['btn' + i] && this['btn' + i].visible) {
                    this['btn' + i].x = number * (index - 1);
                    if (this['effect' + i]) {
                        this['effect' + i].visible = true;
                        this['effect' + i].x = this['btn' + i].x - 32 - 65;
                        this['effect' + i].play(-1);
                    }
                    index--;
                }
            }
        };
        return MajiangTaskBar;
    }(game.BaseUI));
    majiang.MajiangTaskBar = MajiangTaskBar;
    __reflect(MajiangTaskBar.prototype, "majiang.MajiangTaskBar");
})(majiang || (majiang = {}));
