/*
 * POST MODEL
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bcrypt = require('bcrypt');

var UserSchema = new Schema({
    created_at: { type: Date },
    updated_at: { type: Date },
    email: {
      type: String,
      required: true
    },
    passwordDigest: {
      type: String,
      required: true
    }
});


// MIDDLEWARE
UserSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});
UserSchema.pre('save', function(next){
  // encrypt password
  if (this.password) {
    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(this.password, salt, function(err, hash){
        this.passwordDigest = hash;
        delete this.password;
      });
    });
  }
  next();
});


var User = mongoose.model('User', UserSchema);

// export user model
module.exports = User;
