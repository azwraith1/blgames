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
var GDMJOverItemOther = (function (_super) {
    __extends(GDMJOverItemOther, _super);
    function GDMJOverItemOther() {
        var _this = _super.call(this) || this;
        _this.isWin = false;
        _this.skinName = "GDMJOverItemOtherSkin";
        return _this;
    }
    /**赢了的时候设置名字的颜色 */
    GDMJOverItemOther.prototype.setNameColor = function () {
        this.nameLabel.size = 24;
        this.nameLabel.textColor = 0xffedac;
        // this.nameLabel.stroke = 1;
        // this.nameLabel.strokeColor = 0x81280d;
    };
    GDMJOverItemOther.prototype.change2Win = function () {
        this.isWin = true;
    };
    GDMJOverItemOther.prototype.winBg = function (gainGold) {
        if (gainGold <= 0)
            return;
        this.panelImage.source = RES.getRes("gdmj_over_yellow_png");
        this.setNameColor();
    };
    GDMJOverItemOther.prototype.setWeiZhiLable = function (direction) {
        var _resouce;
        switch (direction) {
            //本家
            case "1":
                this.weiZhi.source = RES.getRes("gdmj_weizhi1_png");
                break;
            //下家
            case "2":
                this.weiZhi.source = RES.getRes("gdmj_weizhi2_png");
                break;
            //对家
            case "3":
                this.weiZhi.source = RES.getRes("gdmj_weizhi3_png");
                break;
            //上家
            case "4":
                this.weiZhi.source = RES.getRes("gdmj_weizhi4_png");
                break;
            default:
                break;
        }
    };
    GDMJOverItemOther.prototype.showDefeat = function (isDefeat) {
        if (isDefeat) {
            this.typeImage.visible = true;
            this.typeImage.source = RES.getRes("gdmj_point_11_png");
        }
    };
    GDMJOverItemOther.prototype.showWinFlag = function (flag, isWin, score, winIdex, mineIndex) {
        var getDirStr = majiang.MajiangUtils.getDirStr(winIdex, mineIndex);
        if (flag & MAJIANG_WIN_FLAG.SELF_DRAWN) {
            //自摸
            if (isWin) {
                this.typeImage.visible = true;
                this.typeImage.source = RES.getRes("gdmj_point_2_png");
            }
            else {
            }
        }
        else if (flag & MAJIANG_WIN_FLAG.DISCARD) {
            if (isWin) {
                this.typeImage.visible = true;
                this.typeImage.source = RES.getRes("gdmj_point_3_png");
            }
            else {
                this.typeImage.visible = true;
                this.typeImage.source = RES.getRes("gdmj_point_1_png");
            }
        }
        else if (flag & MAJIANG_WIN_FLAG.ABOUT_KONG) {
            this.typeImage.source = RES.getRes("gdmj_point_4_png");
        }
    };
    GDMJOverItemOther.prototype.showPlayerDatas = function (playerData) {
        this.nameLabel.text = playerData.nickname;
        this.headerImage.source = "hall_header_" + playerData.sex + "_" + playerData.figureUrl + "_png";
    };
    GDMJOverItemOther.prototype.showScore = function (score) {
        this.scoreLabel.text = "";
        if (score <= 0) {
            this.scoreLabel.font = "gdmj_lose_text_fnt";
        }
        this.scoreLabel.text = score > 0 ? "+" + score : score;
    };
    /**
 * @param  {} winInfo
 */
    GDMJOverItemOther.prototype.showWinInfo = function (winInfo) {
        this.scoreLabel.text = "";
        if (winInfo.gainGold <= 0) {
            this.scoreLabel.font = "gdmj_lose_text_fnt";
        }
        this.scoreLabel.text = winInfo.gainGold > 0 ? "+" + winInfo.gainGold : winInfo.gainGold;
    };
    return GDMJOverItemOther;
}(eui.Component));
__reflect(GDMJOverItemOther.prototype, "GDMJOverItemOther");
