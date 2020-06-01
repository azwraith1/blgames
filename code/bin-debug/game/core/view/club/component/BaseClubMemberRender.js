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
var BaseClubMemberRender = (function (_super) {
    __extends(BaseClubMemberRender, _super);
    function BaseClubMemberRender(gameid) {
        var _this = _super.call(this) || this;
        _this.gameID = gameid;
        switch (_this.gameID) {
            case MEMBER_NAME.CLUB_LIST:
                _this.skinName = "ClubMemberRenderSkin";
                break;
            case MEMBER_NAME.CLUB_CHECK:
                _this.skinName = "ClubMemberCheckSkin" + CF.tis; //"ClubMemberCheckSkin";
                break;
            case MEMBER_NAME.CLUB_MANAGE:
                _this.skinName = "ClubMemberManageSkin";
                break;
        }
        return _this;
    }
    BaseClubMemberRender.prototype.setRoot = function (root) {
        this.root = root;
    };
    BaseClubMemberRender.prototype.setPlayType = function (num) {
        switch (num) {
            //1老板
            case 1:
                this.setPlayerTypTxt(45, 0xdce488); //老板
                break;
            //会员
            case 3:
                this.setPlayerTypTxt(47, 0x442301); //"lan:47||"
                break;
            //管理员
            case 2:
                this.setPlayerTypTxt(46, 0x862409); //"lan:46||"
                break;
        }
    };
    BaseClubMemberRender.prototype.setPlayerTypTxt = function (id, clor) {
        this.playerType.text = TextUtils.instance.getCurrentTextById(id);
        this.playerType.textColor = clor;
    };
    BaseClubMemberRender.prototype.showPlayerDatas = function (playerData) {
        this.nameLabel.text = playerData.nickname;
        this.headerImage.source = "hall_header_" + playerData.sex + "_" + playerData.figureUrl + "_png";
    };
    BaseClubMemberRender.prototype.renderUI = function (data) {
        this.playerId = data["playerUid"] || data["id"];
        this.showPlayerDatas(data);
    };
    /**设置时间 */
    BaseClubMemberRender.prototype.fmtDate = function (obj) {
        var date = new Date(obj * 1000);
        var y = date.getFullYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        var h = "0" + date.getHours();
        var mins = "0" + date.getMinutes();
        var sc = "0" + date.getSeconds();
        return y + "." + m.substring(m.length - 2, m.length) + "." + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
    };
    return BaseClubMemberRender;
}(game.BaseComponent));
__reflect(BaseClubMemberRender.prototype, "BaseClubMemberRender");
