const express = require("express");
const router = express.Router();
const controller = require("../controllers/songController");
const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/roleMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", auth, admin, controller.create);
router.put("/:id", auth, admin, controller.update);
router.delete("/:id", auth, admin, controller.delete);

module.exports = router;
