
// TypeScript file
module game {
    export abstract class BaseSlotScene3 extends game.BaseScene {
        abstract lineSmall: string;
        abstract lineMid: string;
        abstract lineBig: string;
        abstract lineHuge: string;
        abstract scroller;
        protected winLineGroup: eui.Group;
        abstract scrollerFastEffect: string;
        abstract lineAniXArray: Array<number>;
        abstract lineAniYArray: Array<number>;
        abstract lineAniRotation: Array<number>;
        abstract firstLineX: number;
        abstract lastLineX: number;
        abstract utilsTotalMoney;
        abstract utilsBet;
        abstract fixpositionY: Array<number>;
        public HuiAtr: Array<Array<number>> = [[0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2], [0, 1, 2]];
        abstract gameId: string;
        public constructor() {
            super();
        }

        public createChildren() {
            super.createChildren();
        }

        public rdsgLineBig: DBComponent;
        public rdsgLineHuge: DBComponent;
        public rdsgLineMid: DBComponent;
        public rdsgLineSmall: DBComponent;
        public i: number = 0;
        public j: number = 0;
        public atr1: Array<any> = [];
        public atr2: Array<any> = [];
        public aniPool: Array<any> = [];
        public array1: Array<any>;
        public array2: Array<any>;
        public isStopLine: boolean = false;
        /**
         * 中奖连线
         * @param  {Array<Array<number>>} str
         * @param  {egret.DisplayObject} object
         */
        public winLine(object?: any, str?: Array<Array<number>>) {
            this.array1 = [];
            this.array2 = [];
            this.aniPool = [];
            for (let i = 0; i < str.length; i++) {
                this.array1.push(str[i][0]);
                this.array2.push(str[i][4]);
            }

            this.j = 0;
            this.atr1 = [];
            this.atr2 = [];
            this.allLineHanlde(object, str);
        }


        /**
         * 总连线
         * @param  {any} object?
         * @param  {Array<Array<number>>} atr?
         */
        public allLineHanlde(object?: any, atr?: Array<Array<number>>) {
            if (atr) this.atr1 = atr;
            if (this.j < this.atr1.length) {
                this.addFirstAni(this.array1[this.j]);
                this.i = 0;
                this.eachLineHandle(object, this.atr1[this.j]);
                this.j++;
            }
        }


        /**
         * 每条连线
         * @param  {any} object?
         * @param  {Array<number>} atr?
         */
        public eachLineHandle(object?: any, atr?: Array<number>) {
            if (atr) this.atr2 = atr;
            if (!this.isStopLine) {
                if (this.i < this.atr2.length - 1) {
                    /**
                     * 前一列减后一列取绝对值决定使用哪种线
                     */
                    switch (Math.abs(this.atr2[this.i] - this.atr2[this.i + 1])) {
                        case 2:
                            this.hugeLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 1:
                            this.bigLineHandle(object, this.atr2[this.i], this.atr2[this.i + 1]);
                            break;
                        case 0:
                            this.midLineHandle(object, this.atr2[this.i]);
                            break;
                    }
                    this.i++;
                } else {
                    if (this.array2[this.j - 1] != null) {
                        this.addLastAni(this.array2[this.j - 1]);
                    }
                    this.allLineHanlde();
                }
            }

        }


        /**
         * 连线旋转角度处理
         * @param  {number} num
         */
        public routationHandle(num: number) {
            /**
             * icon的宽/高取arctan值得到线动画rotation属性
             */
            if (num == 2) {
                return this.lineAniRotation[0];
            } else if (num == -2) {
                return this.lineAniRotation[1];
            } else if (num == 1) {
                return this.lineAniRotation[2];
            } else if (num == -1) {
                return this.lineAniRotation[3];
            } else if (num == 0) {
                return 0;
            }
        }


