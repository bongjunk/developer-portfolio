import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "관리자",
      password: "1234", // 임시 테스트용 비밀번호
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
