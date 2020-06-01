var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var majiang;
(function (majiang) {
    var MajiangUtils = (function () {
        function MajiangUtils() {
        }
        /**
         * 根据庄家排序
         * @param  {number} zhuangIndex
         */
        MajiangUtils.getDirectionSortByZhuang = function (zhuangIndex) {
            var arr = [];
            switch (zhuangIndex) {
                case 1:
                    arr = [1, 2, 3, 4];
                    break;
                case 2:
                    arr = [2, 3, 4, 1];
                    break;
                case 3:
                    arr = [3, 4, 1, 2];
                    break;
                case 4:
                    arr = [4, 1, 2, 3];
                    break;
            }
            return arr;
        };
        MajiangUtils.getDirectionSortByZhuangERMJ = function (zhuangIndex) {
            var arr = [];
            switch (zhuangIndex) {
                case 1:
                    arr = [1, 2];
                    break;
                case 2:
                    arr = [2, 1];
                    break;
            }
            return arr;
        };
        /**
         * 根据庄家排序
         * @param  {number} zhuangIndex
         */
        MajiangUtils.getDirectionSortByZhuangHBMJ = function (zhuangIndex) {
            var arr = [];
            switch (zhuangIndex) {
                case 1:
                    arr = [1, 2, 3];
                    break;
                case 2:
                    arr = [2, 3, 1];
                    break;
                case 3:
                    arr = [3, 1, 2];
                    break;
            }
            return arr;
        };
        /**
         * 根据自己的位子获取方位
         * @param  {number} mineIndex
         */
        MajiangUtils.getDirectionByMine = function (mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "mine";
                    direction["2"] = "right";
                    direction["3"] = "top";
                    direction['4'] = "left";
                    break;
                case 2:
                    direction["2"] = "mine";
                    direction["3"] = "right";
                    direction["4"] = "top";
                    direction['1'] = "left";
                    break;
                case 3:
                    direction["3"] = "mine";
                    direction["4"] = "right";
                    direction["1"] = "top";
                    direction['2'] = "left";
                    break;
                case 4:
                    direction["4"] = "mine";
                    direction["1"] = "right";
                    direction["2"] = "top";
                    direction['3'] = "left";
                    break;
            }
            return direction;
        };
        /**
         * 根据自己的位子获取方位
         * @param  {number} mineIndex
         */
        MajiangUtils.getDirectionByMineNumber = function (mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "1";
                    direction["2"] = "2";
                    direction["3"] = "3";
                    direction['4'] = "4";
                    break;
                case 2:
                    direction["2"] = "1";
                    direction["3"] = "2";
                    direction["4"] = "3";
                    direction['1'] = "4";
                    break;
                case 3:
                    direction["3"] = "1";
                    direction["4"] = "2";
                    direction["1"] = "3";
                    direction['2'] = "4";
                    break;
                case 4:
                    direction["4"] = "1";
                    direction["1"] = "2";
                    direction["2"] = "3";
                    direction['3'] = "4";
                    break;
            }
            return direction;
        };
        MajiangUtils.getDirStrByHBMJ = function (winIndex, mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "本家";
                    direction["2"] = "下家";
                    direction["3"] = "上家";
                    break;
                case 2:
                    direction["2"] = "本家";
                    direction["3"] = "下家";
                    direction['1'] = "上家";
                    break;
                case 3:
                    direction["3"] = "本家";
                    direction["1"] = "下家";
                    direction['2'] = "上家";
                    break;
            }
            return direction[winIndex];
        };
        /**
         * 根据自己的位子获取方位
         * @param  {number} mineIndex
         */
        MajiangUtils.getDirectionByHBMJ = function (mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "mine";
                    direction["2"] = "right";
                    direction['3'] = "left";
                    break;
                case 2:
                    direction["2"] = "mine";
                    direction["3"] = "right";
                    direction['1'] = "left";
                    break;
                case 3:
                    direction["3"] = "mine";
                    direction["1"] = "right";
                    direction['2'] = "left";
                    break;
            }
            return direction;
        };
        MajiangUtils.getDirStrByERMJ = function (winIndex, mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "本家";
                    direction["2"] = "对家";
                    break;
                case 2:
                    direction["2"] = "本家";
                    direction['1'] = "对家";
                    break;
            }
            return direction[winIndex];
        };
        /**
         * 根据自己的位子获取方位
         * @param  {number} mineIndex
         */
        MajiangUtils.getDirectionByERMJ = function (mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "mine";
                    direction["2"] = "top";
                    break;
                case 2:
                    direction["2"] = "mine";
                    direction['1'] = "top";
                    break;
            }
            return direction;
        };
        MajiangUtils.getDirStr = function (winIndex, mineIndex) {
            var direction = {};
            switch (mineIndex) {
                case 1:
                    direction["1"] = "本家";
                    direction["2"] = "下家";
                    direction["3"] = "对家";
                    direction['4'] = "上家";
                    break;
                case 2:
                    direction["2"] = "本家";
                    direction["3"] = "下家";
                    direction["4"] = "对家";
                    direction['1'] = "上家";
                    break;
                case 3:
                    direction["3"] = "本家";
                    direction["4"] = "下家";
                    direction["1"] = "对家";
                    direction['2'] = "上家";
                    break;
                case 4:
                    direction["4"] = "本家";
                    direction["1"] = "下家";
                    direction["2"] = "对家";
                    direction['3'] = "上家";
                    break;
            }
            return direction[winIndex];
        };
        /**
         * 判断麻将花色是否一样
         * @param  {} mj1
         * @param  {} mj2
         */
        MajiangUtils.checkMajiangSameColor = function (value1, value2) {
            return Math.floor(value1 / 10) == Math.floor(value2 / 10);
        };
        /**
         * 获取我当前花色最少的颜色
         * @param  {} shoupaiArr
         */
        MajiangUtils.getColorLatestNum = function (shoupaiArr) {
            var group = _.groupBy(shoupaiArr, function (val) {
                return Math.floor(val / 10);
            });
            var num1 = group[1] ? group[1].length : 0;
            var num2 = group[2] ? group[2].length : 0;
            var num3 = group[3] ? group[3].length : 0;
            var sortGroup = [{ type: 1, value: num1 }, { type: 2, value: num2 }, { type: 3, value: num3 }];
            var sortGroup1 = _.sortBy(sortGroup, "value");
            return sortGroup1[0].type;
        };
        /**
         * 获取转换过后的战绩流水详情
         * @param  {} type
         * @param  {} value
         */
        MajiangUtils.getBiliTypeStr = function (type, value, from) {
            var typeStr = value > 0 ? "" : "被";
            switch (type) {
                case 0:
                    return "房费";
                case 1:
                    return typeStr + "杠牌";
                case 2:
                    return this.getHuTypeStr(type, value, from, Global.gameProxy.getMineIndex());
                case 3:
                    if (value > 0) {
                        return "查叫";
                    }
                    else {
                        return "未听牌";
                    }
                case 4:
                    if (value > 0) {
                        return "查花猪";
                    }
                    else {
                        return "花猪";
                    }
                case 5:
                    return typeStr + "退税";
                case 17:
                    return "以小博大";
            }
        };
        /**
         * 获取转换过后的战绩流水详情
         * @param  {} type
         * @param  {} value
         */
        MajiangUtils.getMatchBiliTypeStr = function (type, value, from, key) {
            var typeStr = value > 0 ? "" : "被";
            switch (type) {
                case 0:
                    return "房费";
                case 1:
                    return typeStr + "杠牌";
                case 2:
                    return this.getHuTypeStr(type, value, from, key);
                case 3:
                    if (value > 0) {
                        return "查叫";
                    }
                    else {
                        return "未听牌";
                    }
                case 4:
                    if (value > 0) {
                        return "查花猪";
                    }
                    else {
                        return "花猪";
                    }
                case 5:
                    return typeStr + "退税";
                case 17:
                    return "以小博大";
            }
        };
        MajiangUtils.getHuTypeStr = function (type, value, from, mineIndex) {
            if (value > 0) {
                if (mineIndex == from) {
                    return "自摸";
                }
                else {
                    return "胡牌";
                }
            }
            else {
                if (mineIndex == from) {
                    return "点炮";
                }
                else {
                    return "被自摸";
                }
            }
        };
        //smart
        MajiangUtils.getGangTypeStr = function (type, value) {
            var typeStr = value > 0 ? "" : "被";
            switch (type) {
                case 1:
                case 3:
                    return typeStr + "刮风";
                case 2:
                case 4:
                    return typeStr + "下雨";
            }
        };
        MajiangUtils.getGangTypeStr1 = function (type, value, from, mineIndex) {
            //samrt
            var fromdirection = "(" + this.getDirStr(from, mineIndex) + ")";
            fromdirection = "";
            var typeStr = value > 0 ? "" : "被";
            switch (type) {
                case 1:
                case 3:
                    return typeStr + "刮风" + fromdirection;
                case 2:
                case 4:
                    return typeStr + "下雨" + fromdirection;
            }
        };
        MajiangUtils.getGangTypePTStr = function (type, value) {
            var typeStr = value > 0 ? "" : "被";
            switch (type) {
                case 1:
                case 3:
                    return typeStr + "杠";
                case 2:
                case 4:
                    return typeStr + "暗杠";
                case 5:
                    return typeStr + "杠上杠";
            }
        };
        /**
         * 寻找剩余几张牌
         * @param  {number} value
         */
        MajiangUtils.findValueLess = function (value) {
            var cardNum = 4;
            var players = Global.gameProxy.getPlayers();
            for (var playerIndex in players) {
                var player = players[playerIndex];
                //手牌
                if (player.cards && playerIndex == Global.gameProxy.getMineIndex() + "") {
                    cardNum -= this.findCountByArray(value, Global.gameProxy.getMineShuopaiArr());
                }
                else {
                    if (player.displayCard) {
                        for (var key in player.displayCard) {
                            if (game.Utils.valueEqual(key, value)) {
                                cardNum -= player.displayCard[key];
                            }
                        }
                    }
                }
                if (player.gangCards) {
                    cardNum -= this.findCountByArray(value, player.gangCards) * 4;
                }
                if (player.pengCards) {
                    cardNum -= this.findCountByArray(value, player.pengCards) * 3;
                }
                if (player.playCards) {
                    cardNum -= this.findCountByArray(value, player.playCards);
                }
                if (player.chiCards) {
                    for (var i = 0; i < player.chiCards.length; i++) {
                        var maxCard = player.chiCards[i].selectCard;
                        if ((maxCard - value) >= 0 && (maxCard - value) <= 2) {
                            cardNum -= 1;
                        }
                    }
                }
            }
            //减去胡牌task中一炮多响的牌
            var hutasks = Global.gameProxy.roomInfo.huTasks || [];
            for (var i = 0; i < hutasks.length; i++) {
                if (hutasks[i].card == value && hutasks[i].mainCard != true) {
                    cardNum--;
                }
            }
            if (cardNum < 0) {
                cardNum = 0;
            }
            return cardNum;
        };
        /**
         * 寻找元素在集合中存在多少个
         * @param  {} value
         * @param  {} arr
         */
        MajiangUtils.findCountByArray = function (value, arr) {
            var count = 0;
            for (var i = 0; i < arr.length; i++) {
                if (typeof arr[i] == "object") {
                    if (value == arr[i].card) {
                        count++;
                    }
                }
                else if (value == arr[i]) {
                    count++;
                }
            }
            return count;
        };
        //------------------- 声音控制方法----------------------------------------------------
        /**
         * 播放出牌的声音。
         * sex性别，value打的牌面值。
         */
        MajiangUtils.playCardSound = function (sex, value) {
            var playerSound = sex == 1 ? "sc_boy_" : "sc_girl_";
            var nums = MajiangConfig.getSoundConfig()[playerSound][value];
            if (!nums) {
                return;
            }
            var count = nums[Math.floor(_.random(0, nums.length - 1))];
            var colorStr;
            var val = Math.floor(value % 10);
            switch (Math.floor(value / 10)) {
                case 1:
                    colorStr = "tong";
                    break;
                case 2:
                    colorStr = "tiao";
                    break;
                case 3:
                    colorStr = "wan";
                    break;
            }
            var sound = playerSound + val + colorStr + count + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         * 播放胡碰杠的声音。
         *  sex性别，type 1，碰牌 2杠 3暗杠 4自摸 5胡
         */
        MajiangUtils.playHPGSound = function (sex, type) {
            var playerSound = sex == 1 ? "sc_boy_" : "sc_girl_";
            var str = this.hpgType(type);
            var nums = MajiangConfig.getSoundConfig()[playerSound][str];
            var count = nums[Math.floor(_.random(0, nums.length - 1))];
            if (str == "xiayu") {
                str = "gang";
            }
            var sound = playerSound + str + count + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        /**
         * 播放普通话
         * @param  {} sex
         * @param  {} type
         */
        MajiangUtils.playMJPTHSound = function (sex, soundName) {
            var playerSound = sex == 1 ? "mj_man_" : "mj_woman_";
            var sound = playerSound + soundName + "_mp3";
            SoundManager.getInstance().playEffect(sound);
        };
        MajiangUtils.hpgType = function (value) {
            switch (value) {
                case 1:
                    return "peng";
                case 2:
                    return "gang";
                case 3:
                    return "xiayu";
                case 4:
                    return "zimo";
                case 5:
                    return "hu";
            }
        };
        /**
         * 播放点点击效果
         */
        MajiangUtils.playClick = function () {
            SoundManager.getInstance().playEffect("ui_click_mp3");
        };
        MajiangUtils.updateCardsNum = function (cards, value, addNum) {
            var num = cards[value];
            if (!num) {
                if (addNum > 0) {
                    cards[value] = addNum;
                }
            }
            else {
                num += addNum;
                if (num < 1) {
                    delete cards[value];
                }
                else {
                    cards[value] = num;
                }
            }
        };
        /**
         * 获取玩家手牌
         */
        MajiangUtils.getCardArrByIndex = function (playerData) {
            var cards = playerData.cards;
            var queCards = [];
            var cardsArr = [];
            var lastMajiang = playerData.lastCard;
            for (var key in cards) {
                var num = cards[key];
                for (var i = 0; i < num; i++) {
                    if (Math.floor(parseInt(key) / 10) == playerData.selectColor) {
                        queCards.push(parseInt(key));
                    }
                    else {
                        cardsArr.push(parseInt(key));
                    }
                }
            }
            var returnCard = cardsArr.concat(queCards);
            if (playerData.lastCard) {
                game.Utils.removeArrayItem(returnCard, lastMajiang);
                returnCard.push(lastMajiang);
            }
            return returnCard;
        };
        /**
         * 获取玩家手牌
         */
        MajiangUtils.getCardArrByJson = function (cardJson) {
            var data = [];
            for (var key in cardJson) {
                var num = cardJson[key];
                for (var i = 0; i < num; i++) {
                    data.push(+key);
                }
            }
            return data;
        };
        /**
         * 获取玩家手牌
         */
        MajiangUtils.getMJChinese = function (cardValue) {
            if (cardValue < 40) {
                var color = Math.floor(cardValue / 10);
                var value = cardValue % 10;
                var valueStr = this.changeALB2ZW(value);
                switch (color) {
                    case 1: return valueStr + "筒";
                    case 2: return valueStr + "条";
                    case 3: return valueStr + "万";
                }
            }
            else {
                switch (cardValue) {
                    case 41: return "东";
                    case 42: return "南";
                    case 43: return "西";
                    case 44: return "北";
                    case 45: return "發";
                    case 46: return "白";
                    case 47: return "中";
                }
            }
        };
        /**
         * 阿拉伯数字转中文
         */
        MajiangUtils.changeALB2ZW = function (num) {
            switch (num) {
                case 1: return "一";
                case 2: return "二";
                case 3: return "三";
                case 4: return "四";
                case 5: return "五";
                case 6: return "六";
                case 7: return "七";
                case 8: return "八";
                case 9: return "九";
            }
        };
        return MajiangUtils;
    }());
    majiang.MajiangUtils = MajiangUtils;
    __reflect(MajiangUtils.prototype, "majiang.MajiangUtils");
})(majiang || (majiang = {}));
