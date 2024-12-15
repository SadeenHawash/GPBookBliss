import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

//Routes
import authRoutes from "./routes/auth/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import resetPasswordRoutes from "./routes/auth/resetPasswordRoutes.js";
import chatRoutes from "./routes/Chat/chatRoutes.js";
import messageRoutes from "./routes/Chat/messageRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import userStoryRoutes from "./routes/userStoryRoutes.js";
import genresRoutes from "./routes/Genres/genresRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import readingListRoutes from "./routes/readingListRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import booksSalesRoutes from "./routes/bookSalesRoutes.js";
import stripePaymentRoutes from "./routes/stripePaymentRoutes.js"

//Connect to mongo
import connectToMongoDB from "./db/connectToDB.js";
import { errorHandlingMD } from "./middleware/errorHandlingMD.js";
import { app, server } from "./socket/socket.js";

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//authentication
app.use("/api/auth", authRoutes);
app.use("/api", resetPasswordRoutes);
//user profile
app.use("/api", profileRoutes);
//posts
app.use("/api/posts", postsRoutes);
//user stories
app.use("/api/stories", userStoryRoutes);
//chatting 
app.use("/api/chats", chatRoutes);
app.use("/api/message", messageRoutes);
//Book
app.use("/api/books", bookRoutes);
//Reading List
app.use("/api/readinglist", readingListRoutes);
//Genres
app.use("/api/genres", genresRoutes);
//Cart
app.use("/api/cart", cartRoutes);
//Order
app.use("/api/order", orderRoutes);
//Payment
app.use("/api/stripe", stripePaymentRoutes);
//Book Sales
app.use('/api/books-sales', booksSalesRoutes);

// Error Handling
app.use(errorHandlingMD);

// Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "Not Found" });
})
app.get("/", (req, res) => {
    res.send("Hello World!");
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT}`);
})

