import { Request, Response } from 'express';
import { createSession } from '../services/sessionService';

export function login(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    
    if (isNaN(userId) || userId < 0 || userId > 2147483647) {
        return res.status(400).send('Invalid user ID');
    }
    const sessionKey = createSession(userId);
    res.send(sessionKey);
}