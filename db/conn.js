
import mongoose from "mongoose";

const url="mongodb://localhost:27017/pipeaggre"

mongoose.connect(url)

const db=mongoose.connection

export default db;

console.log(("successfully connect to mongo"));

