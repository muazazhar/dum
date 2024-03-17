import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect("mongodb+srv://mmuazmscs23seecs:<yqAgYFEnoj9ZDJhZ>@cloud.svqkggw.mongodb.net/cloud?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongo Connection successfully established.");
    } catch (error) {
        throw new Error("Error connecting to Mongoose");
    }
};

export default connect;