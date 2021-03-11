export class BasicPurchaseData {
    public constructor(
        public id: number,
        public amount: number,
        public timeStamp: Date,
        public totalPrice: number,
        public couponTitle: string
    ) { }
}