        /**
         * 长连线播放
         */
        public hugeLineHandle(object: any, position: number, postion2: number) {
            let rdsgLineHuge = new DBComponent(this.lineHuge);
            rdsgLineHuge.play(this.lineHuge + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineHuge.rotation = this.routationHandle(2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[0]);
            } else {
                rdsgLineHuge.rotation = this.routationHandle(-2);
                rdsgLineHuge.bottom = this.aniPositionYHandle(position, this.fixpositionY[1]);
            }
            rdsgLineHuge.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineHuge.callback = () => {
                rdsgLineHuge.play(this.lineHuge + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineHuge);
            rdsgLineHuge.anchorOffsetY = rdsgLineHuge.height / 2;
            rdsgLineHuge.resetPosition();
            this.aniPool.push(rdsgLineHuge);
        }


        /**
         * 中连线播放
         */
        public bigLineHandle(object: any, position: number, position2: number) {
            let rdsgLineBig = new DBComponent(this.lineBig);
            rdsgLineBig.play(this.lineBig + "_begin", 1);
            if (this.atr2[this.i] - this.atr2[this.i + 1] > 0) {
                rdsgLineBig.rotation = this.routationHandle(1);
                if (this.fixpositionY[3]) {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[3]);
                } else {
                    rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
                }
            } else {
                rdsgLineBig.rotation = this.routationHandle(-1);
                rdsgLineBig.bottom = this.aniPositionYHandle(position, this.fixpositionY[2]);
            }
            rdsgLineBig.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineBig.callback = () => {
                rdsgLineBig.play(this.lineBig + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineBig);
            rdsgLineBig.anchorOffsetY = rdsgLineBig.height / 2;
            rdsgLineBig.resetPosition();
            this.aniPool.push(rdsgLineBig);
        }


        /**
         * 短连线播放
         */
        public midLineHandle(object: any, position: number) {
            let rdsgLineMid = new DBComponent(this.lineMid);
            rdsgLineMid.play(this.lineMid + "_begin", 1);
            rdsgLineMid.bottom = this.aniPositionYHandle(position);
            rdsgLineMid.horizontalCenter = this.aniPositionXHandle(this.i);
            rdsgLineMid.callback = () => {
                rdsgLineMid.play(this.lineMid + "_common", 0);
                this.eachLineHandle();
            }
            this.winLineGroup.addChild(rdsgLineMid);
            rdsgLineMid.anchorOffsetY = rdsgLineMid.height / 2;
            rdsgLineMid.resetPosition();
            this.aniPool.push(rdsgLineMid);
        }


        /**
         * 开头连线链接
         * @param  {Array<any>} str
         */
        public addFirstAni(str: any) {
            let rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.firstLineX;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play(this.lineSmall + "_common", 0);
            }
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        }


        /**
         * 末端连线连接
         * @param  {Array<any>} str
         */
        public addLastAni(str: any) {
            let rdsgLineSmall = new DBComponent(this.lineSmall);
            rdsgLineSmall.play(this.lineSmall + "_begin", 1);
            rdsgLineSmall.bottom = this.aniPositionYHandle(str);
            rdsgLineSmall.horizontalCenter = this.lastLineX;
            rdsgLineSmall.callback = () => {
                rdsgLineSmall.play(this.lineSmall + "_common", 0);
            }
            this.winLineGroup.addChild(rdsgLineSmall);
            rdsgLineSmall.resetPosition();
            this.aniPool.push(rdsgLineSmall);
        }


        /**
         * 设置连线bottom属性
         * @param  {any} postion
         */
        public aniPositionYHandle(postion: any, fixposition?: any) {
            if (postion == 0) {
                if (fixposition) {
                    return this.lineAniYArray[0] - fixposition;
                }
                return this.lineAniYArray[0];
            } else if (postion == 1) {
                if (fixposition) {
                    return this.lineAniYArray[1] - fixposition;
                }
                return this.lineAniYArray[1];
            } else if (postion == 2) {
                if (fixposition) {
                    return this.lineAniYArray[2] - fixposition;
                }
                return this.lineAniYArray[2];
            }
        }


        /**
         * 动画horizonCenter设置
         * @param  {any} x
         */
        public aniPositionXHandle(x: any) {
            if (x == 0) {
                return this.lineAniXArray[0];
            } else if (x == 1) {
                return this.lineAniXArray[1];
            } else if (x == 2) {
                return this.lineAniXArray[2];
            } else if (x == 3) {
                return this.lineAniXArray[3];
            } else if (x == 4) {
                return this.lineAniXArray[4];
            }
        }


        /**
         * 连线动画对象池清空
         */
        public clearAniPool() {
            if (this.aniPool) {
                for (let i = 0; i < this.aniPool.length; i++) {
                    game.UIUtils.removeSelf(this.aniPool[i]);
                    this.aniPool[i] = null;
                }
            }
        }

