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
 * @Date: 2020-03-16 16:24:47
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-19 18:07:57
 * @Description: 胜率
 */
var BDZWinPattern = (function (_super) {
    __extends(BDZWinPattern, _super);
    function BDZWinPattern() {
        return _super.call(this) || this;
    }
    BDZWinPattern.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    BDZWinPattern.prototype.showPattern = function () {
        var mineInfo = Global.roomProxy.getMineGameData();
        var pattern = mineInfo.patternWinRateInfo;
        var mineRoundPattern = 16 - mineInfo.roundPattern;
        var rounPattenrArr = [];
        if (mineRoundPattern <= 3) {
            rounPattenrArr = [1, 2, 3, 4, 5];
        }
        else if (mineRoundPattern >= 13) {
            rounPattenrArr = [11, 12, 13, 14, 15];
        }
        else {
            rounPattenrArr = [mineRoundPattern - 2, mineRoundPattern - 1, mineRoundPattern, mineRoundPattern + 1, mineRoundPattern + 2];
        }
        this.visible = true;
        for (var i = 1; i <= 5; i++) {
            var round = rounPattenrArr[i - 1];
            var isCur = round == mineRoundPattern;
            this["pBg" + i].visible = isCur;
            this["pName" + i].text = this.getPatternStr(round);
            this["pPer" + i].text = pattern[16 - round] == 0 ? "-" : Math.floor(pattern[16 - round] * 100) + "%";
            this["pPer" + i].textColor = isCur ? 0X2bbe0a : 0Xbcbdbc;
            this["pName" + i].textColor = isCur ? 0X2bbe0a : 0X96adca;
        }
    };
    BDZWinPattern.prototype.getPatternStr = function (round) {
        switch (round) {
            case 1: return "1.골프";
            case 2: return "2.세컨드";
            case 3: return "3.써드";
            case 4: return "4.5탑";
            case 5: return "5.6탑";
            case 6: return "6.7탑";
            case 7: return "7.8탑";
            case 8: return "8.9탑";
            case 9: return "9.10탑";
            case 10: return "10.J탑";
            case 11: return "11.Q탑";
            case 12: return "12.K탑";
            case 13: return "13.베이스";
            case 14: return "14.투베이스";
            case 15: return "15.탑";
        }
    };
    return BDZWinPattern;
}(eui.Component));
__reflect(BDZWinPattern.prototype, "BDZWinPattern");
