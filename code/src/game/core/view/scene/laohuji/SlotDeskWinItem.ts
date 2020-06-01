// TypeScript file
module slot {
    export class SlotDeskWinIten extends eui.Component {
        public userGroup: eui.Group;
        public userHead: eui.Image;
        public userName: eui.Label;
        public winGroup: eui.Group;
        public winGold: eui.BitmapLabel;
        public goldDownAni: DBComponent;

        public static _instance: SlotDeskWinIten

        public constructor() {
            super();
            this.skinName = "SlotDeskWinSkin";
        }

        public static get instance() {
            if (!SlotDeskWinIten._instance) {
                SlotDeskWinIten._instance = new SlotDeskWinIten();
            }
            return SlotDeskWinIten._instance;
        }

        public createChildren() {
            super.createChildren();

        }

        public showWin(data) {
            this.goldDownAni = new DBComponent("slot_desk_win");
            this.goldDownAni.play("", 0);
            this.goldDownAni.horizontalCenter = 100; this.goldDownAni.bottom = -45;
            this.goldDownAni.touchEnabled = false;
            this[`baseGroup`].addChild(this.goldDownAni);
            this[`baseGroup`].addChild(this.userGroup); this[`baseGroup`].addChild(this.winGroup);
            this.goldDownAni.resetPosition();

            let playerId = data.playerIndex;
            let gainGold = data.gainGold;
            this.winGold.text = gainGold + "";
            for (let i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
                if (playerId == game.LaohuUtils.slotDeskGid[i]) {
                    this.userHead.source = game.LaohuUtils.slotDeskHead[i];
                    this.userName.text = game.LaohuUtils.slotDeskName[i];
                }
            }
            egret.Tween.get(this.userGroup).to({ alpha: 1 }, 4000).to({ alpha: 0 }, 1000).call(() => {
                this.winGroup.visible = true;
            })
        }

        public remove() {
            game.UIUtils.removeSelf(this);
            SlotDeskWinIten._instance = null;
        }
    }
}