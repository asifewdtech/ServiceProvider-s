// REQUIRED STUFF
import express from "express";
import session from "express-session";
import cors from "cors";
import passport from "passport";
import * as dotenv from "dotenv";
import http from "http";
import fileUpload from 'express-fileupload';

// DATABASE CONNECTION
import "./Config/DB_Connection/DB_Connection.mjs";
import initializeSocket from './Socket/Socket.mjs';

// ROUTES
import PublicRoutes from "./Routes/Public/PublicRoutes.mjs";
import TokenRoutes from "./Routes/Private/TokenRoutes/TokenRoutes.mjs";
import CategoriesRoutes from "./Routes/Private/CategoriesRoutes/CategoriesRoutes.mjs";
import SubCategoriesRoutes from "./Routes/Private/SubCategoriesRoutes/SubCategoriesRoutes.mjs";
import UsersRoutes from "./Routes/Private/UsersRoutes/UsersRoutes.mjs";
import ServiceProvidersRoutes from "./Routes/Private/ServiceProvidersRoutes/ServiceProvidersRoutes.mjs";
import CompaniesRoutes from "./Routes/Private/CompaniesRoutes/CompaniesRoutes.mjs";
import ServicesRoutes from "./Routes/Private/ServicesRoutes/ServicesRoutes.mjs";
import YouTubeAccountsRoutes from "./Routes/Private/YouTubeAccountsRoutes/YouTubeAccountsRoutes.mjs";
import InstagramAccoutsRoutes from "./Routes/Private/InstagramAccoutsRoutes/InstagramAccoutsRoutes.mjs";
import TikTokAccountsRoutes from "./Routes/Private/TikTokAccountsRoutes/TikTokAccountsRoutes.mjs";
import ChatRoomRoutes from "./Routes/Private/ChatRoomRoutes/ChatRoomRoutes.mjs";
import MessageRoutes from "./Routes/Private/MessageRoutes/MessageRoutes.mjs";

dotenv.config();

// SET THE EXPRESS APP
const PORT = process.env.PORT || 3005;
const app = express();

const server = http.createServer(app);
const io = initializeSocket(server);

// APP MIDDLEWARES
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003"],
  methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
}));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_KEY,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize(), passport.session());
app.use(fileUpload());

// DELIVERING ROUTES TO APP
app.use("/api", PublicRoutes);
app.use("/api/categories", CategoriesRoutes);
app.use("/api/users", UsersRoutes);
app.use("/api/sub-categories", SubCategoriesRoutes);
app.use("/api/auth", TokenRoutes);
app.use("/api/service-providers", ServiceProvidersRoutes);
app.use("/api", CompaniesRoutes);
app.use("/api", ServicesRoutes);
app.use("/api/yt-accounts", YouTubeAccountsRoutes);
app.use("/api/ig-accounts", InstagramAccoutsRoutes);
app.use("/api/tt-accounts", TikTokAccountsRoutes);
app.use("/api/chatrooms", ChatRoomRoutes);
app.use("/api/messages", MessageRoutes);
app.set("socketio", io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});