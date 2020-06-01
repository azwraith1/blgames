/*
 * @Author: MC Lee 
 * @Date: 2019-11-28 16:43:46 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-11-28 16:58:12
 * @Description: 排行榜
 */
class MatchRankListItem extends game.BaseItemRender {
	private rankImage: eui.Image;
	private rankLabel: eui.Label;
	private headerImage: eui.Image;
	private nameLabel: eui.Label;
	private scoreLabel: eui.Label
	private dbImage: eui.Image;
	private ttImage: eui.Image;
	public constructor() {
		super();
		this.skinName = new MatchRankListItemSkin();
	}


	public createChildren() {
		super.createChildren();
	}

	protected dataChanged() {
		let rankItemData = this.data;
		this.showRank(rankItemData.rank);
		if (rankItemData.rank % 2 == 0) {
			this.dbImage.source = RES.getRes("match_rank_db1_png");
		} else {
			this.dbImage.source = RES.getRes("match_rank_db2_png");
		}
		this.ttImage.visible = rankItemData.state == 3;
		//头像待做
		this.headerImage.source = RES.getRes("hall_header_" + rankItemData.sex + "_" + rankItemData.avatar + "_png");
		this.nameLabel.text = rankItemData.nickname;
		this.scoreLabel.text = rankItemData.score;
	}

	private showRank(rank) {
		if (rank <= 3) {
			this.rankLabel.text = "";
			this.rankImage.source = RES.getRes(`match_rank_icon${rank}_png`);
			this.rankImage.visible = true;
		} else {
			this.rankLabel.text = rank;
			this.rankImage.visible = false;
		}
	}
}