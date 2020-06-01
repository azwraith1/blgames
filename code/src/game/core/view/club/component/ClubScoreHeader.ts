class ClubScoreHeader extends eui.Component {
	protected headerImage: eui.Image;
	protected nameLabel: eui.Label;
	private scoreLable: eui.BitmapLabel;
	private headMask: eui.Image;
	public constructor() {
		super();
		this.skinName = "ClubScoreHeaderSkin";
	}
	protected createChildren(): void {
		super.createChildren();
		this.headerImage.mask = this.headMask;
	}
	public showPlayerDatas(playerData) {
		this.nameLabel.text = playerData.nickname;
		this.headerImage.source = `hall_header_${playerData.sex}_${playerData.figureUrl}_png`;

		let score: number = playerData.gainGold;
		let txt: string;
		if (score > 0) {
			txt = "+" + score;
			this.scoreLable.font = "club_win_fnt";
		}
		else if (score <=0) {
			txt = "" + score;
			this.scoreLable.font = "club_lose_fnt";
		}
		// else {
		// 	txt = score.toString();
		// }
		this.scoreLable.text = txt;
	}
}