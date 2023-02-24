import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  const user = await prisma.user.create({
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
    select: {
      name: true,
      email: true,
      age: true,
    },
  });
  console.log(user);
}

main()
  .catch((error) => console.error(error.message))
  .finally(async () => {
    await prisma.$disconnect();
  });
