import { Session } from '../types';

const sessions: Map<string, Session> = new Map();

export function generateSessionKey(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function createSession(userId: number): string {
    const sessionKey = generateSessionKey();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    
    sessions.set(sessionKey, {
        userId: userId,
        expiresAt: expiresAt
    });
    
    return sessionKey;
}

export function isValidSession(sessionKey: string): boolean {
    const session = sessions.get(sessionKey);
    if (!session) {
        return false;
    }
    
    const now = new Date();
    if (now > session.expiresAt) {
        sessions.delete(sessionKey);
        return false;
    }
    
    return true;
}

export function getUserFromSession(sessionKey: string): number | null {
    const session = sessions.get(sessionKey);
    if (!session) {
        return null;
    }
    
    const now = new Date();
    if (now > session.expiresAt) {
        sessions.delete(sessionKey);
        return null;
    }
    
    return session.userId;
}