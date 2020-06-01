class WinNumberItem extends game.BaseUI {
	public winTxt: eui.BitmapLabel;

	public constructor() {
		super();
		this.skinName = "WinNumberItemSkin";
	}
	public setWinTxt(txt: string) {
		this.winTxt.text = txt;
	}
	public get winVal() {
		return this.winTxt.text;
	}
}