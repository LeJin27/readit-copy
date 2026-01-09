import dotenv from "dotenv";
dotenv.config();                      
process.env.POSTGRES_DB = process.env.POSTGRES_TEST_DB;  