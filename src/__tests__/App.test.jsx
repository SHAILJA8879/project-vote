import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Mock Google OAuth
vi.mock('@react-oauth/google', () => ({
  GoogleLogin: () => <div data-testid="google-login">Google Login</div>,
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
}));

// Mock React GA4
vi.mock('react-ga4', () => ({
  default: {
    initialize: vi.fn(),
    send: vi.fn(),
    event: vi.fn(),
  },
}));

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Check if the logo or some text is present
    const logos = screen.getAllByText(/ProjectVote/i);
    expect(logos.length).toBeGreaterThan(0);
  });

  it('contains navigation links', () => {
    render(<App />);
    const homeLinks = screen.getAllByRole('link', { name: /home/i });
    expect(homeLinks.length).toBeGreaterThan(0);
    
    const dashboardLinks = screen.getAllByRole('link', { name: /dashboard/i });
    expect(dashboardLinks.length).toBeGreaterThan(0);
  });
});
