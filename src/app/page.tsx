'use client';

import { fetchText } from '@/actions/fetch-text/FetchText';
import { updateText } from '@/actions/update-text/UpdateText';
import AllTodo from '@/components/shared/Todos/AllTodo';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function Home() {
  const {
    data: todoData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`todos`],
    queryFn: () => fetchText().then((data) => data),
  });

  const [localItems, setLocalItems] = useState(todoData || []);

  useEffect(() => {
    if (todoData) {
      setLocalItems(todoData);
    }
  }, [todoData]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    console.log('drag end', event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = localItems.findIndex((item) => item.id === active.id);
    const newIndex = localItems.findIndex((item) => item.id === over.id);

    const newItems = arrayMove(localItems, oldIndex, newIndex).map(
      (item, index) => ({
        ...item,
        serial: index + 1,
      })
    );
    console.log({ newItems });
    setLocalItems(newItems);

    await updateText({ items: newItems });
    refetch();
  }

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <main className=''>
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <AllTodo todoData={localItems || []} />
      </DndContext>
    </main>
  );
}
