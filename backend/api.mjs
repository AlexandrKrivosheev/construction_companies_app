import fastify from "fastify";
import cors from "@fastify/cors";
import companies from "./db/companies.json" assert { type: "json" };

export const run = async () => {
  const app = fastify({ logger: true });

  app.register(cors, {
    cors: {
      origin: "*",
      methods: ["GET"],
    },
  });

  app.get("/companies", async () => {
    return companies;
  });

  try {
    await app.listen(3210);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
