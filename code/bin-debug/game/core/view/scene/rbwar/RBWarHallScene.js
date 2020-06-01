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
var rbwar;
(function (rbwar) {
    var RBWarHallScene = (function (_super) {
        __extends(RBWarHallScene, _super);
        function RBWarHallScene() {
            var _this = _super.call(this) || this;
            _this.hallId = "rbwar";
            _this.pmdKey = "rbwar";
            /**
             * 头像前缀
             */
            _this.headerFront = "hall_header";
            /**
             * 背景音乐
             */
            _this.bgMusic = "rbw_bgm_mp3";
            /**
             * 关闭当前界面的通知
             */
            _this.CLOSE_NOTIFY = SceneNotify.CLOSE_RBWAR_HALL;
            /**
             * 进入正确匹配的通知
             */
            _this.MATCHING_NOTIFY = SceneNotify.OPEN_RBWAR_GAME;
            /**
             * 帮助界面的通知
             */
            _this.HELP_NOTIFY = PanelNotify.OPEN_RBWARHELP;
            /**
             * 记录界面的通知
             */
            _this.RECORD_NOTIFY = PanelNotify.OPEN_RBWARJL;
            /**
             * 设置界面的通知
             */
            _this.SETTING_NOTIFY = null;
            /**
             * 需要加载的资源组
             */
            _this.loadGroups = ['rbwar_game'];
            _this.skinName = new RBWarHallSceneSkin();
            return _this;
        }
        RBWarHallScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.headerImage.mask = this.headerImageMask;
        };
        RBWarHallScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
        };
        RBWarHallScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ENo.ENTER_GOLD_SCENE, this.enterScene, this);
        };
        RBWarHallScene.prototype.enterResult = function (e) {
            var data = e.data;
            if (data.code && data.code != 0) {
                Global.alertMediator.addAlert(data.msg, function () {
                }, null, true);
                return;
            }
            Global.roomProxy.clearRoomInfo();
            Global.roomProxy.setRoomInfo(e.data);
            try {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(this.MATCHING_NOTIFY, data);
            }
            catch (e) {
                Global.alertMediator.addAlert("加入房间失败");
            }
            finally {
            }
        };
        /**
         * 获取对局信息
         * @param  {egret.Event} e?
         */
        RBWarHallScene.prototype.enterScene = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var data;
                return __generator(this, function (_a) {
                    data = event.data;
                    RotationLoading.instance.load(this.loadGroups, "", function () { return __awaiter(_this, void 0, void 0, function () {
                        var handler, resp;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    Global.gameProxy.lastGameConfig = data;
                                    handler = ServerPostPath.hall_sceneHandler_c_enter;
                                    return [4 /*yield*/, game.PomeloManager.instance.request(handler, data)];
                                case 1:
                                    resp = _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
                });
            });
        };
        RBWarHallScene.prototype.showHallBars = function () {
            var nums = Global.gameProxy.gameNums["rbwar"];
            var index = 0;
            var item;
            for (var i in nums) {
                if (index > 2) {
                    break;
                }
                var barConfig = nums[i];
                item = new rbwar.RBWHallBar(nums[i]);
                item.name = "item" + i;
                this.contentGroup.addChild(item);
                item.anchorOffsetX = item.width / 2;
                item.anchorOffsetY = item.height / 2;
                if (index == 0) {
                    item.x = 220;
                    item.y = 340;
                    item.tzfflable.y = 304;
                }
                else if (index == 1) {
                    item.x = 630;
                    item.y = 340;
                    item.tzfflable.y = 284;
                }
                else if (index == 2) {
                    item.x = 1050;
                    if (barConfig.enable) {
                        item.y = 335;
                    }
                    else {
                        item.y = 210;
                    }
                    item.tzfflable.y = 314;
                }
                index++;
            }
        };
        return RBWarHallScene;
    }(game.BaseHallScene));
    rbwar.RBWarHallScene = RBWarHallScene;
    __reflect(RBWarHallScene.prototype, "rbwar.RBWarHallScene");
})(rbwar || (rbwar = {}));
