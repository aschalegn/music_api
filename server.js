import { app } from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 2222;

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});

// const num = 80;
// console.log(num);
// const arr = [9, 0, "ll"];
// arr.push("dlkf");
// arr = [",sm dn,"]
// console.log(arr);