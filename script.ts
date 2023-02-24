import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      name: "Umair Khan",
      email: "umair.khan@gmail.com",
      age: 30,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
  });
  const user = await prisma.user.findMany({
    where: {
      AND: {
        name: { startsWith: "Umair Khan" },
        age: { lte: 30 },
      },
    },
  });
  console.log(user);
}

main()
  .catch((error) => console.error(error.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
