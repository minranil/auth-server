import { TooManyRequestsError } from "../common/HttpError.js";


const authAttempts = new Map();
const MAX_ATTEMPTS = parseInt(process.env.AUTH_LIMITER_MAX_ATTEMPTS);
const BLOCK_TIME = parseInt(process.env.AUTH_LIMITER_BLOCK_TIME) * 60 * 1000;
const CLEANUP_INTERVAL = parseInt(process.env.AUTH_LIMITER_CLEANUP_INTERVAL) * 60 * 1000;


function cleanupOldAttempts() {
    const now = Date.now();
    for (const [key, attempt] of authAttempts) {
        if (now - attempt.lastAttempt > BLOCK_TIME) {
            authAttempts.delete(key);
        }
    }
}

setInterval(cleanupOldAttempts, CLEANUP_INTERVAL);


export const authLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    const attempt = authAttempts.get(ip) || { count: 0, lastAttempt: now, timeout: null };

    if (attempt.count >= MAX_ATTEMPTS) {
        const timePassed = now - attempt.lastAttempt;
        if (timePassed < BLOCK_TIME) {
            throw new TooManyRequestsError('Too many attempts. Try again later.');
        } else {
            attempt.count = 1;
            attempt.lastAttempt = now;
            authAttempts.set(ip, attempt);
            return next();
        }
    }

    attempt.count += 1;
    attempt.lastAttempt = now;

    if (attempt.count >= MAX_ATTEMPTS && !attempt.timeout) {
        attempt.timeout = setTimeout(() => authAttempts.delete(ip), BLOCK_TIME);
    }

    authAttempts.set(ip, attempt);

    return next();
};