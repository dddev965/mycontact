const { timeStamp } = require("console");
const { default: mongoose } = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        name: {
            type: String,
            required: [true, "Please add the contact Name"],

        },
        email: {
            type: String,
            required: [true, "Please add the Email address"],

        },
        phone: {
            type: String,
            required: [true, "Please add the Mobile Number"],
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema)