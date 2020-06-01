// TypeScript file
module lucky7 {
    export class LUCKY7ScrollerItem extends eui.Component {
        private maxSize: number;
        private icons: LUCKY7Icon[] = [];
        // -1 停止 1 无限循环 0停止
        public runModel: number = 0;
        public stopIcon: LUCKY7Icon;
        public iconList: LUCKY7Icon[] = [];
        public index: number;
        public result: Array<number> = [];
        public scatterAni: DBComponent;
        private downTimeout: egret.Timer;
        private sceneIndex: number;
        private minYIndex: number = 0;
        private moveX: number = 0;
        private rollCount: number = 0;
        public speed: number = 50;
        public constructor() {
            super();
        }
		/**
		 * 快速旋转停止
		 * @param  {} time
		 * @param  {} result
		 */
        public startDownTimeOut(time, result) {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
            this.downTimeout = new egret.Timer(time, 1);
            this.downTimeout.addEventListener(egret.TimerEvent.TIMER_COMPLETE, () => {
                this.changeResult(result);
            }, this);
            this.downTimeout.start();
        }

        public clearDownTimeOut() {
            if (this.downTimeout) {
                this.downTimeout.stop();
            }
        }

        public createChildren() {
            super.createChildren();
        }

        public initSize(size, index, sceneIndex) {
            this.maxSize = size;
            this.index = index;
            this.sceneIndex = sceneIndex
        }

        public startRun() {
            this.resetPosition();
            this.rollCount = 0;
            this.speed = game.LaohuUtils.speed;
            this.runModel = RUN_MODEL.LOOP;
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].hideDbComponent();
            }
        }

        private stopY: number;
        private flag: boolean = false //是否中了鲤鱼
        /**
         * 根据服务器传来解析的转轴结果赋值
         * @param  {} result
         */
        public changeResult(result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let icons = _.sortBy(this.icons, "y");
            let trueResult: Array<number> = [];
            for (let i = 0; i < result.length; i++) {
                if (result[i] != 0) {
                    trueResult.push(result[i]);
                }
            }
            if (result[0] == 0) {
                this.flag = true;
                icons[1].changeSourceByNameValue("lucky7", trueResult[0]);
                icons[2].changeSourceByNameValue("lucky7", trueResult[1]);
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.stopIcon = icons[3];
                this.stopY = (this.rollCount + 1) * 866 //- Number(this.stopIcon.name) * 172 
            } else {
                this.flag = false;
                icons[1].changeSourceByNameValue("lucky7", trueResult[0]);
                icons[2].changeSourceByNameValue("lucky7", trueResult[1]);
                icons[3].changeSourceByNameValue("lucky7", trueResult[2]);
                this.iconList[0] = icons[1];
                this.iconList[1] = icons[2];
                this.iconList[2] = icons[3];
                this.stopIcon = icons[4];
                this.stopY = (this.rollCount + 1) * 866 //- Number(this.stopIcon.name) * 172                
            }
            this.runModel = RUN_MODEL.RESULT;
        }


        public resetPosition() {
            let y = this.y;
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        }
        /**
         * 转轴转动
         */
        public itemDown() {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                let y = this.y;
                let point = this.stopIcon.y - 247;
                //没中
                if (this.flag) {
                    if (y + point >= 298) {
                        let cha = y + point - 298;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                } else {
                    if (y + point >= 435) {
                        let cha = y + point - 435;
                        this.runModel = RUN_MODEL.STOP;
                        this.y -= cha;
                        this.fixPos();
                        CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                        //修正坐标
                        return;
                    }
                }

            }
            this.y += this.speed;
            for (let i = 0; i < arr.length; i++) {
                let icon = arr[i];
                let point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    let last = this.findLast() as LUCKY7Icon;
                    icon.y = last.y - 247;
                    if (icon.name == "7") {
                        this.rollCount += 1;
                    }
                }
            }
        }

        private findLast() {
            let returnIcon = this.icons[0];
            for (let i = 0; i < this.icons.length; i++) {
                let icon = this.icons[i];
                if (icon.y < returnIcon.y) {
                    returnIcon = icon;
                }
            }
            return returnIcon;
        }

        private fixPos() {
            //icons 可以做特效
            let y = this.y;
            this.y += 30;
            egret.Tween.get(this).to({
                y: y
            }, 330)
        }
        /**
         * 根据中奖数组播放icon的特效
         * @param  {} index
         * @param  {number} dir1?
         * @param  {number} dir2?
         * @param  {number} dir3?
         * @param  {number} dir4?
         */
        public showAni(index, dir1?: number, dir2?: number, dir3?: number, dir4?: number) {
            let data = this.iconList[index];
            data.showSdDbComponet();

            this.addChild(data);
        }

        public stopAni() {
            for (let i = 0; i < this.iconList.length; i++) {
                let icon = this.iconList[i].stopDbComponet();
            }
        }

		/**
		 * 初始化
		 */
        public getLineArr() {
            let countArr = [];
            for (let i = 1; i <= 3; i++) {
                let count = Math.floor(_.random(4, 6));
                for (let j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        }

        public createIcons(firstArr) {
            // let lineArr = this.getLineArr();
            // if (firstArr.length > 0) {
            //     lineArr = lineArr.slice(firstArr.length, lineArr.length);
            //     lineArr = firstArr.concat(lineArr);
            // }
            let lineArr: Array<any> = [];
            for (let i = 0; i < 8; i++) {
                lineArr.push(Math.ceil(Math.random() * 3));
            }
            for (let i = 0; i < lineArr.length; i++) {
                let iconData = lineArr[i];
                let arr = new LUCKY7Icon();
                arr.changeSourceByNameValue("lucky7", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (247 * i) - 100;
                if (i == 0) {
                    this.minYIndex = arr.y + 247 + 97;
                }
                this.icons.push(arr);
            }
        }

    }
}