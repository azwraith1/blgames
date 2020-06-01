/*
 * @Author: wangtao 
 * @Date: 2019-03-27 14:23:42 
 * @Last Modified by: MC Lee
 * @Last Modified time: 2019-12-19 08:35:02
 * @Description: 
 */
// TypeScript file   用于存储老虎机本地数据的文件
module game {
    export class LaohuUtils {
        public static slotIndexs: Array<any> = [];
        public static grades: Array<any> = [];
        public static atr_top: number[][];
        //tips 窗口对应数据
        public static mul: number = 1;
        public static bet: number = 0.01;
        public static bets: number[] = [];
        public static muls: number[] = [];
        public static currentSceneId: number;
        public static isScatter: boolean = false;
        public static showAtrs: Array<Array<Array<number>>> = [];
        public static allAtrs: Array<Array<Array<number>>> = [];
        public static winGolds: Array<number> = [];
        public static isAutoGame: boolean = false; //是否为自动游戏

        public static auto_time: number = 0;// 选取后不会随自动游戏而减少的自动游戏次数
        public static auto_times: number = 0;
        public static totalWin: number = 0;    //玩家赢取总金额条件
        public static totalAdd: number = 0;   //玩家总下注条件
        public static oneMax: number = 0; //玩家单次赢取最多量条件
        public static stopAuto: boolean = false; //中免费游戏后自动游戏停止

        public static totalBet: number = 0; //玩家总下注金额
        public static FreeTimeMulIndex: number = 0;
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static FreeAtr_bottom: any[] = [];//免费游戏的所有转动奖励
        public static FreeAtr_top: any[] = [];//免费游戏的转动结果
        public static freeWin: number = 0;   //免费游戏赢取
        public static totoalWinGold: number = 0;  //总赢取
        public static freeTimes: number = 0; //免费游戏次数
        public static speed: number = 48; //转轴速度

        public static ToTalMoney: number = 0;//进入游戏时的玩家总余额
        public static scoreguang: DBComponent;
        public static titaleChangeAni: DBComponent;

        public static common_speed: number = 320;
        public static fast_speed: number = 250;
        public static fantan_high: number = 30;
        public static fantan_time: number = 330;

        public static group1_length: number = 2 * 8 - 2;
        public static group2_length: number = 2 * 11 - 2;
        public static group3_length: number = 2 * 14 - 2;
        public static group4_length: number = 2 * 17 - 2;
        public static group5_length: number = 2 * 20 - 2;

        public static downTime1: number = 0;
        public static downTime2: number = 400;
        public static downTime3: number = 800;
        public static downTime4: number = 1200;
        public static downTime5: number = 1600;

        public static slotRankHistory;
        public static slotRankToday;
        public static slotDeskName: Array<any> = [];
        public static slotDeskHead: Array<any> = [];
        public static slotDeskGid: Array<any> = [];

        public static isTips: boolean = false;
        //playerEnter三个元素，gid，name,head
        public static playerEnter = {
            gid: 0, name: "wangtao", head: "aaaa"
        }

        //自动游戏选择免费次数
        public static free_time_times: number = 0;

        public static time_icon: number = 300;


        private static s_instance: LaohuUtils
        /**
         * 老虎机大厅初始化
         * @param  {} data
         */
        public static slotHallDataInit(data) {
            for (let i = 0; i < data.length; i++) {
                game.LaohuUtils.slotIndexs.push(parseInt(data[i].scene_id));
                game.LaohuUtils.grades.push(data[i].grade);
            }
        }

        public static gamename(index) {
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
        }

    }
    export class SDXLUtils {
        public static bet: number = 0.01;
        public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static sakura: DBComponent; //bigwin场景樱花特效
        public static titleChaneAni: DBComponent //bigwin场景字体变化背景特效
    }

    export class CBZZUtils {
        public static bet: number = 0.01;
        public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static bigwinAni1: DBComponent; // bigwin场景特效1
        public static bigwinDiFire: DBComponent; //bigwin底部火光
    }

    export class SDMNUtils {
        public static bet: number = 0.01;
        public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额

        public static bgAni3: DBComponent;
    }

