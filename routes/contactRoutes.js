const express = require('express');
const router =  express.Router();
const contact = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokerHandler');

router.use(validateToken)
router.get("/", contact.getContact)
// router.route('/').get( contact.getContact).post(contact.createContact)
router.post( "/",contact.createContact)

router.get('/:id', contact.getSingleContact)

router.put('/:id', contact.getUpdateContact)

router.delete('/:id', contact.getContactDelete)




module.exports = router;