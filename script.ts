import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // delet
  await prisma.user.deleteMany();
  // create
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
  // update
  await prisma.user.updateMany({
    where: {
      email: "umair.khan@gmail.com",
    },
    data: {
      name: "Umair Updated",
    },
  });
  // find + read
  const user = await prisma.user.findMany({
    where: {
      AND: {
        name: { startsWith: "Umair Updated" },
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
