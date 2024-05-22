import { Router } from 'express';
import { Login } from '../controller/auth';

export const authRoutes = async (router:Router) => {
    router.post('/login', Login);
    router.post('/logout', (req, res) => {
        return res.json({message: 'Logout'});
    });
};

