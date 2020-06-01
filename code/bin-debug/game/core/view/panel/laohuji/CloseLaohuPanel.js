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
 * @Author: real_MCLEE
 * @Date: 2019-05-27 18:39:49
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-11-26 16:58:33
 * @Description:
 */
var game;
(function (game) {
    var CloseLaohuPanel = (function (_super) {
        __extends(CloseLaohuPanel, _super);
        function CloseLaohuPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = new CloseLaohuPanelSkin();
            return _this;
        }
        CloseLaohuPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.leave_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quitRoom, this);
            this.cancel_leave_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                SoundManager.getInstance().playEffect("button_dntg_mp3");
                CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
            }, this);
        };
        /**
         * 退出slot游戏
         * @param  {} name
         */
        CloseLaohuPanel.prototype.quitRoom = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var quitResp, text_1, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.leave_btn.touchEnabled = false;
                            SoundManager.getInstance().playEffect("button_dntg_mp3");
                            game.LaohuUtils.currentSceneId = null;
                            return [4 /*yield*/, Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {})];
                        case 1:
                            quitResp = _a.sent();
                            if (quitResp) {
                                if (quitResp.error && quitResp.error.code != 0) {
                                    text_1 = quitResp.error.msg;
                                    Global.alertMediator.addAlert(text_1, function () {
                                    }, null, true);
                                    CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
                                    CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                    CF.sN(SceneNotify.CLOSE_SDXL);
                                    CF.sN(SceneNotify.CLOSE_CBZZ);
                                    CF.sN(SceneNotify.CLOSE_SDMN);
                                    CF.sN(SceneNotify.CLOSE_BSKG);
                                    CF.sN(SceneNotify.CLOSE_DNTG);
                                    CF.sN(SceneNotify.CLOSE_RDSG);
                                    CF.sN(SceneNotify.CLOSE_AYLS);
                                    CF.sN(SceneNotify.CLOSE_GDZW);
                                    CF.sN(SceneNotify.CLOSE_BSCS);
                                    CF.sN(SceneNotify.CLOSE_CEBY);
                                    CF.sN(SceneNotify.CLOSE_LUCKY7);
                                    CF.sN(SceneNotify.CLOSE_CSD);
                                    CF.sN(SceneNotify.CLOSE_XYSG);
                                    CF.sN(SceneNotify.CLOSE_XCBS);
                                    CF.sN(SceneNotify.CLOSE_SGWS);
                                    CF.sN(SceneNotify.CLOSE_SNYX);
                                    return [2 /*return*/];
                                }
                                game.LaohuUtils.free_time_times = 0;
                                game.LaohuUtils.totalAdd = game.LaohuUtils.totalBet = 0;
                                game.LaohuUtils.stopAuto = false;
                                game.LaohuUtils.bets = [];
                                game.LaohuUtils.muls = [];
                                Global.gameProxy.clearRoomInfo();
                                Global.playerProxy.playerData.gold = quitResp.gold;
                                CF.sN(PanelNotify.CLOSE_LEAVE_LAOHU_PANEL);
                                CF.sN(SceneNotify.OPEN_LAOHUJI_HALL);
                                CF.sN(SceneNotify.CLOSE_SDXL);
                                CF.sN(SceneNotify.CLOSE_CBZZ);
                                CF.sN(SceneNotify.CLOSE_SDMN);
                                CF.sN(SceneNotify.CLOSE_BSKG);
                                CF.sN(SceneNotify.CLOSE_DNTG);
                                CF.sN(SceneNotify.CLOSE_RDSG);
                                CF.sN(SceneNotify.CLOSE_AYLS);
                                CF.sN(SceneNotify.CLOSE_GDZW);
                                CF.sN(SceneNotify.CLOSE_BSCS);
                                CF.sN(SceneNotify.CLOSE_CEBY);
                                CF.sN(SceneNotify.CLOSE_ZCJL);
                                CF.sN(SceneNotify.CLOSE_WSZW);
                                CF.sN(SceneNotify.CLOSE_LUCKY7);
                                CF.sN(SceneNotify.CLOSE_CSD);
                                CF.sN(SceneNotify.CLOSE_XYSG);
                                CF.sN(SceneNotify.CLOSE_XCBS);
                                CF.sN(SceneNotify.CLOSE_SGWS);
                                CF.sN(SceneNotify.CLOSE_SNYX);
                                return [2 /*return*/];
                            }
                            text = TextUtils.instance.getCurrentTextById(105);
                            Global.alertMediator.addAlert(text, function () {
                            }, null, true);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return CloseLaohuPanel;
    }(game.BaseScene));
    game.CloseLaohuPanel = CloseLaohuPanel;
    __reflect(CloseLaohuPanel.prototype, "game.CloseLaohuPanel");
})(game || (game = {}));
