module xcbs {
    export class XCBSScroller extends game.BaseScroller {
        public scroller: eui.Scroller;
        public itemGroup: eui.Group;
        public item1: XCBSScrollerItem;
        public item2: XCBSScrollerItem;
        public item3: XCBSScrollerItem;
        public item4: XCBSScrollerItem;
        public item5: XCBSScrollerItem;
        public aniName = "xcbs_reel_fast";
        public strName = game.GDZWUtils.comm2FreeModel;
        public itemSize1: number = 8
        public itemSize2: number = 8
        public itemSize3: number = 8
        public itemSize4: number = 8
        public itemSize5: number = 8
        public overIndex: number = 0;
        public speed: number = 48;
        public aniX = [480, 670, 870];
        public aniY = [295, 295, 295];


        public constructor() {
            super();
            this.skinName = "XCBSScrollerSkin";
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
                let item = this[`item${i}`] as XCBSScrollerItem //.itemDown(this.speed);
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
                let item = this[`item${i}`] as XCBSScrollerItem;
                item.startRun();
            }
        }

        /**
		 * @param  {} excludeValue
		 */
        protected getLine3Icon(excludeValue) {
            var arrWating = [];
            for (let i = 3; i <= 11; i++) {
                if (i != excludeValue) {
                    let count = Math.floor(_.random(1, 2));
                    if (i == 2) {
                        count = 1;
                    }
                    for (let j = 0; j < count; j++) {
                        arrWating.push(i);
                    }
                }
            }
            arrWating = _.shuffle(arrWating);
            let sure1 = [arrWating[0], arrWating[1], arrWating[2]];
            return sure1;

        }
        public freeRun() {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (let i = 6; i <= 10; i++) {
                let item = this[`item${i}`] as XCBSScrollerItem;
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
                    let item = this[`item${i + 1}`] as XCBSScrollerItem;
                    item.clearDownTimeOut();
                    if (this.overIndexes.indexOf(i + "") < 0) {
                        item.startDownTimeOut(20 * (1 + i), result);
                    }
                }
                return true;
            }
            return false;
        }

		/**
		 * 传入服务器给的结果数组
		 * @param  {} resultArr
		 */
        public runResult(resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (let i = 0; i < resultArr.length; i++) {
                let result = resultArr[i];
                let item = this[`item${i + 1}`] as XCBSScrollerItem;
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
                let item = this[`item${i}`] as XCBSScrollerItem;
                item.initSize(this[`itemSize${i}`], i, sceneIndex);
            }
        }
		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
        public initItemByFirst(index, firstArr) {
            let item = this[`item${index}`] as XCBSScrollerItem;
            item.name = "item" + index;
            item.createIcons(firstArr);
        }
        public showScatterHideIcon() {
            for (let i = 1; i <= 5; i++) {
                this[`item${i}`].showScatterIcon();
            }
        }

        public sort1() {
            for (let i = 1; i <= 5; i++) {
                this[`item${i}`].sotr1();
            }
        }

        public showFirst(sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(12));
            this.initItemByFirst(2, this.getLine3Icon(12));
            this.initItemByFirst(3, this.getLine3Icon(12));
            this.initItemByFirst(4, this.getLine3Icon(12));
            this.initItemByFirst(5, this.getLine3Icon(12));
        }
        /**
         * 初始化免费游戏场景，图标
         * @param  {} sceneIndex
         */
        public showFreeFirst(sceneIndex) {
            this.initItemCounts(sceneIndex);
            if (game.RDSGUtils.comm2FreeModel) {
                this.initItemByFirst(1, this.strName[0].reverse());
                this.initItemByFirst(2, this.strName[1].reverse());
                this.initItemByFirst(3, this.strName[2].reverse());
                this.initItemByFirst(4, this.strName[3].reverse());
                this.initItemByFirst(5, this.strName[4].reverse());
            } else {
                this.initItemByFirst(1, this.getLine3Icon(12));
                this.initItemByFirst(2, this.getLine3Icon(12));
                this.initItemByFirst(3, this.getLine3Icon(12));
                this.initItemByFirst(4, this.getLine3Icon(12));
                this.initItemByFirst(5, this.getLine3Icon(12));
            }
        }


        /**
         * @param  {Array<Array<number>>} allAtr 需要消除的所有icon
         * @param  {Array<Array<number>>} nextIcons 消除完成后展示的图标
         */
        public eliminateIcons(allAtr: Array<Array<number>>, nextIcons: Array<Array<number>>) {
            for (let i = 0; i < allAtr.length; i++) {
                let item = this[`item${i + 1}`].setIconHui();
                this[`item${i + 1}`].updateScrollerItem(allAtr[i], allAtr[i].length, nextIcons[i]);
            }
        }

    }
}