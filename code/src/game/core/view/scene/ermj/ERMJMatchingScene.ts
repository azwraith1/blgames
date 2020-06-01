module majiang {
    export class ERMJMatchingScene extends game.BaseMatchingScene {
        public pmdKey: string = "mjxlch";
        public bgMusic: string = "playingingame_mp3";
        public GAME_ID: string = "dzmj";
        //玩法
        private wanfaImage: eui.Image;
        private dizhu: eui.Label;
        private paiQiang: PaiQiangComponent;
        private players = {};
        /**
		 * 关闭匹配通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_ERMJ_MATCHING;

		/**
		 * 打开游戏大厅
		 */
        public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_ERMJ_HALL;

		/**
		 * 进入游戏通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_ERMJ;

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


        private isStart = false;

        private isInitHand = false;

        public constructor() {
            super();
            this.skinName = new MajiangMatchingSceneSkin();
        }

        public async createChildren() {
            super.createChildren();
            this.paiQiang.hidePaiQiang();
            this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;
            this.wanfaImage.source = RES.getRes("ermj_wanfa_png");
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.aE(ServerNotify.s_playInitHua, this.s_playInitHua, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
            CF.rE(ServerNotify.s_playInitHua, this.s_playInitHua, this);
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

        private s_startNewRound(e: egret.Event) {
            let data = e.data;
            Global.gameProxy.roomInfo.dealer = data.dealer;
            this.isStart = true;
            this.checkStart();
        }

        private playerEnter(e: egret.Event) {
            let data = e.data;
            this.players[data.playerIndex] = data.player;
            Global.gameProxy.updatePlayer(data.playerIndex, data.player);
        }

        private enterResult(e: egret.Event) {
            this.allowBack = false;
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
                CF.sN(this.CLOSE_NOTIFY);
                CF.sN(this.GAME_SCENE_NOTIFY);
            }
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
