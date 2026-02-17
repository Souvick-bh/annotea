import mongoose,{Schema} from "mongoose"

const memorySchema = new Schema({
    ucode: {type: String,required: true,unique: true},
    title: {type: String, required: true},
    content: {type: String,required: true},
    sharable: {type: Boolean,required: true},
    createdBy: {type: String, required: true},
}, {timestamps: true});
//tags: [{type: String}],
export const MEMORY = mongoose.model("Memory", memorySchema)
