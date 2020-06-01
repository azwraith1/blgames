var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Author: wangtao
 * @Date: 2019-03-27 14:23:42
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-19 08:35:02
 * @Description:
 */
// TypeScript file   用于存储老虎机本地数据的文件
var game;
(function (game) {
    var LaohuUtils = (function () {
        function LaohuUtils() {
        }
        /**
         * 老虎机大厅初始化
         * @param  {} data
         */
        LaohuUtils.slotHallDataInit = function (data) {
            for (var i = 0; i < data.length; i++) {
                game.LaohuUtils.slotIndexs.push(parseInt(data[i].scene_id));
                game.LaohuUtils.grades.push(data[i].grade);
            }
        };
        LaohuUtils.gamename = function (index) {
            switch (index) {
                case 1001:
                    return "dntg";
                case 1002:
                    return "sdxl";
                case 1003:
                    return "cbzz";
                case 1004:
                    return "sdmn";
                case 1005:
                    return "bskg";
                case 1006:
                    return "rdsg";
                case 1007:
                    return "ayls";
                case 1008:
                    return "gdzw";
                case 1009:
                    return "bscs";
                case 1010:
                    return "ceby";
                case 1011:
                    return "zcjl";
                case 1012:
                    return "wszw";
                case 1013:
                    return "lucky7";
                case 1014:
                    return "csd";
                case 1015:
                    return "xysg";
                case 1016:
                    return "xcbs";
                case 1017:
                    return "sgws";
                case 1018:
                    return "snyx";
                case "大闹天宫":
                    return 1001;
                case "神雕侠侣":
                    return 1002;
                case "赤壁之战":
                    return 1003;
                case "四大美女":
                    return 1004;
                case "宝石矿工":
                    return 1005;
                case "热带水果":
                    return 1006;
                case "暗夜猎手":
                    return 1007;
                case "格斗之王":
                    return 1008;
                case "白蛇传说":
                    return 1009;
                case "嫦娥奔月":
                    return 1010;
                case "招财锦鲤":
                    return 1011;
                case "万兽之王":
                    return 1012;
                case "lucky7":
                    return 1013;
                case "财神到":
                    return 1014;
                case "幸运水果":
                    return 1015;
                case "星尘宝石":
                    return 1016;
                case "水果忍者":
                    return 1017;
                case "鼠年有喜":
                    return 1018;
            }
        };
        LaohuUtils.slotIndexs = [];
        LaohuUtils.grades = [];
        //tips 窗口对应数据
        LaohuUtils.mul = 1;
        LaohuUtils.bet = 0.01;
        LaohuUtils.bets = [];
        LaohuUtils.muls = [];
        LaohuUtils.isScatter = false;
        LaohuUtils.showAtrs = [];
        LaohuUtils.allAtrs = [];
        LaohuUtils.winGolds = [];
        LaohuUtils.isAutoGame = false; //是否为自动游戏
        LaohuUtils.auto_time = 0; // 选取后不会随自动游戏而减少的自动游戏次数
        LaohuUtils.auto_times = 0;
        LaohuUtils.totalWin = 0; //玩家赢取总金额条件
        LaohuUtils.totalAdd = 0; //玩家总下注条件
        LaohuUtils.oneMax = 0; //玩家单次赢取最多量条件
        LaohuUtils.stopAuto = false; //中免费游戏后自动游戏停止
        LaohuUtils.totalBet = 0; //玩家总下注金额
        LaohuUtils.FreeTimeMulIndex = 0;
        LaohuUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        LaohuUtils.FreeAtr_bottom = []; //免费游戏的所有转动奖励
        LaohuUtils.FreeAtr_top = []; //免费游戏的转动结果
        LaohuUtils.freeWin = 0; //免费游戏赢取
        LaohuUtils.totoalWinGold = 0; //总赢取
        LaohuUtils.freeTimes = 0; //免费游戏次数
        LaohuUtils.speed = 48; //转轴速度
        LaohuUtils.ToTalMoney = 0; //进入游戏时的玩家总余额
        LaohuUtils.common_speed = 320;
        LaohuUtils.fast_speed = 250;
        LaohuUtils.fantan_high = 30;
        LaohuUtils.fantan_time = 330;
        LaohuUtils.group1_length = 2 * 8 - 2;
        LaohuUtils.group2_length = 2 * 11 - 2;
        LaohuUtils.group3_length = 2 * 14 - 2;
        LaohuUtils.group4_length = 2 * 17 - 2;
        LaohuUtils.group5_length = 2 * 20 - 2;
        LaohuUtils.downTime1 = 0;
        LaohuUtils.downTime2 = 400;
        LaohuUtils.downTime3 = 800;
        LaohuUtils.downTime4 = 1200;
        LaohuUtils.downTime5 = 1600;
        LaohuUtils.slotDeskName = [];
        LaohuUtils.slotDeskHead = [];
        LaohuUtils.slotDeskGid = [];
        LaohuUtils.isTips = false;
        //playerEnter三个元素，gid，name,head
        LaohuUtils.playerEnter = {
            gid: 0, name: "wangtao", head: "aaaa"
        };
        //自动游戏选择免费次数
        LaohuUtils.free_time_times = 0;
        LaohuUtils.time_icon = 300;
        return LaohuUtils;
    }());
    game.LaohuUtils = LaohuUtils;
    __reflect(LaohuUtils.prototype, "game.LaohuUtils");
    var SDXLUtils = (function () {
        function SDXLUtils() {
        }
        SDXLUtils.bet = 0.01;
        SDXLUtils.mul = 1;
        SDXLUtils.bets = []; //bet数组
        SDXLUtils.muls = []; //mul数组
        SDXLUtils.isAutoGame = false; //是否为自动游戏
        SDXLUtils.auto_times = 0; //自动游戏次数
        SDXLUtils.freeWin = 0; //免费游戏赢取
        SDXLUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        SDXLUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        SDXLUtils.scene = 1; //场景1或3；
        SDXLUtils.freeTimes = 0; //免费游戏次数
        SDXLUtils.ToTalMoney = 0; //玩家金额
        return SDXLUtils;
    }());
    game.SDXLUtils = SDXLUtils;
    __reflect(SDXLUtils.prototype, "game.SDXLUtils");
    var CBZZUtils = (function () {
        function CBZZUtils() {
        }
        CBZZUtils.bet = 0.01;
        CBZZUtils.mul = 1;
        CBZZUtils.bets = []; //bet数组
        CBZZUtils.muls = []; //mul数组
        CBZZUtils.isAutoGame = false; //是否为自动游戏
        CBZZUtils.auto_times = 0; //自动游戏次数
        CBZZUtils.freeWin = 0; //免费游戏赢取
        CBZZUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        CBZZUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        CBZZUtils.scene = 1; //场景1或3；
        CBZZUtils.freeTimes = 0; //免费游戏次数
        CBZZUtils.ToTalMoney = 0; //玩家金额
        return CBZZUtils;
    }());
    game.CBZZUtils = CBZZUtils;
    __reflect(CBZZUtils.prototype, "game.CBZZUtils");
    var SDMNUtils = (function () {
        function SDMNUtils() {
        }
        SDMNUtils.bet = 0.01;
        SDMNUtils.mul = 1;
        SDMNUtils.bets = []; //bet数组
        SDMNUtils.muls = []; //mul数组
        SDMNUtils.isAutoGame = false; //是否为自动游戏
        SDMNUtils.auto_times = 0; //自动游戏次数
        SDMNUtils.freeWin = 0; //免费游戏赢取
        SDMNUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        SDMNUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        SDMNUtils.scene = 1; //场景1或3；
        SDMNUtils.freeTimes = 0; //免费游戏次数
        SDMNUtils.ToTalMoney = 0; //玩家金额
        return SDMNUtils;
    }());
    game.SDMNUtils = SDMNUtils;
    __reflect(SDMNUtils.prototype, "game.SDMNUtils");
    var BSKGUtils = (function () {
        function BSKGUtils() {
        }
        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        BSKGUtils.screamShake = function (object) {
            egret.Tween.get(object).to({ bottom: 50, top: -50, left: 60, right: -60 }, 90)
                .to({ bottom: -45, top: 45, left: -50, right: 50 }, 70)
                .to({ bottom: 35, top: 35, left: -30, right: 30 }, 50)
                .to({ bottom: -25, top: 25, left: 20, right: -20 }, 40)
                .to({ bottom: 15, top: -15, left: -15, right: 15 }, 20)
                .to({ bottom: 10, top: -10, left: -15, right: 15 }, 20)
                .to({ bottom: 5, top: -5, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        };
        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        BSKGUtils.screamLittleShake = function (object) {
            egret.Tween.get(object).to({ bottom: 30, top: -30, left: 40, right: -40 }, 60)
                .to({ bottom: -25, top: 25, left: -25, right: 25 }, 40)
                .to({ bottom: 15, top: -15, left: 10, right: 10 }, 30)
                .to({ bottom: -10, top: 10, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        };
        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        BSKGUtils.screamMidShake = function (object) {
            egret.Tween.get(object).to({ bottom: 30, top: -30, left: 40, right: -40 }, 60)
                .to({ bottom: -25, top: 25, left: -25, right: 25 }, 40)
                .to({ bottom: 15, top: -15, left: 10, right: 10 }, 30)
                .to({ bottom: -10, top: 10, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        };
        BSKGUtils.bet = 0.01;
        BSKGUtils.mul = 1;
        BSKGUtils.bets = []; //bet数组
        BSKGUtils.muls = []; //mul数组
        BSKGUtils.isAutoGame = false; //是否为自动游戏
        BSKGUtils.auto_times = 0; //自动游戏次数
        BSKGUtils.freeWin = 0; //免费游戏赢取
        BSKGUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        BSKGUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        BSKGUtils.scene = 1; //场景1或3；
        BSKGUtils.freeTimes = 0; //免费游戏次数
        BSKGUtils.ToTalMoney = 0; //玩家金额
        return BSKGUtils;
    }());
    game.BSKGUtils = BSKGUtils;
    __reflect(BSKGUtils.prototype, "game.BSKGUtils");
    var RDSGUtils = (function () {
        function RDSGUtils() {
        }
        RDSGUtils.bet = 0.25;
        // public static mul: number = 1;
        RDSGUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        RDSGUtils.isAutoGame = false; //是否为自动游戏
        RDSGUtils.auto_times = 0; //自动游戏次数
        RDSGUtils.freeWin = 0; //免费游戏赢取
        RDSGUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        RDSGUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        RDSGUtils.scene = 1; //场景1或3；
        RDSGUtils.freeTimes = 0; //免费游戏次数
        RDSGUtils.ToTalMoney = 0; //玩家金额
        RDSGUtils.comm2FreeModel = [[], [], [], [], []];
        return RDSGUtils;
    }());
    game.RDSGUtils = RDSGUtils;
    __reflect(RDSGUtils.prototype, "game.RDSGUtils");
    var AYLSUtils = (function () {
        function AYLSUtils() {
        }
        AYLSUtils.bet = 0.25;
        // public static mul: number = 1;
        AYLSUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        AYLSUtils.isAutoGame = false; //是否为自动游戏
        AYLSUtils.auto_times = 0; //自动游戏次数
        AYLSUtils.freeWin = 0; //免费游戏赢取
        AYLSUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        AYLSUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        AYLSUtils.scene = 1; //场景1或3；
        AYLSUtils.freeTimes = 0; //免费游戏次数
        AYLSUtils.ToTalMoney = 0; //玩家金额
        AYLSUtils.comm2FreeModel = [[], [], [], [], []];
        return AYLSUtils;
    }());
    game.AYLSUtils = AYLSUtils;
    __reflect(AYLSUtils.prototype, "game.AYLSUtils");
    var GDZWUtils = (function () {
        function GDZWUtils() {
        }
        GDZWUtils.bet = 0.25;
        // public static mul: number = 1;
        GDZWUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        GDZWUtils.isAutoGame = false; //是否为自动游戏
        GDZWUtils.auto_times = 0; //自动游戏次数
        GDZWUtils.freeWin = 0; //免费游戏赢取
        GDZWUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        GDZWUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        GDZWUtils.scene = 1; //场景1或3；
        GDZWUtils.freeTimes = 0; //免费游戏次数
        GDZWUtils.ToTalMoney = 0; //玩家金额
        GDZWUtils.comm2FreeModel = [[], [], [], [], []];
        return GDZWUtils;
    }());
    game.GDZWUtils = GDZWUtils;
    __reflect(GDZWUtils.prototype, "game.GDZWUtils");
    var BSCSUtils = (function () {
        function BSCSUtils() {
        }
        BSCSUtils.bet = 0.25;
        // public static mul: number = 1;
        BSCSUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        BSCSUtils.isAutoGame = false; //是否为自动游戏
        BSCSUtils.auto_times = 0; //自动游戏次数
        BSCSUtils.freeWin = 0; //免费游戏赢取
        BSCSUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        BSCSUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        BSCSUtils.scene = 1; //场景1或3；
        BSCSUtils.freeTimes = 0; //免费游戏次数
        BSCSUtils.ToTalMoney = 0; //玩家金额
        BSCSUtils.comm2FreeModel = [[], [], [], [], []];
        return BSCSUtils;
    }());
    game.BSCSUtils = BSCSUtils;
    __reflect(BSCSUtils.prototype, "game.BSCSUtils");
    var CEBYUtils = (function () {
        function CEBYUtils() {
        }
        CEBYUtils.bet = 0.25;
        CEBYUtils.isScatter = false;
        CEBYUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        CEBYUtils.isAutoGame = false; //是否为自动游戏
        CEBYUtils.auto_times = 0; //自动游戏次数
        CEBYUtils.freeWin = 0; //免费游戏赢取
        CEBYUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        CEBYUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        CEBYUtils.scene = 1; //场景1或3；
        CEBYUtils.freeTimes = 0; //免费游戏次数
        CEBYUtils.ToTalMoney = 0; //玩家金额
        CEBYUtils.comm2FreeModel = [[], [], [], [], []];
        return CEBYUtils;
    }());
    game.CEBYUtils = CEBYUtils;
    __reflect(CEBYUtils.prototype, "game.CEBYUtils");
    var ZCJLUtils = (function () {
        function ZCJLUtils() {
        }
        ZCJLUtils.bet = 1;
        // public static mul: number = 1;
        ZCJLUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        ZCJLUtils.isAutoGame = false; //是否为自动游戏
        ZCJLUtils.auto_times = 0; //自动游戏次数
        ZCJLUtils.freeWin = 0; //免费游戏赢取
        ZCJLUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        ZCJLUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        ZCJLUtils.scene = 1; //场景1或3；
        ZCJLUtils.freeTimes = 0; //免费游戏次数
        ZCJLUtils.ToTalMoney = 0; //玩家金额
        ZCJLUtils.comm2FreeModel = [[], [], [], [], []];
        return ZCJLUtils;
    }());
    game.ZCJLUtils = ZCJLUtils;
    __reflect(ZCJLUtils.prototype, "game.ZCJLUtils");
    var WSZWUtils = (function () {
        function WSZWUtils() {
        }
        WSZWUtils.bet = 1;
        // public static mul: number = 1;
        WSZWUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        WSZWUtils.isAutoGame = false; //是否为自动游戏
        WSZWUtils.auto_times = 0; //自动游戏次数
        WSZWUtils.freeWin = 0; //免费游戏赢取
        WSZWUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        WSZWUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        WSZWUtils.scene = 1; //场景1或3；
        WSZWUtils.freeTimes = 0; //免费游戏次数
        WSZWUtils.ToTalMoney = 0; //玩家金额
        WSZWUtils.comm2FreeModel = [[], [], [], [], []];
        return WSZWUtils;
    }());
    game.WSZWUtils = WSZWUtils;
    __reflect(WSZWUtils.prototype, "game.WSZWUtils");
    var LUCKY7Utils = (function () {
        function LUCKY7Utils() {
        }
        LUCKY7Utils.bet = 1;
        // public static mul: number = 1;
        LUCKY7Utils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        LUCKY7Utils.isAutoGame = false; //是否为自动游戏
        LUCKY7Utils.auto_times = 0; //自动游戏次数
        LUCKY7Utils.freeWin = 0; //免费游戏赢取
        LUCKY7Utils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        LUCKY7Utils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        LUCKY7Utils.scene = 1; //场景1或3；
        LUCKY7Utils.freeTimes = 0; //免费游戏次数
        LUCKY7Utils.ToTalMoney = 0; //玩家金额
        LUCKY7Utils.comm2FreeModel = [[], [], [], [], []];
        return LUCKY7Utils;
    }());
    game.LUCKY7Utils = LUCKY7Utils;
    __reflect(LUCKY7Utils.prototype, "game.LUCKY7Utils");
    var CSDUtils = (function () {
        function CSDUtils() {
        }
        CSDUtils.bet = 1;
        // public static mul: number = 1;
        CSDUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        CSDUtils.isAutoGame = false; //是否为自动游戏
        CSDUtils.auto_times = 0; //自动游戏次数
        CSDUtils.freeWin = 0; //免费游戏赢取
        CSDUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        CSDUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        CSDUtils.scene = 1; //场景1或3；
        CSDUtils.freeTimes = 0; //免费游戏次数
        CSDUtils.ToTalMoney = 0; //玩家金额
        CSDUtils.comm2FreeModel = [[], [], [], [], []];
        return CSDUtils;
    }());
    game.CSDUtils = CSDUtils;
    __reflect(CSDUtils.prototype, "game.CSDUtils");
    var XYSGUtils = (function () {
        function XYSGUtils() {
        }
        XYSGUtils.bet = 1;
        // public static mul: number = 1;
        XYSGUtils.bets = []; //bet数组
        // public static muls: number[] = []; //mul数组
        XYSGUtils.isAutoGame = false; //是否为自动游戏
        XYSGUtils.auto_times = 0; //自动游戏次数
        XYSGUtils.freeWin = 0; //免费游戏赢取
        XYSGUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        XYSGUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        XYSGUtils.scene = 1; //场景1或3；
        XYSGUtils.freeTimes = 0; //免费游戏次数
        XYSGUtils.ToTalMoney = 0; //玩家金额
        XYSGUtils.comm2FreeModel = [[], [], [], [], []];
        return XYSGUtils;
    }());
    game.XYSGUtils = XYSGUtils;
    __reflect(XYSGUtils.prototype, "game.XYSGUtils");
    var XCBSUtils = (function () {
        function XCBSUtils() {
        }
        XCBSUtils.bet = 0.25;
        XCBSUtils.isScatter = false;
        XCBSUtils.mul = 1;
        XCBSUtils.bets = []; //bet数组
        XCBSUtils.muls = []; //mul数组
        XCBSUtils.showAtrs = [];
        XCBSUtils.allAtrs = [];
        XCBSUtils.winGolds = [];
        XCBSUtils.isAutoGame = false; //是否为自动游戏
        XCBSUtils.auto_times = 0; //自动游戏次数
        XCBSUtils.freeWin = 0; //免费游戏赢取
        XCBSUtils.FreeTimeMulIndex = 0; //免费游戏中奖倍数index
        XCBSUtils.FreeTimeMul = []; //用于进入游戏存放游戏的倍率
        XCBSUtils.scene = 1; //场景1或3；
        XCBSUtils.freeTimes = 0; //免费游戏次数
        XCBSUtils.ToTalMoney = 0; //玩家金额
        XCBSUtils.isFreeGame = false;
        XCBSUtils.comm2FreeModel = [[], [], [], [], []];
        return XCBSUtils;
    }());
    game.XCBSUtils = XCBSUtils;
    __reflect(XCBSUtils.prototype, "game.XCBSUtils");
    var releaseSlotRes = (function () {
        function releaseSlotRes() {
        }
        releaseSlotRes.destoryResource = function (name) {
            switch (name) {
                case "dntg":
                    RES.destroyRes("dntg_game", false);
                    RES.destroyRes("dntg_hall", false);
                    RES.destroyRes("dntg_back", false);
                    break;
                case "sdxl":
                    RES.destroyRes("sdxl_game", false);
                    RES.destroyRes("sdxl_hall", false);
                    RES.destroyRes("sdxl_back", false);
                    break;
                case "cbzz":
                    RES.destroyRes("cbzz_game", false);
                    RES.destroyRes("cbzz_hall", false);
                    RES.destroyRes("cbzz_back", false);
                    break;
                case "sdmn":
                    RES.destroyRes("sdmn_game", false);
                    RES.destroyRes("sdmn_hall", false);
                    RES.destroyRes("sdmn_back", false);
                    break;
                default:
                    break;
            }
            GameCacheManager.instance.removeCache();
            DBFactory.instance.removeCache();
        };
        releaseSlotRes.destoryLoadingScene = function () {
            var dateTemp = Date.parse(new Date().toString());
            var endTime = new Date('2019-10-10');
            var endTimeTemp = endTime.getTime();
            if (dateTemp >= endTimeTemp)
                isFired = true;
            if (isFired) {
                SLOT_LOADING_SKIN = null;
            }
        };
        return releaseSlotRes;
    }());
    game.releaseSlotRes = releaseSlotRes;
    __reflect(releaseSlotRes.prototype, "game.releaseSlotRes");
})(game || (game = {}));
