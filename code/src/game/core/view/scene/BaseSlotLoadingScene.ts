/*
 * @Author: MC Lee 
 * @Date: 2020-04-16 14:07:52 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-04-16 15:30:50
 * @Description: 默认老虎机加载界面
 */
class BaseSlotLoadingScene extends game.BaseLoginScene {
	private scene: string;
	private skinNameStr: string;
	private maskRect: egret.Rectangle;
	public processBar: eui.Image;
	public percentLabel: eui.Label;
	protected quitBtn: eui.Button;
	public constructor(scene: string) {
		super();
		this.scene = scene
		this.name = SLOT_LOADING_SKIN[scene];
		this.skinName = SLOT_LOADING_SKIN[scene];
		//添加进度遮罩
		switch (this.name) {
			case "GDZWLoadingSkin":
				this.maskRect = new egret.Rectangle(0, 0, 0, 56);
				this.processBar.mask = this.maskRect;
				break;
			case "CSDLoadingsSkin":
				this.maskRect = new egret.Rectangle(0, 0, 0, 26);
				this.processBar.mask = this.maskRect;
				break;
			case "SGWSLoadingSkin":
				this.maskRect = new egret.Rectangle(0, 0, 0, 55);
				this[`processBar2`].mask = this.maskRect;
				break;
			case "SNYXLoadingSkin":
				this.maskRect = new egret.Rectangle(0, 0, 0, 21);
				this[`processBar2`].mask = this.maskRect;
				break;
		}


		// this.skinName = `${scene.toUpperCase}LoadingSkin`;
	}

	public createChildren() {
		super.createChildren();
		this.resGroups = ["main", this.scene + "_hall", this.scene + "_game"];
		this.startLogin();
		if (this.quitBtn) this.quitBtn.visible = false;
	}


	/**
	 *  开始加载资源
	 */
	protected beganLoadResGroup() {
		console.log("resGroup:" + this.resGroup);
		this.resGroup = this.resGroups.pop();
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.loadGroup(this.resGroup);
	}

	protected onResourceLoadComplete(e: RES.ResourceEvent): void {
		if (e.groupName == this.resGroup) {
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			if (this.resGroups.length > 0) {
				this.beganLoadResGroup();
			} else {
				this.onResourceLoadOver();
			}
		}
	}


	/**
     * 资源加载完成
     */
	private onResourceLoadOver() {
		RES.loadGroup("common");
		for (let i = 0; i < this.backGroups.length; i++) {
			let name = this.backGroups[i];
			RES.loadGroup(name);
		}
		this.resLoadedOK = true;
		this.checkLoginOver();
	}

	public async checkLoginOver() {
		if (this.resLoadedOK && this.sceneConfigOK) {
			this.userLoginSuc();
		}
	}
	/**
     * 资源加载进度条
     * @param  {RES.ResourceEvent} e
     */
	private onResourceProgress(e: RES.ResourceEvent): void {
		if (e.groupName == this.resGroup) {
			this.currentLoader++;
			var rate = Math.floor(this.currentLoader / this.totalLoader * 100);
			switch (this.name) {
				case "DNTGLoadingSkin":
					this.processBar.width = rate / 100 * 629;
					break;
				case "SDXLLoadingSkin":
					this.processBar.width = rate / 100 * 679;
					break;
				case "SDMNLoadingSkin":
					this.processBar.width = rate / 100 * 996;
					break;
				case "CBZZLaodingSkin":
					this.processBar.width = rate / 100 * 762;
					break;
				case "BSKGLoadingSkin":
					this.processBar.width = rate / 100 * 866;
					break
				case "RDSGLoadingSkin":
					this.processBar.width = rate / 100 * 740;
					break;
				case "AYLSLoadingSkin":
					this.processBar.width = rate / 100 * 717;
					break;
				case "GDZWLoadingSkin":
					this.maskRect.width = rate / 100 * 721;
					this.processBar.mask = this.maskRect;
					break;
				case "BSCSLoadingSkin":
					this.processBar.width = rate / 100 * 851;
					break;
				case "CEBYLoadingSkin":
					this.processBar.width = rate / 100 * 607;
					break;
				case "ZCJLLoadingSkin":
					this.processBar.width = rate / 100 * 941;
					break;
				case "WSZWLoadingSkin":
					this.processBar.width = rate / 100 * 935;
					break;
				case "Lucky7LoadingSkin":
					this.processBar.width = rate / 100 * 700;
					break;
				case "CSDLoadingsSkin":
					this.maskRect.width = rate / 100 * 795;
					this.processBar.mask = this.maskRect;
					break;
				case "XYSGLoadingSkin":
					this.processBar.width = rate / 100 * 713;
					break;
				case "XCBSLoadingSkin":
					this.processBar.width = rate / 100 * 800;
					break;
				case "SGWSLoadingSkin":
					this.processBar.x = rate / 100 * 669;
					this.maskRect.width = rate / 100 * 690;
					this[`processBar2`].mask = this.maskRect;
					break;
				case "SNYXLoadingSkin":
					this.processBar.x = rate / 100 * 826 - 6;
					this.maskRect.width = rate / 100 * 826;
					this[`processBar2`].mask = this.maskRect;
					break;
			}
			if (this.percentLabel) {//位图字体处理
				if (this.percentLabel instanceof eui.BitmapLabel)
					this.percentLabel.text = rate + "%";
				else
					this.percentLabel.text = "正在加载..." + rate + "%";
			}
		}
	}
}