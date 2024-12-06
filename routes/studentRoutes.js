const express = require("express");
const Student = require("../models/student");
const router = express.Router();

// Create (学生を追加)
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Read (全学生データ取得)
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Read (特定の学生データ取得)
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).send({ error: "Student not found" });
        res.status(200).send(student);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




// Update (学生データを更新)
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).send({ error: "Student not found" });
        res.status(200).send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Delete (学生データを削除)
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).send({ error: "Student not found" });
        res.status(200).send({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
