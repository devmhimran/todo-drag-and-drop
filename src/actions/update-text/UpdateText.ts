'use server';

import prisma from '../../../prisma/db/prisma';

type ItemType = {
  id: string;
  text: string;
  serial: number;
};

type ItemsType = {
  items: ItemType[];
};

export const updateText = async ({ items }: ItemsType) => {
  console.log({ items });
  try {
    await prisma.$transaction(
      items.map((item: ItemType) => {
        return prisma.todo.update({
          where: { id: item.id },
          data: { serial: item.serial },
        });
      })
    );
  } catch (e) {
    console.log(e);
  }
};
