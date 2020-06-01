class GYZJSingleSign extends eui.Component implements eui.UIComponent {
	public chickenImg: eui.Image;
	private zeDB: DBComponent;
	private chongDB: DBComponent;
	public constructor() {
		super();
		this.skinName = `GYZJSingleSignSkin`;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();

	}
	// public initDB() {
	// 	this.initchickDB(this.chongDB);
	// 	this.initchickDB(this.zeDB);
	// }
	/**1 冲锋鸡 2责任鸡 */
	public setChickType(type: number) {
		var res: string = null;
		switch (type) {
			case 1:
				res = "gyzj_game_chong_png";
				break;
			case 2:
				res = "gyzj_game_ze_png";
				break;
		}
		this.chickenImg.source = RES.getRes(res);
		//	LogUtils.logD("RES NAME===" + res, "是否有资源" + this.chickenImg.source);
	}

	/**
	*鸡牌的一个动画
	* @param  {eui.Component} penggang
	* @param  {} x
	* @param  {} y
	*/
	public chickDB(name: string, afterfinish: Function, thisobj: any) {
		let db = new DBComponent(name);
		db.callback = () => {
			if (afterfinish) afterfinish.call(thisobj);
			game.UIUtils.removeSelf(db)
			db = null;
		};
		this.addChild(db);
		db.playByFilename(1);
		// db.resetPosition();
		db.scaleX = 0.9;
		db.scaleY = 0.9;
		db.x = 20;
		db.y = 10;
	}
	// private initchickDB(db: DBComponent, name: string = "gyzj_chong") {
	// 	db = new DBComponent(name);
	// 	db.callback = () => {
	// 		game.UIUtils.removeSelf(db)
	// 		db = null;
	// 	};
	// 	this.addChild(db);
	// 	db.x = 20;
	// 	db.y = 20;
	// }
	// /**1是冲锋鸡 2是责任鸡 */
	// public playChickDB(type: number) {
	// 	if (type == 1) {
	// 		this.chongDB.visible = true;
	// 		this.chongDB.playByFilename(0);
	// 	}
	// 	else {
	// 		this.zeDB.visible = true;
	// 		this.zeDB.playByFilename(0);
	// 	}

	// }
}