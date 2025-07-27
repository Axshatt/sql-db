"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client(process.env.PG_URL);
//Avoiding SQL injection
app.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield pgClient.connect();
    const { username, password, email } = req.body;
    const insertQuery = `INSERT INTO users(username , email ,password) VALUES ($1,$2,$3);`;
    const response = yield pgClient.query(insertQuery, [username, email, password]);
    console.log(response.rows);
    res.send({
        msg: "Saved Credentials"
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        const response = yield pgClient.query("SELECT * FROM users");
        console.log(response.rows);
    });
}
function main2() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        const insertQuery = `INSERT INTO users(username , email ,password)`;
        const response = yield pgClient.query(insertQuery);
        console.log(response.rows);
    });
}
// main()
app.listen(3000);
