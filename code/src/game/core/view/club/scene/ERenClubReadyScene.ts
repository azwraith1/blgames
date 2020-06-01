// TypeScript file
class ERenClubReadyScene extends BaseClubReadyScene {
    public static _instance: ERenClubReadyScene;
    public GAME_NOTIFY: string = SceneNotify.OPEN_ERMJ;
    public CLOSE_NOTIFY: string = SceneNotify.OPEN_ZJHGAME;
    public constructor() {
        super();
        this.skinName = new ERenClubReadySceneSkin();
    }
    private header1: zajinhua.ZajinhuaHeader;
    private ready: boolean = false;
    private players = {};
    private isStart = false;
    private isInitHand = false;
    public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_ERMJ;
    /**
	 * 背景音乐
	 */
    public bgMusic: string = "playingingame_mp3";
    public static get instance() {
        if (!ERenClubReadyScene._instance) {
            ERenClubReadyScene._instance = new ERenClubReadyScene();
        }
        return ERenClubReadyScene._instance;
    }

    public createChildren() {
        super.createChildren();
        this.showRoomInfo();
        Global.gameProxy.lastGameConfig = {
            gameId: GAME_ID.ERMJ,
            sceneId: GAME_SCENEID.CLUB,
            diFen: this.proxy.roomInfo.betBase,
        }
        if (this.ready) {
            this.zuoxiaBtnTouch();
        }
    }

    public show(ready) {
        game.UIUtils.changeResize(1);
        this.ready = ready;
        GameLayerManager.gameLayer().sceneLayer.addChild(this);
    }

    public showRoomInfo() {
        super.showRoomInfo();
        this.changeDirections();
        this.showPlayers();
    }


    public changeDirections() {
        let mineIndex = Global.gameProxy.getMineIndex()
        if (mineIndex && mineIndex > 0) {
            this.directions = NiuniuUtils.getDirectionByMine(mineIndex, 2);
        } else {
            this.directions = NiuniuUtils.getDirectionByMine(1, 2);
        }
    }

    public hide() {
        game.UIUtils.removeSelf(this);
        ERenClubReadyScene._instance = null;
    }


    public onAdded() {
        super.onAdded();
        CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.aE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
        CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.aE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
        CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.aE(ServerNotify.s_playInitHua, this.s_playInitHua, this);

    }

    public onRemoved() {
        super.onRemoved();
        CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
        CF.rE(ServerNotify.s_playerEnter, this.s_playerEnter, this);
        CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
        CF.rE(ServerNotify.s_tablePlayerStateInfo, this.s_tablePlayerStateInfo, this);
        CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
        CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        CF.rE(ServerNotify.s_playInitHua, this.s_playInitHua, this);
    }

    private s_playerEnter(e: egret.Event) {
        let data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    }

    private async enterResult(e: egret.Event) {
        // this.allowBack = false;
        let data = e.data;
        if (data.code && data.code != 0) {
            // this.clearJoinTimeout();
            // this.backHall();
            Global.alertMediator.addAlert(data.msg, () => {

            }, null, true);
            return;
        }
        Global.gameProxy.setRoomInfo(e.data);
        Global.gameProxy.roomInfo.playing = true;
    }

    public async s_startNewRound(e: egret.Event) {
        let data = e.data;
        Global.gameProxy.roomInfo.dealer = data.dealer;
        this.isStart = true;
        this.checkStart();
    }

    public async reconnectSuc() {
        await ClubManager.instance.flushClubTable(() => {
            this.hide();
        }, () => {
            this.hide();
        });
    }

    protected s_tablePlayerStateInfo(e: egret.Event) {
        let data = e.data;
        let seatId = data.seatId;
        let playerData = this.proxy.roomInfo.players[seatId];
        playerData.status = data.status;

        let uiIndex = this.directions[seatId];
        if (playerData.status == TABLE_PLAYER_STATUS.READY) {
            this[`ready${uiIndex}`].visible = true;
            this[`paiQiang`].visible = true;
        } else {
            this[`ready${uiIndex}`].visible = false;
        }
    }

    /**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
    public async initHandCards(e: egret.Event) {
        // var resp = e.data as InitHandCardsResp;
        let data = e.data;
        let roomInfo = Global.gameProxy.roomInfo;
        let hua = data.hua || [];
        // await Global.gameProxy.req2updateRoom();
        let mineData = Global.gameProxy.getMineGameData();
        mineData.cards = data.cards;
        for (let key in roomInfo.players) {
            if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
                let playerData = roomInfo.players[key];
                if (game.Utils.valueEqual(key, roomInfo.dealer)) {
                    playerData.cardNum = 14;
                } else {
                    playerData.cardNum = 13;
                }
            }
        }
        mineData.initHuaCards = [];
        mineData.huaNewCards = [];
        for (let i = 0; i < hua.length; i++) {
            let huaData = hua[i];
            mineData.initHuaCards.push(huaData.hua);
            if (Math.floor(huaData.newCard) / 10 != 5) {
                mineData.huaNewCards.push(huaData.newCard);
            }
        }

        this.checkStart();
    }

    private checkStart() {
        if (this.isInitHand && this.isStart) {
            this.hide();
            CF.sN(this.GAME_SCENE_NOTIFY);
        }
    }

    private playerEnter(e: egret.Event) {
        let data = e.data;
        this.players[data.playerIndex] = data.player;
        Global.gameProxy.updatePlayer(data.playerIndex, data.player);
    }

    private s_playInitHua(e: egret.Event) {
        let data = e.data;
        for (let key in data) {
            let huaArr = data[key];
            if (!game.Utils.valueEqual(key, Global.gameProxy.getMineIndex())) {
                let playerData = Global.gameProxy.getPlayerByIndex(key);
                playerData.initHuaCards = huaArr;
            }
        }
        this.isInitHand = true;
        this.checkStart();
    }

    /**
	 * 帮助界面的通知
	 */
    public HELP_NOTIFY: string = PanelNotify.OPEN_ZJHHELP;

	/**
	 * 记录界面的通知
	 */
    public RECORD_NOTIFY: string = PanelNotify.OPEN_ZJHRECORD;

	/**
	 * 设置界面的通知
	 */
    public SETTING_NOTIFY: string = PanelNotify.OPEN_ZJHSET;
}