const express=require('express')
const {validationResult}=require("express-validator");
const Student=require('./../models/studentsSchema')


exports.getStudents=(request,response,next)=>{
    Student.find({}).populate({path:"events"}).then((data)=>{
        response.json(data)
    }).catch((error)=>{next(error);})


     }
     exports.createStudent=(request,response,next)=>{
        let errors= validationResult(request);
        if(!errors.isEmpty())
        {
               let error=new Error();
               error.status=422;
               error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
             
               throw error;
             
        }
        
        else{  
            // console.log(response.body.id)
            let object =new Student({
                userName:request.body.username,
                image:request.body.image,
                address:request.body.address,
                email:request.body.email,
                role:request.body.role
            })
            object.save().
            then(data=>{response.status(201).json({BODY:data})})
            .catch((error)=>{next(error);
        })
    }
   }
   exports.getStudent=(request,response,next)=>{
    let errors= validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
         
           throw error;
         
    }
    
    else{ Student.findById(request.params.id).then((data)=>{   
        if(data==null) throw new Error("Student Is not Found!")
        response.json(data)})
        .catch((error)=>{next(error);})
}
   }
   exports.updatestudent=(request,response,next)=>{
    Student.findByIdAndUpdate(request.body.id,{$set:{
        fullname:request.body.fullName,
        email:request.body.email,
        password:request.body.password
    }}).then((data)=>{   
        if(data==null) throw new Error(`student Is not Found!`)
        response.json({stutus:"updated",Data:data})})
        .catch((error)=>{next(error)})

}
exports.deletestudent=(request,response,next)=>{
    Student.findByIdAndDelete(request.body.id).then((data)=>{response.status(200).json({data:data,id:request.body.id +"  is deleted"})
})
    
    
    }