import mongoose from "mongoose";

export const dbConection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL || '', {
            maxPoolSize: 10,
        });
        console.log('Database online 🚀');
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the database')
    }
}