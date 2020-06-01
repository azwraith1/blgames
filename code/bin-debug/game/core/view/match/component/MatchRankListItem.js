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
 * @Date: 2019-11-28 16:43:46
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-28 16:58:12
 * @Description: 排行榜
 */
var MatchRankListItem = (function (_super) {
    __extends(MatchRankListItem, _super);
    function MatchRankListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = new MatchRankListItemSkin();
        return _this;
    }
    MatchRankListItem.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    MatchRankListItem.prototype.dataChanged = function () {
        var rankItemData = this.data;
        this.showRank(rankItemData.rank);
        if (rankItemData.rank % 2 == 0) {
            this.dbImage.source = RES.getRes("match_rank_db1_png");
        }
        else {
            this.dbImage.source = RES.getRes("match_rank_db2_png");
        }
        this.ttImage.visible = rankItemData.state == 3;
        //头像待做
        this.headerImage.source = RES.getRes("hall_header_" + rankItemData.sex + "_" + rankItemData.avatar + "_png");
        this.nameLabel.text = rankItemData.nickname;
        this.scoreLabel.text = rankItemData.score;
    };
    MatchRankListItem.prototype.showRank = function (rank) {
        if (rank <= 3) {
            this.rankLabel.text = "";
            this.rankImage.source = RES.getRes("match_rank_icon" + rank + "_png");
            this.rankImage.visible = true;
        }
        else {
            this.rankLabel.text = rank;
            this.rankImage.visible = false;
        }
    };
    return MatchRankListItem;
}(game.BaseItemRender));
__reflect(MatchRankListItem.prototype, "MatchRankListItem");
