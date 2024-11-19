'use client';

import { fetchText } from '@/actions/fetch-text/FetchText';
import { useQuery } from '@tanstack/react-query';
import Todo from './Todo';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

type AllTodoProps = {
  todoData: {
    id: string;
    text: string;
  }[];
};

export default function AllTodo({ todoData }: AllTodoProps) {
  return (
    <div className='bg-gray-100 w-full lg:w-5/12 h-96 p-10 rounded space-y-4'>
      <SortableContext
        items={todoData || []}
        strategy={verticalListSortingStrategy}
      >
        {todoData?.map((item) => (
          <Todo key={item.id} todo={item} />
        ))}
      </SortableContext>
    </div>
  );
}
