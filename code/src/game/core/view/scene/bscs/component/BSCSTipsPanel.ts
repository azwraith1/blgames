/*
 * @Author: real MC Lee 
 * @Date: 2019-05-30 15:34:41 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2019-09-20 14:24:11
 * @Description: 
 */
module bscs {
    export class BSCSTips extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public group1: eui.Group;
        public right1: eui.Button;
        public closeBtn1: eui.Image;
        public group2: eui.Group;
        public left1: eui.Button;
        public right2: eui.Button;
        public closeBtn2: eui.Image;
        public group3: eui.Group;
        public payList1: eui.Group;
        public pay3_5: eui.Label;
        public pay3_4: eui.Label;
        public pay3_3: eui.Label;
        public pay4_5: eui.Label;
        public pay4_4: eui.Label;
        public pay4_3: eui.Label;
        public pay5_5: eui.Label;
        public pay5_4: eui.Label;
        public pay5_3: eui.Label;
        public pay6_5: eui.Label;
        public pay6_4: eui.Label;
        public pay6_3: eui.Label;
        public pay7_5: eui.Label;
        public pay7_4: eui.Label;
        public pay7_3: eui.Label;
        public pay8_5: eui.Label;
        public pay8_4: eui.Label;
        public pay8_3: eui.Label;
        public pay9_5: eui.Label;
        public pay9_4: eui.Label;
        public pay9_3: eui.Label;
        public pay10_5: eui.Label;
        public pay10_4: eui.Label;
        public pay10_3: eui.Label;
        public pay11_5: eui.Label;
        public pay11_4: eui.Label;
        public pay11_3: eui.Label;
        public pay12_5: eui.Label;
        public pay12_4: eui.Label;
        public pay12_3: eui.Label;
        public left2: eui.Button;
        public closeBtn3: eui.Image;

        public constructor() {
            super();
            this.skinName = "BSCSTipsSkin";
        }

        public createChildren() {
            super.createChildren();
            this.initData();
        }

        public onAdded() {
            super.onAdded();
        }
        public onRemoved() {
            super.onRemoved();
        }
        protected onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this.right1:
                    this.group1.visible = this.group3.visible = false;
                    this.group2.visible = true;
                    break;
                case this.right2:
                    this.group1.visible = this.group2.visible = false;
                    this.group3.visible = true;
                    break;
                case this.left1:
                    this.group2.visible = this.group3.visible = false;
                    this.group1.visible = true;
                    break;
                case this.left2:
                    this.group3.visible = this.group1.visible = false;
                    this.group2.visible = true;
                    break;
                case this.closeBtn3: case this.closeBtn1: case this.closeBtn2:
                    SoundManager.getInstance().playEffect("rdsg_button_mp3");
                    CF.sN(PanelNotify.CLOSE_BSCS_TIPS_PANEL);
                    break;
            }
        }

        public initData() {
            let data
            data = Number(new Big(2500 * game.BSCSUtils.bet).mul(0.1));
            this.pay3_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(400 * game.BSCSUtils.bet).mul(0.1));
            this.pay3_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(50 * game.BSCSUtils.bet).mul(0.1));
            this.pay3_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(1500 * game.BSCSUtils.bet).mul(0.1));
            this.pay4_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(280 * game.BSCSUtils.bet).mul(0.1));
            this.pay4_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.BSCSUtils.bet).mul(0.1));
            this.pay4_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(1000 * game.BSCSUtils.bet).mul(0.1));
            this.pay5_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(200 * game.BSCSUtils.bet).mul(0.1));
            this.pay5_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.BSCSUtils.bet).mul(0.1));
            this.pay5_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(800 * game.BSCSUtils.bet).mul(0.1));
            this.pay6_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(150 * game.BSCSUtils.bet).mul(0.1));
            this.pay6_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.BSCSUtils.bet).mul(0.1));
            this.pay6_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(600 * game.BSCSUtils.bet).mul(0.1));
            this.pay7_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(120 * game.BSCSUtils.bet).mul(0.1));
            this.pay7_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.BSCSUtils.bet).mul(0.1));
            this.pay7_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(300 * game.BSCSUtils.bet).mul(0.1));
            this.pay8_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(80 * game.BSCSUtils.bet).mul(0.1));
            this.pay8_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.BSCSUtils.bet).mul(0.1));
            this.pay8_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(200 * game.BSCSUtils.bet).mul(0.1));
            this.pay9_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(60 * game.BSCSUtils.bet).mul(0.1));
            this.pay9_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.BSCSUtils.bet).mul(0.1));
            this.pay9_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(100 * game.BSCSUtils.bet).mul(0.1));
            this.pay10_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(40 * game.BSCSUtils.bet).mul(0.1));
            this.pay10_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.BSCSUtils.bet).mul(0.1));
            this.pay10_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(80 * game.BSCSUtils.bet).mul(0.1));
            this.pay11_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(30 * game.BSCSUtils.bet).mul(0.1));
            this.pay11_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(10 * game.BSCSUtils.bet).mul(0.1));
            this.pay11_3.text = NumberFormat.handleFloatDecimal(data) + "";

            data = Number(new Big(60 * game.BSCSUtils.bet).mul(0.1));
            this.pay12_5.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(20 * game.BSCSUtils.bet).mul(0.1));
            this.pay12_4.text = NumberFormat.handleFloatDecimal(data) + "";
            data = Number(new Big(8 * game.BSCSUtils.bet).mul(0.1));
            this.pay12_3.text = NumberFormat.handleFloatDecimal(data) + "";
        }
    }
}