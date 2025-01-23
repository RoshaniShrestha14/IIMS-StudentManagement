import express from "express";
import mongoose  from "mongoose";
import student from "./student.module.js";



//Create backend app
const app = express();
app.use(express.json());

//connecting database
//database connect
const dbConnect=async()=>{
    try{
        const url = "mongodb+srv://iims:iims123@mernstack.uoq97.mongodb.net/StudentManagement?retryWrites=true&w=majority&appName=MernStack";
        await mongoose.connect(url);
        console.log("DB connection successful");
    }catch(error){
        console.log("DB connection failed");
        console.log(error.message);    
    }
};
dbConnect();

//API
//Adding student in the list
app.post("/student/add", async(req, res)=>{
    const newStudent = req.body;
    await student.create(newStudent);
    return res.status(201).send({message:"Student is added Successfully"});
});
//Get student List 
app.get("/student/list", async(req, res)=>{
    const studentList= await student.find();
    return res.status(200).send({message:"Student detail is printed", studentList:studentList});
});

//delete the student using id
app.delete("/student/delete/:id", async (req, res) => {
    const studentId= req.params.id;
    //should be a valid mongo db

  const isValid=mongoose.isValidObjectId(studentId);
  //if id is not valid
  if(!isValid){
  return res.status(400).send({ message: "Invalid student id" });
}
const students= await student.findOne({id:studentId});//find product
 if (!student) {
   return res.status(400).send({ message: "Student does not exist" });
 };
 await student.deleteOne({_id:studentId});
 
 //send req
 return res.status(200).send({ message: "Student is deleted successfully "});
});
// Update a student using ID
app.put("/student/update/:id", async (req, res) => {
  const studentId = req.params.id;
  const updates = req.body;

  const isValid = mongoose.isValidObjectId(studentId);
  if (!isValid) {
    return res.status(400).send({ message: "Invalid student ID" });
  }

  const studentData = await student.findById(studentId);
  if (!studentData) {
    return res.status(400).send({ message: "Student does not exist" });
  }

  // Update the student
  await student.updateOne({ _id: studentId }, updates);
  return res.status(200).send({ message: "Student is updated successfully" });
});



//network port
const PORT=8000;

app.listen(PORT, () => {
  console.log("App is listening on port $(PORT)");
});