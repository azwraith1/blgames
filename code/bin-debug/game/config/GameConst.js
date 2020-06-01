var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameConst = (function () {
    function GameConst() {
    }
    GameConst.LOAD_INDEX = 0;
    GameConst.MATCH_TAB_INDEX = 1;
    GameConst.gameProxy = [];
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
var KOREA_GOLD = {
    YUAN: 1,
    JIAO: 1,
    QIAN_FEN: 1
};
var ROUND_STATUS = {
    WAITING: 1,
    NEW_CARD: 2,
    PLAYER_INIT_BET: 3,
    BETTING: 4,
    SWITCH_CARD: 5,
    SETTLEMENT: 6,
    CLOSE: 100
};
var TASK_STATUS_STR = {
    "1": "qp",
    "2": "1bd",
    "3": "2bd",
    "4": "gz",
    "5": "per25",
    "6": "per50",
    "7": "pass"
};
var BDZ_PATTERN = {
    BDZ_SINGLE: 1,
    BDZ_2: 2,
    BDZ_3: 3,
    BDZ: 4,
};
var BDZ_PLAYER_STATUS = {
    // 等待
    WAIT: 1,
    // 游戏中
    PLAYING: 2,
    // 弃牌
    ABANDON: 3,
    // 跟
    GEN: 4,
    // 加
    ADD: 5,
    // 过牌
    PASS: 6,
};
var GAME_ID = {
    ZJH: 10005,
    MJXZDD: 10002,
    BLNN: 10003,
    ERMJ: 10020,
    HBMJ: 10018,
    BDZ: 10009,
    GDMJ: 10015,
    BAICAO: 10024,
    SUPERBAICAO: 10025
};
var GAME_ID_PMDKEY = {
    DZMJ: "dzmj",
    MJXZDD: "mjxzdd",
    ERMJ: "ermj",
    HBMJ: "hbmj",
    GDMJ: "gdmj",
    MJXLCH: "mjxlch",
    GYZJMJ: "gyzjmj",
    HZMJ: "hzmj",
    HNMJ: "hnmj",
};
var GAME_NAME = {
    "10005": "炸金花",
    "10002": "血战到底",
    "10003": "抢庄牛牛",
    "10020": "二人麻将",
    "10018": "卡五星",
    "10009": "Badugi",
    "10015": "广东麻将",
    "10024": "baicao",
    "10025": "superbaicao"
};
var TABLE_PLAYER_STATUS = {
    NONE: 1,
    READY: 2,
    GAMING: 3,
    OFFLINE: 4,
};
var GAME_SCENEID = {
    CLUB: 1100
};
