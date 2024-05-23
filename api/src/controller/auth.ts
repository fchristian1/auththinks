import { Request, Response } from "express";
import { accounts } from "../service/accounts";

export const Login = async (req: Request, res: Response) => {
    console.log('Login');
    
    const { email, passworda, passwordb } = req.body;
    if (passworda !== passwordb) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    const account = accounts.find(account => account.email === email);
    if (!account) {
        return res.status(400).json({ message: 'Account not found' });
    }
    if (!account.CheckPassword(passworda)) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    return res.json({ message: 'Login successful',token: account.CreateJWT() });
};