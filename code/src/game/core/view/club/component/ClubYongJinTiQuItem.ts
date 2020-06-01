class ClubYongJinTiQuItem extends game.BaseComponent {
	public tiQuInput: eui.TextInput;
	public tiquYongJinBtn: eui.Button;

	public constructor() {
		super();
		this.skinName = "ClubYongJinTIQuSkin";
	}
	public async onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.tiquYongJinBtn:
				let hander = ServerPostPath.hall_clubHandler_c_receiveClubIncome;
				let tiquNum = this.tiQuInput.text;
				if (!tiquNum) {
					tiquNum = "0";
				}
				let resp: any = await game.PomeloManager.instance.request(hander, { "receiveGold": Number(tiquNum) });
				LogUtils.logD("=====佣金提取" + JSON.stringify(resp));
				break;
		}
	}
}