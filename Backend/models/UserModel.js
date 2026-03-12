import { Schema,model } from "mongoose"
const userSchema= new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        minlength:[3,"name must be at least 3 characters"],
        trim:true
    },
    age:{
        type:Number,
        required:[true,"age is required"],
        min:[1,"age must be at least 1"],
        max:[120,"age must be less than 120"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email already exists"],
        lowercase:true,
        trim:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please provide a valid email"]
    },
    DOB:{
        type:Date,
        required:[true,"date of birth is required"],
    },
    phone:{
        type:String,
        required:[true,"phone is required"],
        minlength:[10,"phone must be 10 digits"],
        maxlength:[10,"phone must be 10 digits"],
        match:[/^\d{10}$/, "phone must be 10 digits"]
    },
    status:{
        type:Boolean,
        default:true
    }

},
{
    timestamps:true,
    strict:'throw',
    versionKey:false

})
const UserModel=model('User',userSchema)
export default  UserModel