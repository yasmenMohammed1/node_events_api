const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AutoIncrement = require("mongoose-sequence")(mongoose);

SALT_WORK_FACTOR = 10;

const schema = new mongoose.Schema(
  {
    _id: Number,
    userName: { type: String, unique: true, required: true },
    image: { type: String },
    address: { type: Object },
    government: String,
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
    role: { type: String, enum: ["student", "instructor"] },
    image: String,
    // address:Object,
    password: { type: String, bcrypt: true },
    events: [{ type: Number, ref: "Events" }],
  },
  { _id: false }
);
schema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
schema.plugin(AutoIncrement, { id: "Speaker" });

module.exports = mongoose.model("Speakers", schema);
