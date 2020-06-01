/*
 * @Author: reel MC Lee 
 * @Date: 2019-11-11 14:46:26 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2020-01-03 17:29:46
 * @Description: 
 */
module slot {
    export class SlotHallScene extends game.BaseScene {
        public resizeGroup: eui.Group;
        public headGroup: eui.Group;
        public pmdKey: string = "slot";
        public close_slothall_btn: eui.Image;
        public full_screen_btn: eui.Image;
        public bottomGroup: eui.Group;
        public gold_group: eui.Group;
        public goldLabel: eui.Label;
        public record_btn: eui.Image;
        public setting_btn: eui.Image;
        public userGroup: eui.Group;
        public rank_btn: eui.Group;
        public headImag: eui.Image;
        public headMask: eui.Image;
        public userName: eui.Label;
        public itemGroup: eui.Group;
        public scrollerGroup: eui.Scroller;
        public effectGroup: eui.Group;
        public hallKuangAni: DBComponent;

        public constructor() {
            super();
            this.skinName = new SlotHallSkin();
        }

        public createChildren() {
            super.createChildren();
            game.UIUtils.changeResize(1);
            this.userName.text = Global.playerProxy.playerData.nickname;
            let headerImage = `hall_header_${Global.playerProxy.playerData.sex}_${Global.playerProxy.playerData.figure_url}_png`;
            this.headImag.source = headerImage;
            var m = new egret.Shape(); m.graphics.beginFill(0xffffff); m.graphics.drawCircle(0, 0, 54);
            m.touchEnabled = false;
            m.x = 86, m.y = 64; m.graphics.endFill(); this.userGroup.addChild(m);
            this.headImag.mask = m;
            this.updateGold();
            this.scrollerGroup.scrollPolicyV = "off";
            this.scrollerGroup.bounces = true;
            this.initList();
            this.scrollerGroup.addEventListener(egret.Event.CHANGE, this.scrollerAlphaSet, this);
            this.initHallAni();
            SoundManager.getInstance().playMusic("slot_hall_bg_mp3");

            let publicMsg = PMDComponent.instance;
            publicMsg.anchorOffsetY = 0;
            publicMsg.horizontalCenter = 0;
            publicMsg.top = 10;
            this.resizeGroup.addChild(publicMsg);
        }

        public onAdded() {
            super.onAdded();
            CF.aE(ENo.SLOT_HALL_CLICK, this.enterSlotGame, this);
            CF.aE(ENo.SLOT_HALL_ICON_GOLD, this.addSlotGoldAni, this);
            CF.aE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            CF.aE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.SLOT_HALL_CLICK, this.enterSlotGame, this);
            CF.rE(ENo.SLOT_HALL_ICON_GOLD, this.addSlotGoldAni, this);
            CF.rE(ENo.CHANG_PLAYER_HEADER, this.changHeader, this);
            CF.rE(ServerNotify.s_pushRaceInvite, this.s_pushRaceInvite, this);
        }

        public s_pushRaceInvite() {
            egret.setTimeout(function () {
                MatchInvitePanel.instance.show();
            }, this, 2000);
        }

        public hallRoleAni: DBComponent;//大厅任务动画
        public hallLightAni: DBComponent;//大厅背景灯光特效
        public rankAni: DBComponent;
        /**
         * slot 大厅灯光，人物特效
         */
        public initHallAni() {
            this.hallRoleAni = new DBComponent("slot_hall_role");
            this.hallLightAni = new DBComponent("slot_hall_light");
            this.hallKuangAni = new DBComponent("slot_hall_kuang_ani");
            this.rankAni = DBComponent.create("slot_hall_rank", "slot_hall_rank");
            this.rankAni.play("", 0);
            this.rank_btn.addChild(this.rankAni);
            this.rankAni.resetPosition();
            this.hallLightAni.bottom = 0;
            this.hallLightAni.horizontalCenter = 0;
            this.hallRoleAni.bottom = -70;
            this.hallRoleAni.left = -160;
            this.hallRoleAni.scaleX = this.hallRoleAni.scaleY = 0.8;
            this.hallLightAni.scaleX = this.hallLightAni.scaleY = 2;
            this.hallRoleAni.play("", 0);
            this.hallLightAni.play("", 0);
            this.effectGroup.addChild(this.hallLightAni);
            this.hallLightAni.resetPosition();
            this.resizeGroup.addChild(this.hallRoleAni);
            this.hallRoleAni.resetPosition();
            this.hallRoleAni.touchEnabled = false;
            this.hallKuangAni.play("", 0);
            this.hallKuangAni.bottom = 355;
            this.hallKuangAni.horizontalCenter = -12;
            this.hallKuangAni.touchEnabled = false;
            this.effectGroup.addChild(this.hallKuangAni);
            this.hallKuangAni.resetPosition();
        }

