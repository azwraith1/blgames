// TypeScript file
module slot {
    export class SlotAutoTips extends game.BaseComponent {
        public static _instance: SlotAutoTips;
        public resizeGroup: eui.Group;
        public closeBtn: eui.Image;
        public quedingBtn: eui.Button;
        public cancelBtn: eui.Button;

        public constructor() {
            super();
            this.skinName = "SlotAuotTipsPanel";
        }

        public static get instance() {
            if (!SlotAutoTips._instance) {
                SlotAutoTips._instance = new SlotAutoTips();
            }
            return SlotAutoTips._instance;
        }
    }
}