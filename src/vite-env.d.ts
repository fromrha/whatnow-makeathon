/// <reference types="vite/client" />

// Figma Make injects virtual modules at runtime. Declare them so the
// standalone TypeScript typecheck (added in the IDE cleanup pass) does not
// fail on the Make-hosted entrypoint. These are no-ops outside Make.
declare module "figma:foundry-client-api";
