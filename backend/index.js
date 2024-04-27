import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";

import { Admin,Customer,User,Transaction,Request } from "./Modal/Schema.js";

mongoose
    .connect("mongodb://127.0.0.1:27017/bankingData")
    .then(() => console.log("Connected"))
    .catch((err) => console.log("something Went Wrong", err));

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type,authorization'
    );
    next();
  });

  app.get("/dashboard", authenticateToken, async (req, res) => {
    try{
       if(req.user.isAdmin){
        const allCustomer = await Customer.find()
        res.json({allCustomer,ok: true})
       }else{
        const customer = await Customer.find({email: req.user.email})
        res.json({customer,ok:true})
       }
    }catch(error){
        res.json({error})
    }
});

app.get('/customer/:id',authenticateToken, async(req,res) => {
    const {id}= req.params;
    try{
        const singleUser = await Customer.find({_id:id});
        res.json(singleUser);
    }catch(err){
        res.status(404).send(err)
    }
})

app.put('/edit/:id', authenticateToken, async(req,res) => {
    const payload = req.body
    const {id} = req.params;
    try{
        await Customer.findByIdAndUpdate(id,payload);
        res.json({ok:true})    
    }catch(err){
        res.status(501).send(err)
    }
})

app.post("/register", async (req, res) => {
    try {
        const customer = { 
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            accountNo: req.body.accountNo,
            credited: req.body.credited,
            debited: req.body.debited,
            totalAmount: req.body.amount,
            beneficery: req.body.beneficery,
            mobile: req.body.mobile,
            address: req.body.address,
        };
        const newCustomer = new Customer(customer);
        await newCustomer.save();
        res.status(201).json({ok:true});
    } catch (e) {
        res.status(400).json("something went wrong! Check your input again");
    }
});

app.post('/register/user',async(req,res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: `${req.body.firstName} ${req.body.lastName}`,
            email: req.body.email,
            password: hashedPassword,
        };
        const newUser = new User(user);
        await newUser.save();
        res.status(201).json({ok:true});
    }catch (e) {
        res.status(400).json("something went wrong! Check your input again",e);
    }
})

app.post('/transaction', async(req,res)=>{
    const payload = req.body;
    try{
        const transaction = new Transaction(payload);
        await transaction.save();
        res.json({data:transaction,ok:true})
    }catch(err){
        res.status(404).send(err)
    }
})

app.get('/user_transaction/:id', async(req,res) => {
    const user = await Transaction.find({user: req.params.id})
    res.json(user)
})

app.put('/debited', async(req,res) => {
    const {user,amount,total} = req.body;
    await Customer.findOneAndUpdate({_id: user},{$set:{totalAmount: total-amount}});
    await Customer.updateOne({_id: user}, { $inc: { debited: amount } })
    res.status(200).json("Updated!")
})

app.put('/addBeneficery/:id', async(req,res) => {
    const id = req.params.id;
    const payload = req.body;
    await Customer.findByIdAndUpdate({_id: id},{$push:{beneficery: payload}})
    res.status(200).json("Beneficery Added!")
})

app.get('/requests', authenticateToken, async(req,res) => {
   const {isAdmin} = req.user;
   if(isAdmin){
    try{
        const requests = await Request.find();
        res.json(requests)
    }catch(err){
        res.status(402)
    }
   }else{
    res.json({message: 'Unauthorized user!', status: 403})
   }
   
})

app.post('/requests', authenticateToken, async(req,res) => {
    const payload = req.body;
    try{
        const requests = new Request(payload)
        await requests.save();
        res.status(201).json({ok:true})
    }catch(err){
        res.send(err)
    }
})

app.delete('/request/:id',authenticateToken,async(req,res) => {
    const{id} = req.params;
    try{
        await Request.findByIdAndDelete(id);
        res.status(201).json({ok:true});
    }catch(err){
        res.status(500).send(err)
    }
})

app.post("/login/admin", (req, res) => {
    const { email, password } = req.body;
    try {
        Admin.findOne({ email: email })
        .then(loggedUser => {
            if(loggedUser){
                bcrypt.compare(password, loggedUser.password, (err, result) => {
                    if (result) {
                        const user = { email, isAdmin:loggedUser.isAdmin };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.json({ accessToken,ok:true });
                    }else{
                        res.json({message:"email or password is incorrect!", status: 401, ok: false}).status(401);
                    }
                });
            }else{
                res.status(404).json({message:"No user found!"});
            }
        })
    } catch (e) {
        console.log(e.message)
    }
});

app.post("/login/customer", (req, res) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email: email })
        .then(loggedUser => {
            if(loggedUser){
                bcrypt.compare(password, loggedUser.password, (err, result) => {
                    if (result) {
                        const user = { email };
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                        res.json({ accessToken,ok:true });
                    }else{
                        res.json({message:"email or password is incorrect!", status: 401, ok: false}).status(401);
                    }
                });
            }else{
                res.status(404).json({message:"No user found!"});
            }
        })
    } catch (e) {
        console.log(e.message)
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403);

        req.user = user;
        next();
    });
}

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
