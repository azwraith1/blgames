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
var ClubPlayerGainItem = (function (_super) {
    __extends(ClubPlayerGainItem, _super);
    function ClubPlayerGainItem() {
        var _this = _super.call(this) || this;
        _this.maohao = "：";
        _this.skinName = "ClubPlayerGainItemSkin";
        return _this;
    }
    ClubPlayerGainItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    ClubPlayerGainItem.prototype.dataChanged = function () {
        var rankItemData = this.data;
        var roomInfoData = rankItemData["roomInfo"];
        var playersInfo = rankItemData["playersInfo"];
        var _length = playersInfo.length;
        if (_length > 4) {
            this.itembg.source = "club_list_shuangpai_png";
            this.height = 203;
        }
        else {
            this.itembg.source = "club_list_single_png";
            this.height = 145;
        }
        this.roomId.text = TextUtils.instance.getCurrentTextById(111) + this.maohao + roomInfoData.roomId; //"房号：" 
        this.difen.text = TextUtils.instance.getCurrentTextById(29) + this.maohao + roomInfoData["betBase"]; //"lan:29||:"
        this.playWay.text = GAME_NAME[rankItemData["currentID"]]; //this.playWayFun(rankItemData["currentID"]);
        this.roomTime.text = this.fmtDate(roomInfoData["create_time"]);
        if (rankItemData["gainType"] == 1) {
            this.platGroup.visible = false;
            this.clubGroup.visible = false;
        }
        else {
            if (ClubManager.instance.currentClub.role == 1) {
                this.platGroup.visible = true;
                this.clubGroup.visible = true;
                var totalClubCount = 0;
                var totalPlatCount = 0;
                for (var i = 0; i < playersInfo.length; ++i) {
                    totalClubCount = Owen.Utils.additionFun(playersInfo[i]["clubPumpGold"], totalClubCount);
                    totalPlatCount = Owen.Utils.additionFun(playersInfo[i]["platPumpGold"], totalPlatCount);
                }
                this.clubPumpGold.text = totalClubCount + "";
                this.platPumpGold.text = totalPlatCount + "";
            }
            else {
                this.platGroup.visible = false;
                this.clubGroup.visible = false;
            }
        }
        this.showPlayerHeader(playersInfo);
    };
    ClubPlayerGainItem.prototype.fmtDate = function (obj) {
        var date = new Date(obj * 1000);
        var y = date.getFullYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        var h = "0" + date.getHours();
        var mins = "0" + date.getMinutes();
        var sc = "0" + date.getSeconds();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
    };
    ClubPlayerGainItem.prototype.playWayFun = function (currentID) {
        switch (currentID) {
            case 10005:
                return "炸金花";
            case 10002:
                return "血战到底";
            case 10003:
                return "抢庄牛牛";
            case 10020:
                return "二人麻将";
            case 10018:
                return "卡五星";
        }
    };
    ClubPlayerGainItem.prototype.showPlayerHeader = function (data) {
        this.headGroup.removeChildren();
        var tempData;
        for (var i = 0; i < data.length; ++i) {
            tempData = data[i];
            var item = new ClubScoreHeader();
            item.visible = true;
            item.showPlayerDatas(tempData);
            this.headGroup.addChild(item);
        }
    };
    return ClubPlayerGainItem;
}(game.BaseItemRender));
__reflect(ClubPlayerGainItem.prototype, "ClubPlayerGainItem");
