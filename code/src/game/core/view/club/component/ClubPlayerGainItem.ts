class ClubPlayerGainItem extends game.BaseItemRender {
	public header0: ClubScoreHeader;
	public header1: ClubScoreHeader;
	public header2: ClubScoreHeader;
	public header3: ClubScoreHeader;
	public header4: ClubScoreHeader;
	public difen: eui.Label;
	public roomId: eui.Label;
	public roomTime: eui.Label;
	public playWay: eui.Label;
	//平台抽水
	private clubPumpGold: eui.Label;
	private platPumpGold: eui.Label;
	private itembg: eui.Image;
	private headGroup: eui.Group;
	private maohao: string = "：";


	public platGroup: eui.Group;

	public clubGroup: eui.Group;


	public constructor() {
		super();
		this.skinName = "ClubPlayerGainItemSkin";
	}
	public createChildren() {
		super.createChildren();

	}
	protected dataChanged() {
		let rankItemData = this.data;
		let roomInfoData = rankItemData["roomInfo"];
		let playersInfo = rankItemData["playersInfo"];
		let _length = playersInfo.length;
		if (_length > 4) {
			this.itembg.source = "club_list_shuangpai_png";
			this.height = 203;
		}
		else {
			this.itembg.source = "club_list_single_png";
			this.height = 145;
		}
		this.roomId.text = TextUtils.instance.getCurrentTextById(111) + this.maohao + roomInfoData.roomId;//"房号：" 
		this.difen.text = TextUtils.instance.getCurrentTextById(29) + this.maohao + roomInfoData["betBase"];//"lan:29||:"
		this.playWay.text = GAME_NAME[rankItemData["currentID"]];//this.playWayFun(rankItemData["currentID"]);
		this.roomTime.text = this.fmtDate(roomInfoData["create_time"]);
		if (rankItemData["gainType"] == 1) {
			this.platGroup.visible = false;
			this.clubGroup.visible = false;
		}
		else {
			if (ClubManager.instance.currentClub.role == 1) {
				this.platGroup.visible = true;
				this.clubGroup.visible = true;
				let totalClubCount = 0;
				let totalPlatCount = 0;
				for (let i = 0; i < playersInfo.length; ++i) {
					totalClubCount = Owen.Utils.additionFun(playersInfo[i]["clubPumpGold"], totalClubCount);
					totalPlatCount = Owen.Utils.additionFun(playersInfo[i]["platPumpGold"], totalPlatCount);
				}
				this.clubPumpGold.text = totalClubCount + "";
				this.platPumpGold.text = totalPlatCount + "";
			}
			else {
				this.platGroup.visible = false;
				this.clubGroup.visible = false;
			}
		}
		this.showPlayerHeader(playersInfo);
	}
	private fmtDate(obj) {
		var date = new Date(obj * 1000);
		var y = date.getFullYear();
		var m = "0" + (date.getMonth() + 1);
		var d = "0" + date.getDate();
		var h = "0" + date.getHours();
		var mins = "0" + date.getMinutes();
		var sc = "0" + date.getSeconds();
		return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length) + "\t" + h.substring(h.length - 2, h.length) + ":" + mins.substring(mins.length - 2, mins.length) + ":" + sc.substring(sc.length - 2, sc.length);
	}
	public playWayFun(currentID: number) {
		switch (currentID) {
			case 10005:
				return "炸金花";
			case 10002:
				return "血战到底";
			case 10003:
				return "抢庄牛牛";
			case 10020:
				return "二人麻将";
			case 10018:
				return "卡五星"
		}
	}
	private showPlayerHeader(data) {
		this.headGroup.removeChildren();
		let tempData: any;
		for (let i = 0; i < data.length; ++i) {
			tempData = data[i];
			let item: ClubScoreHeader = new ClubScoreHeader();
			item.visible = true;
			item.showPlayerDatas(tempData);
			this.headGroup.addChild(item);
		}

	}

}