/**
 * 
 */

module game {
    export class AlertPanel extends BaseComponent {
        public tipsText: string;
        public labelTxt: eui.Label;

        private btnOk: eui.Button;
        private btnNo: eui.Button;
        private onlyOkBtn: boolean;
        public okCallback: Function;
        public noCallback: Function;
        protected tipsImage: eui.Image;
        private haveColor: boolean = false;
        public constructor(tipContentData: any) {
            super();
            this.tipsText = tipContentData.tips;
            if (tipContentData.haveColor) {
                this.haveColor = tipContentData.haveColor;
            }
            this.okCallback = tipContentData.okCallback || null;
            this.noCallback = tipContentData.noCallback || null;
            this.onlyOkBtn = tipContentData.onlyOkBtn || false;
            if (GameConfig.CURRENT_ISSHU && AlertShuSkin) {
                this.skinName = new AlertShuSkin();
                return;
            }
            this.skinName = new AlertSkin();
        }

        private setTxtColor(initGold: number, curGainGold: number, overloadBackGold: number) {
            this.labelTxt.textFlow = (new egret.HtmlTextParser).parser(
                '<font>本局携带金额为</font>'
                + '<font color=0x159b7a>' + initGold + '</font>'
                + '<font>,当前赢取</font>'
                + '<font color=0x159b7a>' + curGainGold + '</font>'
                + '<font>,以小博大退还</font>'
                + '<font color=0x159b7a>' + overloadBackGold + '</font>'
            );
        }
        public onTouchTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this.btnOk:
                    this.btnOkTouchEnded();
                    break;
                case this.btnNo:
                    this.btnNoTouchEnded();
                    break;
            }
            e.stopPropagation();
        }


        public btnNoTouchEnded() {
            if (this.noCallback) {
                this.noCallback();
            }
            this.btnNo.touchEnabled = false;
            CF.sN(PanelNotify.CLOSE_ALERT);
        }

        public btnOkTouchEnded() {
            if (this.okCallback) {
                this.okCallback();
            }
            this.btnOk.touchEnabled = false;
            CF.sN(PanelNotify.CLOSE_ALERT);
        }

        protected createChildren() {
            super.createChildren();

            if (this.onlyOkBtn) {
                this.btnOk.horizontalCenter = 0;
                this.btnNo.visible = false;
            }
            if (this.haveColor) {
                this.setTxtColor(this.tipsText["initGold"], this.tipsText["curGainGold"], this.tipsText["overloadBackGold"]);
            }
            else {
                this.labelTxt && (this.labelTxt.text = this.tipsText);
            }
            this.tipsImage.source = RES.getRes(`alert_wz${CF.tic}`)
            this.btnOk.labelDisplay.text = TextUtils.instance.getCurrentTextById(83);
            this.btnNo.labelDisplay.text = TextUtils.instance.getCurrentTextById(104);
        }

        public onAdded() {
            super.onAdded();
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.EVENT_RESIZE, this.eventResize, this);
        }


    }
}