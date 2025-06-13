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
        // Use Jest's fake timers for proper Date mocking
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01T10:00:00Z'));
        
        const sessionKey = createSession(123);
        expect(isValidSession(sessionKey)).toBe(true);
        
        // Advance time by 11 minutes (11 * 60 * 1000 milliseconds)
        jest.advanceTimersByTime(11 * 60 * 1000);
        
        expect(isValidSession(sessionKey)).toBe(false);
        
        // Restore real timers
        jest.useRealTimers();
    });
});