import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";


export const verifyToken = (req,res,next)=>{
    const token = req.cookies.accessToken;
    if(!token) return next(createError(401,"you are not authenticated!"))
    jwt.verify(token,process.env.JWT_SECRET, async (err,payload)=>{
        if(!token) return next(403,"token is invalid  sorry!");
        // console.log(payload);
        req.userId = payload.id;
        req.email = payload.email;
        req.isSeller = payload.isSeller;
        next();
    });
}