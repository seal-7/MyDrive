// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    value: { type: String, required: true },
    clientId:{type: String, required: true },
    userId:{type: String, unique:true,required: true },
    _id:{type: String, required: true },
    userDetails:{ type: JSON, required: true }
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.findOrCreate =function (data, callback) {
    console.log(data.userId);
    User.findOne({userId:data.userId},function (err,user) {
        if(err ){
            callback(err,user);
        }
        if(user==null){
            console.log("SAVING NEW USER");
            data.save(function(err,user){
                if(err){
                    console.log(err);
                }
                callback(err,user);
            });
        }
        else {
            console.log("EXISTING USER");
            callback(err, user);
        }
    })
};

