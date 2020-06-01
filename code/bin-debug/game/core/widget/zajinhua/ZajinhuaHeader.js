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
var zajinhua;
(function (zajinhua) {
    var ZajinhuaHeader = (function (_super) {
        __extends(ZajinhuaHeader, _super);
        function ZajinhuaHeader() {
            var _this = _super.call(this) || this;
            _this.playerStus = 0;
            _this.isLook = false;
            /**
             * 分数加减动画
             */
            _this.count = 0;
            _this.sumFen = 0;
            _this.isBoolen = false;
            _this.skinName = new ZajinhuaHaederSkin();
            return _this;
        }
        ZajinhuaHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.headerImage.mask = this.headerImage_mask;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchOn, this);
            this.liushuiLabel.text = "";
        };
        ZajinhuaHeader.prototype.bpwin2lose = function (isAni) {
            if (isAni) {
                this.addChild(this.bipaiLose);
                this.bipaiLose.scaleX = 1.5;
                this.bipaiLose.scaleY = 1.5;
                this.bipaiLose.visible = true;
                egret.Tween.get(this.bipaiLose).to({ scaleX: 1, scaleY: 1 }, 500);
            }
            else {
                this.bipaiLose.visible = true;
            }
        };
        ZajinhuaHeader.prototype.islook = function (num) {
            this.isLook = num;
        };
        ZajinhuaHeader.prototype.setIndex = function (index) {
            this.index = index;
        };
        ZajinhuaHeader.prototype.showText = function (text) {
            this.beishuGroup.visible = true;
            this.beishuLabel.text = text;
        };
        ZajinhuaHeader.prototype.showBeishu = function (value) {
            this.beishuLabel.visible = value > 0;
            this.beishuLabel.y = this.beishuLabel.y - 1;
            if (value > 0) {
                this.beishuLabel.text = "x" + value;
            }
            this.beishuGroup.visible = true;
        };
        ZajinhuaHeader.prototype.hideBeishu = function () {
            this.beishuGroup.visible = false;
        };
        ZajinhuaHeader.prototype.showBeishuGroup = function () {
            this.beishuGroup.visible = true;
        };
        ZajinhuaHeader.prototype.initWithPlayer = function (playerInfo) {
            if (!playerInfo) {
                this.nameLabel.text = Global.playerProxy.playerData.nickname;
                this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
                this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
            }
            else {
                this.playerInfo = playerInfo;
                this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo.gold);
                this.nameLabel.text = playerInfo.nickname;
                var headerId = playerInfo['figureUrl'] || playerInfo.figure_url;
                var headerSex = playerInfo['sex'] || playerInfo.sex;
                this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
            }
            this.gold = Global.playerProxy.playerData.gold;
        };
        ZajinhuaHeader.prototype.showIsZhuang = function (isZhuang) {
            this.zhuangImage.visible = isZhuang;
            this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
            egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
        };
        ZajinhuaHeader.prototype.exchange45 = function (dir) {
            if (dir == 4 || dir == 5) {
                this.beishuGroup.x = 113;
                this.beishuDb.scaleX = -1;
                this.beishuLabel.x = 15;
            }
        };
        ZajinhuaHeader.prototype.change2Left = function () {
            this.beishuGroup.x = 30 - this.beishuGroup.width;
        };
        ZajinhuaHeader.prototype.showLiushuiLabel = function (gainGold, xiqian) {
            var _this = this;
            this.liushuiLabel.visible = true;
            if (xiqian > 0) {
                this.xiqianGroup.visible = true;
                this.xiqian.font = "zjh_win_number_fnt";
                this.xiqian.text = "+" + xiqian;
                //this.xiqian.x = 180 / 2 - this.xiqian.width / 2;
                this.xiqianImage.x = this.xiqian.x + this.xiqian.width + 10;
            }
            this.gainGold = gainGold;
            this.liushuiLabel.alpha = 0;
            this.liushuiLabel.y = this.liushuiLabel.y + 20;
            egret.Tween.get(this.liushuiLabel).to({ alpha: 0, y: this.liushuiLabel.y }, 50).to({ alpha: 1, y: this.liushuiLabel.y - 20 }, 200);
            this.timer = egret.setInterval(function () {
                _this.scoreAddOrNo();
            }, this, 30);
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            this.goldLabel.text = NumberFormat.formatGold_scence(player.gold);
            // egret.setTimeout(()=>{
            // 	this.updatePlayerGold();
            // }, this, 500);
        };
        //	private goldTime: number = 0;//根据金币不同来调用速度
        ZajinhuaHeader.prototype.scoreAddOrNo = function () {
            this.count++;
            var finalNum = this.gainGold;
            var step = Math.abs(finalNum) / 30;
            this.sumFen = this.sumFen + Math.ceil(step);
            if (this.count >= 20) {
                egret.clearInterval(this.timer);
                if (this.gainGold >= 0) {
                    this.liushuiLabel.font = "zjh_win_number_fnt";
                    this.liushuiLabel.text = "+" + finalNum;
                }
                else {
                    this.liushuiLabel.font = "zjh_lose_number_fnt";
                    this.liushuiLabel.text = "" + finalNum;
                }
            }
            else {
                if (this.gainGold >= 0) {
                    this.liushuiLabel.font = "zjh_win_number_fnt";
                    this.liushuiLabel.text = "+" + ("" + this.sumFen).replace(".00", "");
                }
                else {
                    this.liushuiLabel.font = "zjh_lose_number_fnt";
                    this.liushuiLabel.text = "-" + ("" + this.sumFen).replace(".00", "");
                }
            }
        };
        ZajinhuaHeader.prototype.updatePlayerGold = function () {
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ gold: player.gold }, 500, egret.Ease.quadInOut);
        };
        ZajinhuaHeader.prototype.onChange = function () {
            var str = NumberFormat.formatGold_scence(this.gold) + "";
            this.goldLabel.text = str.replace(".00", "");
        };
        ZajinhuaHeader.prototype.showBiPai = function (value) {
            egret.Tween.removeTweens(this.headerImage_k);
            this.headerImage_k.scaleX = this.headerImage_k.scaleY = 0;
            this.headerImage_k.visible = value;
            this.isBoolen = value;
            egret.Tween.get(this.headerImage_k).to({
                scaleX: 1.2,
                scaleY: 1.2
            }, 100, egret.Ease.sineIn).to({
                scaleX: 1,
                scaleY: 1
            }, 100, egret.Ease.sineOut);
        };
        ZajinhuaHeader.prototype.touchOn = function () {
            var num = { index: this.index, value: this.isBoolen };
            CF.dP(ENo.ZJH_HEADER_TOUCH, num);
        };
        ZajinhuaHeader.prototype.closeBipai = function () {
            this.headerImage_k.visible = false;
            this.isBoolen = false;
        };
        ZajinhuaHeader.prototype.qpVisible = function (value) {
            this.qpGroup.visible = value;
        };
        ZajinhuaHeader.prototype.bplose = function (value) {
            this.bpLose.visible = value;
        };
        return ZajinhuaHeader;
    }(BaseHeader));
    zajinhua.ZajinhuaHeader = ZajinhuaHeader;
    __reflect(ZajinhuaHeader.prototype, "zajinhua.ZajinhuaHeader");
})(zajinhua || (zajinhua = {}));
