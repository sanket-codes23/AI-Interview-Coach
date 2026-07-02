const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()




app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ai-interview-coach-nine-rho.vercel.app"
    ],
    credentials: true,
}));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.get("/", (req, res) => {
    res.send("AI Interview Coach Backend is Running 🚀");
});


module.exports = app