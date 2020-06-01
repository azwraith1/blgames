class WinNumberPanel extends game.BaseComponent {
	public static _instance: WinNumberPanel;

	public dbGroup: eui.Group;
	public dbGrouplun: eui.Group;
	public group4: WinNumberGroup;
	public group3: WinNumberGroup;
	public group2: WinNumberGroup;
	public group1: WinNumberGroup;
	public group0: WinNumberGroup;

	private rollNumber = 2;
	private delta = 3;
	public constructor() {
		super();
		this.skinName = `WinNumberPanelSkin`;
	}
	public static get instance() {
		if (!WinNumberPanel._instance) {
			WinNumberPanel._instance = new WinNumberPanel();
		}
		return WinNumberPanel._instance;
	}
	private initDB(name: string = "jjc_zhuanzhou") {
		let db = new DBComponent(name);
		let loopName = name + "_loop";
		db.playNamesAndLoop([name, loopName]);
		this.dbGroup.addChild(db);
	}

	public createChildren() {
		super.createChildren();
		this.initDB();
		let winGroup: WinNumberGroup;
		for (let i = 0; i < 5; ++i) {
			let winGroup = this["group" + i] as WinNumberGroup;
			winGroup.setGroupID(i);
			winGroup.visible = false;
		}

	}

	public callback: Function
	public hide() {
		game.UIUtils.removeSelf(this);
		WinNumberPanel._instance = null;
		this.callback && this.callback();
	}
	public show(winNumber: number, callback: Function) {
		//this.initDB(winNumber);
		this.callback = callback;
		GameLayerManager.gameLayer().panelLayer.addChild(this);
		this.setAutoTimeout(() => {
			this.initWinNumber(winNumber);
		}, this, 200);

	}

	private revertNumber(number) {
		if (number <= 99999) {
			return number + "";
		} else {
			return Math.floor(number / 10000) + "w";
		}
	}

	private dataLenth: number;
	private initWinNumber(winNumber: number) {
		let winNum = this.revertNumber(winNumber);
		let winGroup: WinNumberGroup;
		this.dataLenth = winNum.length;
		let tempArr: Array<string> = [];
		let tempData: any;
		//倒序
		for (let i = this.dataLenth - 1; i >= 0; i--) {
			tempArr.push(winNum[i]);
		}

		for (let i = 0; i < 5; ++i) {
			tempData = tempArr[i];
			let winGroup = this["group" + i] as WinNumberGroup;
			let count = this.rollNumber + i * this.delta;
			if (tempData) {
				winGroup.visible = true;
				winGroup.playDB(count, tempData, this.playFinish, this);
			}
			else {
				winGroup.playDB(count, "0", this.playFinish, this);
				winGroup.visible = true;
			}
		}
		SoundManager.getInstance().playEffect("wszw_reel_num_mp3", true);

	}
	private playFinish(item: WinNumberGroup) {
		let _id = item.getGroupID();

		if (_id == 4) {
			SoundManager.getInstance().stopEffectByName("wszw_reel_num_mp3");
			SoundManager.getInstance().playEffect("cjnn_flyGoldMc_mp3");
		}
		if (_id == 4) {
			this.setAutoTimeout(() => { this.hide(); }, this, 1000);
			SoundManager.getInstance().stopEffectByName("cjnn_flyGoldMc_mp3");
		}
	}
}