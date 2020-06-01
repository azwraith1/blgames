/*
 * @Author: he bing
 * @Date: 2018-08-06 17:28:15
 * @Last Modified by: he bing
 * @Last Modified time: 2018-10-08 16:15:06
 * @Description: 聊天框，表情框
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
    var ChatBar = (function (_super) {
        __extends(ChatBar, _super);
        function ChatBar() {
            var _this = _super.call(this) || this;
            _this.skinName = new ChatBarSkin();
            return _this;
        }
        ChatBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            //	alert(JSON.stringify(GameConfig.GAME_CONFIG))
            this.visible = false;
            this.showVisible(1);
            var messageArr = MajiangConfig.commonMessage; //这个就是你需要添加的数据源
            var myCollection = new eui.ArrayCollection(messageArr);
            this.chatLanguageList.dataProvider = myCollection;
            this.chatLanguageList.itemRenderer = majiang.ChatBarItemRender; //ChatBarItemRender 这个要单独写个类，做赋值的。
            this.chatLanguageList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCommonMessageSelected, this); //监听的方法
        };
        ChatBar.prototype.onTouchTap = function (e) {
            e.stopPropagation();
            var msg = null;
            switch (e.target) {
                case this.chat_biaoqing:
                    this.showVisible(1);
                    break;
                case this.chat_wenzi:
                    this.showVisible(0);
                    break;
                case this.chat_biaoqing1:
                    this.showVisible(1);
                    break;
                case this.chat_wenzi1:
                    this.showVisible(0);
                    break;
                default:
                    {
                        for (var i = 0; i < 12; i++) {
                            if (e.target == this.chatImgGroup.getChildAt(i)) {
                                msg = this.chatImgGroup.getChildAt(i)["_source"];
                                this.hide();
                                break;
                            }
                        }
                    }
                    break;
            }
            if (msg) {
                var params1 = {};
                params1["message"] = msg;
                params1["type"] = MajiangConfig.msgType.Expression; //
                this.cacelTuoguan(params1);
            }
        };
        ChatBar.prototype.show = function () {
            this.visible = true;
        };
        ChatBar.prototype.hide = function () {
            this.visible = false;
        };
        ChatBar.prototype.hideBar = function () {
            this.visible = false;
        };
        ChatBar.prototype.showVisible = function (num) {
            if (num == 1) {
                this.chat_biaoqing.visible = true;
                this.chatImgGroup.visible = true;
                this.chat_wenzi1.visible = true;
                this.chat_wenzi.visible = false;
                this.chatLanguageList.visible = false;
            }
            else {
                this.chat_wenzi.visible = true;
                this.chat_biaoqing1.visible = true;
                this.chatLanguageList.visible = true;
                this.chat_biaoqing.visible = false;
                this.chatImgGroup.visible = false;
            }
        };
        ChatBar.prototype.onCommonMessageSelected = function () {
            var list_chat_common = this.chatLanguageList;
            //	let params: Object = {};
            var params1 = {};
            params1["message"] = list_chat_common.selectedItem["id"];
            params1["type"] = MajiangConfig.msgType.Word; //
            this.cacelTuoguan(params1);
            this.hide();
        };
        ChatBar.prototype.cacelTuoguan = function (message) {
            return __awaiter(this, void 0, void 0, function () {
                var handler, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            handler = ServerPostPath.game_mjHandler_c_chat;
                            return [4 /*yield*/, game.PomeloManager.instance.request(handler, message)];
                        case 1:
                            resp = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ChatBar;
    }(game.BaseUI));
    majiang.ChatBar = ChatBar;
    __reflect(ChatBar.prototype, "majiang.ChatBar");
})(majiang || (majiang = {}));
