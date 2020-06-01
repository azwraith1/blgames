class GameRoomInfoBean {
  //创建者ID
  public creator: number;
  //当前操作玩家
  public curPlay: number;
  //当前局数
  public curRound: number;
  //当前任务
  public curTask: number;
  //庄家
  public dealer: number;
  //连庄局数
  public dealerLZ: number;
  //游戏类型
  public gameId: string;
  //换三张状态
  public hszStatus: number;

  public huTasks: any[];

  public lastPlayCardIndex: number;

  public lastPlayIndex: number;

  public maCard: number;

  public matchId: number;

  public players: any;
  //玩法
  public options: any;
  //游戏状态
  public playing: boolean;
  //当前剩余牌
  public publicCardNum: number;

  public roomId: number;

  public round;
  //玩法场
  public sceneId: number;


  public betBase;

  public selectColorStatus: number;

  public subType: string;

  //playerIndex task
  public hangupTaskSource: any;

  public countdown: any;

  public steps: number[];

  public remainTableNum;

  public roundId;

  public baoCards;

  public outScore;

  public fanCard;

  public maCardNumPerSeat;

  public raceType;

  public raceNum;

  public remainPlayerSize;

  public advanceNum;

  public cutoffNum;

  public raceMaxNum;
  //晋级路线
  public levelDatas;
  //奖励
  public rewardDatas;

  public lastRace;
  
  public emoji;

  public activityId

  public tableRank;

  public currentRank;

  public passLevels: number[];

  public curLevel;

  public tableId: number;

  public backGold: number;

  public entryFeeGold;
  public constructor() {

  }

  public getRoomId() {

  }

  /**
   * 设置对局轮次
   * @param  {GameRoundData} roundData
   */
  public setRoundData(roundData: GameRoundData) {
    this.curRound = roundData.curRound;
    this.dealer = roundData.dealer;
    this.dealerLZ = roundData.dealerLZ;
    this.curPlay = roundData.dealer;
  }

  public updateRoom(roomInfo) {

  }

}