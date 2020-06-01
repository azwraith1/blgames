class ClubRateShowItem extends game.BaseUI {
	public gameRateTxt: eui.Label;
	public gameName: string;
	public gameId: number;
	private per: string = "%";
	public constructor(gameId) {
		super();
		this.gameId = gameId;
		this.skinName = "ClubRateShowItemComSkin";
	}
	protected createChildren() {
		super.createChildren();
		this.gameName = GAME_NAME[this.gameId.toString()] + ":";
	}
	protected onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_INNER_RATE_CHANGE, this.onRateChange, this)

	}
	protected onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLUB_INNER_RATE_CHANGE, this.onRateChange, this)

	}
	private onRateChange(e: egret.Event) {

		let data = e.data as ClubRateItemCom;
		if (data.gameId == this.gameId) {
			this.gameRateTxt.text = this.gameName + data.gameInputRateTxt.text + "%";
		}
	}
	/**获取rate的值 */
	public get rateVal() {
		let tempt = this.gameRateTxt.text.replace(this.gameName, "");
		return tempt.replace(this.per, "");
	}
	/**设置税率的值 */
   public setRateVal(data:any){
		let _val = data[this.gameId.toString()];
		this.gameRateTxt.text = this.gameName+Owen.Utils.multipleFun(_val, 100) + this.per;
   }
}