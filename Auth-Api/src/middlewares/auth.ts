import { Request, Response, NextFunction } from "express";
import  Jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import { User } from "../models/User";

dotenv.config();

export const Auth = {
    private: async ( req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if(req.headers.authorization) {

            const [authType, token] = req.headers.authorization.split(' ');
            if(authType === 'Bearer') {
                try {
                    Jwt.verify(
                        token,
                        process.env.JWT_SECRET_KEY as string
                    );

                    success = true;

                } catch (err) {
                    
                }
            }
        }

        if(success){
            next();
        }else{
            res.status(403);
            res.json({ error: 'Não autorizado'});
        }

    }
}