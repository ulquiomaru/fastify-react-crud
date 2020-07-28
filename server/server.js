const mongoose = require("mongoose");
const fastify = require("fastify")();
const routes = require("./routes");
const path = require("path");
const {
  MONGO_ATLAS_DB,
  MONGO_ATLAS_USER,
  MONGO_ATLAS_PW,
} = require("./config");

const DistPath = path.join(__dirname, "..", "dist");

fastify.register(require("fastify-static"), {
  root: DistPath,
});

//connect to mongodb atlas
mongoose
  .connect(
    `mongodb+srv://${MONGO_ATLAS_USER}:${MONGO_ATLAS_PW}@fastify.gsy7f.mongodb.net/${MONGO_ATLAS_DB}?retryWrites=true&w=majority`,
    { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log("MongoDB could not be connected due to ", e));

//handles GET / request
fastify.get("/", async (request, reply) => {
  try {
    reply.sendFile("index.html");
  } catch (e) {
    console.log(e);
  }
});

//iterating over all the routes and registering them with fastify
routes.forEach((route) => fastify.route(route));

//launching server at port : 3000 in local environment
fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(
    `server running at http://localhost:${fastify.server.address().port}`
  );
});
