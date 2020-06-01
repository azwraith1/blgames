var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NiuniuColor = (function () {
    function NiuniuColor() {
    }
    // 特殊牌
    NiuniuColor.SPEC = 0;
    // 红桃
    NiuniuColor.HEART = 2;
    // 黑桃
    NiuniuColor.SPADE = 1;
    // 梅花
    NiuniuColor.CLUB = 3;
    // 方块
    NiuniuColor.DIAMOND = 4;
    return NiuniuColor;
}());
__reflect(NiuniuColor.prototype, "NiuniuColor");
var NiuniuPattern = (function () {
    function NiuniuPattern() {
    }
    // 无牛
    NiuniuPattern.NN0 = 0;
    // 牛一
    NiuniuPattern.NN1 = 1;
    // 牛2
    NiuniuPattern.NN2 = 2;
    // 牛3
    NiuniuPattern.NN3 = 3;
    // 牛4
    NiuniuPattern.NN4 = 4;
    // 牛5
    NiuniuPattern.NN5 = 5;
    // 牛6
    NiuniuPattern.NN6 = 6;
    // 牛7
    NiuniuPattern.NN7 = 7;
    // 牛8
    NiuniuPattern.NN8 = 8;
    // 牛9
    NiuniuPattern.NN9 = 9;
    // 牛牛
    NiuniuPattern.NN_NIU = 10;
    // 4花牛
    NiuniuPattern.NN_FOUR_FLOWER = 11;
    // 5花牛
    NiuniuPattern.NN_FIVE_FLOWER = 12;
    // 炸弹牛
    NiuniuPattern.NN_BOOM = 13;
    // 五小牛
    NiuniuPattern.NN_FIVE_SMALL = 14;
    return NiuniuPattern;
}());
__reflect(NiuniuPattern.prototype, "NiuniuPattern");
;
var NiuniuStatus = (function () {
    function NiuniuStatus() {
    }
    NiuniuStatus.running = 0;
    NiuniuStatus.close = 1;
    return NiuniuStatus;
}());
__reflect(NiuniuStatus.prototype, "NiuniuStatus");
var NiuniuStep = (function () {
    function NiuniuStep() {
    }
    NiuniuStep.FAPAI = 3;
    NiuniuStep.QIANG_ZHUANG = 4;
    NiuniuStep.ADDANTE = 5;
    NiuniuStep.XUANPAI = 6;
    NiuniuStep.KAIPAI = 7;
    NiuniuStep.EMPTY = 8;
    NiuniuStep.CLOSE = 9;
    return NiuniuStep;
}());
__reflect(NiuniuStep.prototype, "NiuniuStep");
var NiuniuCode = (function () {
    function NiuniuCode() {
    }
    NiuniuCode.IS_ADDANTED = -10304;
    return NiuniuCode;
}());
__reflect(NiuniuCode.prototype, "NiuniuCode");
