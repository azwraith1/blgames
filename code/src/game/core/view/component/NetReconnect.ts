/*
 * @Author: li mengchan 
 * @Date: 2018-07-24 10:37:37 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-05-22 16:06:04
 * @Description: 断线重连
 */
module game {
	export class NetReconnect extends BaseComponent {
		public static _instance: NetReconnect;
		private tipImage: eui.Image;
		//5次计数如果没有打开则弹开面板
		private count: number = 5;
		public active: boolean = false;
		private connectInterval;
		public constructor() {
			super();
			this.skinName = new NetReConnectSkin();
		}

		public static get instance(): NetReconnect {
			if (!NetReconnect._instance) {
				NetReconnect._instance = new NetReconnect();
				NetReconnect._instance.name = "netReconnect";
				NetReconnect._instance.visible = false;
				GameLayerManager.gameLayer().maskLayer.addChild(NetReconnect._instance);
			}
			return NetReconnect._instance;
		}

		public createChildren() {
			super.createChildren();
		}

		public async hide() {
			this.visible = false;
			egret.Tween.removeTweens(this.tipImage);
			egret.clearInterval(this.connectInterval)
			this.connectInterval = null;
			PomeloManager.instance.lockResp = false;
			CF.sN(PanelNotify.CLOSE_ALERT);
		}

		public async show() {
			if (this.visible && this.active) {
				return;
			}
			this.active = true
			// if (this.active) {
			PomeloManager.instance.lockResp = true;
			LogUtils.logD("重新连接");
			egret.clearInterval(this.connectInterval);
			this.connectInterval = null;
			this.visible = true;
			egret.Tween.removeTweens(this.tipImage);
			egret.Tween.get(this.tipImage, { loop: true }).to({
				rotation: this.tipImage.rotation + 360
			}, 3000);
			let count = 0;
			this.connectInterval = egret.setInterval(async () => {
				//重新连接
				count++;
				if (count >= 2) {
					egret.clearInterval(this.connectInterval)
					this.connectInterval = null;
					this.showReconnectFailTips();
					return;
				}
				this.connect();
			}, this, 6000);
			this.connect();
			// }
		}


		private async connect() {
			let suc = await PomeloManager.instance.initServer(Global.gameProxy.connectorInfo.host, Global.gameProxy.connectorInfo.port);
			if (!suc) {
				return;
			} else {
				egret.clearInterval(this.connectInterval)
				this.connectInterval = null;
			}
			let resp: any = await PomeloManager.instance.request('connector.entryHandler.c_connect', {
				token: Global.playerProxy.token,
			});
			if (resp && !resp.error) {
				resp.error = {};
				resp.error.code = 0;
			}
			if (resp) {
				if (resp.error && resp.error.code != 0) {
					egret.clearInterval(this.connectInterval)
					this.connectInterval = null;
					return;
				}
				if (Global.runGame) {
					setTimeout(() => {
						Global.pomelo.sendReconnectReason(-1);
					}, 5000);
				}
				this.active = false
				LogUtils.logD("重连成功");
				PomeloManager.instance.state = PomeloStateEnum.CONNECT;
				NetErrorTips.instance.hide();
				game.NetReconnect.instance.hide();
				CF.dP(ENo.RECONNECT_SUC, {});
			}
		}

		/**
		 * 重新连接失败
		 */
		public showReconnectFailTips() {
			this.hide();
			let text = TextUtils.instance.getCurrentTextById(69);
			Global.alertMediator.addAlert(text, () => {
				this.show();
			}, null, true);
		}
	}
}