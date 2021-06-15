/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

const states = [
  { name: 'Acre', uf: 'AC' },
  { name: 'Alagoas', uf: 'AL' },
  { name: 'Amazonas', uf: 'AM' },
  { name: 'Amapá', uf: 'AP' },
  { name: 'Bahia', uf: 'BA' },
  { name: 'Ceará', uf: 'CE' },
  { name: 'Distrito Federal', uf: 'DF' },
  { name: 'Espírito Santo', uf: 'ES' },
  { name: 'Goiás', uf: 'GO' },
  { name: 'Maranhão', uf: 'MA' },
  { name: 'Minas Gerais', uf: 'MG' },
  { name: 'Mato Grosso do Sul', uf: 'MS' },
  { name: 'Mato Grosso', uf: 'MT' },
  { name: 'Pará', uf: 'PA' },
  { name: 'Paraíba', uf: 'PB' },
  { name: 'Pernambuco', uf: 'PE' },
  { name: 'Piauí', uf: 'PI' },
  { name: 'Paraná', uf: 'PR' },
  { name: 'Rio de Janeiro', uf: 'RJ' },
  { name: 'Rio Grande do Norte', uf: 'RN' },
  { name: 'Rondônia', uf: 'RO' },
  { name: 'Roraima', uf: 'RR' },
  { name: 'Rio Grande do Sul', uf: 'RS' },
  { name: 'Santa Catarina', uf: 'SC' },
  { name: 'Sergipe', uf: 'SE' },
  { name: 'São Paulo', uf: 'SP' },
  { name: 'Tocantins', uf: 'TO' },
];

async function main() {
  for (const { name, uf } of states) {
    await prisma.state.create({
      data: {
        name,
        uf,
      },
    });
  }
}

main()
  .catch(e => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
