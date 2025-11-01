# **App Name**: AfarRHB Inventory Pro

## Core Features:

- Glassmorphism Dashboard: Display key metrics using frosted glass cards with blur effects and soft UI elements, supporting light and dark themes.
- Role-Based Authentication: Secure login system with email/password, 'Remember Me' option, and social login, with role-based access control for different user privileges.
- Model 19 Receipt Form: Dedicated module for creating, viewing, editing, and listing Model 19 forms for item receipts, with integration to other modules.
- Expiring Items Notification: Background job to check for expiring items and send notifications to relevant personnel, with actionable links and summaries. A reasoning tool decides whether to include Program Heads or Director based on configured policy
- Vehicle Tracking with Map: Track vehicle locations with manual check-ins and display routes on a map using Leaflet or Google Maps. API endpoint for location ingestion.
- Comprehensive Audit Logs: Track all create, edit, and delete actions across modules, filter by user, module, and date, and export data to CSV.
- Item Management with Expiration Tracking: Manage item inventory, track food-related items' shelf life, and notify stakeholders before expiration, suggesting appropriate actions. The action will be chosen using a tool based on user configurable criteria.

## Style Guidelines:

- Primary color: Soft blue (#90AFC5) to convey a sense of calmness and reliability suitable for an inventory management system.
- Background color: Light gray (#F0F4F7) for a clean and modern glassmorphism effect in light mode. In dark mode the background is a very dark gray, almost black.
- Accent color: Pale orange (#F2A541) for CTAs and important notifications to draw attention without being intrusive.
- Body and headline font: 'PT Sans', a sans-serif typeface that provides a balance of modernity and readability for prolonged use.
- Code font: 'Source Code Pro' for displaying code snippets or technical information, enhancing readability.
- Use clear, minimalist icons representing each module for easy navigation. Icons should have a slightly rounded appearance.
- Implement a responsive, card-based layout using glassmorphism effects for dashboard elements, ensuring adaptability across various devices.