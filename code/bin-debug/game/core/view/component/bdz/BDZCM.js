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
/*
 * @Author: MC Lee
 * @Date: 2019-04-01 10:41:26
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-04-01 10:42:47
 * @Description: 百得之筹码
 */
var BDZCM = (function (_super) {
    __extends(BDZCM, _super);
    function BDZCM() {
        var _this = _super.call(this) || this;
        _this.skinName = new BDZCMSkin();
        return _this;
    }
    BDZCM.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BDZCM.prototype.changeGold = function (gold) {
        var goldStr = "";
        if (gold >= 1000) {
            goldStr = Math.floor(gold / 1000) + "k";
        }
        else {
            goldStr = gold + "";
        }
        this.goldLabel.text = goldStr;
    };
    BDZCM.prototype.changeColor = function (type) {
        //绿-> 紫 -> 角 元 -> 红
        switch (type) {
            case "yuan":
                this.cmColor.source = RES.getRes("bdz_cm_4_png");
                break;
            case "jiao":
                this.cmColor.source = RES.getRes("bdz_cm_2_png");
                break;
            case "fen":
                this.cmColor.source = RES.getRes("bdz_cm_1_png");
                break;
        }
    };
    return BDZCM;
}(eui.Component));
__reflect(BDZCM.prototype, "BDZCM");
