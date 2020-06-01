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
var ClubScoreHeader = (function (_super) {
    __extends(ClubScoreHeader, _super);
    function ClubScoreHeader() {
        var _this = _super.call(this) || this;
        _this.skinName = "ClubScoreHeaderSkin";
        return _this;
    }
    ClubScoreHeader.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.headerImage.mask = this.headMask;
    };
    ClubScoreHeader.prototype.showPlayerDatas = function (playerData) {
        this.nameLabel.text = playerData.nickname;
        this.headerImage.source = "hall_header_" + playerData.sex + "_" + playerData.figureUrl + "_png";
        var score = playerData.gainGold;
        var txt;
        if (score > 0) {
            txt = "+" + score;
            this.scoreLable.font = "club_win_fnt";
        }
        else if (score <= 0) {
            txt = "" + score;
            this.scoreLable.font = "club_lose_fnt";
        }
        // else {
        // 	txt = score.toString();
        // }
        this.scoreLable.text = txt;
    };
    return ClubScoreHeader;
}(eui.Component));
__reflect(ClubScoreHeader.prototype, "ClubScoreHeader");
