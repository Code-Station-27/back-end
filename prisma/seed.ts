/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { PrismaClient } from '.prisma/client';

import { cities } from './cities';

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

function getStateUf(id: number) {
  const states = [
    { uf: 'AC', state_id: 1 },
    { uf: 'AL', state_id: 2 },
    { uf: 'AM', state_id: 3 },
    { uf: 'AP', state_id: 4 },
    { uf: 'BA', state_id: 5 },
    { uf: 'CE', state_id: 6 },
    { uf: 'DF', state_id: 7 },
    { uf: 'ES', state_id: 8 },
    { uf: 'GO', state_id: 9 },
    { uf: 'MA', state_id: 10 },
    { uf: 'MG', state_id: 11 },
    { uf: 'MS', state_id: 12 },
    { uf: 'MT', state_id: 13 },
    { uf: 'PA', state_id: 14 },
    { uf: 'PB', state_id: 15 },
    { uf: 'PE', state_id: 16 },
    { uf: 'PI', state_id: 17 },
    { uf: 'PR', state_id: 18 },
    { uf: 'RJ', state_id: 19 },
    { uf: 'RN', state_id: 20 },
    { uf: 'RO', state_id: 21 },
    { uf: 'RR', state_id: 22 },
    { uf: 'RS', state_id: 23 },
    { uf: 'SC', state_id: 24 },
    { uf: 'SE', state_id: 25 },
    { uf: 'SP', state_id: 26 },
    { uf: 'TO', state_id: 27 },
  ];

  return states.find(s => s.state_id === id).uf;
}

async function main() {
  for (const { name, uf } of states) {
    await prisma.state.create({
      data: {
        name,
        uf,
      },
    });
  }

  for (const { name, state_id } of cities) {
    await prisma.city.create({
      data: {
        name,
        state_uf: getStateUf(state_id),
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
