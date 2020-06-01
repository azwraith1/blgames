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
var niuniu;
(function (niuniu) {
    var NiuniuNewHeader = (function (_super) {
        __extends(NiuniuNewHeader, _super);
        function NiuniuNewHeader() {
            var _this = _super.call(this) || this;
            _this.skinName = new NiuniuNewHeaderSkin();
            return _this;
        }
        NiuniuNewHeader.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.liushuiLabel.text = "";
        };
        NiuniuNewHeader.prototype.hideLiushuiLabel = function () {
            this.liushuiLabel.visible = false;
        };
        NiuniuNewHeader.prototype.setIndex = function (index) {
            this.index = index;
            // this.indexLabel.text = index + "";
        };
        NiuniuNewHeader.prototype.showBeishu = function (value) {
            this.bqImage.visible = value <= 0;
            this.beishuLabel.visible = value > 0;
            if (value > 0) {
                this.beishuLabel.text = "x" + value;
            }
            this.beishuGroup.visible = true;
        };
        NiuniuNewHeader.prototype.showYZshu = function (value) {
            this.bqImage.visible = false;
            this.beishuLabel.visible = true;
            this.beishuGroup.visible = true;
            this.beishuLabel.text = "x" + value;
        };
        NiuniuNewHeader.prototype.hideBeishu = function () {
            this.bqImage.visible = false;
            this.beishuGroup.visible = false;
        };
        NiuniuNewHeader.prototype.showBeishuGroup = function () {
            this.beishuGroup.visible = true;
        };
        NiuniuNewHeader.prototype.initWithPlayer = function (playerInfo) {
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
        NiuniuNewHeader.prototype.showIsZhuang = function (isZhuang) {
            var _this = this;
            this.zhuangImage.visible = isZhuang;
            if (isZhuang) {
                if (!Global.runBack) {
                    this.zhuangImage.scaleX = this.zhuangImage.scaleY = 0;
                    egret.Tween.get(this.zhuangImage).to({ scaleX: 0, scaleY: 0 }, 50).to({ scaleX: 1.2, scaleY: 1.2 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
                }
                this.setAutoTimeout(function () {
                    _this.headerImage_k.visible = true;
                }, this, 600);
            }
        };
        NiuniuNewHeader.prototype.change2Left = function () {
            this.beishuGroup.x = -40;
            this.zhuangImage.x = 140;
        };
        NiuniuNewHeader.prototype.showWinPng = function (gainGold) {
            if (gainGold > 0) {
                this.winGroup.visible = true;
                this.w1.y = this.w2.y = this.w3.y = this.w1.y + 140;
                this.w1.x = this.w1.x + 40;
                this.w2.x = this.w2.x;
                this.w3.x = this.w3.x - 40;
                for (var i = 0; i < 3; i++) {
                    game.UIUtils.setAnchorPot(this["w" + (i + 1)]);
                    this["w" + (i + 1)].alpha = 0;
                    this["w" + (i + 1)].visible = true;
                    this["w" + (i + 1)].scaleX = this["w" + (i + 1)].scaleY = 0;
                }
                egret.Tween.get(this.w1).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w1.x - 40, y: this.w1.y - 140 }, 300).to({ scaleX: 1, scaleY: 1, }, 100);
                egret.Tween.get(this.w2).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w2.x, y: this.w1.y - 140 }, 400).to({ scaleX: 1, scaleY: 1, }, 100);
                egret.Tween.get(this.w3).to({ scaleX: 1.4, scaleY: 1.4, alpha: 1, x: this.w3.x + 40, y: this.w1.y - 140 }, 500).to({ scaleX: 1, scaleY: 1, }, 100);
            }
        };
        NiuniuNewHeader.prototype.showLiushuiLabel = function (gainGold) {
            var _this = this;
            this.gainGold = gainGold;
            this.moveGold = 0;
            var str;
            if (gainGold >= 0) {
                str = "+" + gainGold;
                this.liushuiLabel.font = RES.getRes("nn_win_fnt_fnt");
            }
            else {
                str = gainGold + "";
                this.liushuiLabel.font = RES.getRes("nn_lose_fnt_fnt");
            }
            this.liushuiLabel.text = "";
            this.liushuiLabel.alpha = 0;
            this.liushuiLabel.y = this.liushuiLabel.y + 20;
            egret.Tween.get(this.liushuiLabel).to({ alpha: 0, y: this.liushuiLabel.y }, 50).to({ alpha: 1, y: this.liushuiLabel.y - 20 }, 200);
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            this.goldLabel.text = NumberFormat.formatGold_scence(player.gold);
            egret.setTimeout(function () {
                _this.updatePlayerGold();
            }, this, 300);
        };
        NiuniuNewHeader.prototype.updatePlayerGold = function () {
            var player = Global.roomProxy.getPlayerInfoByIndex(this.index);
            egret.Tween.get(this, { onChange: this.onChange, onChangeObj: this }).to({ moveGold: this.gainGold }, 500, egret.Ease.quadInOut);
        };
        NiuniuNewHeader.prototype.onChange = function () {
            var gold = NumberFormat.handleFloatDecimal(this.moveGold);
            if (this.moveGold != this.gainGold) {
                gold = Math.floor(gold);
            }
            if (gold >= 0) {
                this.liushuiLabel.text = "+" + gold;
            }
            else {
                this.liushuiLabel.text = "" + gold;
            }
        };
        return NiuniuNewHeader;
    }(BaseHeader));
    niuniu.NiuniuNewHeader = NiuniuNewHeader;
    __reflect(NiuniuNewHeader.prototype, "niuniu.NiuniuNewHeader");
})(niuniu || (niuniu = {}));
