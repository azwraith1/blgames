/*
 * @Author: reel MC Lee 
 * @Date: 2020-01-07 15:09:52 
 * @Last Modified by: reel MC Lee
 * @Last Modified time: 2020-03-03 13:36:50
 * @Description: 
 */
class ClubHallScene extends game.BaseScene {
	public resizeGroup: eui.Group;
	public createClubBtn: eui.Button;
	public joinClubBtn: eui.Button;
	public headGroup: eui.Group;
	public quitGroup: eui.Group;
	public backBtn: eui.Button;
	public userGroup: eui.Group;
	public headerImage: eui.Image;
	public userName: eui.Label;
	public goldLabel: eui.Label;
	public clubGroup: eui.Group;
	public clubScroller: eui.Scroller;
	public clubItemList: eui.List;
	public myClubBtn: eui.Group;
	public gou: eui.Image;
	public titleAniGroup: eui.Group;
	public mailBtn: eui.Button;

	private titleAni: DBComponent;

	public joinClubHallBtn: eui.Button;
	/**
	 * 背景音乐
	 */
	public bgMusic: string = "main_bg_mp3";
	public constructor() {
		super();
		this.skinName = `ClubHallSceneSkin${CF.tis}`;
	}

	public createChildren() {
		super.createChildren();
		if (ServerConfig.OP_RETURN_TYPE == "3") {
			this.backBtn.visible = false;
		}
		this.initList();
		this.userName.text = Global.playerProxy.playerData.nickname;
		let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
		this.headerImage.source = headerImage;
		this.updateGold();
		this.initHallAni();
	}

	protected initHallAni() {
		this.titleAni = DBComponent.create("club_hall_title_bg", "club_hall_title_bg");
		this.titleAni.play("", 0);
		this.titleAni.horizontalCenter = this.titleAni.bottom = 0
		this.titleAniGroup.addChild(this.titleAni);
		this.titleAni.resetPosition();
	}

	public async initList() {
		let resp: any = await game.PomeloManager.instance.request(ServerPostPath.hall_clubHandler_c_getClubList, {});
		this[`dianImag`].visible = resp.isNewMail;
		if (resp) {
			if (resp.error) {
				Global.alertMediator.addAlert(resp.error.msg, null, null, true);
				return;
			}
			if (resp.isCreator) {
				this.joinClubBtn.horizontalCenter = 225;
				this.createClubBtn.visible = true;
			}
			if (resp.list.length > 0) {
				//smart
				ClubManager.instance.list = resp.list;
				//smart
				this[`roleGroup`].visible = false;
				let atr = [];
				for (let i = 0; i < resp.list.length; i++) {
					atr.push(resp.list[i]);
				}
				this.clubItemList.itemRenderer = ClubListItem;
				this.clubItemList.dataProvider = new eui.ArrayCollection(atr);
			} else {
				if (resp.list.length == 0) this.clubItemList.removeChildren();
				this[`roleGroup`].visible = true;
			}
		}

	}

	public onAdded() {
		super.onAdded();
		CF.aE(ENo.CLUB_FLASH_CLUB_LIST, this.initList, this);
		CF.aE(ENo.CLUB_JOIN_CLUB, this.joinMyClub, this);
		CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
		CF.aE(ENo.CLUB_HALL_QUIT_TOUCH, this.quit, this);
	}

	public onRemoved() {
		super.onRemoved();
		CF.rE(ENo.CLUB_FLASH_CLUB_LIST, this.initList, this);
		CF.rE(ENo.CLUB_JOIN_CLUB, this.joinMyClub, this);
		CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
		CF.rE(ENo.CLUB_HALL_QUIT_TOUCH, this.quit, this);
	}

	public onTouchTap(e: egret.Event) {
		switch (e.target) {
			case this.createClubBtn:
				this.playerCreateClub();
				break;
			case this.joinClubBtn:
				this.playerJoinClub();
				break;
			case this.backBtn:
				this.quitClub();
				break;
			case this.myClubBtn:
				this.showMyClub();
				break;
			case this.headerImage:
				CF.sN(PanelNotify.OPEN_HEADER);
				break;
			case this[`clubtipsBtn`]:
				this.showTips();
				break;
			case this.mailBtn:
				this.showMails();
				break;
			case this[`setBtn`]:
				CF.sN(PanelNotify.OPEN_SETTING, { setIndex: 1 });
				break;
		}
	}

	private changHeader(e: egret.Event) {
		let data = e.data;
		this.headerImage.source = `hall_header_${data.sex}_${data.figureUrl}_png`;
		Global.playerProxy.playerData.figure_url = data.figureUrl;
		Global.playerProxy.playerData.sex = data.sex;
	}

	/**
	 * 打开加入club窗口
	 */
	public playerCreateClub() {
		let createClub = ClubCreatePanel.instance;
		this.resizeGroup.addChild(createClub);
		createClub.horizontalCenter = createClub.verticalCenter = 0;
		let func = () => {
			createClub.creatClub();
		};
		createClub.createClub.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
	}

	/**
	 * 打开加入club窗口
	 */
	public async playerJoinClub() {
		let JoinClub = ClubJoinPanel.instance;
		this.resizeGroup.addChild(JoinClub);
		JoinClub.horizontalCenter = JoinClub.verticalCenter = 0;
	}

	/**
	 * 加入俱乐部大厅
	 * @param  {egret.Event} e
	 */
	private lockReq: boolean = false;
	private timeout;
	public async joinMyClub(e: egret.Event) {
		let clubData = e.data.club;
		ClubManager.instance.currentClub = clubData;
		ClubInnerHallScene.instance.show();
		CF.sN(SceneNotify.CLOSE_CLUB_HALL);
	}

	/**
	 * 显示我的Club
	 */
	public showMyClub() {

	}

	public showTips() {
		let tips = ClubTipsPanel.instance;
		this.resizeGroup.addChild(tips);
		tips.horizontalCenter = tips.verticalCenter = 0;
	}

	public showMails() {
		let mails = CLubMailPanel.instance;
		mails.verticalCenter = mails.horizontalCenter = 0;
		this.resizeGroup.addChild(mails);
		this[`dianImag`].visible = false;
	}

	private quitClub() {
		RotationLoading.instance.load(["main"], "", () => {
			CF.sN(SceneNotify.CLOSE_CLUB_HALL);
			CF.sN(SceneNotify.OPEN_MAIN_HALL);
		});
	}

	private quit(e: egret.Event) {
		let quit = ClubQuitTips.instance;
		quit.setClubId(e.data.clubId);
		quit.horizontalCenter = quit.verticalCenter = 0;
		this.resizeGroup.addChild(quit);
	}

}