/*
 * @Author: He Bing 
 * @Date: 2018-07-06 16:29:49 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-07 18:08:00
 @Description: 麻将结算界面
 */

module majiang {
	export class XLCHOverScene extends game.BaseGameScene {
		private player_1: eui.Image;
		private player_2: eui.Image;
		private player_3: eui.Image;
		private player_4: eui.Image;
		private player_1_score: eui.BitmapLabel;
		private player_2_score: eui.Label;
		private player_3_score: eui.Label;
		private player_4_score: eui.Label;
		private everyoneGroup: eui.Group;
		private player_1_name: eui.Label;
		private player_2_name: eui.Label;
		private player_3_name: eui.Label;
		private player_4_name: eui.Label;
		private name_bg_1: eui.Image;
		private name_bg_2: eui.Image;
		private name_bg_3: eui.Image;
		private name_bg_4: eui.Image;
		private img_bg_1: eui.Image;
		private img_bg_2: eui.Image;
		private img_bg_3: eui.Image;
		private img_bg_4: eui.Image;
		private values;
		private directions;
		private btnGroup: eui.Group;
		private tips_text: eui.Label;
		private sceneGroup: eui.Group;
		public resizeGroup: eui.Group;//全屏适配
		//输赢话语。
		private win_lose_title: eui.Image;
		//输赢背景光
		private win_lose_bgs: eui.Image;
		private win_lose_bg: eui.Image;
		private othergroup: eui.Group;
		private mygroup: eui.Group;
		private scrollers: eui.Scroller;
		// private errorImage: eui.Image;
		private status;
		private closeBtn: eui.Button;
		public constructor(data) {
			super();
			this.values = data.players;
			this.status = data.status;
			//this.skinName = new MajiangJiesuanSceneSkin();
			this.skinName = "MajiangJiesuanSceneNewSkin";
		}

		public onAdded() {
			super.onAdded();
			Global.runGame = false;
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
		}

		public onRemoved() {
			super.onRemoved();
			CF.aE(ENo.EVENT_RESIZE, this.resetPosition, this);
		}

		public resetPosition(e?: egret.Event) {
			var data = e.data;
		}


		public createChildren() {
			super.createChildren();
			this.setNameStyle();
			this.show();
			this.alpha = 0;
			egret.Tween.get(this).to({
				alpha: 1
			}, 1000, egret.Ease.circIn);
		}


		private show() {
			let shuJiArr = this.values;//主方法
			if (shuJiArr != null) {
				for (var key in shuJiArr) {
					let data = shuJiArr[key]
					if (Global.gameProxy.checkIndexIsMe(key)) {
						this.showMine(data, key);//是自己，要调用的方法。
					} else {
						this.showOthers(data, key);//非自己调用的方法。
					}
				}
			}
		}

		/**
		 * 显示自己
		 */
		public showMine(data, key) {
			if (data.bills.length == 0) {
				this.tips_text.visible = true;
			} else {
				for (let i = 0; i < data.bills.length; i++) {//bills是data里面的值
					if (data.bills[i]["type"] != 0) {//去掉房费。
						var item = new MajiangJiesuanRenderer(data.bills[i]);//这里是将每产生的一条信息加到这个组里面。
						this.everyoneGroup.addChild(item);
					}
				}
			}
			let header = Global.gameProxy.getPlayerByIndex(key).figure_url || Global.gameProxy.getPlayerByIndex(key)["figureUrl"]
			let headerSex = Global.gameProxy.getPlayerByIndex(key).sex || Global.gameProxy.getPlayerByIndex(key)["sex"];
			this.player_1.source = `hall_header_${headerSex}_${header}_png`;
			let nums = data["gainGold"];
			this.winOrLoseImg(nums);
			Global.playerProxy.playerData.gold = data["ownGold"];
			this.player_1_name.text = Global.playerProxy.playerData.nickname;//Global.playerProxy.playerData全局变量，相当于cookie。
			if (data["gainGold"] > 0) {
				this.meWinOrLoseTextColor(data["gainGold"]);
				this.player_1_score.text = "+" + NumberFormat.formatGold_scence(data["gainGold"], 1);

			} else {
				this.meWinOrLoseTextColor(data["gainGold"]);
				this.player_1_score.text = NumberFormat.formatGold_scence(data["gainGold"], 1);

			}

		}
		/**
		 * 其他玩家
		 * 
		 */
		public showOthers(data, key) {
			this.directions = MajiangUtils.getDirectionByMine(Global.gameProxy.getMineIndex());
			var players = Global.gameProxy.getPlayers();
			let header = Global.gameProxy.getPlayerByIndex(key).figure_url || Global.gameProxy.getPlayerByIndex(key)["figureUrl"];
			let headerSex = Global.gameProxy.getPlayerByIndex(key).sex || Global.gameProxy.getPlayerByIndex(key)["sex"];
			switch (this.directions[key]) {
				case "left":
					this.img_bg_2.visible = true;
					this.name_bg_2.visible = true;
					this.player_2_name.text = players[key].nickname;
					this.player_2.source = `hall_header_${headerSex}_${header}_png`;
					//	this.player_2_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_2_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_2_score.textColor = this.socreW2L(data["gainGold"]);
					break;
				case "right":
					this.img_bg_4.visible = true;
					this.name_bg_4.visible = true;
					this.player_4_name.text = players[key].nickname;
					this.player_4.source = `hall_header_${headerSex}_${header}_png`;
					//	this.player_4_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_4_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_4_score.textColor = this.socreW2L(data["gainGold"]);
					break;
				case "top":
					this.img_bg_3.visible = true;
					this.name_bg_3.visible = true;
					this.player_3_name.text = players[key].nickname;
					this.player_3.source = `hall_header_${headerSex}_${header}_png`;
					//	this.player_3_score.text = NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_3_score.text = this.getJia(data["gainGold"]) + NumberFormat.formatGold_scence(data["gainGold"]);
					this.player_3_score.textColor = this.socreW2L(data["gainGold"]);
					break;
			}
		}
		private getJia(gaiGold): string {
			if (gaiGold > 0) {
				return "+";
			}
			else {
				return "";
			}
		}
		/**设置名字的样式
		 * samrt
		*/
		private setNameStyle() {
			let text: eui.Label;
			for (let i = 1; i < 5; ++i) {
				text = this[`player_${i}_name`] as eui.Label;
				text.size = 11;
				text.textColor = 0xfdfdf3;
			}
		}
		/**
		 * 判断输赢图片
		 */
		private winOrLoseImg(score: number) {
			if (score > 0) {

				this.win_lose_bgs.source = RES.getRes("js_win_bg_png");
				this.win_lose_title.source = RES.getRes("js_win_png");

				//	this.moiveC();
			} else if (score == 0) {
				this.win_lose_bgs.source = RES.getRes("js_ping_bg_png");
				this.win_lose_title.source = RES.getRes("js_ping_png");

				//	this.moiveC();
			} else {
				this.win_lose_bgs.source = RES.getRes("js_lose_bg_png");
				this.win_lose_title.source = RES.getRes("js_lose_png");
				this.win_lose_bgs.top = 20;
			}
		}

