class MatchLuckeyPoint extends eui.Component {
	private number: number;
	private winLabel: eui.Label;
	private dbGroup: eui.Group;
	public constructor(number: number) {
		super();
		this.number = number;
		this.skinName = new MatchLuckeyPointSkin();
	}

	public createChildren() {
		super.createChildren();
		this.winLabel.text = this.revertNumber(this.number);
	}

	public show(){
		this.visible = true;
		let db = new DBComponent("jjc_bjjj");
		this.dbGroup.addChild(db);
		db.playNamesAndLoop(['jjc_bjjj', 'jjc_bjjj_loop']);
	}

	private revertNumber(number) {
		if (number <= 99999) {
			return number + "";
		} else {
			return Math.floor(number / 10000) + "w";
		}
	}
}