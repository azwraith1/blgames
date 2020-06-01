/*
 * @Author: real MC Lee 
 * @Date: 2019-07-17 15:26:34 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-08-13 15:22:47
 * @Description: 
 */
module gdzw {
	export class GDZWScroller extends game.BaseScroller {
		public scroller: eui.Scroller;
		public itemGroup: eui.Group;
		public item1: GDZWScrollerItem;
		public item2: GDZWScrollerItem;
		public item3: GDZWScrollerItem;
		public item4: GDZWScrollerItem;
		public item5: GDZWScrollerItem;
		public aniName = "gdzw_reel_fast";
		public strName = game.GDZWUtils.comm2FreeModel;
		public itemSize1: number = 8
		public itemSize2: number = 8
		public itemSize3: number = 8
		public itemSize4: number = 8
		public itemSize5: number = 8
		public overIndex: number = 0;
		public speed: number = 48;
		public aniX = [395, 550, 710];
		public aniY = [300, 300, 300];


		public constructor() {
			super();
			this.skinName = "GDZWScrollerSkin";
		}

		public onAdded() {
			super.onAdded();
			this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}

		public onRemoved() {
			super.onRemoved();
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
		}

		public flashIcon: Array<Array<number>> = [];
		public isRun: boolean = false;
		public overTime: number;
		public update(e: egret.Event) {
			if (!this.isRun) {
				return;
			}
			// this.item5.y += this.speed;
			for (let i = 1; i <= 5; i++) {
				let item = this[`item${i}`] as GDZWScrollerItem //.itemDown(this.speed);
				item.itemDown();
			}
		}

		public run() {
			//还原
			this.isRun = true;
			this.overIndex = 1;
			this.overIndexes = [];
			this.resultArrList = null;
			for (let i = 1; i <= 5; i++) {
				let item = this[`item${i}`] as GDZWScrollerItem;
				item.startRun();
			}
		}
		public freeRun() {
			//还原
			this.isRun = true;
			this.overIndex = 1;
			for (let i = 6; i <= 10; i++) {
				let item = this[`item${i}`] as GDZWScrollerItem;
				item.startRun();
			}
		}

		public overIndexes: string[] = [];
		public resultArrList: any;
		public runResultFast() {
			if (this.resultArrList) {
				let resultArr = this.resultArrList;
				this.lastClick = true;
				for (let i = 0; i < resultArr.length; i++) {
					let result = resultArr[i];
					let item = this[`item${i + 1}`] as GDZWScrollerItem;
					item.clearDownTimeOut();
					if (this.overIndexes.indexOf(i + "") < 0) {
						item.startDownTimeOut(20 * (1 + i), result);
					}
				}
				return true;
			}
			return false;
		}

		public runResult(resultArr) {
			this.resultArrList = resultArr;
			for (let i = 0; i < resultArr.length; i++) {
				let result = resultArr[i];
				this.lastClick = false;
				let item = this[`item${i + 1}`] as GDZWScrollerItem;
				item.startDownTimeOut(this.changeResultByIndex(i + 1), result)
			}
		}
		public createChildren() {
			super.createChildren();
		}
		/**
		 * @param  {} sceneIndex
		 */
		public initItemCounts(sceneIndex) {
			for (let i = 1; i <= 5; i++) {
				let item = this[`item${i}`] as GDZWScrollerItem;
				item.initSize(this[`itemSize${i}`], i, sceneIndex);
			}
		}
		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
		public initItemByFirst(index, firstArr) {
			let item = this[`item${index}`] as GDZWScrollerItem;
			item.name = "item" + index;
			item.createIcons(firstArr);
		}
		public showScatterHideIcon() {
			for (let i = 1; i <= 5; i++) {
				this[`item${i}`].showScatterIcon();
			}
		}

	}
}