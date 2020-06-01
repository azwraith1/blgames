/*
 * @Author: real MC Lee 
 * @Date: 2019-06-04 16:24:05 
 * @Last Modified by: real MC Lee
 * @Last Modified time: 2019-06-12 17:30:20
 * @Description: 
 */
module bskg {
    export class BSKGScrollerItem extends eui.Component {

        private maxSize: number;
        private icons: BSKGIcon[] = [];
        // -1 停止 1 无限循环 0停止
        public runModel: number = 0;
        public stopIcon: BSKGIcon;
        public iconList: BSKGIcon[] = [];
        public index: number;
        public result: Array<number> = [];
        public scatterAni: DBComponent;
        private downTimeout: egret.Timer;
        private sceneIndex: number;
        private minYIndex: number = 0;
        private moveX: number = 0;
        private rollCount: number = 0;
        public speed: number = 48;
        // public aniItem: bskgAniItem;
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
                this.icons[i].hideDbComponent();
            }
        }

        private stopY: number;
        public changeResult(result) {
            if (this.runModel == RUN_MODEL.STOP) {
                return;
            }
            let icons = _.sortBy(this.icons, "y");
            icons[1].changeSourceByNameValue("bskg", result[0]);
            icons[2].changeSourceByNameValue("bskg", result[1]);
            icons[3].changeSourceByNameValue("bskg", result[2]);
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
            this.addChild(icons[index + 1]);
        }
        public changeFoguang1(index, str: string) {
            let icons = _.sortBy(this.icons, "y");
            icons[index + 1].addScatter1(str);
        }
        /**
         * 所有图标显示出来（仅限宝石矿工）
         */
        public showAllIcon() {
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].visible = true;
            }
        }

        public showScatterIcon() {
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].showScatterIcon();
            }

        }
        public showIconBg() {
            for (let i = 0; i < this.icons.length; i++) {
                this.icons[i].resetIconBg();
                this.icons[i].isShowed1 = this.icons[i].isShowed2 =this.icons[i].isShowed3 = false;
            }
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
                let point = this.stopIcon.y - 151;
                if (y + point >= 303) {
                    let cha = y + point - 303;
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
                    let last = this.findLast() as BSKGIcon;
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
            data.showSdDbComponet(dir1, dir2, dir3, dir4);
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
            // 	this.aniItem = new bskgAniItem();
            // 	this.aniItem.x = this.aniItem.y = 0;
            // 	this.aniItem.width = 202;
            // 	this.aniItem.height = 540;
            // 	this.addChild(this.aniItem);
            // }
            for (let i = 0; i < lineArr.length; i++) {
                let iconData = lineArr[i];
                let arr = new BSKGIcon();
                arr.changeSourceByNameValue("bskg", iconData);
                arr.name = i + "";
                this.addChild(arr);
                arr.y = this.height - (151 * (i + 1));
                if (i == 0) {
                    this.minYIndex = arr.y + 151 + 97;
                }
                this.icons.push(arr);
            }
        }


    }
}