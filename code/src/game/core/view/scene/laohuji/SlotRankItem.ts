// TypeScript file
module slot {
    export class SlotRankItem extends game.BaseItemRender {
        public userHead: eui.Image;
        public userName: eui.Label;
        public userGold: eui.Label;
        public userRank: eui.BitmapLabel;

        public rank: number;
        public gold: number;
        public avatar: any;
        public sex: number;
        public name: string;

        public constructor() {
            super();
            this.skinName = "SlotRankItemSkin";
        }

        protected dataChanged() {
            this.updateShow(this.data);
        }

        public createChildren() {
            super.createChildren();

        }

        public updateShow(data: any) {
            this.rank = data.rank;
            this.gold = data.score;
            this.name = data.ext.nickname;
            this.sex = data.ext.sex;
            this.avatar = data.ext.figure_url;
            switch (this.rank) {
                case 1:
                    this.currentState = "1";
                    this.validateNow();
                    break;
                case 2:
                    this.currentState = "2";
                    this.validateNow();
                    break;
                case 3:
                    this.currentState = "3";
                    this.validateNow();
                    break;
                case 4:
                    this.currentState = "4";
                    this.userRank.text = this.rank + "";
                    this.validateNow();
                    break;
                default:
                    this.currentState = "4";
                    this.userRank.text = this.rank + "";
                    this.validateNow();
                    break;
            }
            this.userHead.source = RES.getRes("hall_header_" + this.sex + "_" + this.avatar + "_png");
            this.userName.text = this.name + "";
            this.userGold.text = this.gold + "";
        }
    }
}