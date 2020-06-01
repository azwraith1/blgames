class NiuniuGuaJiConfig {
	private static instance: NiuniuGuaJiConfig;
	private isAutoStatus: boolean = false;
	private remainAutoCount: number;
	private qzBeiShu: any;

	public static get Instance() {
		if (!NiuniuGuaJiConfig.instance) {
			NiuniuGuaJiConfig.instance = new NiuniuGuaJiConfig();
		}
		return NiuniuGuaJiConfig.instance;
	}
	public constructor() {
	}
	public get autoStatus() {
		return this.isAutoStatus;
	}
	public setAutoStatus(isAuto: boolean) {
		this.isAutoStatus = isAuto;
	}
	public get remainCount() {
		return this.remainAutoCount;
	}
	public setRemainCount(count: number) {
		this.remainAutoCount = count;
	}
	private yzValue: string;
	private qzValue: string;
	// private yzIndex: number;
	public get yzIndex() {
		this.yzValue = this.yzArr[Math.round(Math.random() * (this.yzArr.length - 1))];
		LogUtils.logD("====倍数==" + this.yzValue, "index:" + this.sendYzQuest(this.yzValue) + "数组得：==" + this.yzArr);
		return this.sendYzQuest(this.yzValue);
	}
	private qzArr: Array<any> = [];
	private yzArr: Array<any> = [];
	/**设置抢庄arr */
	public setQZArr(arr: Array<any>) {
		this.qzArr = arr;
	}
	/**设置押注arr */
	public setYZArr(arr: Array<any>) {
		this.yzArr = arr;
	}
	public get yzVal() {
		this.yzValue = this.yzArr[Math.round(Math.random() * (this.yzArr.length - 1))];
		LogUtils.logD("yz数组" + this.yzArr + "qzvalue:" + this.yzValue);
		return this.yzValue;
	}
	public get qzVal() {
		this.qzValue = this.qzArr[Math.round(Math.random() * (this.qzArr.length - 1))];
		LogUtils.logD("qz数组" + this.qzArr + "qzvalue:" + this.qzValue);
		return this.qzValue;
	}
	public sendYzQuest(yzVal: string): number {
		let index: number;
		switch (yzVal) {
			case "1":
				//不抢
				index = 0;;
				break;
			case "2":
				//第一个按钮
				index = 1;
				break;
			case "4":
				index = 2;
				//第二个按钮
				break;
			case "8":
				index = 3;
				//第三个按钮
				break;
			case "10":
				index = 4;
				//第三个按钮
				break;
		}
		return index;
	}
}