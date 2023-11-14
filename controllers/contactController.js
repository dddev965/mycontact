const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all Contacts
//@route Get =>  /api/contacts
//@access Private
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json({ contacts });
})

//@desc create New Contact
//@route Post =>  /api/contacts
//@access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("the request boyd is ", req.body);
    const { name, email, phone } = req.body // here we are using destructuring
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("all field requied")
    }
    const contact = await Contact.create({
        name, // as we know that we have use destrucitng so we  can write only single we dont need to write like this name = req.body.name
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json({ message: "new contact has been created", contact });
}
)
//@desc get single  Contact
//@route Get =>  /api/contacts/:id
//@access Private
const getSingleContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("contact not found")
    }
    res.status(200).json({ contact })
}
)

//@desc Update Contact
//@route Put =>  /api/contacts/:id
//@access Public
const getUpdateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    console.log(contact);
    console.log(req.user);
    if (!contact) {
        res.status(404)
        throw new Error("contact not found")
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("user dont have permission to update other user contacts")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.status(200).json(updatedContact)
})

//@desc Delete Contact
//@route Delete =>  /api/contacts:id 
//@access Private
const getContactDelete = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        console.log(contact);
        if (!contact) {
            res.status(404)
            throw new Error("contact not found")
        }

        if (contact.user._id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("user dont have permission to update other user contacts")
        }
        // await contact.delete()
        res.status(200).json({ sucess: true })
    }
    catch (error) {
        console.log(error);
    }
}
)

module.exports = {
    getContact,
    createContact,
    getSingleContact,
    getUpdateContact,
    getContactDelete
}