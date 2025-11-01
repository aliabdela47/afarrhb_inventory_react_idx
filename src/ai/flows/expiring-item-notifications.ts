'use server';

/**
 * @fileOverview A flow that identifies expiring items, determines the appropriate personnel,
 * and sends them actionable notifications with summaries.
 *
 * - expiringItemNotifications - A function to trigger the expiring item notification process.
 * - ExpiringItemNotificationsInput - The input type for the expiringItemNotifications function.
 * - ExpiringItemNotificationsOutput - The return type for the expiringItemNotifications function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExpiringItemNotificationsInputSchema = z.object({
  items: z.array(
    z.object({
      itemId: z.string().describe('The unique identifier of the item.'),
      itemName: z.string().describe('The name of the item.'),
      expirationDate: z.string().describe('The expiration date of the item (YYYY-MM-DD).'),
      quantity: z.number().describe('The quantity of the item.'),
    })
  ).describe('A list of items to check for expiration.'),
  notificationThresholdDays: z
    .number()
    .describe('The number of days before expiration to send notifications.'),
  policy: z
    .object({
      includeProgramHeads: z
        .boolean()
        .describe('Whether to include Program Heads in the notification.'),
      includeDirector: z
        .boolean()
        .describe('Whether to include the Director in the notification.'),
    })
    .describe('The policy for including personnel in the notification.'),
});
export type ExpiringItemNotificationsInput = z.infer<typeof ExpiringItemNotificationsInputSchema>;

const ExpiringItemNotificationsOutputSchema = z.object({
  notifications: z.array(
    z.object({
      itemId: z.string().describe('The item ID for which the notification is generated.'),
      message: z.string().describe('The notification message to be sent.'),
      recipients: z.array(z.string()).describe('List of recipient email addresses.'),
    })
  ).describe('A list of notifications to send.'),
});
export type ExpiringItemNotificationsOutput = z.infer<typeof ExpiringItemNotificationsOutputSchema>;

export async function expiringItemNotifications(
  input: ExpiringItemNotificationsInput
): Promise<ExpiringItemNotificationsOutput> {
  return expiringItemNotificationsFlow(input);
}

const generateNotificationPrompt = ai.definePrompt({
  name: 'generateNotificationPrompt',
  input: {schema: ExpiringItemNotificationsInputSchema},
  output: {schema: ExpiringItemNotificationsOutputSchema},
  prompt: `You are a notification system responsible for informing relevant personnel about expiring items.

  Based on the list of items, the notification threshold, and the configured policy, determine who needs to be notified and what the message should be.

  Items:
  {{#each items}}
  - Item ID: {{itemId}}, Name: {{itemName}}, Expiration Date: {{expirationDate}}, Quantity: {{quantity}}
  {{/each}}

  Notification Threshold: {{notificationThresholdDays}} days

  Policy: Include Program Heads: {{policy.includeProgramHeads}}, Include Director: {{policy.includeDirector}}

  Generate a list of notifications with personalized messages for each item nearing expiration. The recipients should be determined based on the policy.
  Consider that emails should be hardcoded to: programhead@example.com, director@example.com, inventorymanager@example.com. Inventory manager should always be included.

  Ensure that the output is a valid JSON array of notifications.
  `,
});

const expiringItemNotificationsFlow = ai.defineFlow(
  {
    name: 'expiringItemNotificationsFlow',
    inputSchema: ExpiringItemNotificationsInputSchema,
    outputSchema: ExpiringItemNotificationsOutputSchema,
  },
  async input => {
    const {output} = await generateNotificationPrompt(input);
    return output!;
  }
);
