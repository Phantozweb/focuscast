
'use client';

import { useState, useEffect, useCallback } from 'react';
import NotificationSignupDialog from './notification-signup-dialog';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const SIGNUP_SUCCESS_COOKIE = 'focuscast_signup_success';
const SIGNUP_DISMISS_COOKIE = 'focuscast_signup_dismissed';
const SUCCESS_EXPIRATION_DAYS = 365;
const DISMISS_EXPIRATION_DAYS = 3;

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
  const { toast } = useToast();

  useEffect(() => {
    // We want this to run only on the client
    const hasSignedUp = getCookie(SIGNUP_SUCCESS_COOKIE);
    const hasDismissed = getCookie(SIGNUP_DISMISS_COOKIE);
    
    const timer = setTimeout(() => {
      if (!hasSignedUp && !hasDismissed) {
        setIsOpen(true);
      }
    }, 5000); // Wait 5 seconds before showing

    return () => clearTimeout(timer);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
        // If dialog is closed without success, set a temporary dismiss cookie
        if (!getCookie(SIGNUP_SUCCESS_COOKIE)) {
            setCookie(SIGNUP_DISMISS_COOKIE, 'true', DISMISS_EXPIRATION_DAYS);
            toast({
                title: "Stay Connected!",
                description: "Join Focus Links Community To Attend Webinars, give feedback and become a member for free.",
                action: (
                    <Button asChild>
                        <Link href="https://chat.whatsapp.com/Bigr23C10d54i9fEBxKVHk?mode=wwc" target="_blank">Join Now</Link>
                    </Button>
                ),
                duration: 10000, // Show for 10 seconds
            });
        }
    }
  }, [toast]);

  const onSignupSuccess = useCallback(() => {
    setCookie(SIGNUP_SUCCESS_COOKIE, 'true', SUCCESS_EXPIRATION_DAYS);
    // No need to close the dialog here, as the component itself handles the success UI
  }, []);


  return <NotificationSignupDialog isOpen={isOpen} onOpenChange={handleOpenChange} onSignupSuccess={onSignupSuccess} />;
}
