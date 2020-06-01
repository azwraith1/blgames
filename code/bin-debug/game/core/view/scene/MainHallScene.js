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
var MainHallScene = (function (_super) {
    __extends(MainHallScene, _super);
    function MainHallScene() {
        var _this = _super.call(this) || this;
        _this.pmdKey = "common";
        _this.bgMusic = "main_bg_mp3";
        _this.currentTab = 0;
        _this.bottomItemsArr = [];
        _this.buttonLists = [];
        //重连后禁止点击
        _this.reconnectTouch = false;
        _this.skinName = new MainHallSceneSkin();
        return _this;
    }
    ;
    /**
     * 不同平台展现不同LOGO
     */
    MainHallScene.prototype.showPlatLogo = function () {
        var _this = this;
        if (Global.platfromType == "inner") {
            this.logoImage.visible = false;
        }
        else {
            this.logoImage.visible = true;
            var str = "./../logo/platform_" + Global.platfromType + "/plaform_logo_" + Global.platfromType + ".png";
            RES.getResByUrl(str, function (texture) {
                _this.logoImage.source = texture;
            });
        }
    };
    /**
     * 书写逻辑代码
     */
    MainHallScene.prototype.createChildren = function () {
        var _this = this;
        _super.prototype.createChildren.call(this);
        FrameUtils.changeBgImage("");
        this.showPlatLogo();
        game.UIUtils.changeResize(1);
        this.backHomeBtn.visible = ServerConfig.HOME_PAGE_URL.indexOf("http") > -1 && ServerConfig.OP_RETURN_TYPE != "3";
        this.rechargeBtn.visible = ServerConfig.RECHARGE_URL.indexOf("http") > -1;
        // this.fullScreenBtn.visible = !NativeApi.instance.isiOSDevice;
        this.createDbComponent();
        //给玩家的数据赋值
        this.nameLabel.text = Global.playerProxy.playerData.nickname;
        var headerImage = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
        this.headerImage.source = headerImage;
        this.headerImage.mask = this.headerMask;
        this.updateGold();
        Global.gameProxy.people();
        this.gameScroller.scrollPolicyV = "off";
        this.checkReconnectScene();
        this.gameScroller.bounces = true;
        var publicMsg = PMDComponent.instance;
        publicMsg.anchorOffsetY = 24;
        publicMsg.horizontalCenter = 0;
        publicMsg.top = 100;
        // this.showGame();
        this.setAutoTimeout(function () {
            _this.showCreateAni();
            _this.createList();
        }, this, 200);
        this.checkShowHotBar();
        //smart 初始化底部筛选按钮
        this.initBootomCaterogy();
        this.showDB();
    };
    MainHallScene.prototype.showDB = function () {
        var db = new DBComponent("dt20_line");
        this.lineGroupDB.addChild(db);
        db.playByFilename(-1);
        //	Owen.UtilsString.playDB("dt20_line", this.lineGroupDB, -1);
        Owen.UtilsString.playDB("dt20_coin", this.coinDB, -1);
    };
    /**
     * 热门标签现实不现实
     */
    MainHallScene.prototype.checkShowHotBar = function () {
        var ui_a = game.Utils.getURLQueryString("ui_b");
        if (ui_a == "1") {
            this.tabGroup.visible = false;
        }
    };
    MainHallScene.prototype.showCreateAni = function () {
        // let startRight = this.personGroup.right;
        // this.personGroup.right -= 600;
        // egret.Tween.get(this.personGroup).to({
        // 	right: startRight
        // }, 400, egret.Ease.sineInOut);
        this.showPersonAni();
        this.gameScroller.alpha = 0;
        egret.Tween.get(this.gameScroller).to({
            alpha: 1
        }, 700, egret.Ease.circIn);
        this.topGroup.top -= 400;
        egret.Tween.get(this.topGroup).to({
            top: this.topGroup.top + 400
        }, 400, egret.Ease.bounceIn);
        this.btnGroup.left -= 500;
        egret.Tween.get(this.btnGroup).to({
            left: this.btnGroup.left + 500
        }, 400, egret.Ease.bounceIn);
    };
    MainHallScene.prototype.createDbComponent = function () {
        Owen.UtilsString.playDB("dt20_role", this.personGroup, -1);
    };
    MainHallScene.prototype.showPersonAni = function () {
        var _this = this;
        this.personGroup.right = -1000;
        egret.Tween.removeTweens(this.personGroup);
        egret.Tween.get(this.personGroup).to({ right: -185 }, 1500, egret.Ease.quartOut);
        this.setAutoTimeout(function () {
            egret.Tween.removeTweens(_this.personGroup);
            _this.personGroup.right = -185;
        }, this, 1500);
    };
    MainHallScene.prototype.onTouchTap = function (e) {
        switch (e.target) {
            case this.recordBtn:
                CF.sN(PanelNotify.OPEN_GAMERECORD, null);
                break;
            case this.settingBtn:
                CF.sN(PanelNotify.OPEN_SETTING, { setIndex: 1 });
                break;
            case this.ruleBtn:
                CF.sN(PanelNotify.OPEN_HELP);
                break;
            case this.rechargeBtn:
                FrameUtils.goRecharge();
                break;
            case this.backHomeBtn:
                FrameUtils.goHome();
                break;
            case this.headerBtn:
            case this.headerImage:
                CF.sN(PanelNotify.OPEN_HEADER);
                break;
        }
    };
    MainHallScene.prototype.initBootomCaterogy = function () {
        this.tabGroup.removeChildren();
        for (var i = 0; i < 4; ++i) {
            var item = new GameMainHallTabItem(i);
            item.showStatus(item.gameID == this.currentTab);
            this.bottomItemsArr.push(item);
            this.tabGroup.addChild(item);
            if (i == 3)
                item.dividerLine.visible = false;
        }
    };
    MainHallScene.prototype.clearAllTab = function () {
        for (var i = 0; i < 4; i++) {
            this["light" + i].alpha = 0;
        }
        this["light" + this.currentTab].alpha = 1;
    };
    /**
     *
     */
    MainHallScene.prototype.createList = function () {
        this.gameScroller.stopAnimation();
        this.gameScroller.viewport.scrollH = 0;
        for (var i = 0; i < this.buttonLists.length; i++) {
            var button = this.buttonLists[i];
            game.UIUtils.removeSelf(button);
        }
        this.buttonLists = [];
        this.gameGroup.removeChildren();
        var sceneList = _.sortBy(Global.gameProxy.sceneList, "index");
        var list = [];
        if (this.currentTab == 0) {
            list = sceneList.concat([]);
        }
        else {
            //过滤一下
            list.push(sceneList[0]);
            for (var i = 1; i < sceneList.length; i++) {
                var data = sceneList[i];
                if (data.category == this.currentTab) {
                    list.push(data);
                }
            }
        }
        var comment = list[0];
        comment.grade = GRADE.RECOMMEND;
        var first = this.getMainHallButton(comment);
        //smart
        first.showButtonAni(0 * 100);
        this.buttonLists.push(first);
        first.showHot();
        first.x = 30 + first.anchorOffsetX;
        first.y = 22.5 + first.anchorOffsetY; //75
        this.gameGroup.addChild(first);
        var xIndex = first.x + first.width / 2;
        for (var i = 1; i < list.length; i += 2) {
            var topData = list[i];
            if (topData.grade == GRADE.RECOMMEND) {
                topData.grade = GRADE.HOT;
            }
            var top_1 = this.getMainHallButton(topData);
            this.buttonLists.push(top_1);
            top_1.x = xIndex + 5 + top_1.anchorOffsetX - 37.5; //255
            top_1.y = 47.5 + top_1.anchorOffsetY; //195
            console.log(top_1.x + "," + top_1.y);
            this.gameGroup.addChild(top_1);
            //smart
            top_1.showButtonAni(i * 80);
            var bottomData = list[i + 1];
            if (bottomData) {
                if (bottomData.grade == GRADE.RECOMMEND) {
                    bottomData.grade = GRADE.HOT;
                }
                var bottom = this.getMainHallButton(bottomData);
                this.buttonLists.push(bottom);
                bottom.x = xIndex + 5 + bottom.anchorOffsetX - 37.5; //5
                bottom.y = top_1.height + 87.5 + bottom.anchorOffsetY; //bottom 增加高度 smart
                this.gameGroup.addChild(bottom);
                //smart
                bottom.showButtonAni(i * 80);
            }
            xIndex += top_1.width;
        }
        var top = this.getMainHallButton({ gameId: "" });
        this.buttonLists.push(top);
        top.x = xIndex - top.width / 2 + top.anchorOffsetX;
        ;
        top.y = 30 + top.anchorOffsetY;
        this.gameGroup.addChild(top);
        top.visible = false;
    };
    /**
     * 从缓存中获取
     */
    MainHallScene.prototype.getMainHallButton = function (mainHallData) {
        var mainHallButton = GameCacheManager.instance.getCache("hallbtn_" + mainHallData.gameId, null);
        if (!mainHallButton) {
            mainHallButton = new MainHallButton(mainHallData);
            GameCacheManager.instance.setCache("hallbtn_" + mainHallData.gameId, mainHallButton);
        }
        mainHallButton.visible = true;
        return mainHallButton;
    };
    MainHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ENo.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);
        CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
        CF.aE(ENo.JOIN_SCENE_GAMEID, this.buttonTouch, this);
        //smart 底部筛选游戏按钮被点击
        CF.aE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.bottomItemTouch, this);
        this.gameScroller.addEventListener(egret.Event.CHANGE, this.showGame, this);
        this.startDs();
    };
    MainHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ENo.UPDATE_PLAYER_COUNT, this.showPlayerCount, this);
        CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
        CF.rE(ENo.JOIN_SCENE_GAMEID, this.buttonTouch, this);
        this.gameScroller.removeEventListener(egret.Event.CHANGE, this.showGame, this);
        CF.rE(ENo.CLUB_INNER_RECORD_ITEM_TOUCH, this.bottomItemTouch, this);
        egret.clearInterval(this.peopleCountInterval);
        this.peopleCountInterval = null;
    };
    //smart 底部筛选游戏按钮被点击
    MainHallScene.prototype.bottomItemTouch = function (e) {
        var data = e.data;
        for (var i = 0; i < this.bottomItemsArr.length; i++) {
            var club = this.bottomItemsArr[i];
            club.showStatus(club == data);
        }
        this.currentTab = data.gameID;
        this.createList();
    };
    /**
     * 显示虚拟
     */
    MainHallScene.prototype.showGame = function () {
        this.gameScroller.bounces = true;
        var s = this.gameScroller.viewport.scrollH;
        for (var i = 0; i < this.buttonLists.length; i++) {
            var button = this.buttonLists[i];
            button.checkAlapa(s, this.gameGroup.width);
        }
    };
    MainHallScene.prototype.changHeader = function (e) {
        var data = e.data;
        this.headerImage.source = "hall_header_" + data.sex + "_" + data.figureUrl + "_png";
        Global.playerProxy.playerData.figure_url = data.figureUrl;
        Global.playerProxy.playerData.sex = data.sex;
    };
    MainHallScene.prototype.buttonTouch = function (evt) {
        if (this.reconnectTouch)
            return;
        var gameId = evt.data.gameId;
        LogUtils.logD("=========gameId===" + gameId);
        var sourceName = gameId + "_hall";
        switch (gameId) {
            case "mjxzdd":
                sourceName = "xzdd_hall";
                break;
            case "mjxlch":
            case "scmj":
                sourceName = "majiang_hall";
                break;
            case "blnn":
                sourceName = "niuniu_hall";
                break;
            case "zjh":
                sourceName = "zhajinhua_hall";
                break;
            case "baccarat":
                sourceName = "bjl_hall";
                break;
            case "slot":
                sourceName = "slot_hall_new";
                break;
            case "race":
                sourceName = "match_hall";
                break;
        }
        var resource = [sourceName];
        if (gameId.indexOf("mj") > -1) {
            resource.push("majiang_common");
        }
        LogUtils.logD("===scene===" + ("OPEN_" + gameId.toLocaleUpperCase() + "_HALL"));
        RotationLoading.instance.load(resource, "", function () {
            CF.sN("OPEN_" + gameId.toLocaleUpperCase() + "_HALL");
            CF.sN(SceneNotify.CLOSE_MAIN_HALL);
        });
    };
    MainHallScene.prototype.sendMsg = function (obj) {
        egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 50).to({ scaleX: 1, scaleY: 1 }).call(function () {
            Global.alertMediator.addAlert("暂未开放，敬请期待", null, null, true);
        });
    };
    /**
     * 更新玩家信息
     */
    MainHallScene.prototype.showPlayerCount = function () {
        for (var i = 0; i < this.buttonLists.length; i++) {
            var button = this.buttonLists[i];
            button.updatePlayerCount();
        }
    };
    /**
         * 检查回到界面
         */
    MainHallScene.prototype.checkReconnectScene = function () {
        var roomState = Global.gameProxy.roomState;
        if (roomState && roomState.state == 1) {
            this.reconnectTouch = true;
            this.reconnectRoom(roomState);
        }
    };
    MainHallScene.prototype.startDs = function () {
        this.peopleCountInterval = egret.setInterval(function () { Global.gameProxy.people(); }, this, 60000);
    };
    MainHallScene.prototype.reconnectRoom = function (roomState) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var data, handler, resp, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = roomState;
                        Global.gameProxy.lastGameConfig = data;
                        LogUtils.logD("center_7");
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 7]);
                        if (!resp.reconnect) return [3 /*break*/, 4];
                        return [4 /*yield*/, HallForwardFac.redirectScene(resp, data, function (isPlaying) {
                                if (isPlaying) {
                                    CF.sN(SceneNotify.CLOSE_MAIN_HALL);
                                }
                                else {
                                    _this.reconnectTouch = false;
                                }
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_1 = _a.sent();
                        Global.alertMediator.addAlert("加入房间失败");
                        return [3 /*break*/, 7];
                    case 6:
                        this.reconnectTouch = false;
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MainHallScene.prototype.changeYcPos = function () {
        var child = GameLayerManager.gameLayer().netStatus;
        // child.validateNow();
    };
    return MainHallScene;
}(game.BaseScene));
__reflect(MainHallScene.prototype, "MainHallScene");
