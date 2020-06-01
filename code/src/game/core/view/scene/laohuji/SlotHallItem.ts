// TypeScript file
module slot {
    export class SlotHallItem extends eui.Component {
        public itemGroup: eui.Group;
        public icon: eui.Image;
        public continiu: eui.Image;
        public hot: eui.Image;
        public grade: any;
        public index: any;

        public constructor(index, grade) {
            super();
            this.grade = grade;
            this.index = index;
            this.skinName = new SlotHallItemSkin();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }

        public createChildren() {
            super.createChildren();
            this.icon.source = "slot_hall_new_" + game.LaohuUtils.gamename(this.index) + "_png";
            switch (this.grade) {
                case 2:
                    this.currentState = "hot";
                    this.iconAni();
                    return;
                case 3:
                    this.currentState = "new";
                    break;
                case 4:
                    this.currentState = "common";
                    break;
                case 5:
                    this.currentState = "continiu";
                    break;
                case 6:
                    this.currentState = "hide";
                    break;
            }
            this.addKuangani();
        }

        public hotAni1: DBComponent;//跑马灯提示游戏中奖后该游戏icon特效
        public hotAni2: DBComponent;//hot游戏金币旋转特效
        public fireAni: DBComponent;//hot游戏冒火特效

        public iconAni() {
            this.fireAni = new DBComponent("slot_hall_fire1");
            this.hotAni2 = new DBComponent("slot_hall_hot2");
            this.fireAni.play("", 0);
            this.hotAni2.play("", 0);
            this.fireAni.scaleY = 1.1;
            this.fireAni.touchEnabled = this.hotAni2.touchEnabled = false;
            this.hotAni2.horizontalCenter = this.fireAni.horizontalCenter = 0; this.fireAni.bottom = 10;
            this.hotAni2.bottom = 200;
            this.itemGroup.addChild(this.fireAni);
            this.itemGroup.addChild(this.hotAni2);
            this.fireAni.resetPosition();
            this.hotAni2.resetPosition();
        }
        private goldAni: DBComponent;
        public iconGoldAni() {
            SoundManager.getInstance().playEffect("slot_hall_coin_mp3");
            this.goldAni = new DBComponent("slot_hall_fire2");
            this.goldAni.play("", 3);
            this.goldAni.horizontalCenter = this.goldAni.bottom = 0;
            this.goldAni.touchEnabled = false;
            this.itemGroup.addChild(this.goldAni);
            this.goldAni.resetPosition();
        }
        //
        public onTouchTap(e: egret.TouchEvent) {
            CF.dP(ENo.SLOT_HALL_CLICK, { gameId: game.LaohuUtils.gamename(this.index) });
        }

        public checkAlapa(offersetX, width) {
            return;
            egret.Tween.removeTweens(this);
            let alpha = -1;
            if (offersetX > 0) {
                let maxX = this.x + this.width - this.anchorOffsetX
                let minX = this.x - this.anchorOffsetX + this.width / 3;
                let nowPoint = offersetX;
                if (nowPoint < minX) {
                    alpha = 1;
                } else {
                    if (nowPoint >= minX && nowPoint < maxX) {
                        let cha = nowPoint - minX;
                        alpha = this.getChaAlphaByRight(cha);
                    }
                }
            } else {
                let maxX = this.x + this.width / 2 - this.width / 4 + this.anchorOffsetX;
                let minX = this.x - this.width / 2 - this.width / 4 + this.anchorOffsetX;
                let nowPoint = width + offersetX;
            }
            if (alpha && alpha > -1) {
                egret.Tween.get(this).to({
                    alpha: alpha
                }, 50)
            }
        }

        public getChaAlphaByRight(cha) {
            if (cha > 0 && cha < this.width / 95) {
                return 1;
            } else
                if (cha >= this.width / 95 && cha < this.width / 80) {
                    return 0.6;
                }
                else if (cha >= this.width / 80 && cha < this.width / 70) {
                    return 0.5;
                } else if (cha >= this.width / 70 && cha < this.width / 50) {
                    return 0.4;
                } else if (cha >= this.width / 50 && cha < this.width / 30) {
                    return 0.3;
                } else if (cha >= this.width / 30 && cha < this.width) {
                    return 0.2;
                }
        }

        private kuangAni: DBComponent;
        public addKuangani() {
            if (this.grade == 2) return;
            this.kuangAni = new DBComponent("slot_hall_new_com");
            this.kuangAni.horizontalCenter = 0; this.kuangAni.bottom = 120;
            this.kuangAni.play("", 1);
            this.kuangAni.touchEnabled = false;
            this.itemGroup.addChild(this.kuangAni);
            this.kuangAni.resetPosition();
            egret.setInterval(this.playkuangani, this, 5000);
        }

        private playkuangani() {
            this.kuangAni.horizontalCenter = 0; this.kuangAni.bottom = 120;
            this.kuangAni.play("", 1);
            this.kuangAni.touchEnabled = false;
            this.itemGroup.addChild(this.kuangAni);
            this.kuangAni.resetPosition();
        }
    }
}