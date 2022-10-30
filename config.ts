import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
    app: {
        port: parseInt(process.env.PORT || '4000'), // PORT env is used by Heroku
    },
    db: {
        url: process.env.DATABASE_URL || '',
    }
};
