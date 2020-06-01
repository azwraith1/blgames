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
var majiang;
(function (majiang_1) {
    var MajiangHupaiGroup = (function (_super) {
        __extends(MajiangHupaiGroup, _super);
        function MajiangHupaiGroup(direction) {
            var _this = _super.call(this) || this;
            _this.majiangs = [];
            return _this;
            // this.skinName = new HupaiGroupSkin();	
        }
        MajiangHupaiGroup.prototype.onAdded = function () {
            _super.prototype.onAdded.call(this);
            CF.aE(ENo.FIND_COLOR, this.findColor, this);
        };
        MajiangHupaiGroup.prototype.onRemoved = function () {
            _super.prototype.onRemoved.call(this);
            CF.rE(ENo.FIND_COLOR, this.findColor, this);
        };
        /**
         * 查找颜色相同的
         * @param  {egret.Event} e
         */
        MajiangHupaiGroup.prototype.findColor = function (e) {
            var value = e.data;
            for (var i = 0; i < this.majiangs.length; i++) {
                this.majiangs[i].showMaskRect(value);
            }
        };
        MajiangHupaiGroup.prototype.initWithDirection = function (direction) {
            this.direction = direction;
            this.positions = this.createRecords();
        };
        MajiangHupaiGroup.prototype.createRecords = function () {
            this.records = {};
            switch (this.direction) {
                case "mine":
                    return [{ x: 0, y: 0 }, { x: 44, y: 0 }, { x: 88, y: 0 }];
                case "left":
                    return [{ x: 0, y: 0 }, { x: -5.5, y: 37 }, { x: -11, y: 75 }];
                case "right":
                    return [{ x: 9, y: 48 }, { x: 4.5, y: 24 }, { x: 0, y: 0 }];
                case "top":
                    return [{ x: 70, y: 0 }, { x: 35, y: 0 }, { x: 0, y: 0 }];
            }
        };
        MajiangHupaiGroup.prototype.initWithArr = function (huCards) {
            for (var i = 0; i < huCards.length; i++) {
                var huCard = huCards[i];
                this.addHu(huCard);
            }
        };
        MajiangHupaiGroup.prototype.addHousePai = function () {
            var hupai = this.addBuhua(-1);
            hupai.change2bei();
        };
        MajiangHupaiGroup.prototype.showHouseValue = function (value, state) {
            var pai = this.majiangs[0];
            pai.showHouseValue(value);
            pai.setMaiMaMaskColor(state);
        };
        MajiangHupaiGroup.prototype.addBuhua = function (card) {
            var hupai = new majiang_1.MajiangHupai(this.direction, card);
            var numberIndex = this.majiangs.length;
            var row = Math.floor(numberIndex / 3);
            var cow = numberIndex % 3;
            hupai.index = numberIndex + 1;
            this.addChild(hupai);
            this.majiangs.push(hupai);
            switch (this.direction) {
                case "mine":
                    hupai.x = this.positions[cow].x + (row * 5);
                    hupai.y = this.positions[cow].y + (row * -17);
                    break;
                case "left":
                    hupai.x = this.positions[cow].x + (row * -4);
                    hupai.y = this.positions[cow].y + (row * -18);
                    break;
                case "right":
                    hupai.x = this.positions[cow].x + (row * 4);
                    hupai.y = this.positions[cow].y + (row * -18);
                    break;
                case "top":
                    hupai.x = this.positions[cow].x + (row * -2);
                    hupai.y = this.positions[cow].y + (row * -20);
                    break;
            }
            this.resetZorder();
            return hupai;
        };
        MajiangHupaiGroup.prototype.addHu = function (huJson, type) {
            if (type === void 0) { type = 0; }
            var hu = huJson.card;
            var hupai = new majiang_1.MajiangHupai(this.direction, hu);
            if (huJson.mainCard == true) {
                hupai.alpha = 0.7;
            }
            var numberIndex = this.majiangs.length;
            var row = Math.floor(numberIndex / 3);
            var cow = numberIndex % 3;
            hupai.index = numberIndex + 1;
            this.addChild(hupai);
            this.majiangs.push(hupai);
            switch (this.direction) {
                case "mine":
                    hupai.x = this.positions[cow].x + (row * 5);
                    hupai.y = this.positions[cow].y + (row * -17);
                    break;
                case "left":
                    hupai.x = this.positions[cow].x + (row * -4);
                    hupai.y = this.positions[cow].y + (row * -18);
                    break;
                case "right":
                    hupai.x = this.positions[cow].x + (row * 4);
                    hupai.y = this.positions[cow].y + (row * -18);
                    break;
                case "top":
                    hupai.x = this.positions[cow].x + (row * -2);
                    hupai.y = this.positions[cow].y + (row * -20);
                    break;
            }
            this.resetZorder();
            // if(Global.runBack){
            // 	return;
            // }
            switch (type) {
                case 1:
                    //点炮
                    hupai.showDianpao();
                    break;
                case 2:
                    //自摸
                    hupai.alpha = 0;
                    hupai.showZimo();
            }
        };
        MajiangHupaiGroup.prototype.resetZorder = function () {
            switch (this.direction) {
                case "mine":
                    var groups = _.groupBy(this.majiangs, 'y');
                    for (var key in groups) {
                        for (var i = groups[key].length - 1; i >= 0; i--) {
                            this.addChild(groups[key][i]);
                        }
                    }
                    break;
                case "left":
                    break;
                case "right":
                    var groups = _.groupBy(this.majiangs, function (majiang) {
                        return Math.floor((majiang.index - 1) / 3);
                    });
                    for (var key in groups) {
                        for (var i = groups[key].length - 1; i >= 0; i--) {
                            this.addChild(groups[key][i]);
                        }
                    }
                    break;
                case "top":
                    var groups = _.groupBy(this.majiangs, 'y');
                    for (var key in groups) {
                        for (var i = groups[key].length - 1; i >= 0; i--) {
                            this.addChild(groups[key][i]);
                        }
                    }
            }
        };
        return MajiangHupaiGroup;
    }(game.BaseUI));
    majiang_1.MajiangHupaiGroup = MajiangHupaiGroup;
    __reflect(MajiangHupaiGroup.prototype, "majiang.MajiangHupaiGroup");
})(majiang || (majiang = {}));
