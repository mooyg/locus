interface CorsOptions {
  origin: string;
  credentials: boolean;
}

export const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV
    ? process.env.CLIENT_URL
    : 'http://localhost:3000',
  credentials: true,
};
