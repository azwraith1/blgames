class ClubOpenGameItemCom extends game.BaseUI {
	public gameRateTxt: eui.Label;
	public gameId: number;
	public setBtn: eui.ToggleButton;
	private isSelcect: boolean;
	//默认设置按钮是开启得状态
	public constructor(gameId, isSelect: boolean = true) {
		super();
		this.gameId = gameId;
		this.isSelcect = isSelect;
		this.skinName = "ClubOpenGameItemComSkin";
	}
	protected createChildren() {
		super.createChildren();
		this.gameRateTxt.text = GAME_NAME[this.gameId.toString()] + ":";
		this.setBtn.selected = this.isSelcect;
	}
	protected onAdded() {
		super.onAdded();
		this.setBtn.addEventListener(egret.Event.CHANGE, this.onChange, this);

	}
	protected onRemoved() {
		super.onRemoved();
		this.setBtn.removeEventListener(egret.Event.CHANGE, this.onChange, this);
	}
	private onChange(e: egret.Event) {
		CF.dP(ENo.CLUB_CLICK_OPENGAME);
	}
}