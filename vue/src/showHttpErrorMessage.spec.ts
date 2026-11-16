/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { NotificationsStore } from 'CoreHome';
import showHttpErrorMessage, { rethrowHttpErrorMessage } from './showHttpErrorMessage';

vi.mock('CoreHome', () => ({
  NotificationsStore: { show: vi.fn(() => 'ajaxHelper'), scrollToNotification: vi.fn() },
}));

function xhr(status: number, responseJSON?: unknown) {
  return { status, responseJSON };
}

describe('TagManager/showHttpErrorMessage', () => {
  beforeEach(() => {
    vi.mocked(NotificationsStore.show).mockClear();
    document.body.innerHTML = '<div id="loadingError" style="display: block"></div>';
  });

  it('shows the API message of a 4xx response and hides the generic error box', () => {
    const message = showHttpErrorMessage(xhr(404, { result: 'error', message: 'Container not found' }));

    expect(message).toBe('Container not found');
    expect(NotificationsStore.show).toHaveBeenCalledWith({
      message: 'Container not found',
      context: 'error',
      id: 'ajaxHelper',
      type: 'toast',
    });
    expect(document.getElementById('loadingError')!.style.display).toBe('none');
  });

  it.each([
    ['a 500 response', xhr(500, { result: 'error', message: 'Oops' })],
    ['a 399 response', xhr(399, { result: 'error', message: 'Oops' })],
    ['a 4xx response without an error result', xhr(400, { result: 'success', message: 'Oops' })],
    ['a 4xx response with an empty message', xhr(400, { result: 'error', message: '' })],
    ['a 4xx response with a non-string message', xhr(400, { result: 'error', message: 42 })],
    ['a 4xx response without JSON', xhr(400)],
    ['an ApiResponseError, as core 6.1 rejects with', new Error('Container not found')],
    ['null', null],
    ['a string', 'error'],
  ])('ignores %s', (_label, error) => {
    expect(showHttpErrorMessage(error)).toBeNull();
    expect(NotificationsStore.show).not.toHaveBeenCalled();
    expect(document.getElementById('loadingError')!.style.display).toBe('block');
  });

  it('rethrows the error it was given', () => {
    const error = xhr(404, { result: 'error', message: 'Container not found' });

    let thrown: unknown = null;
    try {
      rethrowHttpErrorMessage(error);
    } catch (e) {
      thrown = e;
    }

    expect(thrown).toBe(error);
    expect(NotificationsStore.show).toHaveBeenCalledTimes(1);
  });
});
