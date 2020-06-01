/*
 * @Author: real MC Lee 
 * @Date: 2019-05-27 18:43:56 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-19 16:07:25
 * @Description: 
 */
module game {
    export abstract class BaseScroller extends game.BaseUI {
        public scroller: eui.Scroller;
        public itemGroup: eui.Group;
        abstract item1; //第一类类名
        abstract item2;//第二类类名
        abstract item3;//第三类类名
        abstract item4;//第四类类名
        abstract item5;//第五类类名
        abstract aniName; //scatter动画名称
        abstract strName; //中免费游戏需要存储正常游戏转动结果的数组
        protected itemSize1: number = 8
        protected itemSize2: number = 8
        protected itemSize3: number = 8
        protected itemSize4: number = 8
        protected itemSize5: number = 8
        protected overIndex: number = 0;
        public speed: number = 48;
        public lastClick = false;

        public constructor() {
            super();
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
        protected overTime: number;

        protected update(e: egret.Event) {
        }
        public stopIconDb() {
            for (let i = 1; i <= 5; i++) {
                let item = this[`item${i}`].stopAni();
            }
        }


        protected run() {
            //还原

        }
        protected freeRun() {

        }

        protected overIndexes: string[] = [];
        protected resultArrList: any;
        protected runResultFast() {

        }

        protected runResult(resultArr) {

        }
		/**
		 * @param  {} item
		 * @param  {} index
		 * @param  {} str
		 */
        public addFoGuang(item, index, str) {
            this[`item${item}`].changeFoguang(index, str);
        }

        public foguang4FreeGame(item, index, str) {
            this[`item${item}`].foGuang4FreeGame(index, str);
        }
		/**
		 * 可能出scatter的动画
		 * @param  {} item
		 * @param  {} index
		 * @param  {} str
		 */
        public addFoGuang1(item, index, str) {
            this[`item${item}`].changeFoguang1(index, str);
        }


        public changeResultByIndex(index) {
            switch (index) {
                case 1:
                    return game.LaohuUtils.downTime1;
                case 2:
                    return game.LaohuUtils.downTime2;
                case 3:
                    return game.LaohuUtils.downTime3;
                case 4:
                    return game.LaohuUtils.downTime4;
                case 5:
                    return game.LaohuUtils.downTime5;
            }
        }


        public changeSpeedByIndex(index) {
            switch (index) {
                case 1:
                    return 48 * 1;
                case 2:
                    return 48 * 1.01;
                case 3:
                    return 48 * 1.02;
                case 4:
                    return 48 * 1.03;
                case 5:
                    return 48 * 1.04;
            }
        }

        public scatterAni: DBComponent;
        public createChildren() {
            super.createChildren();
            this.scroller.bounces = false;
            this.scroller.scrollPolicyH = "off";
            this.scroller.scrollPolicyV = "off";
            this.scatterAni = new DBComponent(this.aniName);
            // this.scatterAni.x = 630;
            // this.scatterAni.y = 255;

            // this.addChild(this.scatterAni);
        }
		/**
		 * @param  {} sceneIndex
		 */
        protected initItemCounts(sceneIndex) {

        }
		/**
		 * @param  {} index
		 * @param  {} firstArr
		 */
        public initItemByFirst(index, firstArr) {

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

        abstract aniX: Array<number>;
        abstract aniY: Array<number>;
		/**
		 * @param  {number} index
		 */
        public addScatterAni(index: number, fixPosition?: number) {
            switch (index) {
                case 3:
                    this.scatterAni.x = this.aniX[0] - fixPosition;
                    this.scatterAni.y = this.aniY[0];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 4:
                    this.scatterAni.x = this.aniX[1] - fixPosition;
                    this.scatterAni.y = this.aniY[1];
                    this.scatterAni.scaleY = 1;
                    this.addChild(this.scatterAni);
                    this.scatterAni.play("", 0);
                    break;
                case 5:
                    this.scatterAni.x = this.aniX[2] - fixPosition;
                    this.scatterAni.y = this.aniY[2];
                    this.addChild(this.scatterAni);
                    this.scatterAni.scaleY = 1;
                    this.scatterAni.play("", 0);
                    break;
            }

        }
        public addScore(index) {
            // this.item3.showScore(index);
        }
        public commomScore: eui.BitmapLabel;
        public scoreTimeOut: any;


		/**
         * 中奖数组展示
		 * @param  {Array<Array<number>>} allline
		 * @param  {number} allscore
		 */
        public addBonusAni(allline: Array<Array<number>>, allscore?: number) {
            for (let i = allline.length; i >= 1; i--) {
                for (let j = 0; j < allline[i - 1].length; j++) {
                    this[`item${i}`].showAni(allline[i - 1][j]);
                }
                this.itemGroup.addChild(this[`item${i}`]);
            }

        }

        public smashingDBani(lineArr: Array<Array<number>>, time) {
            for (let i = lineArr.length; i >= 1; i--) {
                for (let j = 0; j < lineArr[i - 1].length; j++) {
                    this[`item${i}`].smashingDB(lineArr[i - 1][j], time);
                }
                this.itemGroup.addChild(this[`item${i}`]);
            }

        }

        public removeSmashingDb() {
            for (let i = 1; i <= 5; i++) {
                let item = this[`item${i}`].removeSmash();
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
        public setIconHui() {
            for (let i = 1; i <= 5; i++) {
                let item = this[`item${i}`].setIconHui();
            }
        }
		/**
		 * 移除数组图标置灰
		 * @param  {Array<Array<number>>} array
		 */
        public removeIconHui(array: Array<Array<number>>) {
            for (let i = 1; i <= array.length; i++) {
                for (let j = 0; j < array[i - 1].length; j++) {
                    this[`item${i}`].resetIconHui(array[i - 1][j]);
                }
            }
        }
        public setSpecilHui(array: Array<Array<number>>) {
            for (let i = 1; i <= array.length; i++) {
                for (let j = 0; j < array[i - 1].length; j++) {
                    this[`item${i}`].setSpecilHui(array[i - 1][j]);
                }
            }
        }
        public removeScroller() {
            for (let i = 1; i <= 5; i++) {
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
            this.initItemByFirst(2, this.getLine3Icon(1));
            this.initItemByFirst(3, this.getLine3Icon(1));
            this.initItemByFirst(4, this.getLine3Icon(1));
            this.initItemByFirst(5, this.getLine3Icon(1));
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
                this.initItemByFirst(1, this.getLine3Icon(1));
                this.initItemByFirst(2, this.getLine3Icon(1));
                this.initItemByFirst(3, this.getLine3Icon(1));
                this.initItemByFirst(4, this.getLine3Icon(1));
                this.initItemByFirst(5, this.getLine3Icon(1));
            }
        }
    }
}