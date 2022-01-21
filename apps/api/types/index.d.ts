declare global {
  namespace Express {
    export interface User {
      username: string
      avatarUrl: string
    }
  }
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string
      GITHUB_CLIENT_ID: string
      GITHUB_CLIENT_SECRET: string
      JWT_SECRET: string
    }
  }
}

export {}
