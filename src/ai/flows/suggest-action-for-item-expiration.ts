'use server';
/**
 * @fileOverview Suggests an appropriate action for an expiring item based on user-configurable criteria.
 *
 * - suggestActionForItemExpiration - A function that suggests an action for item expiration.
 * - SuggestActionForItemExpirationInput - The input type for the suggestActionForItemExpiration function.
 * - SuggestActionForItemExpirationOutput - The return type for the suggestActionForItemExpiration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestActionForItemExpirationInputSchema = z.object({
  itemName: z.string().describe('The name of the item that is expiring.'),
  daysUntilExpiration: z.number().describe('The number of days until the item expires.'),
  quantity: z.number().describe('The quantity of the item that is expiring.'),
  storageConditions: z.string().describe('The storage conditions of the item.'),
  userConfigurableCriteria: z.string().describe('User-configurable criteria for suggesting actions.'),
});
export type SuggestActionForItemExpirationInput = z.infer<typeof SuggestActionForItemExpirationInputSchema>;

const SuggestActionForItemExpirationOutputSchema = z.object({
  suggestedAction: z.string().describe('The suggested action for the expiring item.'),
  reasoning: z.string().describe('The reasoning behind the suggested action.'),
});
export type SuggestActionForItemExpirationOutput = z.infer<typeof SuggestActionForItemExpirationOutputSchema>;

const suggestAction = ai.defineTool(
  {
    name: 'suggestAction',
    description: 'Suggests an action for an expiring item based on user-configurable criteria.',
    inputSchema: SuggestActionForItemExpirationInputSchema,
    outputSchema: SuggestActionForItemExpirationOutputSchema,
  },
  async (input) => {
    // This can call any typescript function.
    // Return the suggested action
    return {
      suggestedAction: 'Donate to local food bank',
      reasoning: 'Item is close to expiration and can still be consumed.',
    };
  }
);

const suggestActionForItemExpirationPrompt = ai.definePrompt({
  name: 'suggestActionForItemExpirationPrompt',
  tools: [suggestAction],
  input: {schema: SuggestActionForItemExpirationInputSchema},
  output: {schema: SuggestActionForItemExpirationOutputSchema},
  prompt: `Given an item that is expiring, suggest an appropriate action based on the user-configurable criteria.

Item Name: {{{itemName}}}
Days Until Expiration: {{{daysUntilExpiration}}}
Quantity: {{{quantity}}}
Storage Conditions: {{{storageConditions}}}
User-Configurable Criteria: {{{userConfigurableCriteria}}}

Use the suggestAction tool to determine the best course of action.`,
});

const suggestActionForItemExpirationFlow = ai.defineFlow(
  {
    name: 'suggestActionForItemExpirationFlow',
    inputSchema: SuggestActionForItemExpirationInputSchema,
    outputSchema: SuggestActionForItemExpirationOutputSchema,
  },
  async input => {
    const {output} = await suggestActionForItemExpirationPrompt(input);
    return output!;
  }
);

export async function suggestActionForItemExpiration(input: SuggestActionForItemExpirationInput): Promise<SuggestActionForItemExpirationOutput> {
  return suggestActionForItemExpirationFlow(input);
}

export type {suggestAction};
