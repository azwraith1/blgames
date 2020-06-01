module majiang {
    export class XZDDMatchingScene extends game.BaseMatchingScene {
        public pmdKey: string = "mjxzdd";
        public GAME_ID: string = "mjxzdd";
        public bgMusic: string = "playingingame_mp3";
        //玩法
        protected wanfaImage: eui.Image;
        protected dizhu: eui.Label;
        protected paiQiang: PaiQiangComponent;
        protected players = {};
        /**
		 * 关闭匹配通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_MJXZDD_MATCHING;

		/**
		 * 打开游戏大厅
		 */
        public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_MJXZDD_HALL;

		/**
		 * 进入游戏通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_MJXZDD;

        /**
         * 记录界面的通知
         */
        public RECORD_NOTIFY: string;

		/**
		 * 帮助界面的通知
		 */
        public HELP_NOTIFY: string;

		/**
		 * 设置界面的通知
		 */
        public SETTING_NOTIFY: string;

        protected isStart = false;

        protected isInitHand = false;

        public constructor() {
            super();
            this.skinName = new MajiangMatchingSceneSkin();
        }

        public async createChildren() {
            super.createChildren();
            this.showContent();
        }

        protected showContent() {
            this.paiQiang.hidePaiQiang();
            this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;
            this.mineHeader.initWithData(Global.gameProxy.getMineGameData(), "mine");
            this.wanfaImage.source = RES.getRes("xzdd_hsz_png");
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.aE(ServerNotify.s_countdown, this.countdDown, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_countdown, this.countdDown, this);
            CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        }

        protected countdDown(e: egret.Event) {
            let resp = e.data;
            if (Global.gameProxy.roomInfo) {
                Global.gameProxy.roomInfo.countdown = resp;
            }
        }

        protected s_startNewRound(e: egret.Event) {
            let data = e.data;
            Global.gameProxy.roomInfo.dealer = data.dealer;
            this.isStart = true;
            this.checkStart();
        }

        protected playerEnter(e: egret.Event) {
            let data = e.data;
            this.players[data.playerIndex] = data.player;
            Global.gameProxy.updatePlayer(data.playerIndex, data.player);
        }

        protected enterResult(e: egret.Event) {
            let data = e.data;
            if (data.code && data.code != 0) {
                this.clearJoinTimeout();
                this.backHall();
                Global.alertMediator.addAlert(data.msg, () => {

                }, null, true);
                return;
            }
            Global.gameProxy.setRoomInfo(e.data);
            Global.gameProxy.roomInfo.playing = true;
            // e.data.roomInfo['players'] = this.players;
        }

        /**
         * 发牌
         * 收到发牌的消息跳转界面
         * @param  {egret.Event} e
         */
        public async initHandCards(e: egret.Event) {
            // var resp = e.data as InitHandCardsResp;
            let roomInfo = Global.gameProxy.roomInfo;
            // await Global.gameProxy.req2updateRoom();
            let mineData = Global.gameProxy.getMineGameData();
            mineData.cards = e.data.cards;
            mineData.hszCardsTip = e.data.hszCardsTip;
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
            this.isInitHand = true;
            this.checkStart();
        }

        protected checkStart() {
            if (this.isInitHand && this.isStart) {
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(this.GAME_SCENE_NOTIFY);
            }
        }

        /**
         * 开始游戏
         */
        public startNewRound(e: egret.Event) {
            Global.gameProxy.roomInfo.setRoundData(e.data);
            this.isStart = true;
            this.checkStart();
        }

        /**
         * 玩家加入
         * @param  {egret.Event} e
         */
        public playerjoin(e: egret.Event) {
            let resp: any = e.data;
            Global.gameProxy.joinPlayer(resp.playerIndex, resp.player);
        }
    }
}
