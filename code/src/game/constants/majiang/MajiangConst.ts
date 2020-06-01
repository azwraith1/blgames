const MAJIANG_WIN_FLAG = {
	NONE: 0, //荒庄
	DISCARD: 1, ///< 点和
	SELF_DRAWN: 2, ///< 自摸
	END4TH_TILE: 4, ///< 绝张
	ABOUT_KONG: 8, ///< 关于杠，复合点和时为枪杠和，复合自摸则为杠上开花
	WALL_LAST: 16, ///< 牌墙最后一张，复合点和时为海底捞月，复合自摸则为妙手回春
	WIN_FLAG_TH: 32, ///< 天和，庄家摸起牌就胡牌
	WIN_FLAG_DH: 64, ///< 地和，非庄家摸起牌就胡牌
};