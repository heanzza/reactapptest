import { analytics, createApp, server } from '@databricks/appkit';

createApp({
  plugins: [
    server(),
    // SQL query execution against the configured SQL warehouse.
    // Query files live in config/queries/*.obo.sql (run as the signed-in user).
    analytics({}),
  ],
}).catch(console.error);
