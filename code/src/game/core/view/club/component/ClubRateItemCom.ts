class ClubRateItemCom extends game.BaseUI {
	public gameId: number;
	public gameInputRateTxt: eui.EditableText;
	public gameNameTxt: eui.Label;

	public constructor(gameId) {
		super();
		this.gameId = gameId;
		this.skinName = "ClubRateSetItemSkin";
	}
	/**设置输入文本 */
	public setInputRate(data: any) {
		let _val = data[this.gameId.toString()];
		//if (org || org != "") {
		this.gameInputRateTxt.text = _val;
		// }
	}
	protected createChildren() {
		super.createChildren();
		this.gameInputRateTxt.restrict = ".0-9";
		this.gameInputRateTxt.maxChars = 6;
		this.gameNameTxt.text = GAME_NAME[this.gameId.toString()] + "：";
	}
	protected onAdded() {
		super.onAdded();
		this.gameInputRateTxt.addEventListener(egret.Event.CHANGE, this.onChange, this);
		this.gameInputRateTxt.addEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
	}
	protected onRemoved() {
		super.onRemoved();
		this.gameInputRateTxt.removeEventListener(egret.Event.CHANGE, this.onChange, this);
		this.gameInputRateTxt.removeEventListener(egret.Event.FOCUS_OUT, this.onFouceOut, this);
	}

	private onFouceOut(e: egret.Event) {
		var nameInput = <eui.TextInput>e.target;
		if (!nameInput.text || nameInput.text == "") {
			nameInput.text = 0 + "";
		}
		CF.dP(ENo.CLUB_INNER_RATE_CHANGE, this);
	}
	private onChange(e: egret.Event) {
		//限制输入为 小数点后一位
		this.gameInputRateTxt.text=Owen.UtilsString.ForceTrim(this.gameInputRateTxt.text, 1);

	}
}