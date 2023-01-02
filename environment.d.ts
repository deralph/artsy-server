declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      CLIENT_SIDE?: String;
      JWT_SECRET: string;
      JWT_LIFETIME: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
