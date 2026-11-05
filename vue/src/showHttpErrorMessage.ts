/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { NotificationsStore } from 'CoreHome';

/**
 * Shows the message of an API error answered with a 4xx status, such as a container deleted in
 * another tab, and returns it; returns null for anything else. AjaxHelper shows the message of an
 * error answered with 200 itself, but for a 4xx only shows its generic error box.
 */
export default function showHttpErrorMessage(error: unknown): string|null {
  const xhr = error as { status?: unknown, responseJSON?: { result?: unknown, message?: unknown } };
  if (!xhr || typeof xhr !== 'object' || typeof xhr.status !== 'number'
    || xhr.status < 400 || xhr.status >= 500
  ) {
    return null;
  }

  const message = xhr.responseJSON?.result === 'error' ? xhr.responseJSON.message : null;
  if (typeof message !== 'string' || !message) {
    return null;
  }

  // AjaxHelper's default error callback has already shown it; the message below says more
  const genericError = document.getElementById('loadingError');
  if (genericError) {
    genericError.style.display = 'none';
  }

  // AjaxHelper's own id, so this is shown and replaced like an error it shows itself
  const notificationId = NotificationsStore.show({
    message,
    context: 'error',
    id: 'ajaxHelper',
    type: 'toast',
  });
  NotificationsStore.scrollToNotification(notificationId);

  return message;
}

/**
 * For a promise's catch: shows the message as above, then rejects with the same error.
 */
export function rethrowHttpErrorMessage(error: unknown): never {
  showHttpErrorMessage(error);
  throw error;
}
