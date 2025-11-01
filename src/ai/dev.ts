import { config } from 'dotenv';
config();

import '@/ai/flows/expiring-item-notifications.ts';
import '@/ai/flows/suggest-action-for-item-expiration.ts';