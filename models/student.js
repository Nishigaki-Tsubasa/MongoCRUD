const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    学籍番号: { type: String, required: true, unique: true },
    名前: { type: String, required: true },
    学年: { type: Number, required: true },
    クラス: { type: String, required: true },
    出席番号: { type: Number, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
