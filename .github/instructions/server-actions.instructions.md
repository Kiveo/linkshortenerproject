---
description: Read this file when implementing or modifying server actions, data mutations, validation, authentication checks, or database writes in the app.
---
# Server Actions Guidelines

## 1. Use Server Actions

ALL data mutations MUST use server actions. Server actions MUST be called from client components.

## 2. Co-locate Actions

Server action files MUST be named `actions.ts` and co-located with the component that calls them.

## 3. Type and Validate Inputs

ALL data passed to server actions MUST have appropriate TypeScript types. DO NOT use the `FormData` TypeScript type. ALL inputs MUST be validated with Zod inside the server action.

## 4. Authenticate Before Database Operations

Every server action MUST first verify that a user is logged in before performing any database operation.

## 5. Use Data Helpers

Database operations MUST be implemented in helper functions in the `/data` directory that wrap Drizzle queries. Server actions MUST call these helpers and MUST NOT contain direct Drizzle queries.