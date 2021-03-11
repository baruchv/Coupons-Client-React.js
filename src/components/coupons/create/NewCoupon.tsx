import axios from "axios";
import {Component, ChangeEvent} from "react";
import "./NewCoupon.css";
import { getAllCoupons } from "../CouponUtils";

interface NewCouponState{
    title ?: string,
    description?: string,
    category?: string,
    image?: string,
    amount?: number,
    price?: number,
    startDate?: Date,
    endDate?: Date
}

export default class NewCoupon extends Component<any, NewCouponState>{
    public constructor(props: any){
        super(props);
        this.state = {
            title: null,
            description: null,
            category: null,
            image: null,
            amount: 1,
            price: 0,
            startDate: new Date(),
            endDate: null
        }
    }
    
    render(){
        let today = new Date();
        return(
            <div className="newCoupon">
                <br/>
                <section className="textInputFields">
                    Title: <input type="text" onChange={this.setTitle} placeholder="Enter Coupon's title" minLength={2} id="titleInput" required />
                    Description: <input type="text" onChange={this.setDescription} placeholder="Enter Coupon's description" minLength={2} id="descriptionInput" required />
                    <br/><br/>
                    Image: <input type="url" onChange={this.setImage} placeholder="Enter Image url" id="imageInput" required />
                    <br/><br/>
                    Amount: <input type="number" onChange={this.setAmount} placeholder="Enter an amount" min="1" id="amountInput" required />
                    Price: <input type="number" onChange={this.setPrice} placeholder="Set the price" min="0" id="priceInput" required />
                </section>
                <br/>
                <select placeholder="Select coupon's category" id="categoryIntup" onChange={this.setCategory} required>
                    <option value="CATEGORY">Choose Category</option>
                    <option value="GROCERIES">Groceries</option>
                    <option value="ELECTRICITY">Electricity</option>
                    <option value="VACATION">Vacations</option>
                    <option value="RESTAURANT">Restaurants</option>
                    <option value="SPORT">Sport</option>
                    <option value="FATION">Fation</option>
                    <option value="ATRACTIONS">Atractions</option>
                </select>
                <br/><br/>
                <section className="dateInput">
                    Start-Date: <input type="date" onChange={this.setStartDate} min={today.toISOString()} id="startDateInput" />
                    End-Date: <input type="date" onChange={this.setEndDate} min={today.toISOString()} id="endDateInput" required />
                </section>
                <br/><br/>
                <button onClick={this.createCoupon}>Create Coupon</button>
            </div>
        )
    }

    private setTitle = (event: ChangeEvent<HTMLInputElement>) =>{
        this.setState({ title: event.target.value });
    }

    private setDescription = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({description: event.target.value});
        console.log(this.state.description);
    }

    private setCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        let option = event.target.selectedOptions[0]
        if (option.value != "CATEGORY") {
            this.setState({ category: option.value });
        }
        else{
            this.setState({category: null});
        }
    }

    private setImage = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({image: event.target.value});
    }

    private setAmount = (event: ChangeEvent<HTMLInputElement>) => {
        let value = Number(event.target.value)
        this.setState({ amount: value });
    }

    private setPrice = (event: ChangeEvent<HTMLInputElement>) =>{
        let value = Number(event.target.value)
        this.setState({price: value});
    }

    private setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
        let date = new Date(event.target.value)
        this.setState({ startDate: date });
    }

    private setEndDate = (event: ChangeEvent<HTMLInputElement>) =>{
        let date = new Date(event.target.value)
        this.setState({endDate: date});
    }

    private createCoupon = async () =>{
        try {
            this.validateCreaateCoupon();           
            await axios.post("http://localhost:8080/coupons",this.state);
            alert("The coupon was successfully created");
        } catch (error: any) {
            alert("Coupon creation was failed");
            console.error(error.message);
        }
        getAllCoupons();
        this.props.history.push("/coupons");
    }

    private validateCreaateCoupon = () => {
        if( ! this.state.title){
            let message = "Must enter a title";
            alert(message);
            throw new Error(message);
        }
        if(this.state.title.length < 2){
            let message = "Title must be at least two charachters long";
            alert(message)
            throw new Error(message);
        }
        if( ! this.state.description){
            let message = "Must enter a descritpion";
            alert(message);
            throw new Error(message);
        }
        if(this.state.description.length < 2){
            let message = "Description must be at least two charachters long";
            alert(message);
            throw new Error(message);
        }
        if(! this.state.category){
            let message = "Must select a category";
            alert(message);
            throw new Error(message);
        }
        if(this.state.amount < 1){
            let message = "Amount must be greater than 0";
            alert(message);
            throw new Error(message);
        }
        if(this.state.price < 0){
            let message = "Price can't be negative";
            alert(message);
            throw new Error(message);
        }
        if(this.state.startDate < new Date()){
            let message = "Start-Date has already past";
            alert(message);
            throw new Error(message);
        }
        if( ! this.state.endDate){
            let message = "Must enter an end-date";
            alert(message);
            throw new Error(message); 
        }
        if(this.state.endDate <= this.state.startDate){
            let message = "Expiary date is invalid";
            alert(message)
            throw new Error(message);
        }
    }
}