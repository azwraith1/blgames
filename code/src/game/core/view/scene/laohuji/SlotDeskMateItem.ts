// TypeScript file
module slot {
    export class SlotDeskItem extends eui.Component {
        public userHead: eui.Image;
        public userName: eui.Label;
        public gid: any;
        public deskItemGroup: eui.Group;

        public constructor() {
            super();
            this.skinName = new SlotDeskMateItemSkin();
        }

        public createChildren() {
            super.createChildren();
        }

        public initItem(name, head, gid) {
            if (name && head) {
                this.userHead.source = head;
                this.userName.text = name + "";
                this.gid = gid;
                this.deskItemGroup.visible = true;
            }
        }

        public playerLeave() {
            this.deskItemGroup.visible = false;
            this.userHead.source = "";
            this.userName.text = "";

        }

        public playerEnter(name, head, gid) {
            if (name && head) {
                this.userHead.source = head;
                this.userName.text = name + "";
                this.deskItemGroup.visible = true;
                this.gid = gid;
            }
        }
    }
}