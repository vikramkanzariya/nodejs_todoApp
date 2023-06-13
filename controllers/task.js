import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const NewTask = async(req ,res , next) => {
   try {
    const { title , description } = req.body;

    await Task.create({
        title,
        description,
        user:req.user
    });

    res.status(201).json({
        success:true , 
        message:"Task Added SuccessFully...",
    }); 
  }
   catch (error) {
    next(error);
  }
};


export const getMyTask = async(req , res , next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user:userid });
  
    res.status(200).json({
      success:true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};


export const UpdateTask = async(req , res , next) => {
  try {
    const task = await Task.findById(req.params.id);

    if(!task) return next(new Error("Invalid ID" , 404));
    
    task.isCompleted = !task.isCompleted;
    await task.save();
  
    res.status(200).json({
      success:true,
      message:"Task Updated Successfully...",
    });
  } catch (error) {
    next(error);
  }
};


export const DeleteTask = async(req , res , next) => {
  try {
    
  const task = await Task.findById(req.params.id);

  if(!task)   return next(new ErrorHandler("Invalid ID" , 404));

    // return res.status(404).json({
    //   success:false,
    //   message:"Invalid ID..."          
    // });
  
  await task.deleteOne();

  res.status(200).json({
    success:true,
    message:"Task Deleted Successfully...",
  });
  } catch (error) {
    next(error);
  }
};