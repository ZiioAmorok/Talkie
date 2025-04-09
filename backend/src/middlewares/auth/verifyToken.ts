import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {userId: string};
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;
    
    if(!token){
        res.status(401).json({ message: "Unauthorized-Token not found" });
        return;
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.user = decoded;
        next();
    }catch(err){
        res.status(403).json({ message: "Forbidden-Invalid token" });
        return;
    }
}
