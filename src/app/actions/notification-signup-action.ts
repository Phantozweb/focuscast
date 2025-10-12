'use server';

import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Please enter a valid email address.'),
  role: z.string().min(1, 'Please select your primary role.'),
});

export async function submitNotificationSignup(formData: { name: string; email: string; role: string }) {
  const webhookUrl = 'https://discord.com/api/webhooks/1426937706658664528/Y2lwu0KXNL-J1m9N-jA6VBWfFlGuODnJjSdvHfOUmxxJkw9hqPzdyDyX_CiLbj1qoSYb';
  const siteUrl = 'http://localhost:3000';

  if (!webhookUrl) {
    console.error('NOTIFICATION_WEBHOOK_URL is not set.');
    return { success: false, message: 'Server configuration error.' };
  }

  const validationResult = SignupSchema.safeParse(formData);

  if (!validationResult.success) {
    console.error('Validation failed:', validationResult.error.flatten().fieldErrors);
    return { success: false, message: 'Invalid data provided.' };
  }
  
  const { name, email, role } = validationResult.data;

  const detailsBlock = `\`\`\`
Name:  ${name}
Email: ${email}
Role:  ${role}
\`\`\``;

  const embed: any = {
    title: '🚀 New FocusCast Subscriber!',
    description: `A new user wants to get notified about new episodes and series launches.
    
**Subscriber Details:**
${detailsBlock}`,
    type: 'rich',
    color: 0x00ff99, // A nice green color
    author: {
      name: name,
      icon_url: 'https://raw.githubusercontent.com/Phantozweb/focuscastaudios/main/Cover/logo.png'
    },
    footer: {
      text: `Signed up from: ${new URL(siteUrl).hostname}`,
    },
    timestamp: new Date().toISOString(),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'FocusCast Notifier',
        avatar_url: 'https://raw.githubusercontent.com/Phantozweb/focuscastaudios/main/Cover/logo.png',
        embeds: [embed],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to send Discord webhook:', response.status, errorText);
      return { success: false, message: `Failed to subscribe. Server responded with ${response.status}.` };
    }

    return { success: true, message: "You've been subscribed!" };
  } catch (error) {
    console.error('Error sending Discord webhook:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
