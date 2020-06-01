/*
 * @Author: MC Lee 
 * @Date: 2019-07-23 10:59:54 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-07-23 11:06:00
 * @Description: 麻将通用流水记录
 */
class BaseMajiangRecordScene extends game.BaseScene {
	public resizeGroup: eui.Group;
	private rects: eui.Rect;
	public recordGroup: eui.Group;
	private closeBtn: eui.Button;
	private tishiyu: eui.Label;
	private num: any;
	private gameId: string;
	private timeImage1: eui.Image;
	private tipsLabel1: eui.Label;
	public constructor(gameId) {
		super();
		this.gameId = gameId;
		if (this.gameId == "bdz") {
			this.skinName = new BDZRecordSkin();
			return;
		}
		this.skinName = new MajiangRecordSkin();
	}


	public createChildren() {
		super.createChildren();
		this.init();
	}

	/**
		 * 初始化赋值
		 */
	private async init() {
		let id = this.gameId;
		let data = Global.gameProxy.gameIds[id];
		if (data) {
			id = data;
		}
		var handler = ServerPostPath.hall_userHandler_c_getReportInfo;
		let nums = {
			gameId: id,
			skip: 0,//表示已经获得的条数。
			limit: 10,//每次请求好多条。
		};
		let resp: any = await game.PomeloManager.instance.request(handler, nums);
		this.fuZhi(resp);
	}

	private fuZhi(resp) {
		this.recordGroup.removeChildren();
		if (resp.length == 0) {
			this.tishiyu.visible = true;
		} else {
			for (let i = 0; i < resp.length; i++) {
				var items = new MajiangRecordRender(resp[i]);
				this.recordGroup.addChild(items);
			}
		}

	}

	protected onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		if (e.target == this.closeBtn || e.target == this.rects) {
			this.rects.visible = false;
			CF.sN(PanelNotify.CLOSE_BASE_RECORD);
		}
	}
}