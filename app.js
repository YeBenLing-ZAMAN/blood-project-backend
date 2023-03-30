import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import consultRoutes from "./routes/consults.js";
import doctorRoutes from "./routes/doctors.js";
import donationRoutes from "./routes/donations.js";
import donorsRoutes from "./routes/donors.js";
import requestBloodRoutes from "./routes/requestBlood.js";
import userRoutes from "./routes/users.js";
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5050;
const app = express();
const server = http.createServer(app);

dotenv.config();
app.use(express.json());
const corsOptions = {
  origin: ["https://rightfuture.in", "http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false);

app.use("/user", userRoutes);
app.use("/donors", donorsRoutes);
app.use("/donation", donationRoutes);
app.use("/request-blood", requestBloodRoutes);
app.use("/consult", consultRoutes);
app.use("/doctors", doctorRoutes);

// const io = new Server(server, {
//   cors: {
//       origin: "*",
//       methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket) => {
//   handlePatients(io, socket)
//   handleVideoChat(io, socket)
// })

app.get("/", (req, res) => {
  // console.log("req", req);
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.blood-donaltion-shabit"
  );
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.send("Hello Client blood donation project!");
});
