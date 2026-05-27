const express = require("express");
const { getPokemon } = require("../controllers/pokemonController");

const router = express.Router();

router.get("/:name", getPokemon);

module.exports = router;
