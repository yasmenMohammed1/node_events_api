const mongoose=require("mongoose");

const bcrypt=require("bcrypt");

const increamnt = require('mongoose-sequence')(mongoose);
SALT_WORK_FACTOR = 10;

const Schema=new mongoose.Schema({

  _id:Number,
    userName:{type:String},
   email:{ 
     _id:Number,
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
        ref:'email'
      },   
      password:{type:Number,bcrypt:true},
      events:[{type:Number,ref:"Events"}]
},{ _id: false });
Schema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
   
Schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
Schema.plugin(increamnt,{id:'student_id'});

module.exports=mongoose.model("Students",Schema)



