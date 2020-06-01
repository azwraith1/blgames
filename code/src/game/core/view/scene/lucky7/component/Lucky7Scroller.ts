// TypeScript file
module lucky7 {
    export class LUCKY7Scroller extends game.BaseUI {
        public scroller: eui.Scroller;
        public itemGroup: eui.Group;
        public item1: LUCKY7ScrollerItem;
        public item2: LUCKY7ScrollerItem;
        public item3: LUCKY7ScrollerItem;
        public itemSize1: number = 8
        public itemSize2: number = 8
        public itemSize3: number = 8
        protected overIndex: number = 0;
        public lastClick = false;

        public constructor() {
            super();
            this.skinName = "Lucky7ScrollerSkin";
        }

        public flashIcon: Array<Array<number>> = [];
        public isRun: boolean = false;
        private overTime: number;

        public onAdded() {
            super.onAdded();
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }

        public onRemoved() {
            super.onRemoved();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
        }
        public update(e: egret.Event) {
            if (!this.isRun) {
                return;
            }
            // this.item5.y += this.speed;
            for (let i = 1; i <= 3; i++) {
                let item = this[`item${i}`] as LUCKY7ScrollerItem //.itemDown(this.speed);
                item.itemDown();
            }
        }
        public stopIconDb() {
            for (let i = 1; i <= 3; i++) {
                let item = this[`item${i}`].stopAni();
            }
        }


        public run() {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            this.overIndexes = [];
            this.resultArrList = null;
            for (let i = 1; i <= 3; i++) {
                let item = this[`item${i}`] as LUCKY7ScrollerItem;
                item.startRun();
            }
        }

        private overIndexes: string[] = [];
        private resultArrList: any;
		/**
		 * 快速旋转结果
		 */
        public runResultFast() {
            if (this.resultArrList) {
                let resultArr = this.resultArrList;
                this.lastClick = true;
                for (let i = 0; i < resultArr.length; i++) {
                    let result = resultArr[i];
                    let item = this[`item${i + 1}`] as LUCKY7ScrollerItem;
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
		 * 替换转轴旋转结果
		 * @param  {} resultArr
		 */
        public runResult(resultArr) {
            this.resultArrList = resultArr;
            this.lastClick = true;
            for (let i = 0; i < resultArr.length; i++) {
                let result = resultArr[i];
                let item = this[`item${i + 1}`] as LUCKY7ScrollerItem;
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result)
            }
        }



        private changeResultByIndex(index) {
            switch (index) {
                case 1:
                    return game.LaohuUtils.downTime1;
                case 2:
                    return game.LaohuUtils.downTime2;
                case 3:
                    return game.LaohuUtils.downTime3;
            }
        }


        private changeSpeedByIndex(index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.01;
                case 3:
                    return 48 * 1.02;
            }
        }

        public scatterAni: DBComponent;
        public createChildren() {
            super.createChildren();
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent("cbzz_fast_ani1");
            // let mask: egret.Shape = new egret.Shape();
            // mask.graphics.drawCircle(249, 270, 249);
            // this.addChild(mask);
            // this.scroller.mask = mask;
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;

            // this.addChild(this.scatterAni);
        }
		/**
		 * @param  {} sceneIndex
		 */
        public initItemCounts(sceneIndex) {
            for (let i = 1; i <= 3; i++) {
                let item = this[`item${i}`] as LUCKY7ScrollerItem;
                item.initSize(this[`itemSize${i}`], i, sceneIndex);
            }
        }
		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
        public initItemByFirst(index, firstArr) {
            let item = this[`item${index}`] as LUCKY7ScrollerItem;
            item.name = "item" + index;
            item.createIcons(firstArr);
        }
		/**
		 * @param  {} excludeValue
		 */
        private getLine3Icon(excludeValue) {
            var arrWating = [];
            for (let i = 1; i <= 3; i++) {
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

        public commomScore: eui.BitmapLabel;
        public scoreTimeOut: any;
		/**
		 * @param  {Array<Array<number>>} allline
		 * @param  {number} allscore
		 */
        public addBonusAni(allline: Array<Array<number>>, allscore?: number) {
            for (let i = 1; i <= allline.length; i++) {
                for (let j = 0; j < allline[i - 1].length; j++) {
                    this[`item${i}`].showAni(allline[i - 1][j]);
                }
            }

        }
		/**
		 * 数是否在数组中
		 * @param  {number} num
		 * @param  {Array<number>} array
		 */
        public checkisInArray(num: number, array: Array<number>) {
            array.forEach(v => {
                if (v == num) {
                    return true;
                }
                else {
                    return false;
                }
            })
        }
        public removeScroller() {
            for (let i = 1; i <= 3; i++) {
                let item = this[`item${i}`].removeitem();
            }
            this.scroller.removeChildren();
        }
		/**
		 * @param  {} index?
		 */
        public removeScatterAni(index?) {
            game.UIUtils.removeSelf(this.scatterAni);
        }

        public showFirst(sceneIndex) {
            this.initItemCounts(sceneIndex);
            this.initItemByFirst(1, this.getLine3Icon(1));
            this.initItemByFirst(2, this.getLine3Icon(2));
            this.initItemByFirst(3, this.getLine3Icon(3));
        }
    }
}