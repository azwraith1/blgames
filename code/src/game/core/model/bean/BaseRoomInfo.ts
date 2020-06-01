class BaseRoomInfo {
	public betBase: number;

	public countdown: any;

	public gameId: string;

	public players: any;

	public playing: boolean;

	public roomId: number;

	public roundId: number;

	public sceneId: number;

	public serverTime: number;

	public roundStatus: number;

	public camp: number;
	public camps: number;

	public type: number;
	public types: number;

	public rValue: any;
	public rValues: any;

	public bValue: any;
	public bValues: any;
	//smart playway
	public playway: any;
	//庄家
	public dealer: number;

	public maxTurn: number;

	public curGameTurn: number;

	public curTurns: number;
	//当前押注
	public minYZ: number;

	public r_isRoundWin: boolean = false;
	public b_isRoundWin: boolean = false;

	public r_roundPattern: number;
	public b_roundPattern: number;
	//开牌信息。
	public openCardInfo: any;
	//玩家列表。
	public playerList: any;


	public randomDealers;

	//庄家牌
	public bankerCard: any[];
	//闲家牌
	public idleCard: any[];
	//咪牌 庄
	public bankerInitCards: any[];
	//咪牌 闲
	public idleInitCards: any[];
	//咪牌 庄补
	public bankerAddCards: any[];
	//咪牌 闲补
	public idleAddCards: any[];
	public bankerPoint;

	public idlePoint;

	public zoneBetMax;

	public wayBillInfo;

	public usedNum: number;

	public remainNum: number;

	public addBetMulti;

	public roomState;
	//当前玩家
	public currentPlayerIndex;
	//当前是哪个地方
	public currentTableIndex;
	//当前操作牌组1， 2
	public currentCardGroupIndex;

	public dealerCardInfo;

	public maxBet;

	public curPlay;

	public totalBet;

	public tableId;
}