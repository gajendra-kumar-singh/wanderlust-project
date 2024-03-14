const express = require("express");
const router =  express.Router();
const wrapAsync = require("../utils/wrapAsync.js");//in place of .(single dot) write ..(double dot)
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner,validateListing } = require("../middlewire.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//  //Index Route
//  router.get("/",wrapAsync(listingController.index));

  router.route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));


  //New Route
  router.get("/new", isLoggedIn, listingController.renderNewForm);
   
  
  router.route("/:id")
    .get(wrapAsync(listingController.ShowListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyedListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;