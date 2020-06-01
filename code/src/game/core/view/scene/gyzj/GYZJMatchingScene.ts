module majiang {
    export class GYZJMatchingScene extends game.BaseMatchingScene {
        public pmdKey: string = "gyzjmj";
        public GAME_ID: string = "gyzjmj";
        public bgMusic: string = "playingingame_mp3";
        //玩法
        private wanfaImage: eui.Image;
        private dizhu: eui.Label;
        private paiQiang: PaiQiangComponent;
        private players = {};
        /**
		 * 关闭匹配通知
		 */
        public CLOSE_NOTIFY: string = SceneNotify.CLOSE_GYZJ_MATCHING;

		/**
		 * 打开游戏大厅
		 */
        public GAME_HALL_NOTIFY: string = SceneNotify.OPEN_GYZJMJ_HALL;

		/**
		 * 进入游戏通知
		 */
        public GAME_SCENE_NOTIFY: string = SceneNotify.OPEN_GYZJMJ;

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
            //LogUtils.logD("======IN GYZJMATHING Createchildren============" + JSON.stringify(Global.gameProxy.lastGameConfig));
            this.dizhu.text = "底注：" + Global.gameProxy.lastGameConfig.diFen;
            this.mineHeader.initWithData(Global.gameProxy.getMineGameData(), "mine");
            this.wanfaImage.source = RES.getRes("gyzj_game_title_png");
            this.wanfaImage.width = 241;
            this.wanfaImage.height = 59;
            this.wanfaImage.verticalCenter = 69.5;
            this.wanfaImage.horizontalCenter = 8.5
            this.wanfaImage.scaleX = 0.9;
            this.wanfaImage.scaleY = 0.9;
            this.wanfaImage.x = 540;
            this.wanfaImage.y = 403;
            this.dizhu.verticalCenter = 130.5;
            this.dizhu.horizontalCenter = 11;
            this.dizhu.x = 577;
            this.dizhu.y = 478;
            // var img:eui.Image = new eui.Image(RES.getRes("gyzj_game_title_png"));
            // // img.texture = RES.getRes("gyzj_game_title_png");
            // this.resizeGroup.addChild(img);
            // // var gyzjTitle=new eui.Image("gyzj_game_title_png");
            // img.x = 544;
            // img.y = 494;
            // LogUtils.logD( "Mathing 中贵阳捉鸡是否存在=========="+img.source);
            // this.resizeGroup.addChild(gyzjTitle);
        }


        public onAdded() {
            super.onAdded();
            CF.aE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.aE(ServerNotify.s_countdown, this.countdDown, this);
            CF.aE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.aE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.aE(ServerNotify.s_playerEnter, this.playerEnter, this);
            this.wanfaImage.y = 775;
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ServerNotify.s_countdown, this.countdDown, this);
            CF.rE(ServerNotify.s_startNewRound, this.s_startNewRound, this);
            CF.rE(ServerNotify.s_initHandCards, this.initHandCards, this);
            CF.rE(ServerNotify.s_enterResult, this.enterResult, this);
            CF.rE(ServerNotify.s_playerEnter, this.playerEnter, this);
        }

        private countdDown(e: egret.Event) {
            let resp = e.data;
            if (Global.gameProxy.roomInfo) {
                Global.gameProxy.roomInfo.countdown = resp;
            }
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

        private checkStart() {
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
