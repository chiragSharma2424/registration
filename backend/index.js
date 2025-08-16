import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from'cors'
const port = process.env.PORT
app.use(express.json());
app.use(cors());



const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true}
}, {timestamps: true});

const User = mongoose.model("user", userSchema);


app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password }= req.body;
        if(!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                message: "user already exists"
            })
        }

        const newUser = await User.create({
            name: name,
            email: email,
            password: password
        });

        const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "user signup successfully",
            token: token,
            user: newUser
        })
    } catch(err) {
        console.log(`error in controller ${err}`);
        return res.status(500).json({
            message: "internal server error"
        })
    }
})

app.get('/', (req, res) => {
    return res.json({
        message: "this is home route"
    })
});

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})