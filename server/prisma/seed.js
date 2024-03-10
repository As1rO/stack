const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')

async function main() {
  const numberOfUsers = 10

  for (let i = 0; i < numberOfUsers; i++) {
    const rawPassword = 'test'
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(rawPassword, salt)

    const user = await prisma.user.create({
      data: {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        language: 'en',
      },
    })

    // Créer un compte pour chaque utilisateur
    const account = await prisma.account.create({
      data: {
        user_id: user.id,
        name: faker.finance.accountName(),
        currency: 'EUR',
      },
    })

    // Créer des transactions pour le compte
    const numberOfTransactions = 15
    for (let j = 0; j < numberOfTransactions; j++) {
      await prisma.transaction.create({
        data: {
          account_id: account.id,
          amount: parseFloat(faker.finance.amount()),
          status: 'completed',
          transaction_date: faker.date.recent(),
          transaction_type: 'debit',
          description: faker.finance.transactionDescription(),
          currency: 'EUR',
          payment_method: 'credit card',
          ...(faker.datatype.boolean() && {
            external_transaction_id: faker.datatype.uuid(),
          }),
          ...(faker.datatype.boolean() && {
            refund_id: faker.datatype.number(),
          }),
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
