const asyncHandler = require("express-async-handler");
const Contact = require("../models").Contact;
const { Op } = require("sequelize");
const UserContact = require("../models").UserContact;
//@desc     Create a contact
//@route    POST /api/contacts

exports.importCSV = asyncHandler(async (req, res) => {

    const {contacts, id} = req.body;
     
    for (let i = 0; i< contacts.length; i++) {
        let contact = {
                name: contacts[i].name,
                phone: contacts[i].phone,
                email: contacts[i].email,
                groupId: contacts[i].groupId
            };
        const createdContact = await Contact.create(contact);

        if (createdContact) {
            const createdShare = await UserContact.create({userId: id, contactId: createdContact.id, mode: 'owner'});
            if (!createdShare) {
                res.status(404);
                throw new Error("import fail");
            }
        } else {
            res.status(404);
            throw new Error("import fail");
        }

    }

    res.status(201).json('success');
     
});