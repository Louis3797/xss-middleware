/* eslint-disable functional/immutable-data */
import { SanitizeOptions } from 'xss-middleware';

import { sanitize } from './sanitize';

/**
 * Sanitizes user input from potential cross-site scripting (XSS) attacks.
 *
 * @param options - Optional configuration options to customize the sanitization process.
 *
 */
export const xssMiddleware = (options?: SanitizeOptions) => {
  return (
    req: {
      body?: Record<string, unknown> | null;
      query?: Record<string, unknown> | null;
      params?: Record<string, unknown> | null;
    },
    _res: Record<string, unknown>,
    // eslint-disable-next-line functional/no-return-void
    next: (param?: unknown) => void
  ) => {
    req.body = sanitize(req.body, options);
    req.query = sanitize(req.query, options);
    req.params = sanitize(req.params, options);

    next();
  };
};
