class CountUpUtils {
	public static start(label, startVal: number, endVal: number, duration, fixed = 2) {
		let countUp = new CountUp(label, startVal, endVal, fixed, duration, {
			useEasing: true,
			useGrouping: true,
			separator: "",
			decimal: "",
			prefix: "",
			suffix: "",
			formattingFn: function (e) {

				return NumberFormat.formatGold(e);
			}
		});
		countUp.start(() => {
			countUp = null;
		});
	}


	public static recordStart(label, startVal: number, endVal: number, duration, fixed = 2) {
		let countUp = new CountUp(label, startVal, endVal, fixed, duration, {
			useEasing: true,
			useGrouping: true,
			separator: "",
			decimal: "",
			prefix: "",
			suffix: "",
			formattingFn: function (e) {
				if (e > 0) {
					return "+" + e;
				}
				return e + "";
			}
		});
		countUp.start(() => {
			countUp = null;
		});
	}
}