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
var bjle;
(function (bjle) {
    var BJLHallScene = (function (_super) {
        __extends(BJLHallScene, _super);
        function BJLHallScene() {
            var _this = _super.call(this) || this;
            _this.hallId = "baccarat";
            _this.pmdKey = "baccarat";
            /**
             * 头像前缀
             */
            _this.headerFront = "hall_header";
            /**
             * 背景音乐
             */
            _this.bgMusic = "bjl_bg_mp3";
            /**
             * 关闭当前界面的通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BJLHALL;
            /**
         * 进入正确匹配的通知
         */
            _this.MATCHING_NOTIFY = SceneNotify.OPEN_BJLGAME;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_HELP_SHU; //要改
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_BJL_RECORD; //要改
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = PanelNotify.OPEN_SETTING;
            /**
             * 需要加载的资源组
             */
            _this.loadGroups = ['bjl_game'];
            _this.hallBars = [];
            _this.lockReq = false;
            /**
             * 获取对局信息
             * @param  {egret.Event} e?
             */
            _this.lock = false;
            _this.skinName = "BJLHallSceneSkin" + CF.tis;
            return _this;
        }
        BJLHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            FrameUtils.changeBgImage("./resource/gameAssets/bjl_hall/bjl_hall.jpg");
            this.resetPMDPosition();
            this.selectRoom(1001, 1);
            var hotBar = GameLayerManager.gameLayer().hotBar;
            hotBar.verticalCenter = -480;
            var nums = Global.gameProxy.gameNums["baccarat"];
            if (nums[1004] && !nums[1004].enable) {
                game.UIUtils.setGray(this.btn4);
                this.btn4.touchEnabled = false;
            }
            this.centerGroup.alpha = 0;
            egret.Tween.get(this.centerGroup).to({
                alpha: 1
            }, 300, egret.Ease.sineIn);
        };
        BJLHallScene.prototype.changeLanguageUI = function () {
        };
        BJLHallScene.prototype.backBtnTouch = function () {
            this.listenOffRoomstate();
            _super.prototype.backBtnTouch.call(this);
        };
        /**
     * 修正跑马灯位子
     */
        BJLHallScene.prototype.resetPMDPosition = function () {
            var publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 24;
            publicMsg.horizontalCenter = -10;
            publicMsg.top = 120;
        };
        /**
         * 房间信息切换
         */
        BJLHallScene.prototype.roomStateChanged = function (e) {
            var data = e.data;
            this.findUpdateHallBar(data);
        };
        BJLHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
            CF.aE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
        };
        BJLHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
            CF.rE(ServerNotify.s_roomStateChanged, this.roomStateChanged, this);
        };
        BJLHallScene.prototype.listenRoomState = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.hall_sceneHandler_c_registerRoomStateInfo;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, { gameId: 10010, sceneId: this.currentSceneId })];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        BJLHallScene.prototype.listenOffRoomstate = function () {
            return __awaiter(this, void 0, void 0, function () {
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.currentSceneId) return [3 /*break*/, 2];
                            handler = ServerPostPath.connector_entryHandler_c_cancelRoomStateInfo;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, { gameId: 10010, sceneId: this.currentSceneId })];
                        case 1:
                            resp = _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        };
        // hall_sceneHandler_c_registerRoomStateInfo
        BJLHallScene.prototype.enterResult = function (e) {
            var data = e.data;
            if (data.code && data.code != 0) {
                Global.alertMediator.addAlert(data.msg, function () {
                }, null, true);
                return;
            }
            Global.roomProxy.setRoomInfo(e.data);
            try {
                CF.sN(SceneNotify.CLOSE_BJLHALL);
                CF.sN(SceneNotify.OPEN_BJLGAME, data);
            }
            catch (e) {
                Global.alertMediator.addAlert("加入房间失败");
            }
            finally {
                this.lock = false;
            }
        };
        /**
         * 玩家加入
         */
        BJLHallScene.prototype.playerEnter = function (e) {
            var roomInfo = Global.roomProxy.roomInfo;
            if (roomInfo) {
                // let richManList = roomInfo.playerList.richManList;
                // let data = e.data;
                // richManList.push(data.player);
            }
        };
        BJLHallScene.prototype.joinScene = function (data) {
            var _this = this;
            RotationLoading.instance.load(["bjl_game"], "", function () {
                _this.enterScene({ data: data });
            });
        };
        BJLHallScene.prototype.selectRoom = function (ids, buttonIndex) {
            return __awaiter(this, void 0, void 0, function () {
                var handler, msg, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this.currentSceneId == ids) {
                                return [2 /*return*/];
                            }
                            if (this.lockReq) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.listenOffRoomstate()];
                        case 1:
                            _a.sent();
                            this.currentSceneId = ids;
                            this.lockReq = true;
                            this.roomid = ids;
                            handler = ServerPostPath.hall_sceneHandler_c_getSceneStateInfo;
                            msg = { gameId: 10010, sceneId: ids };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, msg)];
                        case 2:
                            resp = _a.sent();
                            // return;
                            Global.pomelo.clearLastLock();
                            if (resp) {
                                if (resp.error && resp.error.code != 0) {
                                    this.lockReq = false;
                                    return [2 /*return*/];
                                }
                                this.hallData = resp;
                                this.showHallBars1(resp);
                                this.selectButton(buttonIndex);
                            }
                            this.lockReq = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        BJLHallScene.prototype.clearAllBars = function () {
            while (this.hallBars.length > 0) {
                var bar = this.hallBars.pop();
                game.UIUtils.removeSelf(bar);
                bar = null;
            }
        };
        BJLHallScene.prototype.selectButton = function (buttonIndex) {
            for (var i = 1; i <= 4; i++) {
                var button = this["btn" + i];
                if (i == buttonIndex) {
                    // button.currentState = "disabled";
                    this.selectImage.x = button.x - button.anchorOffsetX - 2;
                    break;
                }
                // else{
                // button.currentState = "up";
                // }
            }
        };
        BJLHallScene.prototype.onTouchTap = function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    _super.prototype.onTouchTap.call(this, e);
                    switch (e.target) {
                        case this.btn1:
                            this.selectRoom(1001, 1);
                            break;
                        case this.btn2:
                            this.selectRoom(1002, 2);
                            break;
                        case this.btn3:
                            this.selectRoom(1003, 3);
                            break;
                        case this.btn4:
                            this.selectRoom(1004, 4);
                            break;
                    }
                    e.stopPropagation();
                    return [2 /*return*/];
                });
            });
        };
        /**
         * 检查回到界面
         */
        BJLHallScene.prototype.checkReconnectScene = function () {
            var _this = this;
            var roomState = Global.gameProxy.roomState;
            if (roomState && roomState.state == 1) {
                RotationLoading.instance.load(["bjl_game"], "", function () {
                    _this.enterScene({ data: roomState });
                });
            }
        };
        BJLHallScene.prototype.enterScene = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var data, handler, msg, resp1, handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            data = event.data;
                            Global.gameProxy.lastGameConfig = data;
                            if (this.lockEnter) {
                                return [2 /*return*/];
                            }
                            this.lockEnter = true;
                            handler = ServerPostPath.hall_sceneHandler_c_getSceneStateInfo;
                            msg = { gameId: 10010, sceneId: this.roomid };
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, msg)];
                        case 1:
                            resp1 = _a.sent();
                            handler = ServerPostPath.hall_sceneHandler_c_enter;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                        case 2:
                            resp = _a.sent();
                            this.lockEnter = false;
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 更新选场的数据
         * @param  {} newData
         */
        BJLHallScene.prototype.findUpdateHallBar = function (newData) {
            for (var i = 0; i < this.hallBars.length; i++) {
                var hallbar = this.hallBars[i];
                if (hallbar) {
                    hallbar.updateConfig(newData);
                }
            }
        };
        BJLHallScene.prototype.showHallBars1 = function (nums) {
            LogUtils.logD("====百家乐选场===" + JSON.stringify(nums));
            var index = 0;
            var item;
            this.clearAllBars();
            for (var i = 0; i < nums.length; i++) {
                item = new bjle.BJLHallBar(nums[i]);
                item.name = "item" + i;
                this.centerGroup.addChild(item);
                item.anchorOffsetX = item.width / 2;
                item.anchorOffsetY = item.height / 2;
                item.height = 238;
                item.y = index * (item.height + 20) + item.height / 2;
                index++;
                this.hallBars.push(item);
            }
            this.lock = false;
        };
        /**
         * 帮助按钮
         */
        BJLHallScene.prototype.helpBtnTouch = function () {
            BaseHelpShuPanel.getInstance("BJLHelpSkin" + CF.tis, "bjl_help", CF.tic).show();
        };
        BJLHallScene.prototype.showHallBars = function () {
        };
        return BJLHallScene;
    }(game.BaseHallScene));
    bjle.BJLHallScene = BJLHallScene;
    __reflect(BJLHallScene.prototype, "bjle.BJLHallScene");
})(bjle || (bjle = {}));
