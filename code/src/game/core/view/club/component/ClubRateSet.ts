class ClubRateSet extends game.BaseComponent {
	public niuniuRate: eui.EditableText;
	public xlxzRate: eui.EditableText;
	public zjhRate: eui.EditableText;
	public ermjRate: eui.EditableText;
	public closeBtn: eui.Button;
	public kwxRate: eui.EditableText;

	public clubRateitemGroup: eui.Group;

	public constructor() {
		super();
		this.skinName = "ClubRateSetSkin";
	}

	private clubItems: ClubRateItemCom[] = [];
	public flushUI() {
       this.clubRateitemGroup.removeChildren();
		let clubIds = ClubManager.instance.clubIds;
		LogUtils.logD("===ClubRateSet==" + clubIds);
		for (let i = 0; i < clubIds.length; i++) {
			let item = new ClubRateItemCom(clubIds[i]);
			this.clubRateitemGroup.addChild(item);
			this.clubItems.push(item);
		}
	}
	public flushInputRate(data: any) {
		for (let i = 0; i < this.clubItems.length; ++i) {
			let club = this.clubItems[i];
			club.setInputRate(data);
		}
	}

}