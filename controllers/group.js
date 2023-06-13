const asyncHandler = require("express-async-handler");
const Group = require("../models").Group;
const { Op } = require("sequelize");

//@desc     Create a group
//@route    POST /api/groups
//@access   Private/user
exports.createGroup = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const createdGroup = await Group.create({ name });
    res.status(201).json(createdGroup);
});

//@desc     Get all groups with pagination
//@route    GET /api/groups
//@access   Private/user
exports.getGroups = asyncHandler(async (req, res) => {
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? req.query.keyword : null;

    /* SEARCH OPTIONS */
    let options = {
        attributes: {
            exclude: ["updatedAt"],
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
    };

    /* CHECK IF THERE IS A KEYWORD */
    if (keyword) {
        options = {
            ...options,
            where: {
                [Op.or]: [
                    { id: { [Op.like]: `%${keyword}%` } },
                    { name: { [Op.like]: `%${keyword}%` } },
                ],
            },
        };
    }

    /* QUERY */
    const count = await Group.count({ ...options });
    const groups = await Group.findAll({
        ...options,
    });

    /* RESPONSE */
    res.json({ groups, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Get group by ID
//@route    GET /api/groups/:id
//@access   Private/user
exports.getGroup = asyncHandler(async (req, res) => {
    const group = await Group.findByPk(req.params.id);

    if (group) {
        res.json(group);
    } else {
        res.status(404);
        throw new Error("Group not found");
    }
});

//@desc     Update group
//@route    PUT /api/groups/:id
//@access   Private/user
exports.updateGroup = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const group = await Group.findByPk(req.params.id);

    if (group) {
        group.name = name;
        const updatedGroup = await group.save();
        res.json(updatedGroup);
    } else {
        res.status(404);
        throw new Error("Group not found");
    }
});

//@desc     Delete a group
//@route    DELETE /api/categories/:id
//@access   Private/user
exports.deleteGroup = asyncHandler(async (req, res) => {
    const group = await Group.findByPk(req.params.id);

    if (group) {
        await group.destroy();
        res.json({ message: "Group removed" });
    } else {
        res.status(404);
        throw new Error("Group not found");
    }
});
