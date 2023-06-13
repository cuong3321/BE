const asyncHandler = require("express-async-handler");
const UserContact = require("../models").UserContact;
const { Op } = require("sequelize");

//@desc     Create a contact
//@route    POST /api/shares
//@access   Private/user

exports.shareContact = asyncHandler(async (req, res) => {

    const {userId, contactId, isShared} = req.body;

    const userContact = await UserContact.findOne({ where: { userId: userId, contactId: contactId } })

    const title = isShared ? 'Share success' : 'Remove Share success';

    if (userContact) {

        const record = await UserContact.findByPk(userContact.id);

        const removedShareContact = await record.destroy();

        if (removedShareContact) {
            res.status(201).json({ message: title });
        } else {
            res.status(404);
            throw new Error("unshare fail");
        }
         
    }else {
        const createdShare = await UserContact.create({userId: userId, contactId: contactId, mode: 'viewr'});
        if (createdShare) {
            res.status(201).json({ message: title });
        } else {
            res.status(404);
            throw new Error("action fail");
        }
    }     
     
});



exports.getContact = asyncHandler(async (req, res) => {

    // const {userId, isShared} = req.body;

    // const shareExist = await Share.findOne({ where: { userId: userId, model: 'contact' } })

    // if (shareExist) {
    //     shareExist.isShared = isShared;
    //     const updatedShare = shareExist.save();
    //     if (updatedShare) {
    //         res.status(201).json('shared success');
    //     } else {
    //         res.status(400);
    //         throw new Error("Update fail");
    //     }
         
    // }else {
    //     const createdShare = await Share.create({userId: userId, isShared: isShared,model: 'contact'});
    //     if (createdShare) {
    //         res.status(201).json(createdShare);
    //     } else {
    //         res.status(400);
    //         throw new Error("Create fail");
    //     }
    // }     
     
});