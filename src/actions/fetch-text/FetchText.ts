'use server';

import prisma from '../../../prisma/db/prisma';

export const fetchText = async () => {
  try {
    const res = await prisma.todo.findMany({ orderBy: { serial: 'asc' } });
    return res;
  } catch (e) {
    console.log(e);
  }
};