        protected scatter3timeout: any;
        protected scatter4timeout: any;
        protected scatter5timeout: any;
        /**
         * 部分转轴加速
         * @param  {number} index
         */
        public scrollerItemFast(index: number, atr: Array<Array<number>>) {
            switch (index) {
                case 3:
                    this.scroller.item3.clearDownTimeOut();
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.addScatterAni(3, 0);
                    this.scroller.item3.startDownTimeOut(2400, atr[2]);
                    this.scroller.item4.startDownTimeOut(4800, atr[3]);
                    this.scroller.item5.startDownTimeOut(7200, atr[4]);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true);
                    this.scatter3timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(3);
                        this.scroller.addScatterAni(4, 0);
                    }, this, 2400);
                    this.scatter4timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(4);
                        this.scroller.addScatterAni(5, 0);
                    }, this, 4800);
                    this.scatter5timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect);
                    }, this, 7200);
                    break;
                case 4:
                    this.scroller.item4.clearDownTimeOut();
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item4.startDownTimeOut(2400, atr[3]);
                    this.scroller.item5.startDownTimeOut(4800, atr[4]);
                    this.scroller.addScatterAni(4, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true)
                    this.scatter4timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(4);
                        this.scroller.addScatterAni(5, 0);
                    }, this, 2400);
                    this.scatter5timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, 4800);
                    break;
                case 5:
                    this.scroller.item5.clearDownTimeOut();
                    this.scroller.item5.startDownTimeOut(2400, atr[4]);
                    this.scroller.addScatterAni(5, 0);
                    SoundManager.getInstance().playEffect(this.scrollerFastEffect, true)
                    this.scatter5timeout = egret.setTimeout(() => {
                        this.scroller.removeScatterAni(5);
                        SoundManager.getInstance().stopEffectByName(this.scrollerFastEffect)
                    }, this, 2400);
                    break;
            }
        }
        public lineImaPool: Array<any> = [];
        /**
         * 连线为图片时
         */
        public lineUseImag(lineIndex: number) {
            let Line: eui.Image = new eui.Image(this.gameId + "_line_" + lineIndex + "_png");
            Line.alpha = 0;
            Line.horizontalCenter = Line.verticalCenter = 0;
            this.winLineGroup.addChild(Line);
            this.lineImaPool.push(Line);
            egret.Tween.get(Line).to({ alpha: 1 }, 1000, egret.Ease.circOut).to({ alpha: 0 }, 1000, egret.Ease.circIn).call(() => {
                game.UIUtils.removeSelf(Line);
                Line = null;
            })
        }
        /**
         * 图片连线的移除，释放内存
         */
        public clearLineImaPool() {
            if (this.lineImaPool) {
                for (let i = 0; i < this.lineImaPool.length; i++) {
                    game.UIUtils.removeSelf(this.lineImaPool[i]);
                    this.lineImaPool[i] = null;
                }
            }
        }
        public isFastGame = false;
        public freeGameTimeOut: any;

        public messageSend() { };
        public isMessaged: boolean = false; //防止重复发送免费旋转消息


        public askAutoGame() {
            let slotTips = slot.SlotAutoTips.instance;
            slotTips.horizontalCenter = slotTips.verticalCenter = 0;
            this.resizeGroup.addChild(slotTips);
            if (this.isFastGame) {
                egret.clearTimeout(this.freeGameTimeOut);
            }
            let func = () => {
                // CF.sN(this.AUTOGAME_NOTIFY);
                this.isFastGame = true;
                game.UIUtils.removeSelf(slotTips);
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("ayls_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
            }
            let func2 = () => {
                this.freeGameTimeOut = egret.setTimeout(() => {
                    SoundManager.getInstance().playEffect("ayls_reel_mp3", true);
                    this.scroller.run();
                    this.messageSend();
                    egret.setTimeout(() => { this.isMessaged = false }, this, 600);
                }, this, 500);
                game.UIUtils.removeSelf(slotTips);
                slot.SlotAutoTips._instance = null;
            }
            slotTips.quedingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
            slotTips.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
            slotTips.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, func2, this);
        }

    }
}