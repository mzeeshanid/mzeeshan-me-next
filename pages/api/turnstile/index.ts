/**
 * Turnstile CAPTCHA validation utilities
 * 
 * Usage:
 * ```typescript
 * import { validateTurnstile } from '@/pages/api/turnstile';
 * 
 * const result = await validateTurnstile(token);
 * if (!result.success) {
 *   return res.status(400).json({ error: result.error });
 * }
 * ```
 */

export { validateTurnstile, type TurnstileValidationResponse } from "./validate";
