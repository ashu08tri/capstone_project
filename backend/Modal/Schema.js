import mongoose from "mongoose";
import { Schema } from "mongoose";

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    accountNo: {type: String, unique: true},
    email: {type: String, unique: true},
    totalAmount: Number,
    credited: Number,
    debited: Number,
    mobile: Number,
    address: String,
    beneficery: [{ 
    firstName: String,
    lastName: String,
    accountNo: String,
    bankName: String,
    amount: Number
    }],
})

export const Customer = mongoose.models.customers || mongoose.model('customers', customerSchema);

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
})

export const User = mongoose.models.users || mongoose.model('users',userSchema);

const adminSchema = new Schema({
    name: String,
    email: String,
    password: String,
    isAdmin : {type: Boolean, default: true}
})

export const Admin = mongoose.models.admins || mongoose.model('admins',adminSchema);

const transactionSchema = new Schema({
    date: { type: Date, default: Date.now },
    user: String,
    sender: String,
    reciever: String,
    recieverAcc: String,
    amount: Number
})

export const Transaction = mongoose.models.transactions || mongoose.model('transactions',transactionSchema);

const requestSchema = new Schema({
    userId: String,
    firstName: String,
    lastName: String,
    mobile: Number,
    address: String
});

export const Request = mongoose.models.requests || mongoose.model('requests',requestSchema);
