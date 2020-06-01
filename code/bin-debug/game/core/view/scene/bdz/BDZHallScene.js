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
var BDZHallScene = (function (_super) {
    __extends(BDZHallScene, _super);
    function BDZHallScene() {
        var _this = _super.call(this) || this;
        _this.hallId = "bdz";
        _this.pmdKey = "bdz";
        /**
         * 头像前缀
         */
        _this.headerFront = "nns";
        /**
         * 关闭当前界面的通知
         */
        _this.CLOSE_NOTIFY = SceneNotify.CLOSE_BDZ_HALL;
        /**
         * 进入正确匹配的通知
         */
        _this.MATCHING_NOTIFY = SceneNotify.OPEN_BDZ_MATCHING;
        /**
         * 帮助界面的通知
         */
        _this.HELP_NOTIFY = PanelNotify.OPEN_HELP;
        /**
         * 记录界面的通知
         */
        _this.RECORD_NOTIFY = PanelNotify.OPEN_BJL_RECORD;
        /**
         * 设置界面的通知
         */
        _this.SETTING_NOTIFY = null;
        /**
         * 需要加载的资源组
         */
        _this.loadGroups = ['bdz_game'];
        /**
         * 获取对局信息
         * @param  {egret.Event} e?
         */
        _this.lock = false;
        _this.skinName = new BDZHallSceneSkin();
        return _this;
    }
    BDZHallScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.renderPlayerInfo();
        this.checkReconnectScene();
        // game.AudioManager.getInstance().playBackgroundMusic("zjh_bgm_mp3");
    };
    BDZHallScene.prototype.settingBtnTouch = function () {
        CF.sN(PanelNotify.OPEN_SETTING, { setIndex: "bdz" });
    };
    BDZHallScene.prototype.helpBtnTouch = function () {
        BaseMajiangHelpScene.getInstance("BDZHelpSkin", "", "").show();
    };
    BDZHallScene.prototype.recordBtnTouch = function () {
        CF.sN(PanelNotify.OPEN_BASE_RECORD, "bdz");
    };
    BDZHallScene.prototype.onAdded = function () {
        _super.prototype.onAdded.call(this);
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
    };
    BDZHallScene.prototype.onRemoved = function () {
        _super.prototype.onRemoved.call(this);
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
    };
    BDZHallScene.prototype.enterResult = function (e) {
        var data = e.data;
        if (data.reconnect) {
            return;
        }
        if (data.code && data.code != 0) {
            Global.alertMediator.addAlert(data.msg, function () {
            }, null, true);
            return;
        }
        Global.roomProxy.setRoomInfo(e.data);
        try {
            CF.sN(SceneNotify.CLOSE_BDZ_HALL);
            // CF.sN(SceneNotify.OPEN_ZJHWAITE, data);
        }
        catch (e) {
            Global.alertMediator.addAlert("加入房间失败");
        }
        finally {
            this.lock = false;
        }
    };
    /**
     * 检查回到界面
     */
    BDZHallScene.prototype.checkReconnectScene = function () {
        var _this = this;
        var roomState = Global.gameProxy.roomState;
        if (roomState && roomState.state == 1) {
            RotationLoading.instance.load(["bdz_game"], "", function () {
                _this.enterScene({ data: roomState });
            });
        }
    };
    BDZHallScene.prototype.enterScene = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, handler, resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.lock) {
                            return [2 /*return*/];
                        }
                        this.lock = true;
                        data = event.data;
                        Global.gameProxy.lastGameConfig = data;
                        handler = ServerPostPath.hall_sceneHandler_c_enter;
                        return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                    case 1:
                        resp = _a.sent();
                        if (!resp) {
                            this.lock = false;
                            return [2 /*return*/];
                        }
                        try {
                            if (resp.reconnect) {
                                HallForwardFac.redirectScene(resp, data, function () {
                                    CF.sN(SceneNotify.CLOSE_BDZ_HALL);
                                });
                            }
                            else {
                                RotationLoading.instance.load(["bdz_game"], "", function () {
                                    CF.sN(SceneNotify.CLOSE_BDZ_HALL);
                                    CF.sN(SceneNotify.OPEN_BDZ_MATCHING, data);
                                });
                            }
                        }
                        catch (e) {
                            Global.alertMediator.addAlert("加入房间失败");
                        }
                        finally {
                            this.lock = false;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BDZHallScene.prototype.showHallBars = function () {
        var nums = Global.gameProxy.gameNums["bdz"];
        var index = 1;
        var item;
        for (var i in nums) {
            var barConfig = nums[i];
            item = new BDZHallBar(nums[i], index);
            item.name = "item" + i;
            this.selectGroup.addChild(item);
            // item.x = 25 + item.width / 2 + (index - 1) * (item.width + 20)
            index++;
            item.alpha = 1;
            egret.Tween.get(this.selectGroup).to({
                alpha: 1
            }, 800);
            this.lock = false;
        }
    };
    return BDZHallScene;
}(game.BaseHallScene));
__reflect(BDZHallScene.prototype, "BDZHallScene");
