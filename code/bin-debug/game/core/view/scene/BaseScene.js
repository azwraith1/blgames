var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            _this.pmdKey = "base";
            _this.btsBgHeigth = 364;
            return _this;
        }
        BaseScene.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ServerNotify.s_pushTableInviteMessage, this.clubInvite, this);
        };
        BaseScene.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.resetPMDPosition();
            this.showYcGroup();
            if (this.bgMusic) {
                SoundManager.getInstance().playMusic(this.bgMusic);
            }
            PMDComponent.currentRunningScene = this.pmdKey;
        };
        BaseScene.prototype.resetPMDPosition = function () {
        };
        /**
         * 界面中有延迟显示则显示
         */
        BaseScene.prototype.showYcGroup = function () {
            if (this.ycGroup) {
                var child = GameLayerManager.gameLayer().netStatus;
                if (child) {
                    child.x = 0;
                    child.y = 0;
                    this.ycGroup.addChild(child);
                }
            }
        };
        BaseScene.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            this.pauseHandler.destroy();
            CF.rE(ServerNotify.s_pushTableInviteMessage, this.clubInvite, this);
        };
        BaseScene.prototype.paomadeng = function (e) {
            var data = e.data;
            LogUtils.logDJ(data);
        };
        /**
         * 主要用于监听玩家金币变化
         */
        BaseScene.prototype.updateGold = function () {
            _super.prototype.updateGold.call(this);
            if (this['header1'] && this['header1'].updateGold) {
                this['header1'].updateGold(Global.playerProxy.playerData.gold, false);
            }
        };
        BaseScene.prototype.showBtnsType = function (num, type) {
            var numArray = [this.settingBtn, this.recordBtn, this.helpBtn, this.backBtn];
            if (!this.topBtns) {
                this.topBtns = [this.settingBtn.top, this.recordBtn.top, this.helpBtn.top, this.backBtn.top];
            }
            this.settingBtn.visible = (num == 1) ? false : true;
            this.recordBtn.visible = (num == 1) ? false : true;
            this.backBtn.visible = (num == 1) ? false : true;
            this.helpBtn.visible = (num == 1) ? false : true;
            this.xlbtn1.visible = (num == 1) ? false : true;
            this.xlbtn.visible = (num == 1) ? true : false;
            this.btnsbg.height = 0;
            switch (num) {
                case 1:
                    for (var i = 0; i < numArray.length; i++) {
                        egret.Tween.get(numArray[i]).to({ top: this.xlbtn.top }, 200);
                    }
                    egret.Tween.get(this.btnsbg).to({ height: 0 }, 200);
                    this.settingBtn.top = this.recordBtn.top = this.backBtn.top = this.helpBtn.top = this.xlbtn1.top = this.xlbtn.top;
                    break;
                case 2:
                    for (var i = 0; i < numArray.length; i++) {
                        egret.Tween.get(numArray[i]).to({ top: this.topBtns[i] }, 200);
                    }
                    egret.Tween.get(this.btnsbg).to({ height: this.btsBgHeigth }, 200); //364
                    break;
            }
        };
        BaseScene.prototype.clubInvite = function (e) {
            var invitedPanel = new ClubInvitedPanel();
            invitedPanel.initData(e);
            GameLayerManager.gameLayer().tipsLayer.addChild(invitedPanel);
            invitedPanel.horizontalCenter = invitedPanel.verticalCenter = 0;
        };
        return BaseScene;
    }(game.BaseComponent));
    game.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "game.BaseScene");
})(game || (game = {}));
