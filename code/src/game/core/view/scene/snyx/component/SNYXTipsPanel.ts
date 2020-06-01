module snyx {
	export class SNYXTipsPanel extends game.BaseComponent {
		public resizeGroup: eui.Group;
		public group1: eui.Group;
		public group3: eui.Group;
		public right1: eui.Button;
		public closeBtn1: eui.Image;
		public group2: eui.Group;
		public left1: eui.Button;
		public right2: eui.Button;
		public closeBtn2: eui.Image;
		public payList1: eui.Group;
		public pay3_3: eui.Label;
		public pay3_4: eui.Label;
		public pay3_5: eui.Label;
		public pay4_3: eui.Label;
		public pay4_4: eui.Label;
		public pay4_5: eui.Label;
		public pay5_3: eui.Label;
		public pay5_4: eui.Label;
		public pay5_5: eui.Label;
		public pay6_3: eui.Label;
		public pay6_4: eui.Label;
		public pay6_5: eui.Label;
		public pay7_3: eui.Label;
		public pay7_4: eui.Label;
		public pay7_5: eui.Label;
		public pay8_3: eui.Label;
		public pay8_4: eui.Label;
		public pay8_5: eui.Label;
		public pay9_3: eui.Label;
		public pay9_4: eui.Label;
		public pay9_5: eui.Label;
		public pay10_3: eui.Label;
		public pay10_4: eui.Label;
		public pay10_5: eui.Label;
		public pay11_3: eui.Label;
		public pay11_4: eui.Label;
		public pay11_5: eui.Label;
		public pay2_5: eui.Label;
		public pay2_3: eui.Label;
		public pay2_4: eui.Label;
		public left2: eui.Button;
		public closeBtn3: eui.Image;

		public constructor() {
			super();
			this.skinName = "SNYXTipsSkin";
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
					CF.sN(PanelNotify.CLOSE_SNYX_TIPS_PANEL);
					break;
			}
		}

		public initData() {
			let data
			// 20	5	1
			data = Number(new Big(20 * game.LaohuUtils.bet));
			this.pay3_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(5 * game.LaohuUtils.bet));
			this.pay3_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(1 * game.LaohuUtils.bet));
			this.pay3_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			//10	3	0.75
			data = Number(new Big(10 * game.LaohuUtils.bet));
			this.pay4_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(3 * game.LaohuUtils.bet));
			this.pay4_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.75 * game.LaohuUtils.bet));
			this.pay4_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 2.5	1	0.4
			data = Number(new Big(2.5 * game.LaohuUtils.bet));
			this.pay5_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(1 * game.LaohuUtils.bet));
			this.pay5_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.4 * game.LaohuUtils.bet));
			this.pay5_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 1	0.75	0.25
			data = Number(new Big(1 * game.LaohuUtils.bet));
			this.pay6_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.75 * game.LaohuUtils.bet));
			this.pay6_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.25 * game.LaohuUtils.bet));
			this.pay6_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 0.9	0.5	0.15
			data = Number(new Big(0.9 * game.LaohuUtils.bet));
			this.pay7_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.5 * game.LaohuUtils.bet));
			this.pay7_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.15 * game.LaohuUtils.bet));
			this.pay7_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 0.75	0.4	0.1
			data = Number(new Big(0.75 * game.LaohuUtils.bet));
			this.pay8_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.4 * game.LaohuUtils.bet));
			this.pay8_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.1 * game.LaohuUtils.bet));
			this.pay8_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 0.65	0.25	0.1
			data = Number(new Big(0.65 * game.LaohuUtils.bet));
			this.pay9_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.25 * game.LaohuUtils.bet));
			this.pay9_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.1 * game.LaohuUtils.bet));
			this.pay9_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 0.6	0.2	0.05
			data = Number(new Big(0.6 * game.LaohuUtils.bet));
			this.pay10_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.2 * game.LaohuUtils.bet));
			this.pay10_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.05 * game.LaohuUtils.bet));
			this.pay10_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			// 0.5	0.15	0.05
			data = Number(new Big(0.5 * game.LaohuUtils.bet));
			this.pay11_5.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.15 * game.LaohuUtils.bet));
			this.pay11_4.text = NumberFormat.handleFloatDecimal(data, 3) + "";
			data = Number(new Big(0.05 * game.LaohuUtils.bet));
			this.pay11_3.text = NumberFormat.handleFloatDecimal(data, 3) + "";
		}
	}
}