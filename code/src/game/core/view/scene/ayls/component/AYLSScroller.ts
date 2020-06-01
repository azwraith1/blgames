/*
 * @Author: real MC Lee 
 * @Date: 2019-07-17 15:26:34 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-07-17 15:27:41
 * @Description: 
 */
module ayls {
	export class AYLSScroller extends game.BaseScroller {
		public scroller: eui.Scroller;
		public itemGroup: eui.Group;
		public item1: AYLSScrollerItem;
		public item2: AYLSScrollerItem;
		public item3: AYLSScrollerItem;
		public item4: AYLSScrollerItem;
		public item5: AYLSScrollerItem;
		public aniName = "ayls_reelfast";
		public strName = game.AYLSUtils.comm2FreeModel;
		public itemSize1: number = 8
		public itemSize2: number = 8
		public itemSize3: number = 8
		public itemSize4: number = 8
		public itemSize5: number = 8
		public overIndex: number = 0;
		public speed: number = 48;
		public aniX = [428, 595, 768];
		public aniY = [200, 200, 200];

		public constructor() {
			super();
			this.skinName = "AYLSScrollerSkin";
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
				let item = this[`item${i}`] as AYLSScrollerItem //.itemDown(this.speed);
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
				let item = this[`item${i}`] as AYLSScrollerItem;
				item.startRun();
			}
		}
		public freeRun() {
			//还原
			this.isRun = true;
			this.overIndex = 1;
			for (let i = 6; i <= 10; i++) {
				let item = this[`item${i}`] as AYLSScrollerItem;
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
					let item = this[`item${i + 1}`] as AYLSScrollerItem;
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
			this.lastClick = false;
			for (let i = 0; i < resultArr.length; i++) {
				let result = resultArr[i];
				let item = this[`item${i + 1}`] as AYLSScrollerItem;
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
				let item = this[`item${i}`] as AYLSScrollerItem;
				item.initSize(this[`itemSize${i}`], i, sceneIndex);
			}
		}
		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
		public initItemByFirst(index, firstArr) {
			let item = this[`item${index}`] as AYLSScrollerItem;
			item.name = "item" + index;
			item.createIcons(firstArr);
		}

	}
}