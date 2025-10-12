'use client';

import { useState, useEffect } from 'react';
import NotificationSignupDialog from './notification-signup-dialog';

const SIGNUP_COOKIE_NAME = 'focuscast_signup_dismissed';
const COOKIE_EXPIRATION_DAYS = 365;

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return undefined;
};

const setCookie = (name: string, value: string, days: number) => {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax;Secure`;
};


export default function SignupDialogManager() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // We want this to run only on the client
    const hasBeenDismissed = getCookie(SIGNUP_COOKIE_NAME);
    const timer = setTimeout(() => {
      if (!hasBeenDismissed) {
        setIsOpen(true);
      }
    }, 5000); // Wait 5 seconds before showing

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // When the dialog is closed (either by submitting or clicking away), set the cookie.
      setCookie(SIGNUP_COOKIE_NAME, 'true', COOKIE_EXPIRATION_DAYS);
    }
    setIsOpen(open);
  };

  return <NotificationSignupDialog isOpen={isOpen} onOpenChange={handleOpenChange} />;
}
