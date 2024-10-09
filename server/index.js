import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import financialRecordRouter from "./routes/finance-record.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const Mongo_Pswrd = process.env.Mongo_Pswrd;


app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://dsairam26:${Mongo_Pswrd}@cluster0.lt1is.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


mongoose
.connect(mongoURI)
.then(() => {
  console.log("Successfully Connected to MongoDb!!!");
  // Start the server after successful connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => console.log("Unable to connect!!!  to MongoDb",err))


app.use("/finance-records",financialRecordRouter);

/*app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});*/

// Basic route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});