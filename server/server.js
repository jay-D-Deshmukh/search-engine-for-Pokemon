const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pokemonRoutes = require("./routes/pokemonRoutes");
const { notFoundHandler, errorHandler } = require("./utils/errorHandlers");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pokemon Pokedex API is running",
  });
});

app.use("/api/pokemon", pokemonRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});