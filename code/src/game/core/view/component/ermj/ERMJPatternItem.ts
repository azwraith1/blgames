class ERMJPatternItem extends eui.Component {
	private patternLabel: eui.Label;
	private fanLabel: eui.Label;

	private pattern: number;
	private score: number;
	public constructor(pattern, score) {
		super();
		this.pattern = pattern;
		this.score = score;
		this.skinName = new ERMJPattarnItemSkin();
	}

	public createChildren() {
		super.createChildren();
		let text = ERMJPattern[this.pattern];
		this.patternLabel.text = text;
		if (this.pattern == 110) {
			this.fanLabel.text = this.score + "次";
		} else {
			this.fanLabel.text = this.score + "番";
		}
	}
}