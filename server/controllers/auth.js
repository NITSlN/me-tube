import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
// Sign Up
export const signup = async (req,res,next)=>{
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const user = await User.create({...req.body,password:hash})
        const token = generateToken(user.id)
        const { password, ...others} = user._doc;
        // Always sotre jwt token in httpOnly cookie so that no third party can access it
        
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(others)
    } catch (err) {
      next(err);
    }
};

// Sign In
export const signin= async (req,res,next)=>{
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return next(createError(400, "Wrong Credentials!"));
        }
        const token = generateToken(user.id)
        const { password, ...others} = user._doc;
        // Always sotre jwt token in httpOnly cookie so that no third party can access it
        
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json(others)


    } catch (err) {
      next(err);
    }
};

export const logout = (req,res)=>{
    res.cookie("access_token","",{ maxAge: 1 }).json({})
    
}
const generateToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn: '5d' });
  }