		/**
		 * 动画
		 */
		private moiveC() {
			// egret.Tween.get(this.bg_xuanzhuanguang, { loop: true }).to({ rotation: 360 }, 5000);
			// this.bg_xuanzhuanguang.mask = this.bg_xuanzhuanguang_rects;
		}
		/**
		 * 判断输赢字体颜色。
		 */
		public meWinOrLoseTextColor(fnt_color) {
			if (fnt_color > 0) {
				this.player_1_score.font = RES.getRes("win_text_fnt");
			} else {
				this.player_1_score.font = RES.getRes("lose_text_fnt");
			}
			//	this.player_1_score.textAlign = "center";
		}
		/**
		 * 判断分数正负颜色 smart
		 */
		public socreW2L(color) {
			if (color > 0) {
				return 0xf6b74b;
				//	return 0xfff729;
			} else {
				return 0xc4dfff;
				//	return 0xffffff;
			}
		}

		/**
		 * 判断是那个玩家
		 */

		/**
		 * 点击方法
		 */
		private lockReq: boolean;
		public async onTouchTap(e: egret.TouchEvent) {
			e.stopPropagation();
			switch (e.target) {
				case this.restartBtn://下一局
					this.restartBtnTouch();
					break;
				case this.backBtn://退出
					// let quitResp: any = await Global.pomelo.request(ServerPostPath.game_roomHandler_c_quitRoom, {});
					// if (quitResp.gold != undefined && quitResp.gold != null) {
					// 	Global.playerProxy.playerData.gold = quitResp.gold;
					// }
					// this.backHall();
				case this.closeBtn:
					CF.dP(SceneNotify.CLOSE_MJ_JIESSUAN, {});
					CF.sN(this.CLOSE_NOTIFY);
					break;
			}
		}


		/**
		 * 返回对应游戏大厅
		 */
		protected backHall() {
			CF.sN(this.GAME_SCENE_NOTIFY);
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.HALL_SCENE_NOTIFY);
		}

		/**
		 * 返回对应的匹配
		 */
		protected backMatching() {
			CF.sN(this.GAME_SCENE_NOTIFY);
			CF.sN(this.CLOSE_NOTIFY);
			CF.sN(this.MATCHING_SCENE_NOTIFY);
		}

		//new
		/**
		 * 打开游戏界面通知
		 */
		public GAME_SCENE_NOTIFY: string = SceneNotify.CLOSE_MJXLCH;

		/**
		 * 关闭游戏界面通知
		 */
		public HALL_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXLCH_HALL;

		/**
		 * 关闭当前界面通知
		 */
		public CLOSE_NOTIFY: string = SceneNotify.CLOSE_MJXLCH_OVER;

		/**
		 * 对应匹配界面通知
		 */
		public MATCHING_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXLCH_MATCHING;
	}
}