export class BasicCouponData{
    public constructor(
        public id: number,
        public price: number,
        public couponTitle: string,
        public companyName: string,
        public endDate: Date
    ){}
}