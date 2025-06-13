import { generateSessionKey, createSession, isValidSession, getUserFromSession } from '../../services/sessionService';

describe('SessionService', () => {
    test('generateSessionKey should return 8 character string', () => {
        const key = generateSessionKey();
        expect(key).toHaveLength(8);
        expect(key).toMatch(/^[A-Z0-9]+$/);
    });

    test('createSession should create valid session', () => {
        const sessionKey = createSession(123);
        expect(sessionKey).toHaveLength(8);
        expect(isValidSession(sessionKey)).toBe(true);
        expect(getUserFromSession(sessionKey)).toBe(123);
    });

    test('session should expire after 10 minutes', () => {
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01T10:00:00Z'));
        
        const sessionKey = createSession(123);
        expect(isValidSession(sessionKey)).toBe(true);
        
        jest.advanceTimersByTime(11 * 60 * 1000);
        
        expect(isValidSession(sessionKey)).toBe(false);
        
        jest.useRealTimers();
    });
});