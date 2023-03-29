import { MongoClient } from "mongodb";
// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-unresolved
import { initializeApp, cert } from "firebase-admin/app";
import app from "./app";
import "./proccess";

// eslint-disable-next-line @typescript-eslint/no-var-requires

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const port = process.env.PORT || 8080;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;
const certs = process.env.FIREBASE_CONFIG;
export const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${user}:${password}@${host}`;

// export const firebaseApp = initializeApp({
//   credential: cert(certs),
// });

export const mongoService = new MongoClient(uri);
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

const connectMongoDb = () => {
  mongoService
    .connect()
    .then(() => {
      console.log("mongodb is connected");
    })
    .catch((e) => {
      console.error(e);
    });
};

// connectMongoDb();

async function main() {
  // Connect the client

  await connectMongoDb();
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
