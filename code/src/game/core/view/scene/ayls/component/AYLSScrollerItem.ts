// TypeScript file
module ayls {
    export class AYLSScrollerItem extends eui.Component {
        private maxSize: number;
        private icons: AYLSIcon[] = [];
        // -1 停止 1 无限循环 0停止
        public runModel: number = 0;
        public stopIcon: AYLSIcon;
        public iconList: AYLSIcon[] = [];
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
		 * 转动结束替换图标
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
		/**
		 * downTimeout移除
		 */
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
                this.icons[i].hideDbComponent();
            }
        }

        private stopY: number;
        public changeResult(result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let icons = _.sortBy(this.icons, "y");
            icons[1].changeSourceByNameValue("ayls", result[0]);
            icons[2].changeSourceByNameValue("ayls", result[1]);
            icons[3].changeSourceByNameValue("ayls", result[2]);
            this.iconList[0] = icons[1];
            this.iconList[1] = icons[2];
            this.iconList[2] = icons[3];
            this.stopIcon = icons[4];
            this.stopY = (this.rollCount + 1) * 866 //- Number(this.stopIcon.name) * 172
            this.runModel = RUN_MODEL.RESULT;
        }
		/**
		 * @param  {} index
		 * @param  {string} str
		 */
        public changeFoguang(index, str: string) {
            let icons = _.sortBy(this.icons, "y");
            icons[index + 1].addScatter(str);
        }
        public changeFoguang1(index, str: string) {
            let icons = _.sortBy(this.icons, "y");
            icons[index + 1].addScatter1(str);
        }

        public resetPosition() {
            let y = this.y;
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].y += y;
            }
            this.y = 0;
        }

        public itemDown() {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let arr = this.icons;
            if (this.runModel == RUN_MODEL.RESULT) {
                let y = this.y;
                let point = this.stopIcon.y - 143;
                if (y + point >= 292) {
                    let cha = y + point - 292;
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
                    let last = this.findLast() as AYLSIcon;
                    // last.changeRamdom();
                    icon.y = last.y - 143;
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

        public showAni(index, dir1?: number, dir2?: number, dir3?: number, dir4?: number) {
            let data = this.iconList[index];
            data.showSdDbComponet();
            // this.aniItem.showIconAni(index);
            // if (!this.aniItem) {
            // 	this.addChild(this.aniItem);
            // }
            this.addChild(data);
        }

        public stopAni() {
            for (let i = 0; i < this.iconList.length; i++) {
                let icon = this.iconList[i].stopDbComponet();
            }
            // let data = 
        }

		/**
		 * 初始化
		 */
        public getLineArr() {
            let countArr = [];
            for (let i = 1; i <= 12; i++) {
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
            // if (!this.aniItem) {
            // 	this.aniItem = new SDMNAniItem();
            // 	this.aniItem.x = this.aniItem.y = 0;
            // 	this.aniItem.width = 202;
            // 	this.aniItem.height = 540;
            // 	this.addChild(this.aniItem);
            // }
            for (let i = 0; i < lineArr.length; i++) {
                let iconData = lineArr[i];
                let arr = new AYLSIcon();
                arr.changeSourceByNameValue("ayls", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (143 * (i + 1));
                if (i == 0) {
                    this.minYIndex = arr.y + 143 + 97;
                }
                this.icons.push(arr);
            }
        }

        public setIconHui() {
            for (let i = 0; i < this.iconList.length; i++) {
                let icon = this.iconList[i].showRect();
            }
        }
        public resetSpecilHui() {
            for (let i = 0; i < this.iconList.length; i++) {
                if (this.iconList[i].rect.visible) {
                    let icon = this.iconList[i].hideRect();
                }
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
    }
}