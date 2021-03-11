export class FullPurchaseData{
    public constructor(
        public amount?: number,
        public timeStamp?: Date,
        public totalPrice?: number,
        public couponTitle?: string,
        public companyName?: string,
        public userName?: string,
        public id?: number
    ){}
}