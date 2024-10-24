const express = require("express");
const router = express.Router();
const {
  createRule,
  combineRules,
  evaluateRule,
} = require("../controllers/ruleController");

router.post("/create-rule", createRule);

router.post("/combine-rules", combineRules);

router.post("/evaluate-rule", evaluateRule);

module.exports = router;
