// scripts/setupDb.js
import { MongoClient } from "mongodb";
import "dotenv/config";

async function ensureCollection() {
  // eslint-disable-next-line no-undef
  const uri = process.env.MONGODB_URI;
  // eslint-disable-next-line no-undef
  const dbName = process.env.MONGODB_DB;
  if (!uri || !dbName) {
    console.log(
      "⚠️  Skipping DB setup: MONGODB_URI or MONGODB_DB not provided.",
    );
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    // ORG-1: organizations
    const orgColl = "org";
    const existingOrgs = await db.listCollections({ name: orgColl }).toArray();
    if (existingOrgs.length === 0) {
      console.log(`🆕 Creating collection "${orgColl}"…`);
      await db.createCollection(orgColl, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["name", "createdAt", "status"],
            properties: {
              name: {
                bsonType: "string",
                description: "Organization name (required)",
              },
              description: {
                bsonType: "string",
                description: "Optional longer description",
              },
              createdAt: {
                bsonType: "date",
                description: "Timestamp when org was created",
              },
              status: {
                enum: ["active", "inactive", "archived"],
                description: "Current status",
              },
            },
          },
        },
      });
      console.log(`✅ "${orgColl}" created.`);
    } else {
      console.log(`ℹ️  "${orgColl}" already exists.`);
    }

    // ORG-2: organizationMembers
    const memColl = "orgMem";
    const existingMems = await db.listCollections({ name: memColl }).toArray();
    if (existingMems.length === 0) {
      console.log(`🆕 Creating collection "${memColl}"…`);
      await db.createCollection(memColl, {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: [
              "userId",
              "organizationId",
              "role",
              "joinDate",
              "status",
            ],
            properties: {
              userId: {
                bsonType: "objectId",
                description: "Reference to a User _id",
              },
              organizationId: {
                bsonType: "objectId",
                description: "Reference to an Organization _id",
              },
              role: {
                bsonType: "string",
                description: "Member role in the org",
              },
              joinDate: {
                bsonType: "date",
                description: "When this user joined",
              },
              status: {
                enum: ["active", "pending", "removed"],
                description: "Membership status",
              },
            },
          },
        },
      });
      console.log(`✅ "${memColl}" created.`);
    } else {
      console.log(`ℹ️  "${memColl}" already exists.`);
    }
  } catch (err) {
    console.error("❌ DB setup failed:", err);
    // eslint-disable-next-line no-undef
    process.exit(1);
  } finally {
    await client.close();
  }
}

ensureCollection();
