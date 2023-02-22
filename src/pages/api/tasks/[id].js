import Task from "../../../model/Task";
import { dbConnect,runMiddleware } from "../../../utils/index";
import Morgan from "morgan";

dbConnect();



export default async (req, res) => {
    const { method, body, query:{id} } = req;
    const morgan = Morgan("dev");

    switch(method) {
        case "GET": 
        try {
            const task = await Task.findById(id);
            if(!task) return res.status(404).json({msg:"Task does not exist"})
            await runMiddleware(req,res,morgan);
            return res.status(200).json(task);
        } catch(err){
            return res.status(400).json({msg: err.message});
        }
    case "DELETE":
        try{
            const deleteTask = await Task.findByIdAndDelete(id);
            if(!deleteTask) return res.status(404).json({msg:"Task does not exist"})
            await runMiddleware(req,res,morgan);
            return res.status(204).json();
        }catch(err){
            return res.status(400).json({msg: err.message});
        }
        case "PUT":
            try{
                const updatedTask = await Task.findByIdAndUpdate(id, body, {
                    new: true,
                    runValidators: true,
                });
                if(!updatedTask)
                return res.status(404).json({ msg: "Task doesn't exist"});
                return res.status(200).json(updatedTask);
            }catch(err){
                return res.status(400).json({msg: err.message});
            }
            default:
                return res.status(404).json({msg: "This method is not supported"})
    }
}