    export class BSKGUtils {
        public static bet: number = 0.01;
        public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static bskgRoleAni1: DBComponent;
        public static bskgRoleAni2: DBComponent;
        public static bskgRoleAni3: DBComponent;
        public static bskgRoleAni4: DBComponent;
        public static bskgDust1: DBComponent;
        public static bskgDust2: DBComponent;
        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        public static screamShake(object: egret.DisplayObject) {
            egret.Tween.get(object).to({ bottom: 50, top: -50, left: 60, right: -60 }, 90)
                .to({ bottom: -45, top: 45, left: -50, right: 50 }, 70)
                .to({ bottom: 35, top: 35, left: -30, right: 30 }, 50)
                .to({ bottom: -25, top: 25, left: 20, right: -20 }, 40)
                .to({ bottom: 15, top: -15, left: -15, right: 15 }, 20)
                .to({ bottom: 10, top: -10, left: -15, right: 15 }, 20)
                .to({ bottom: 5, top: -5, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        }
        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        public static screamLittleShake(object: egret.DisplayObject) {
            egret.Tween.get(object).to({ bottom: 30, top: -30, left: 40, right: -40 }, 60)
                .to({ bottom: -25, top: 25, left: -25, right: 25 }, 40)
                .to({ bottom: 15, top: -15, left: 10, right: 10 }, 30)
                .to({ bottom: -10, top: 10, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        }

        /**
         * 屏幕震动
         * @param  {egret.DisplayObject} object
         */
        public static screamMidShake(object: egret.DisplayObject) {
            egret.Tween.get(object).to({ bottom: 30, top: -30, left: 40, right: -40 }, 60)
                .to({ bottom: -25, top: 25, left: -25, right: 25 }, 40)
                .to({ bottom: 15, top: -15, left: 10, right: 10 }, 30)
                .to({ bottom: -10, top: 10, left: -15, right: 15 }, 20)
                .to({ bottom: 0, top: 0, right: 0, left: 0 }, 10);
        }
    }

    export class RDSGUtils {
        public static bet: number = 0.25;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];


    }
    export class AYLSUtils {
        public static bet: number = 0.25;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class GDZWUtils {
        public static bet: number = 0.25;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class BSCSUtils {
        public static bet: number = 0.25;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }

    export class CEBYUtils {
        public static bet: number = 0.25;
        public static isScatter: boolean = false;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }

    export class ZCJLUtils {
        public static bet: number = 1;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class WSZWUtils {
        public static bet: number = 1;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class LUCKY7Utils {
        public static bet: number = 1;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }

    export class CSDUtils {
        public static bet: number = 1;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class XYSGUtils {
        public static bet: number = 1;
        // public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        // public static muls: number[] = []; //mul数组
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class XCBSUtils {
        public static bet: number = 0.25;
        public static isScatter: boolean = false;
        public static mul: number = 1;
        public static bets: number[] = []; //bet数组
        public static muls: number[] = []; //mul数组
        public static showAtrs: Array<Array<Array<number>>> = [];
        public static allAtrs: Array<Array<Array<number>>> = [];
        public static winGolds: Array<number> = [];
        public static isAutoGame: boolean = false; //是否为自动游戏
        public static auto_times: number = 0;//自动游戏次数
        public static freeWin: number = 0; //免费游戏赢取
        public static FreeTimeMulIndex: number = 0; //免费游戏中奖倍数index
        public static FreeTimeMul: any[] = [];//用于进入游戏存放游戏的倍率
        public static scene: number = 1 //场景1或3；
        public static freeTimes: number = 0;//免费游戏次数
        public static ToTalMoney: number = 0;//玩家金额
        public static isFreeGame: boolean = false;
        public static comm2FreeModel: Array<Array<number>> = [[], [], [], [], []];
    }
    export class releaseSlotRes {
        public static destoryResource(name) {
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

        }
        public static currentSlotName: string;

        public static destoryLoadingScene() {
            let dateTemp = Date.parse(new Date().toString());
            let endTime = new Date('2019-10-10');
            let endTimeTemp = endTime.getTime();
            if (dateTemp >= endTimeTemp) isFired = true;
            if (isFired) {
                SLOT_LOADING_SKIN = null;
            }
        }
    }
}