/*
 * @Author: MC Lee 
 * @Date: 2020-03-16 14:10:55 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-03-23 14:43:41
 * @Description: bdz时间进度条
 */
class BDZTimeBar extends game.BaseUI implements IUpdate {
	protected dbGroup: eui.Group;
	private progressBar: eui.Image;
	private pointImage: eui.Image;
	private kuangDb: DBComponent;
	private isShow: boolean = false;
	public constructor() {
		super();
		this.skinName = new BDZTimeBarSkin();
	}

	public createChildren() {
		super.createChildren();
		
		this.createDB();
	}

	public startTimer(){
		game.UpdateTickerManager.instance.add(this);
	}

	public stopTimer(){
		game.UpdateTickerManager.instance.remove(this);
	}

	public onAdded() {
		super.onAdded();
	}

	public onRemoved() {
		super.onRemoved();
		
	}

	public createDB() {
		this.kuangDb = new DBComponent("bdz_countdown", false);
		this.dbGroup.addChild(this.kuangDb);
		this.kuangDb.playByFilename(-1);
	}

	private showTimeout;
	public showTime(time = 5000) {
		egret.clearTimeout(this.showTimeout);
		this.progressBar.width = 205;
		this.showTimeout = egret.setTimeout(() => {
			this.isShow = true;
			this.visible = true;
			SoundManager.getInstance().playEffect("bdz_timer_mp3", true);
		}, this, time);
	}

	public checkShow() {
		if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
			let startTime = Global.roomProxy.roomInfo.countdown.start;
			let nowTime = game.DateTimeManager.instance.now;
			let cha = nowTime - startTime;
			if (cha > 5000) {
				this.isShow = true;
				this.visible = true;
				this.progressBar.width = 205 * ((cha / ((Global.roomProxy.roomInfo.countdown.s - 5) * 1000)));
				SoundManager.getInstance().playEffect("bdz_timer_mp3", true);
			}else{
				this.showTime(5000 - cha);
			}
		}
	}

	public hideTimeBar() {
		egret.clearTimeout(this.showTimeout);
		this.isShow = this.visible = false;
		SoundManager.getInstance().stopEffectByName("bdz_timer_mp3");
	}

	public update(dt: number) {
		if (!this.isShow) {
			return;
		}
		if (Global.roomProxy.roomInfo && Global.roomProxy.roomInfo.countdown) {
			let endTime = Global.roomProxy.roomInfo.countdown.end;
			let startTime = game.DateTimeManager.instance.now;
			let startTime1 = Global.roomProxy.roomInfo.countdown.start;
			this.visible = startTime - startTime1 > 5000;
			let cha = endTime - startTime;
			let percent = 0;
			let totalTime = (Global.roomProxy.roomInfo.countdown.s - 5) * 1000;
			if (cha <= totalTime) {
				percent = (cha / totalTime);
			}
			if (percent < 0) {
				percent = 0;
			}
			this.progressBar.width = Math.floor(205 * percent);
			this.pointImage.x = this.progressBar.width + 2;
		}
	}
}