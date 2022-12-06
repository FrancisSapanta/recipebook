import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user';

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});

        if(!existingUser) return res.status(404).json({message: "user doesnt exist"});

        const correctPassword = await bcrypt.compare(password, existingUser.password);
        
        if(!correctPassword) return res.status(400).json({message: "Login incorrect"});

        const token = jwt.sign({email:existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong. :/'});
    }
}

export const signup = async (req, res) => {
    const {email, password, confirmPassword, firstName, lastName} = req.body;

    try {
        const existingUser = await User.findOne({email});
        //check if email is used
        if(existingUser) return res.status(404).json({message: "user already exist"});

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords dont match"});

        const hashedPass = await bcrypt.hash(password, 12);
        
        const result = await User.create({email, password: hashedPass, name: `${firstName} ${lastName}`});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({result: result, token});

    } catch (error) {
        res.status(500).json({message: 'Something went wrong. :/'});
    }
}