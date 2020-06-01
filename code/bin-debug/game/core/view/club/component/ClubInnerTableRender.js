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
 * @Date: 2020-01-09 14:38:29
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-13 18:38:55
 * @Description: 条
 */
var ClubInnerTableRender = (function (_super) {
    __extends(ClubInnerTableRender, _super);
    function ClubInnerTableRender() {
        var _this = _super.call(this) || this;
        var clubId = ClubInnerHallScene.instance.currentClubGameId;
        switch (clubId) {
            case GAME_ID.GDMJ:
            case GAME_ID.MJXZDD:
                _this.skinName = new ClubInnerTableRenderSkin2();
                break;
            case GAME_ID.ERMJ:
                _this.skinName = new ClubInnerTableRenderSkin3();
                break;
            case GAME_ID.BLNN:
                _this.skinName = new ClubInnerTableRenderSkin5();
                break;
            case GAME_ID.BDZ:
            case GAME_ID.ZJH:
                _this.skinName = new ClubInnerTableRenderSkin4();
                break;
            case GAME_ID.HBMJ:
                _this.skinName = new ClubInnerTableRenderSkin6();
                break;
            default:
                _this.skinName = new ClubInnerTableRenderSkin1();
                break;
        }
        return _this;
    }
    ClubInnerTableRender.prototype.setTableImg = function (isShow) {
        if (isShow === void 0) { isShow = true; }
        this.tableSetImg.visible = isShow;
        this.infoGroup.visible = !isShow;
        this.tableNumGroup.visible = !isShow;
    };
    ClubInnerTableRender.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        // this.showTableInfo();
        this.gameNameLabel.text = data.usedSeatNum + "/" + data.seatNum;
        this.difenLabel.text = TextUtils.instance.getCurrentTextById(29) + ":" + data.betBase;
        this.tableNum.text = data["tableNum"];
        this.showTablePlayer();
        this.showRoomStatus();
        //smart
        if (data["isNew"] == -1) {
            this.setTableImg();
            //所有头像不能看见
            for (var i = 1; i < 9; i++) {
                if (this["group" + i])
                    this["group" + i].visible = false;
            }
        }
        else {
            this.setTableImg(false);
        }
    };
    ClubInnerTableRender.prototype.showRoomStatus = function () {
        var status = this.data.status;
        if (status == 1) {
            this.statusLabel.text = TextUtils.instance.getCurrentTextById(30);
            this.statusLabel.textColor = 0X43FD4C;
        }
        else if (status == 2) {
            this.statusLabel.text = TextUtils.instance.getCurrentTextById(31);
            this.statusLabel.textColor = 0XFD7843;
        }
        else {
            this.statusLabel.text = TextUtils.instance.getCurrentTextById(31);
            this.statusLabel.textColor = 0XFD7843;
        }
    };
    ClubInnerTableRender.prototype.showTablePlayer = function () {
        var tableListPlayerInfo = this.data.tableListPlayerInfo;
        for (var i = 1; i < 9; i++) {
            if (this["group" + i])
                this["group" + i].visible = false;
        }
        if (tableListPlayerInfo) {
            for (var i = 0; i < tableListPlayerInfo.length; i++) {
                var data = tableListPlayerInfo[i];
                var seatId = data.seatId;
                this["group" + seatId].visible = true;
                this["header" + seatId].source = RES.getRes("nns_" + data.sex + "_" + data.figureUrl + "_png");
            }
        }
    };
    ClubInnerTableRender.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        TextUtils.instance.changeImage(this.kongImage);
        TextUtils.instance.changeImage(this.tableSetImg);
    };
    ClubInnerTableRender.prototype.onTouchTap = function (e) {
        if (this.data["isNew"] == -1) {
            CF.dP(ENo.CLUB_INNER_TABLE_SET_TOUCH, this.data);
        }
        else {
            CF.dP(ENo.CLUB_INNER_TABLE_TOUCH, this.data);
        }
    };
    return ClubInnerTableRender;
}(game.BaseItemRender));
__reflect(ClubInnerTableRender.prototype, "ClubInnerTableRender");
