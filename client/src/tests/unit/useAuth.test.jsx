// client/src/tests/unit/useAuth.test.jsx
import { renderHook, act } from '@testing-library/react-hooks';
import useAuth from '../../hooks/useAuth'; // adjust path

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: key => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useAuth hook', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  it('initializes with unauthenticated state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('login sets user and token', async () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login({ id: '1', name: 'Test' }, 'fake-token');
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(window.localStorage.getItem('token')).toBe('fake-token');
  });

  it('logout clears user and token', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.login({ id: '1' }, 'fake-token');
    });
    act(() => {
      result.current.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(window.localStorage.getItem('token')).toBeNull();
  });
});
