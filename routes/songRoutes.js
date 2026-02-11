const express = require("express");
const router = express.Router();
const controller = require("../controllers/songController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);

router.post("/", auth, role("admin"), controller.create);
router.put("/:id", auth, role("admin"), controller.update);
router.delete("/:id", auth, role("admin"), controller.delete);

module.exports = router;
