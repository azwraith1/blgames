class ClubMemberGroup extends game.BaseComponent {
	/**当前页数 */
	protected currentPage: number;
	/**最大页数 */
	protected maxPage: number;

	protected prePageBtn: eui.Button;
	protected nextPageBtn: eui.Button;
	protected currentDivMax: eui.Label;
	private itemGroup: eui.Group;
	// private prePageLable: eui.Label;
	// private nextPageLable: eui.Label;
	public constructor() {
		super();
		//this.skinName = `ClubMemberListGroupSkin${CF.tis}`;
		// LogUtils.logD("+===CF.tis==="+CF.tis);

	}
	protected createChildren() {
		super.createChildren();
		this.createAllItems();
		this.currentPage = 1;
	}
	protected onTouchTap(e: egret.TouchEvent) {
		e.stopPropagation();
		switch (e.target) {
			case this.prePageBtn:
				this.onTouchPre();
				break;
			case this.nextPageBtn:
				this.onTouchNext();
				break;
		}
	}

	private itemListArr: Array<BaseClubMemberRender> = [];
	private itemCheckArr: Array<BaseClubMemberRender> = [];
	private itemManageArr: Array<BaseClubMemberRender> = [];
	private crateItemsGroup(type: number, parentArr: Array<BaseClubMemberRender>, clazz: any) {
		for (let i = 0; i < 5; ++i) {
			let item = new clazz(type);
			item.width = 694;
			item.height = 72;
			parentArr.push(item);
		}
	}
	private createAllItems() {
		this.crateItemsGroup(MEMBER_NAME.CLUB_LIST, this.itemListArr, ClubMemberList);
		this.crateItemsGroup(MEMBER_NAME.CLUB_CHECK, this.itemCheckArr, ClubMemberCheck);
		this.crateItemsGroup(MEMBER_NAME.CLUB_MANAGE, this.itemManageArr, ClubMemerManage);
	}
	private delta: number = 5;
	private onTouchPre() {
		this.currentPage -= 1;
		if (this.currentPage < 1) this.currentPage = 1;
		this.showData();
	}
	private onTouchNext() {
		this.currentPage += 1;
		if (this.currentPage > this.maxPage) this.currentPage = this.maxPage;
		this.showData();
	}
	private data: Array<any>;
	private currentID: number;
	private clazz: any;
	private initItemGroup() {
		this.itemGroup.removeChildren();
		this.currentPage = 1;
		switch (this.currentID) {
			case MEMBER_NAME.CLUB_LIST:
				this.init(this.itemListArr);
				break;
			case MEMBER_NAME.CLUB_CHECK:
				this.init(this.itemCheckArr);

				break;
			case MEMBER_NAME.CLUB_MANAGE:
				this.init(this.itemManageArr);
				break;
		}
	}
	private init(targetArr: Array<BaseClubMemberRender>) {
		for (let i = 0; i < targetArr.length; ++i) {
			let item = targetArr[i];
			item.setRoot(this);
			this.itemGroup.addChild(item);
		}
	}
	public setData(data: any, currentId: number) {
		this.data = data;
		this.currentID = currentId;
		this.initItemGroup();
		this.maxPage = Math.ceil(this.data.length / this.delta);
		if (this.maxPage <= 0) this.currentPage = this.maxPage = 1;
		this.showData();
		if (currentId == MEMBER_NAME.CLUB_CHECK) {
			let item: ClubInnerRecordTabItem = this.root.getCheckItem();
			ClubInnerHallScene.instance.redPointImg.visible = item.redPoint.visible = this.data.length > 0;
			ClubManager.instance.canShowPoint = this.data.length > 0;
		}

	}
	private root: ClubMemberPanel;
	public setRoot(root) {
		this.root = root;
	}
	private showData() {
		let pageStartIndex = (this.currentPage - 1) * this.delta;
		this.renderAllItems(this.data.slice(pageStartIndex, pageStartIndex + this.delta));
		this.currentDivMax.text = this.currentPage + "/" + this.maxPage;
	}
	private renderAllItems(data: Array<any>) {
		let temp;
		for (let i = 0; i < 5; ++i) {
			temp = data[i];
			let item: BaseClubMemberRender = this.itemGroup.getChildAt(i) as BaseClubMemberRender;
			if (temp) {
				item.visible = true;
				item.renderUI(temp);

			}
			else {
				item.visible = false;
			}
		}
	}
	public hide() {
		this.itemGroup.removeChildren();
	}
}