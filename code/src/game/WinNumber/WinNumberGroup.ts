class WinNumberGroup extends game.BaseUI {
	public dbGroup: eui.Group;
	public winNumberItem: WinNumberItem;
	public rollDB: DBComponent;
	private callBack: Function;
	private thisObj: any;
	private groupId: number;
	public constructor() {
		super();
		this.skinName = "WinNumberGroupSkin";
	}

	private initDB() {
		this.rollDB = new DBComponent("jjc_zhuanlun");
		this.dbGroup.addChild(this.rollDB);
		this.dbGroup.visible = false;
		this.rollDB.callback = () => {
			if (this.callBack) this.callBack.call(this.thisObj,this);
			this.dbGroup.visible = false;
			this.winNumberItem.visible = true;
		};
	}
	protected createChildren() {
		super.createChildren();
		this.initDB();
	}
	public setGroupID(org: number) {
		this.groupId = org;
	}
	public getGroupID():number{
		return this.groupId;
	}
	public playDB(time: number = -1, txtVal: string, callBack: Function, thisObj: any) {
		this.dbGroup.visible = true;
		this.rollDB.playByFilename(time);
		this.winNumberItem.setWinTxt(txtVal);
		this.callBack = callBack;
		this.thisObj = thisObj;
	}
}