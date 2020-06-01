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
var ClubTableDiFenSetCom = (function (_super) {
    __extends(ClubTableDiFenSetCom, _super);
    function ClubTableDiFenSetCom() {
        var _this = _super.call(this) || this;
        _this.spaceVal = " ";
        _this.max = 10000;
        _this.min = 1;
        _this.skinName = "ClubTableDiFenSetSkin";
        return _this;
    }
    ClubTableDiFenSetCom.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        var txtArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
        var tempt;
        for (var i = 0; i < txtArr.length; ++i) {
            tempt = txtArr[i];
            this.forceInputTxt(tempt);
            tempt.addEventListener(egret.Event.FOCUS_OUT, this.OnCheckRange, this);
            tempt.addEventListener(egret.Event.CHANGE, this.onChange, this);
        }
    };
    ClubTableDiFenSetCom.prototype.onChange = function (e) {
        var txtArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
        var tempt;
        for (var i = 0; i < txtArr.length; ++i) {
            tempt = txtArr[i];
            this.setInputText(tempt);
        }
    };
    ClubTableDiFenSetCom.prototype.setInputText = function (target) {
        if (target.text != this.spaceVal) {
            target.text = Owen.UtilsString.ForceSpace(target.text);
        }
    };
    ClubTableDiFenSetCom.prototype.forceInputTxt = function (taget, type) {
        if (type === void 0) { type = " 0-9"; }
        taget.restrict = type;
        taget.maxChars = 5;
    };
    ClubTableDiFenSetCom.prototype.setRoot = function (org) {
        this.root = org;
    };
    ClubTableDiFenSetCom.prototype.setInputArr = function (data) {
        var inputArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
        for (var i = 0; i < inputArr.length; ++i) {
            var tempData = data[i];
            var target = inputArr[i];
            if (tempData) {
                target.text = data[i].toString();
            }
            else {
                target.text = this.spaceVal;
            }
        }
    };
    ClubTableDiFenSetCom.prototype.OnCheckRange = function (e) {
        var inputTxtArr = [];
        var inputArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
        for (var i = 0; i < inputArr.length; ++i) {
            var tex = inputArr[i];
            if (tex.text != this.spaceVal) {
                //输入上线
                if (Number(tex.text) > this.max) {
                    tex.text = this.max.toString();
                }
                // //输入下线
                // if (Number(tex.text) < this.min) {
                // 	tex.text = this.min.toString();
                // }
                inputTxtArr.push(Number(tex.text));
            }
        }
        inputTxtArr = _.uniq(inputTxtArr);
        var index = inputTxtArr.indexOf(0);
        if (index >= 0) {
            inputTxtArr.splice(index, 1);
        }
        this.root.initDiFen(inputTxtArr);
    };
    return ClubTableDiFenSetCom;
}(game.BaseComponent));
__reflect(ClubTableDiFenSetCom.prototype, "ClubTableDiFenSetCom");
