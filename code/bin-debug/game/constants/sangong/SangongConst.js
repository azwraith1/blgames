var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SangongColor = (function () {
    function SangongColor() {
    }
    // 特殊牌
    SangongColor.SPEC = 0;
    // 红桃
    SangongColor.HEART = 2;
    // 黑桃
    SangongColor.SPADE = 1;
    // 梅花
    SangongColor.CLUB = 3;
    // 方块
    SangongColor.DIAMOND = 4;
    return SangongColor;
}());
__reflect(SangongColor.prototype, "SangongColor");
var SangongPattern = {
    SG0: 0,
    SG1: 1,
    SG2: 2,
    SG3: 3,
    SG4: 4,
    SG5: 5,
    SG6: 6,
    SG7: 7,
    SG8: 8,
    SG9: 9,
    THREE_GONG: 10,
    BIG_THREE_GONG: 11,
    SUPREMACY: 12,
};
//三公牌型倍数
var patternScore = {};
patternScore[SangongPattern.SG0] = 1;
patternScore[SangongPattern.SG1] = 1;
patternScore[SangongPattern.SG2] = 1;
patternScore[SangongPattern.SG3] = 1;
patternScore[SangongPattern.SG4] = 1;
patternScore[SangongPattern.SG5] = 1;
patternScore[SangongPattern.SG6] = 1;
patternScore[SangongPattern.SG7] = 2;
patternScore[SangongPattern.SG8] = 2;
patternScore[SangongPattern.SG9] = 2;
patternScore[SangongPattern.THREE_GONG] = 3;
patternScore[SangongPattern.BIG_THREE_GONG] = 4;
patternScore[SangongPattern.SUPREMACY] = 5;
var SangongStatus = (function () {
    function SangongStatus() {
    }
    SangongStatus.running = 0;
    SangongStatus.close = 1;
    return SangongStatus;
}());
__reflect(SangongStatus.prototype, "SangongStatus");
var SangongStep = (function () {
    function SangongStep() {
    }
    SangongStep.FAPAI = 3;
    SangongStep.QIANG_ZHUANG = 4;
    SangongStep.ADDANTE = 5;
    SangongStep.XUANPAI = 6;
    SangongStep.KAIPAI = 7;
    SangongStep.EMPTY = 8;
    SangongStep.CLOSE = 9;
    return SangongStep;
}());
__reflect(SangongStep.prototype, "SangongStep");
var SangongCode = (function () {
    function SangongCode() {
    }
    SangongCode.IS_ADDANTED = -10304;
    return SangongCode;
}());
__reflect(SangongCode.prototype, "SangongCode");
