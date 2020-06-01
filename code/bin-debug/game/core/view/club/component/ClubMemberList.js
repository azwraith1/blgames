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
var ClubMemberList = (function (_super) {
    __extends(ClubMemberList, _super);
    function ClubMemberList(gameid) {
        return _super.call(this, gameid) || this;
    }
    ClubMemberList.prototype.renderUI = function (data) {
        this.setPlayType(data["role"]);
        this.showPlayerDatas(data);
        this.roomTime.text = TextUtils.instance.getCurrentTextById(44) + "：" + this.fmtDate(data["lastTime"]);
    };
    ClubMemberList.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.headerImage.mask = this.headerMask;
    };
    return ClubMemberList;
}(BaseClubMemberRender));
__reflect(ClubMemberList.prototype, "ClubMemberList");
