// TypeScript file
module slot {
    export class SlotRankPanel extends game.BaseComponent {
        public resizeGroup: eui.Group;
        public closeBtn: eui.Image;
        public todayRank: eui.Button;
        public historyRank: eui.Button;
        public rankListGroup: eui.Group;
        public rankScroller: eui.Scroller;
        public rankscrollerGroup: eui.List;
        public myGroup: eui.Group;
        public myRankImag: eui.Image;
        public myrank: eui.BitmapLabel;
        public myHead: eui.Image;
        public myName: eui.Label;
        public myGold: eui.Label;

        public scene: number;

        public static _instance: SlotRankPanel;

        public constructor(scene?) {
            super();
            this.skinName = "SlotRankPanelSkin";
            if (scene) {
                this.scene = scene;
            }
        }

        public static getInstance(): SlotRankPanel {
            if (SlotRankPanel._instance == null) {
                SlotRankPanel._instance = new SlotRankPanel();
            }
            return SlotRankPanel._instance;
        }

        public createChildren() {
            super.createChildren();
            this.rankScroller.scrollPolicyH = 'off';
            this.todayRank.touchEnabled = false;
            this.historyRank.touchEnabled = false;
            this.initRankList();
        }


        private async initRankList() {
            let data = {
                rankType: 2, gameId: 10007, skip: 0, limit: 20
            }
            let resp = await game.PomeloManager.instance.request(ServerPostPath.rank_userHandler_c_getRank, data);
            game.LaohuUtils.slotRankHistory = resp;
            Global.pomelo.clearLastLock();
            let data1 = {
                rankType: 3, gameId: 10007, skip: 0, limit: 20
            }
            let resp2 = await game.PomeloManager.instance.request(ServerPostPath.rank_userHandler_c_getRank, data1);
            game.LaohuUtils.slotRankToday = resp2;
            this.requstRankList(3);
        }

        private requstRankList(type) {
            let resp2;
            if (type == 2) {
                this.rankToday();
                resp2 = game.LaohuUtils.slotRankHistory;
            } else {
                this.rankHistory();
                resp2 = game.LaohuUtils.slotRankToday;
            }
            let atr = [];
            for (let i in resp2.players) {
                atr.push(resp2.players[i]);
            }
            atr.pop();
            this.rankscrollerGroup.itemRenderer = SlotRankItem;
            this.rankscrollerGroup.dataProvider = new eui.ArrayCollection(atr);
            this.myName.text = Global.playerProxy.playerData.nickname;
            let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
            this.myHead.source = headerImage;
            if (resp2.my) {
                if (resp2.my.rank == 0) {
                    this.myrank.visible = false;
                    this.myRankImag.visible = true;
                } else {
                    this.myrank.text = resp2.my.rank + "";
                    this.myGold.text = resp2.my.score + "";
                }

            }
        }


        public onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this.closeBtn:
                    this.closeRankPanel();
                    break;
                case this.todayRank:
                    this.requstRankList(3);
                    break;
                case this.historyRank:
                    this.requstRankList(2);
                    break;
            }
        }

        public closeRankPanel() {
            game.LaohuUtils.slotRankToday = game.LaohuUtils.slotRankHistory = {};
            CF.sN(PanelNotify.CLOSE_SLOT_RANK);
            game.UIUtils.removeSelf(this);
        }

        public requestRank(scene) {
            this.scene = scene;
            this.requstRankList(3);
        }

        public rankToday() {
            this.todayRank.currentState = "down";
            this.historyRank.currentState = "up";
            this.historyRank.touchEnabled = false;
            this.todayRank.touchEnabled = true;
        }

        /**
         * 历史可以点击
         */
        public rankHistory() {
            this.historyRank.currentState = "down";
            this.historyRank.touchEnabled = true;
            this.todayRank.currentState = "up";
            this.todayRank.touchEnabled = false;
        }

        // public async requstRankList(rankType) {
        //     let data;
        //     let resp2;
        //     if (this.scene) {
        //         data = {
        //             rankType: rankType, gameId: 10007, scene: this.scene, skip: 0, limit: 20
        //         }
        //     } else {
        //         data = {
        //             rankType: rankType, gameId: 10007, skip: 0, limit: 20
        //         }
        //     }
        //     if (JSON.stringify(game.LaohuUtils.slotRankHistory) === '{}' || JSON.stringify(game.LaohuUtils.slotRankToday) === '{}') {
        //         resp2 = await game.PomeloManager.instance.request(ServerPostPath.rank_userHandler_c_getRank, data);
        //         if (rankType == 2) {
        //             game.LaohuUtils.slotRankHistory = resp2;
        //             egret.setTimeout(() => {
        //                 this.todayRank.touchEnabled = true;
        //             }, this, 500);
        //         } else if (rankType == 3) {
        //             game.LaohuUtils.slotRankToday = resp2;
        //             egret.setTimeout(() => {
        //                 this.historyRank.touchEnabled = true;
        //             }, this, 500)
        //         }
        //     } else {
        //         if (rankType == 2) {
        //             resp2 = game.LaohuUtils.slotRankHistory;
        //             egret.setTimeout(() => {
        //                 this.todayRank.touchEnabled = true;
        //             }, this, 500);
        //         } else if (rankType == 3) {
        //             resp2 = game.LaohuUtils.slotRankToday;
        //             egret.setTimeout(() => {
        //                 this.historyRank.touchEnabled = true;
        //             }, this, 500)
        //         }
        //     }

        //     if (resp2) {
        //         let atr = [];
        //         for (let i in resp2.players) {
        //             atr.push(resp2.players[i]);
        //         }
        //         atr.pop();
        //         this.rankscrollerGroup.itemRenderer = SlotRankItem;
        //         this.rankscrollerGroup.dataProvider = new eui.ArrayCollection(atr);
        //         this.myName.text = Global.playerProxy.playerData.nickname;
        //         let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
        //         this.myHead.source = headerImage;
        //         if (resp2.my) {
        //             if (resp2.my.rank == 0) {
        //                 this.myrank.visible = false;
        //                 this.myRankImag.visible = true;
        //             } else {
        //                 this.myrank.text = resp2.my.rank + "";
        //                 this.myGold.text = resp2.my.score + "";
        //             }

        //         }
        //     }
        // }
    }
}