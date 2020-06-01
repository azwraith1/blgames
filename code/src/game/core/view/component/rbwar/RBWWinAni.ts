class RBWWinAni extends eui.Component {
	public xinImg: eui.Image;
	public winImg: eui.Image;
	public shengImg: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/widget/rbwar/RBWWinAniSkin.exml";
	}
	public showWinAni(isHong: boolean = true) {
		if (!isHong) {
			this.winImg.source = RES.getRes("hhdz_game_hei_png");
			this.xinImg.source = RES.getRes("hhdz_game_heixin_png");
			this.xinImg.y=-26;
		}
		else{
			this.winImg.source = RES.getRes("hhdz_game_hong_png");
			this.xinImg.source = RES.getRes("hhdz_game_hongxin_png");
			this.xinImg.y=-25;
		}
		this.winImg.anchorOffsetX = this.winImg.width / 2;
		this.winImg.anchorOffsetY = this.winImg.height / 2;
		this.winImg.scaleX = 2;
		this.winImg.scaleY = 2;
		egret.Tween.get(this.winImg).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceOut).wait(300).call(
			() => {
				this.shengImg.visible = true;
			}, this
		)
	}

}