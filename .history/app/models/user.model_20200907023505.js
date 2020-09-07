
module.exports = mongoose =>{
    const Bcrypt = require("bcryptjs");
    const schema = mongoose.Schema(
        {
            fullname:{
                firstName: String,
                lastName: String
            },
            username: String,
            password: String
        },{
            timestamps:true
        }
    )
    schema.pre("save", function(next) {
        if(!this.isModified("password")) {
            return next();
        }
        this.password = Bcrypt.hashSync(this.password, 10);
        next();
    });
    schema.methods.comparePassword = function(plaintext, callback) {
        return callback(null, Bcrypt.compareSync(plaintext, this.password));
    };

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });

    const User = mongoose.model("user", schema);

    return User;
}