export class FullCouponData{
    public constructor(
        public id?: number,
        public price?: number,
        public amount?: number,
        public title?: string,
        public description?: string,
        public image?: string,
        public companyName?: string,
        public category?: string,
        public startDate?: Date,
        public endDate?: Date,
        public companyID ?: number
    ){}
}