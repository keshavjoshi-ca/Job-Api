import mongoose from "mongoose"

const mongoConnect = (connectionString: string): Promise<typeof mongoose> => {
    return mongoose.connect(connectionString);
}

export default mongoConnect;