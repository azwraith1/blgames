var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
 * @Date: 2018-10-18 15:26:45
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-02 15:39:28
 * @Description: text文本国际化处理
 */
var TextUtils = (function () {
    function TextUtils() {
        this.currentLanguage = "zh_cn";
        this.currentSkinStr = "";
        this.currentPngStr = "_png";
        this.currentAniStr = "";
        this.currentJPGStr = "_jpg";
        if (TextUtils._instance) {
            throw new Error("TextUtils使用单例");
        }
    }
    Object.defineProperty(TextUtils, "instance", {
        get: function () {
            if (!TextUtils._instance) {
                TextUtils._instance = new TextUtils();
                TextUtils._instance.languageData = RES.getRes("language_json");
            }
            return TextUtils._instance;
        },
        enumerable: true,
        configurable: true
    });
    TextUtils.prototype.changeLanguage = function (language) {
        this.currentLanguage = language;
        if (language == "ko_kr") {
            this.currentSkinStr = "KR";
            this.currentAniStr = "_kr";
            this.currentPngStr = "_kr_png";
            this.currentJPGStr = "_kr_jpg";
        }
        if (language == "vi_vn") {
            this.currentSkinStr = "VN";
            this.currentAniStr = "_vn";
            this.currentPngStr = "_vn_png";
            this.currentJPGStr = "_vn_jpg";
        }
    };
    TextUtils.prototype.isChinese = function () {
        return this.currentLanguage == "zh_cn";
    };
    TextUtils.prototype.changeImage = function (p) {
        var source = p.source;
        if (source && typeof (source) == "string") {
            source = source.replace("_png", this.currentPngStr);
        }
        p.source = source;
    };
    TextUtils.prototype.getCurrentTextById = function (id) {
        var languageJson = this.languageData[id];
        if (!languageJson) {
            return "load-" + id + "-fail";
        }
        var sureText = languageJson[this.currentLanguage];
        return sureText;
    };
    /**
     * jsonData = {
     * 	 "1": text1,
     * 	 "2": text2,
     *   "3": text3
     * }
     * 给数据设置最大支持3
     */
    TextUtils.prototype.setTextById = function (id, jsonData) {
        var sureText = this.getCurrentTextById(id);
        if (!jsonData) {
            return sureText;
        }
        var languageJson = this.languageData[id];
        for (var i = 1; i <= 3; i++) {
            var data = jsonData[i];
            if (!data) {
                return sureText;
            }
            sureText = sureText.replace("${" + i + "}", data);
        }
        return sureText;
    };
    TextUtils.prototype.languageInter = function (p) {
        return __awaiter(this, void 0, void 0, function () {
            var text, textArr, contentArr, id, languageJson, sureText, len, i, ch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!TextUtils._instance.languageData) return [3 /*break*/, 2];
                        return [4 /*yield*/, RES.loadGroup("preload")];
                    case 1:
                        _a.sent();
                        TextUtils._instance.languageData = RES.getRes("language_json");
                        _a.label = 2;
                    case 2:
                        if (!p)
                            return [2 /*return*/];
                        if (egret.is(p, egret.getQualifiedClassName(egret.TextField)) || egret.is(p, egret.getQualifiedClassName(eui.Label))) {
                            text = p.text;
                            if (text.indexOf("lan:") > -1) {
                                textArr = text.split("lan:");
                                contentArr = textArr[1].split("||");
                                id = contentArr[0];
                                languageJson = this.languageData[id];
                                if (!languageJson || !languageJson[this.currentLanguage]) {
                                    p.text = "load-" + id + "-fail";
                                }
                                else {
                                    sureText = languageJson[this.currentLanguage];
                                    if (contentArr[1]) {
                                        p.text = sureText + contentArr[1];
                                    }
                                    else {
                                        p.text = sureText;
                                    }
                                }
                            }
                        }
                        else {
                            len = p.numChildren;
                            for (i = 0; i < len; i++) {
                                ch = p.getChildAt(i);
                                this.languageInter(ch);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 改变button图片
     */
    TextUtils.cBtnRes = function (button, reouceName) {
        var icon = button.icon;
        if (icon && icon.source) {
            icon.source = RES.getRes(reouceName + TextUtils.instance.currentPngStr);
        }
    };
    return TextUtils;
}());
__reflect(TextUtils.prototype, "TextUtils");
