import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  studentName: String,
  studentId: Number,
  grade: Number,
  age: Number,
  address: String,
  isActive: Boolean,
});
   
const student=mongoose.model("Student", studentSchema);
export default student;

