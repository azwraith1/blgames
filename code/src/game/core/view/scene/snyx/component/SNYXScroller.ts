// TypeScript file
module snyx {
    export class SNYXScroller extends game.BaseScroller {
        public scroller: eui.Scroller;
        public itemGroup: eui.Group;
        public item1: SNYXScrollerItem;
        public item2: SNYXScrollerItem;
        public item3: SNYXScrollerItem;
        public item4: SNYXScrollerItem;
        public item5: SNYXScrollerItem;
        public itemrect1: eui.Rect;
        public itemrect2: eui.Rect;
        public itemrect3: eui.Rect;
        public itemrect4: eui.Rect;
        public itemrect5: eui.Rect;

        public aniName = "snyx_reel_fast";
        public strName = game.GDZWUtils.comm2FreeModel;
        public itemSize1: number = 8
        public itemSize2: number = 8
        public itemSize3: number = 8
        public itemSize4: number = 8
        public itemSize5: number = 8
        public overIndex: number = 0;
        public speed: number = 48;
        public aniX = [386, 544, 700];
        public aniY = [243, 243, 243];

        public constructor() {
            super();
            this.skinName = "SNYXScrollerSkin";
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
                let item = this[`item${i}`] as SNYXScrollerItem //.itemDown(this.speed);
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
                let item = this[`item${i}`] as SNYXScrollerItem;
                item.startRun();
            }
        }
        public freeRun() {
            //还原
            this.isRun = true;
            this.overIndex = 1;
            for (let i = 6; i <= 10; i++) {
                let item = this[`item${i}`] as SNYXScrollerItem;
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
                    let item = this[`item${i + 1}`] as SNYXScrollerItem;
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
                let item = this[`item${i + 1}`] as SNYXScrollerItem;
                item.startDownTimeOut(this.changeResultByIndex(i + 1), result)
            }
        }

        // public wildIcon(arr: Array<number>) {
        //     for (let i = 0; i < arr.length; i++) {
        //         if (arr[i] >= 0) this[`item${i + 1}`].showiconKuang(arr[i]);
        //     }
        // }

        // public hideIcon() {
        //     for (let i = 1; i <= 5; i++) {
        //         let item = this[`item${i}`] as SNYXScrollerItem;
        //         item.hideiconKuang();
        //     }
        // }
        public createChildren() {
            super.createChildren();
        }
		/**
		 * @param  {} sceneIndex
		 */
        public initItemCounts(sceneIndex) {
            for (let i = 1; i <= 5; i++) {
                let item = this[`item${i}`] as SNYXScrollerItem;
                item.initSize(this[`itemSize${i}`], i, sceneIndex);
            }
        }

		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
        public initItemByFirst(index, firstArr) {
            let item = this[`item${index}`] as SNYXScrollerItem;
            item.name = "item" + index;
            item.createIcons(firstArr);
        }
        public showScatterHideIcon() {
            for (let i = 1; i <= 5; i++) {
                this[`item${i}`].showScatterIcon();
            }
        }

        public wildKaungAni: DBComponent;
        public wildMoveAni: DBComponent;


        /**
         * 中了wild游戏
         * @param  {} i
         * @param  {} y
         */
        public wildKuang(i, y) {
            let wildKaungAni = new DBComponent("snyx_icon2_1");
            let wildAni = new DBComponent("snyx_icon_1");
            // let wildImag: eui.Image = new eui.Image("snyx_icon_1_png");
            wildAni.horizontalCenter = wildKaungAni.horizontalCenter = 0;
            wildAni.bottom = 150 * (2 - y) + 30;
            wildKaungAni.bottom = -10 + 150 * (2 - y);
            wildAni.play("", 1);

            wildAni.callback = () => {
                game.UIUtils.removeSelf(wildAni);
                wildKaungAni.play("", 0);
                wildKaungAni.touchEnabled = false;
                // this[`wildGroup${i + 1}`].addChild(wildImag);
                this[`wildGroup${i + 1}`].addChild(wildKaungAni);
                wildKaungAni.resetPosition();
            }
            this[`wildGroup${i + 1}`].addChild(wildAni);
            wildAni.resetPosition();
        }

        /**
         * wild游戏移动
         * @param  {} i
         * @param  {} y
         */
        public wildMove(i, y) {
            egret.Tween.get(this[`wildGroup${i + 1}`]).to({ bottom: this[`wildGroup${i + 1}`].bottom - 150, top: this[`wildGroup${i + 1}`].top + 150 }, 1000, egret.Ease.sineInOut).call(() => {
                // this[`wildGroup${i + 1}`].removeChildAt(this[`wildGroup${i + 1}`].numChildren - 1);
                if (y == -1) { this[`wildGroup${i}`].removeChildren(); this[`wildGroup${i}`].bottom = this[`wildGroup${i}`].top = 0; }
            });
        }

        /**
         * wild游戏框框特效移除
         */
        public removeWild(i?: number) {
            if (i + 1) {
                egret.Tween.get(this[`wildGroup${i + 1}`]).to({ bottom: this[`wildGroup${i + 1}`].bottom - 150, top: this[`wildGroup${i + 1}`].top + 150 }, 1000, egret.Ease.sineInOut).call(() => {
                    this[`wildGroup${i + 1}`].bottom = this[`wildGroup${i + 1}`].top = 0;
                    this[`wildGroup${i + 1}`].removeChildren();
                });
                return;
            }
            for (let i = 1; i <= 4; i++) {
                egret.Tween.get(this[`wildGroup${i + 1}`]).to({ bottom: this[`wildGroup${i + 1}`].bottom - 150, top: this[`wildGroup${i + 1}`].top + 150 }, 1000, egret.Ease.sineInOut).call(() => {
                    this[`wildGroup${i + 1}`].bottom = this[`wildGroup${i + 1}`].top = 0;
                    this[`wildGroup${i + 1}`].removeChildren();
                });
            }
        }
    }
}