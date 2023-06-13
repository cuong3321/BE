const asyncHandler = require("express-async-handler");
const Contact = require("../models").Contact;
const UserContact = require("../models").UserContact;
const Group = require("../models").Group;
const { Op } = require("sequelize");

//@desc     Create a contact
//@route    POST /api/contacts
//@access   Private/user
exports.createContact = asyncHandler(async (req, res) => {
    //const name = req.body.name;
    const { name, phone, email, groupId, userId } = req.body;
    const createdContact = await Contact.create({ name, phone, email, groupId });
    if (createdContact) {
        // insert UserContact
        const newUserContact = {
            contactId: createdContact.id,
            userId: userId,
            mode: "owner"
        };
        const createdUserContact = await UserContact.create(newUserContact);
        if (createdUserContact) {
            res.status(201).json(createdUserContact);
        }

    }
    res.status(201).json(createdContact);
});

//@desc     Get all contacts with pagination
//@route    GET /api/contacts
//@access   Private/user
exports.getContacts = asyncHandler(async (req, res) => {

    //res.json(req.query.keyword);

    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? req.query.keyword : null;
    const userId = req.query.userId;
    const filterGroup = req.query.filterGroup ? req.query.filterGroup : null;
    /* SEARCH OPTIONS */
    let options = {
        include: [
            { model: Group, as: "group" },
            { model: UserContact, as: "userContact", where: { userId: userId }}
        ],
        attributes: {
            exclude: ["updatedAt"],
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
    };

    // check if groupId exist
    if (filterGroup) {
        options = {
            ...options,
            where: {
                groupId: filterGroup
            }
        }
    }
    /* CHECK IF THERE IS A KEYWORD */
    if (keyword) {
        options = {
            ...options,
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                    { phone: { [Op.like]: `%${keyword}%` } },
                    { email: { [Op.like]: `%${keyword}%` } },
                ],
            },
        };
    }

    /* QUERY */
    const count = await Contact.count({ ...options });
    const contacts = await Contact.findAll({
        ...options,
    });

    /* RESPONSE */
    res.json({ contacts, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Get contact by ID
//@route    GET /api/contacts/:id
//@access   Private/user
exports.getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
        res.json(contact);
    } else {
        res.status(404);
        throw new Error("Contact not found");
    }
});

//@desc     Update contact
//@route    PUT /api/contacts/:id
//@access   Private/user
exports.updateContact = asyncHandler(async (req, res) => {
    const { name, groupId, phone, email } = req.body;

    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
        contact.name = name;
        contact.groupId = groupId;
        contact.phone = phone;
        contact.email = email;
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } else {
        res.status(404);
        throw new Error("Contact not found");
    }
});

//@desc     Delete a contact
//@route    DELETE /api/categories/:id
//@access   Private/user
exports.deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByPk(req.params.id);

    if (contact) {
        await contact.destroy();
        res.json({ message: "Contact removed" });
    } else {
        res.status(404);
        throw new Error("Contact not found");
    }
});
