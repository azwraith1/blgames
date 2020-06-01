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
var bjle;
(function (bjle) {
    var BJLPlayerHeader = (function (_super) {
        __extends(BJLPlayerHeader, _super);
        function BJLPlayerHeader() {
            var _this = _super.call(this) || this;
            /**
             * 分数加减动画
             */
            _this.count = 0;
            _this.sumFen = 0;
            _this.skinName = new BJLPlayerHeaderSkin();
            return _this;
        }
        BJLPlayerHeader.prototype.showWin = function (num) {
            if (num == 1) {
                this.playerGold.visible = false;
                this.playerGold.x = -43;
                this.playerGold.y = -46;
            }
        };
        BJLPlayerHeader.prototype.addDb = function (obj) {
            //this.dbGroup.height
            this.dbGroup.addChild(obj);
        };
        BJLPlayerHeader.prototype.showLiushuiLabel = function (gainGold) {
            var _this = this;
            this.playerGold.text = 0 + "";
            this.count = 0;
            this.sumFen = 0;
            this.playerGold.visible = true;
            this.gainGold = gainGold;
            this.playerGold.visible = true;
            this.playerGold.alpha = 0;
            this.playerGold.y = this.playerGold.y + 20;
            egret.Tween.get(this.playerGold).to({ alpha: 0, y: this.playerGold.y }, 50).to({ alpha: 1, y: this.playerGold.y - 20 }, 50).call(function () {
                _this.timer = egret.setInterval(function () {
                    _this.scoreAddOrNo();
                }, _this, 30);
            });
        };
        BJLPlayerHeader.prototype.scoreAddOrNo = function () {
            this.count++;
            var finalNum = this.gainGold;
            var step = Math.abs(finalNum) / 30;
            this.sumFen = this.sumFen + Math.ceil(step);
            if (this.count > 20) {
                egret.clearInterval(this.timer);
                this.playerGold.text = "+" + finalNum;
            }
            else {
                this.playerGold.text = "+" + this.sumFen;
            }
        };
        BJLPlayerHeader.prototype.initWithPlayer = function (playerInfo, bjl) {
            if (!playerInfo) {
                this.nameLabel.text = Global.playerProxy.playerData.nickname;
                this.headerImage.source = "hall_header_" + Global.playerProxy.playerData.sex + "_" + Global.playerProxy.playerData.figure_url + "_png";
                this.goldLabel.text = NumberFormat.formatGold_scence(Global.playerProxy.playerData.gold);
            }
            else {
                this.playerInfo = playerInfo;
                if (bjl == 1) {
                    this.no2image.visible = false;
                    this.no1image.visible = true;
                    this.no1image.source = RES.getRes("bjle_header_no1" + CF.tic);
                    this.no1orSsz.source = RES.getRes("bjle_header_fh1" + CF.tic);
                    this.fuhao.source = RES.getRes("bjle_header_fh_red" + CF.tic);
                    this.king.visible = true;
                }
                else if (bjl == 10) {
                    this.no2image.visible = false;
                    this.no1image.visible = false;
                    this.king.visible = false;
                    this.fuhao.visible = false;
                    this.no1orSsz.source = RES.getRes("bjle_header_ssz" + CF.tic);
                }
                else {
                    this.no2image.visible = true;
                    this.no2image.source = RES.getRes("bjle_header_no" + bjl + CF.tic);
                    this.no1orSsz.source = RES.getRes("bjle_header_fh1" + CF.tic);
                    this.fuhao.source = RES.getRes("bjle_header_fh_yellow" + CF.tic);
                    this.no1image.visible = false;
                    this.king.visible = false;
                }
                this.nameLabel.text = playerInfo.nickname || playerInfo.name;
                var headerId = playerInfo['figureUrl'] || playerInfo['url'];
                var headerSex = playerInfo['sex'] || playerInfo.sex;
                this.headerImage.source = "hall_header_" + headerSex + "_" + headerId + "_png";
            }
            //新增更新其他玩家的金币
            this.goldLabel.text = NumberFormat.formatGold_scence(playerInfo["gold"]);
            // this.indexLabel.text = playerInfo.playerIndex || playerInfo.pIndex;
            this.index = playerInfo.playerIndex || playerInfo.pIndex;
        };
        return BJLPlayerHeader;
    }(BaseHeader));
    bjle.BJLPlayerHeader = BJLPlayerHeader;
    __reflect(BJLPlayerHeader.prototype, "bjle.BJLPlayerHeader");
})(bjle || (bjle = {}));
