const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./config/db.js");
const { MongoClient } = require("mongodb");

const app = express();
const path = require("path");


// public ディレクトリを静的ファイルとして提供
app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/student";
const dbName = process.env.MONGO_Name;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// // MongoDB接続
// let db;
// connectToDatabase(uri, "studnet").then(({ db: database }) => {
//     db = database;

// });

// Create
app.post("/api/students", async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // データベースに接続
        await client.connect();
        console.log("Connected to MongoDB");

        // 指定したデータベースとコレクションを取得
        const db = client.db(dbName);
        //const collection = db.collection("studentAll");

        const result = await db.collection("studentAll").insertOne(req.body);

        //console.log("追加");
        res.status(201).send(result);
        await client.close();

    } catch (error) {
        res.status(500).send(error);
    }
});

// Read
app.get("/api/students", async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // データベースに接続
        await client.connect();
        console.log("Connected to MongoDB");

        // 指定したデータベースとコレクションを取得
        const db = client.db(dbName);
        const collection = db.collection("studentAll");

        // コレクションの内容を取得してコンソールに表示
        const students = await collection.find({}).toArray();
        //console.log("Collection contents:");
        //console.table(students);
        //console.log("Read");


        //const students = await db.collection("studentAll").find().toArray();
        res.status(200).send(students);
        await client.close();

    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete
app.delete("/api/students/:studentId", async (req, res) => {
    const client = new MongoClient(uri);


    try {
        await client.connect();
        console.log("Connected to MongoDB");

        // 指定したデータベースとコレクションを取得
        const db = client.db(dbName);


        const result = await db.collection("studentAll").deleteOne({ 学籍番号: req.params.studentId });
        res.status(200).send(result);
        //console.log("削除");
        await client.close();

    } catch (error) {
        res.status(500).send(error);
    }
});

// // MongoDB URI とデータベース名
// const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
// const dbName = "school";

// (async () => {
//     const client = new MongoClient(uri);

//     try {
//         // データベースに接続
//         await client.connect();
//         console.log("Connected to MongoDB");

//         // 指定したデータベースとコレクションを取得
//         const db = client.db(dbName);
//         const collection = db.collection("studentAll");

//         // コレクションの内容を取得してコンソールに表示
//         const documents = await collection.find({}).toArray();
//         console.log("Collection contents:");
//         console.table(documents);

//     } catch (error) {
//         console.error("Failed to connect to MongoDB:", error);
//     } finally {
//         // 必要に応じて接続を閉じる（通常はAPIサーバーでは閉じない）
//         await client.close();
//     }
// })();


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
