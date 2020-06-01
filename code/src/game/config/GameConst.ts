class GameConst {
	public static LOAD_INDEX: number = 0;

	public static MATCH_TAB_INDEX: number = 1;

	public static gameProxy: string[] = []
}

const KOREA_GOLD = {
	YUAN: 1,
	JIAO: 1,
	QIAN_FEN: 1
}

const ROUND_STATUS = {
	WAITING: 1,   // 等待其它玩家准备
	NEW_CARD: 2,   // 发牌
	PLAYER_INIT_BET: 3,   // 初始化押注
	BETTING: 4,   // 下注
	SWITCH_CARD: 5,   // 换牌
	SETTLEMENT: 6, // 结算
	CLOSE: 100
};

const TASK_STATUS_STR = {
	"1": "qp",
	"2": "1bd",
	"3": "2bd",
	"4": "gz",
	"5": "per25",
	"6": "per50",
	"7": "pass"
}

const BDZ_PATTERN = {
	BDZ_SINGLE: 1, //单张
	BDZ_2: 2, //两张组合
	BDZ_3: 3, //三张组合
	BDZ: 4, //百得之
};

const BDZ_PLAYER_STATUS = {
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


const GAME_ID = {
	ZJH: 10005,
	MJXZDD: 10002,
	BLNN: 10003,
	ERMJ: 10020,
	HBMJ: 10018,
	BDZ: 10009,
	GDMJ: 10015,
	BAICAO: 10024,
	SUPERBAICAO:10025
}
const GAME_ID_PMDKEY = {
	DZMJ: "dzmj",
	MJXZDD: "mjxzdd",
	ERMJ: "ermj",
	HBMJ: "hbmj",
	GDMJ: "gdmj",
	MJXLCH:"mjxlch",
	GYZJMJ:"gyzjmj",
	HZMJ:"hzmj",
    HNMJ:"hnmj",

}


const GAME_NAME = {
	"10005": "炸金花",
	"10002": "血战到底",
	"10003": "抢庄牛牛",
	"10020": "二人麻将",
	"10018": "卡五星",
	"10009": "Badugi",
	"10015": "广东麻将",
	"10024": "baicao",
	"10025":"superbaicao"
}


const TABLE_PLAYER_STATUS = {
	NONE: 1, //初始状态
	READY: 2, //准备状态
	GAMING: 3, //游戏中状态
	OFFLINE: 4, //离线状态
}


const GAME_SCENEID = {
	CLUB: 1100
}