        public onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this.record_btn:
                    CF.sN(PanelNotify.OPEN_DNTG_RECORD_PANEL);
                    break;
                case this.full_screen_btn:
                    // game.UIUtils.fullscreen(this.resizeGroup);
                    game.UIUtils.windowFullscreen();
                    break;
                case this.setting_btn:
                    CF.sN(PanelNotify.OPEN_SETTING);
                    break;
                case this.close_slothall_btn:
                    CF.sN(SceneNotify.CLOSE_LAOHUJI_HALL);
                    CF.sN(SceneNotify.OPEN_MAIN_HALL);
                    break;
                case this.userGroup:
                    CF.sN(PanelNotify.OPEN_HEADER);
                    break;
                case this.rank_btn:
                    this.rankPanel();
                    break;
            }
        }

        public buttonList: SlotHallItem[] = [];
        /**
         * 初始化icon
         */
        private initList() {
            for (let i = 0; i < game.LaohuUtils.slotIndexs.length; i++) {
                let hallbtn = this.slotHallBtn(game.LaohuUtils.slotIndexs[i], game.LaohuUtils.grades[i]);
                if (i % 2 == 0) {
                    hallbtn.x = Math.floor(i / 2) * 301 + 140;
                    hallbtn.y = 20;
                    this.itemGroup.addChild(hallbtn);
                    this.buttonList.push(hallbtn);
                } else {
                    hallbtn.x = Math.floor(i / 2) * 301 + 140;
                    hallbtn.y = 291;
                    this.itemGroup.addChild(hallbtn);
                    this.buttonList.push(hallbtn);
                }
            }
        }

        private changHeader(e: egret.Event) {
            let data = e.data;
            this.headImag.source = `hall_header_${data.sex}_${data.figureUrl}_png`;
            Global.playerProxy.playerData.figure_url = data.figureUrl;
            Global.playerProxy.playerData.sex = data.sex;
        }
        /**
         * 创建icon
         * @param  {} index
         * @param  {} grade
         */
        public slotHallBtn(index, grade) {
            let hallbtn = new SlotHallItem(index, grade);
            return hallbtn;
        }
        /**
         * 点击icon进入游戏
         * @param  {egret.Event} e
         */
        public enterSlotGame(e: egret.Event) {
            let data = e.data.gameId;
            enterSlotScene(data);
        }
        /**
         * 大厅icon渐隐（未使用）
         */
        public scrollerAlphaSet() {
            let s = this.scrollerGroup.viewport.scrollH;
            for (let i = 0; i < this.buttonList.length; i++) {
                let button = this.buttonList[i];
                button.checkAlapa(s, this.itemGroup.width);
            }
        }

        public addSlotGoldAni(e: egret.Event) {
            let gameId = game.LaohuUtils.gamename(e.data.sceneName);
            for (let i = 0; i < this.buttonList.length; i++) {
                let button = this.buttonList[i];
                if (button.index == gameId) {
                    button.iconGoldAni();
                }
            }
        }
        //排行榜类型
        // RANK_TYPE: {
        //     ALL: 0,
        //     HU_CARD: 1, //胡牌榜
        //     WIN_GOLD: 2,//赢钱榜
        //     WIN_GOLD_DAILY: 3,//每日赢钱榜
        // },
        public async rankPanel() {
            CF.sN(PanelNotify.OPEN_SLOT_RANK);
        }

    }
}