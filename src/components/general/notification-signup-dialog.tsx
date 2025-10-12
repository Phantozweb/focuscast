
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitNotificationSignup } from '@/app/actions/notification-signup-action';
import { BellRing, Check, PartyPopper } from 'lucide-react';
import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  role: z.string().min(1, { message: "Please select your role." }),
});

type FormErrors = z.inferFlattenedErrors<typeof SignupSchema>;

interface NotificationSignupDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NotificationSignupDialog({ isOpen, onOpenChange }: NotificationSignupDialogProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<FormErrors | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    const validationResult = SignupSchema.safeParse({ name, email, role });
    if (!validationResult.success) {
      setErrors(validationResult.error.flatten());
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitNotificationSignup(validationResult.data);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: (error as Error).message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    "Optometrist",
    "Ophthalmologist",
    "Optometry Student",
    "Ophthalmic Technician/Assistant",
    "Optician",
    "Researcher/Academic",
    "Industry Professional",
    "Enthusiast/Other"
  ];
  
  const handleDialogClose = (open: boolean) => {
      onOpenChange(open);
      // Reset state after the dialog closes
      if (!open) {
          setTimeout(() => {
            setIsSubmitted(false);
            setName('');
            setEmail('');
            setRole('');
            setErrors(null);
          }, 300); // Delay to allow closing animation
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-[480px]">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <PartyPopper className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">You're All Set!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for subscribing. You'll be the first to know when new episodes and series drop.
            </p>
            <Button onClick={() => handleDialogClose(false)}>
              <Check className="mr-2 h-4 w-4" /> Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="flex justify-center mb-3">
                 <div className="bg-primary/10 p-3 rounded-full">
                    <BellRing className="h-8 w-8 text-primary" />
                 </div>
              </div>
              <DialogTitle className="text-2xl">Be the First to Know</DialogTitle>
              <DialogDescription>
                Get notified when new episodes and series arrive. Listen, learn, and stay ahead.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Dr. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={errors?.fieldErrors.name ? 'border-destructive' : ''}
                  required
                />
                {errors?.fieldErrors.name && <p className="text-sm text-destructive">{errors.fieldErrors.name[0]}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={errors?.fieldErrors.email ? 'border-destructive' : ''}
                  required
                />
                 {errors?.fieldErrors.email && <p className="text-sm text-destructive">{errors.fieldErrors.email[0]}</p>}
              </div>
               <div className="grid gap-2">
                <Label htmlFor="role">Primary Role *</Label>
                <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger id="role" className={errors?.fieldErrors.role ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Select your primary role..." />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                </Select>
                {errors?.fieldErrors.role && <p className="text-sm text-destructive">{errors.fieldErrors.role[0]}</p>}
              </div>
              <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Get Notified'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
