// TypeScript file
module slot {
    export class SlotDeskMate extends eui.Component {
        public item: slot.SlotDeskItem;
        public item1: slot.SlotDeskItem;
        public item2: slot.SlotDeskItem;
        public item3: slot.SlotDeskItem;
        public item4: slot.SlotDeskItem;
        public slotDeskItenGroup: eui.Group;
        public openrect: eui.Rect;
        public deskopen: eui.Image;
        public touchonImag: eui.Image;
        public static _instance: SlotDeskMate;
        public binwinGold: eui.BitmapLabel;

        public goldDownAni: DBComponent;

        public static get instance() {
            if (!SlotDeskMate._instance) {
                SlotDeskMate._instance = new SlotDeskMate();
            }
            return SlotDeskMate._instance;
        }

        public constructor() {
            super();
            this.skinName = new SlotDeskMateSkin();
        }

        public createChildren() {
            super.createChildren();
        }

        public initDeskMate() {
            for (let i = 0; i < game.LaohuUtils.slotDeskName.length; i++) {
                this[`item${i + 1}`].initItem(game.LaohuUtils.slotDeskName[i], game.LaohuUtils.slotDeskHead[i], game.LaohuUtils.slotDeskGid[i]);
                if (game.LaohuUtils.slotDeskName.length < 4) {
                    for (let j = game.LaohuUtils.slotDeskName.length; j <= 4; j++) {
                        if (this[`item${j + 1}`]) {
                            this[`item${j + 1}`].playerLeave();
                        }
                    }
                }
            }
        }

        public playerLeave() {
            for (let i = 1; i <= 4; i++) {
                if (this[`item${i}`].gid == game.LaohuUtils.playerEnter.gid) {
                    this[`item${i}`].playerLeave();
                    game.LaohuUtils.slotDeskHead.splice(i - 1, 1);
                    game.LaohuUtils.slotDeskName.splice(i - 1, 1);
                    game.LaohuUtils.slotDeskGid.splice(i - 1, 1);
                    this.initDeskMate();
                }
            }

        }

        public playerEnter() {
            if (game.LaohuUtils.slotDeskGid.length == 4) {
                return;
            }
            game.LaohuUtils.slotDeskName.push(game.LaohuUtils.playerEnter.name);
            game.LaohuUtils.slotDeskHead.push(game.LaohuUtils.playerEnter.head);
            game.LaohuUtils.slotDeskGid.push(game.LaohuUtils.playerEnter.gid);
            this[`item${game.LaohuUtils.slotDeskGid.length}`].playerEnter(game.LaohuUtils.playerEnter.name, game.LaohuUtils.playerEnter.head, game.LaohuUtils.playerEnter.gid)
        }

        // public playerBigwin(data) {
        //     let playerId = data.playerIndex;
        //     let gainGold = data.gainGold;
        //     this.binwinGold.text = gainGold + "";
        //     this.goldDownAni = new DBComponent("slot_desk_win");
        //     this.goldDownAni.play("", 0);
        //     this.goldDownAni.horizontalCenter = 0; this.goldDownAni.bottom = 0;
        //     this.goldDownAni.touchEnabled = false;
        //     this[`baseGroup`].addChild(this.goldDownAni);
        //     this.goldDownAni.resetPosition();
        //     var m = new egret.Shape(); m.graphics.beginFill(0xffffff); m.graphics.drawRect(0, 0, 223, 150);
        //     m.x = 0;
        //     m.y = -40;
        //     m.graphics.endFill();
        //     this.addChild(m);
        //     this[`slotdeskGroup`].mask = m;
        //     for (let i = 0; i < game.LaohuUtils.slotDeskGid.length; i++) {
        //         if (playerId == game.LaohuUtils.slotDeskGid[i]) {
        //             this.item.initItem(game.LaohuUtils.slotDeskName[i], game.LaohuUtils.slotDeskHead[i], game.LaohuUtils.slotDeskGid[i]);
        //         }
        //     }
        //     egret.setTimeout(() => {
        //         this[`winGroup`].visible = false;
        //         this.item.visible = true;
        //         egret.setTimeout(() => {
        //             game.UIUtils.removeSelf(this.goldDownAni);
        //             this.currentState = "common";
        //             this.validateNow();
        //             this[`slotdeskGroup`].mask = null;
        //             game.UIUtils.removeSelf(m);
        //             this[`winGroup`].visible = true;
        //             this.item.visible = false;
        //         }, this, 3000);
        //     }, this, 5000);

        // }

        public touchOn() {
            this.touchonImag.source = "sgws_hall_desk_light_png";
        }

        public touchOff() {
            this.touchonImag.source = "sgws_hall_desk_dack_png";
        }

    }
}