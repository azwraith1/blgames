// TypeScript file
module snyx {
    export class SNYXScrollerItem extends eui.Component {
        private maxSize: number;
        private icons: SNYXIcon[] = [];
        // -1 停止 1 无限循环 0停止
        public runModel: number = 0;
        public stopIcon: SNYXIcon;
        public iconList: SNYXIcon[] = [];
        public index: number;
        public result: Array<number> = [];
        public scatterAni: DBComponent;
        private downTimeout: egret.Timer;
        private sceneIndex: number;
        private minYIndex: number = 0;
        private moveX: number = 0;
        private rollCount: number = 0;
        public speed: number = 48;
        // public aniItem: SDMNAniItem;
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
            // this.scatterAni.visible = false;
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
                this.icons[i].alpha = 1;
                this.icons[i].hideDbComponent();
            }
        }

        private stopY: number;
        /**
         * 根据服务器传来解析的转轴结果赋值
         * @param  {} result
         */
        public changeResult(result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let icons = _.sortBy(this.icons, "y");
            icons[0].changeSourceByNameValue("snyx", result[0]);
            icons[1].changeSourceByNameValue("snyx", result[1]);
            icons[2].changeSourceByNameValue("snyx", result[2]);
            this.iconList[0] = icons[0];
            this.iconList[1] = icons[1];
            this.iconList[2] = icons[2];
            this.stopIcon = icons[3];
            this.topIcon = icons[0];
            this.stopY = (this.rollCount + 1) * 866 //- Number(this.stopIcon.name) * 172
            this.runModel = RUN_MODEL.RESULT;
        }
		/**
		 * @param  {} index
		 * @param  {string} str
		 */
        public changeFoguang(index, str: string) {
            // let icons = _.sortBy(this.icons, "y");
            this.iconList[index].addScatter(str);
        }
        public changeFoguang1(index, str: string) {
            this.iconList[index].addScatter1(str);
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
        public topIcon: SNYXIcon;
        public itemDown() {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                let y = this.y;
                let point = this.stopIcon.y - 151;
                if (y + point >= 295) {
                    let cha = y + point - 295;
                    this.runModel = RUN_MODEL.STOP;
                    this.y -= cha;
                    this.fixPos();
                    CF.dP(ENo.LHJ_ITEM_OVER, { index: this.index, sceneIndex: this.sceneIndex });
                    //修正坐标
                    return;
                }
            }
            this.y += this.speed;
            for (let i = 0; i < arr.length; i++) {
                let icon = arr[i];
                let point = icon.localToGlobal();
                if (point.y >= 800 && this.runModel == RUN_MODEL.LOOP) {
                    let last = this.findLast() as SNYXIcon;
                    // last.changeRamdom();
                    icon.y = last.y - 151;
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

        private findMax() {
            let returnIcon = this.icons[0];
            for (let i = 0; i < this.icons.length; i++) {
                let icon = this.icons[i];
                if (icon.y > returnIcon.y) {
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
        // public showiconKuang(index) {
        //     let data = this.iconList[index];
        //     data.showKuang();
        // }

        // public hideiconKuang() {
        //     for (let i = 0; i < this.icons.length; i++) {
        //         if (this.icons[i]) {
        //             let icon = this.icons[i].hideKuang();
        //         }
        //     }
        // }

        public showdiAni(index) {
            let data = this.iconList[index];
            data.showDiComp();
            this.addChild(data);
        }

        public stopdiAni(index) {
            let data = this.iconList[index];
            data.stopDiCom();
        }

        public smashingDB(index, time) {
            let data = this.iconList[index];
            data.showSmashingDB(time);

            this.addChild(data);
        }

        public removeSmash() {
            for (let i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    let icon = this.icons[i].stopDiCom();
                }
            }
        }

        public stopAni() {
            for (let i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i]) {
                    let icon = this.iconList[i].stopDbComponet();
                }
            }
            // let data = 
        }

		/**
		 * 初始化
		 */
        public getLineArr() {
            let countArr = [];
            for (let i = 3; i <= 11; i++) {
                let count = Math.floor(_.random(4, 6));
                for (let j = 0; j < count; j++) {
                    countArr.push(i);
                }
            }
            return _.shuffle(countArr).slice(0, this.maxSize);
        }

        public createIcons(firstArr) {
            let lineArr = this.getLineArr();
            if (firstArr.length > 0) {
                lineArr = lineArr.slice(firstArr.length, lineArr.length);
                lineArr = firstArr.concat(lineArr);
            }
            for (let i = 0; i < lineArr.length; i++) {
                let iconData = lineArr[i];
                let arr = new SNYXIcon();
                arr.changeSourceByNameValue("snyx", iconData);
                // arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (151 * (i + 1)) - 10;
                if (i == 0) {
                    this.minYIndex = arr.y + 151 + 97;
                }
                this.icons.push(arr);
            }
        }

        public setIconHui() {
            for (let i = 0; i < this.icons.length; i++) {
                if (this.icons[i]) {
                    let icon = this.icons[i].showRect();
                }
            }
        }
        public resetSpecilHui() {
            for (let i = 0; i < this.icons.length; i++) {
                let icon = this.icons[i].hideRect();
            }
        }
        public resetIconHui(index) {
            let data = this.iconList[index];
            data.hideRect();
        }
        public setSpecilHui(index) {
            let data = this.iconList[index];
            data.showRect();
        }


        public sotr1() {
            this.sortIcons();
            for (let i = 0; i < this.icons.length; i++) {
                let icon = this.findLast();
                if (this.icons[i].y >= this.stopIcon.y) {
                    this.icons[i].y = icon.y - 151;
                }
                this.addChild(this.icons[i])
            }
            this.sortIcons();
        }
        private sortIcons() {
            this.icons = _.sortBy(this.icons, "y");
            for (let i = 0; i < this.icons.length; i++) {
                this.addChild(this.icons[i]);
            }
        }

        public hideItem() {

        }

    }
}