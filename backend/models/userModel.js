import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

userSchema.pre("save", async function(next){    //it takes next as it is a middleware and has to move to the next piece of the middleware.
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
})  //Here pre is called a hook.

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}    //here we are adding method(s) directly to the user schema.

const User = mongoose.model("User", userSchema);

export default User;