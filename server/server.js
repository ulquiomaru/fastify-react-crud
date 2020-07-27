import { connect } from "mongoose";
const fastify = require("fastify")();
import { forEach } from "./routes";
import path from "path";
const {
  parsed: { MONGO_ATLAS_PW },
} = require("dotenv").config();

//connect to mongodb atlas
connect(
  `mongodb+srv://userx:${MONGO_ATLAS_PW}@cluster0-ufv5h.azure.mongodb.net/test?retryWrites=true`,
  { useFindAndModify: false, useNewUrlParser: true }
)
  .then(() => console.log("MongoDB connected"))
  .catch((e) => console.log("MongoDB could not be connected due to ", e));

//handles GET / request
fastify.get("/", async (request, reply) => {
  try {
    return { message: "hello, world!" };
  } catch (e) {
    console.log(e);
  }
});

//iterating over all the routes and registering them with fastify
forEach((route) => fastify.route(route));

//launching server at port : 3000 in local environment
fastify.listen(process.env.PORT || 3000, "0.0.0.0", (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`server running at ${fastify.server.address().port}`);
});
