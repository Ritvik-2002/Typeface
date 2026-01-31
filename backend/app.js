const express = require("express");
const cors = require("cors");
const fileRoutes = require("./routes/file.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
