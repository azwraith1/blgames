/*
  *  @Author:  Li  MengChan  
  *  @Date:  2018-07-02  15:04:51  
  *  @Descxription:  加载界面
  */
module game {
    export class LogoScene extends BaseLoginScene {
        public pmdKey: string = "common";
        // protected tipLabel: eui.Label;
        protected progressBar: eui.Image;
        protected maxX: number = 668;
        protected progressGroup: eui.Group;
        protected bgImage: eui.Image;
        public constructor() {
            super();
            this.skinName = new LogoSceneSkin();
        }

        protected showVersions(serverVer, clientVer) {
            this.resVersion.text = TextUtils.instance.getCurrentTextById(70) + serverVer
            this.clientVersion.text = TextUtils.instance.getCurrentTextById(71) + clientVer
        }

        public createChildren() {
            super.createChildren();
            // alert(1);
            //是否是pc
            this.createDb();
            this.resGroups = ["main"];
            // /home/cdgame/logo/platform_18luck
            let windowHerf = window.location.href;
            if (windowHerf.indexOf("127.0.0.1") > -1 || windowHerf.indexOf("192.168") > -1) {
                Global.platfromType = "inner";
                this.bgImage.source = RES.getRes(`plaform_loading_${Global.platfromType}_jpg`)
            } else {
                let str = `./../logo/platform_${Global.platfromType}/plaform_loading_${Global.platfromType}.jpg`;
                RES.getResByUrl(str, (texture) => {
                    this.bgImage.source = texture;
                });
            }
            this.startLogin();
        }

        protected loadingDB: DBComponent;
        protected createDb() {
            this.loadingDB = new DBComponent("loading_db");
            this.progressGroup.addChild(this.loadingDB);
            this.loadingDB.playDefault(-1);
            this.loadingDB.y += 11;
        }
        /**
          *  开始加载资源
          */
        protected beganLoadResGroup() {
            this.resGroup = this.resGroups.pop();
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.resGroup);
        }

        protected onResourceLoadComplete(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                if (this.resGroups.length > 0) {
                    this.beganLoadResGroup();
                } else {
                    this.onResourceLoadOver();
                }
            }
        }

        /**
          *  preload资源组加载进度
          *  loading  process  of  preload  resource
          */
        protected onResourceProgress(e: RES.ResourceEvent): void {
            if (e.groupName == this.resGroup) {
                this.currentLoader++;
                var rate = Math.floor(this.currentLoader / this.totalLoader * 100);
                this.progressBar.width = Math.floor(1008 * rate / 100);
                this.loadingDB.x = this.progressBar.width;
            }
        }


        public onAdded() {
            super.onAdded();
            CF.aE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        }

        public onRemoved() {
            super.onRemoved();
            CF.rE(ENo.RECONNECT_SUC, this.reconnectSuc, this);
        }


        public reconnectSuc() {
            Global.alertMediator.addAlert(TextUtils.instance.getCurrentTextById(64), () => {
                FrameUtils.flushWindow();
            }, null, true)
        }

        /**
         * 资源加载完毕
         */
        public async onResourceLoadOver() {
            RES.loadGroup("common");
            for (let i = 0; i < this.backGroups.length; i++) {
                let name = this.backGroups[i];
                RES.loadGroup(name);
            }
            this.resLoadedOK = true;
            this.checkLoginOver();
        }


        public async checkLoginOver() {
            if (this.resLoadedOK && this.sceneConfigOK) {
                this.userLoginSuc();
            }
        }
    }
}