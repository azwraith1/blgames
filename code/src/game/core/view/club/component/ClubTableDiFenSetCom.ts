class ClubTableDiFenSetCom extends game.BaseComponent {
	public chujiTxt: eui.TextInput;
	public zhongJiTxt: eui.TextInput;
	public gaoJiTxt: eui.TextInput;
	public zhiZhunTxt: eui.TextInput;


	public constructor() {
		super();
		this.skinName = "ClubTableDiFenSetSkin";
	}
	protected createChildren(): void {
		super.createChildren();
		let txtArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
		let tempt: eui.TextInput;
		for (let i = 0; i < txtArr.length; ++i) {
			tempt = txtArr[i];
			this.forceInputTxt(tempt);
			tempt.addEventListener(egret.Event.FOCUS_OUT, this.OnCheckRange, this)
			tempt.addEventListener(egret.Event.CHANGE, this.onChange, this)
		}
	}
	private onChange(e: egret.Event) {
		let txtArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
		let tempt: eui.TextInput;
		for (let i = 0; i < txtArr.length; ++i) {
			tempt = txtArr[i];
			this.setInputText(tempt);
		}
	}
	private setInputText(target: eui.TextInput) {
		if (target.text != this.spaceVal) {
			target.text = Owen.UtilsString.ForceSpace(target.text);
		}
	}
	private forceInputTxt(taget: eui.TextInput, type: string = " 0-9") {
		taget.restrict = type;
		taget.maxChars = 5;
	}
	private root: ClubTableManagePanel;
	public setRoot(org: ClubTableManagePanel) {
		this.root = org;
	}
	public setInputArr(data: Array<number>) {
		let inputArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
		for (let i = 0; i < inputArr.length; ++i) {
			let tempData = data[i];
			let target: eui.TextInput = inputArr[i];

			if (tempData) {

				target.text = data[i].toString();
			}
			else {
				target.text = this.spaceVal;
			}
		}
	}
	private spaceVal = " ";
	private max = 10000;
	private min = 1;
	private OnCheckRange(e: egret.Event) {
		let inputTxtArr = [];
		let inputArr = [this.chujiTxt, this.zhongJiTxt, this.gaoJiTxt, this.zhiZhunTxt];
		for (let i = 0; i < inputArr.length; ++i) {
			let tex = inputArr[i];
			if (tex.text != this.spaceVal) {
				//输入上线
				if (Number(tex.text) > this.max) {
					tex.text = this.max.toString();
				}
				// //输入下线
				// if (Number(tex.text) < this.min) {
				// 	tex.text = this.min.toString();
				// }
				inputTxtArr.push(Number(tex.text));
			}
		}

		inputTxtArr = _.uniq(inputTxtArr);
		let index = inputTxtArr.indexOf(0);
		if (index >= 0) {
			inputTxtArr.splice(index, 1);
		}
		this.root.initDiFen(inputTxtArr);
	}

}