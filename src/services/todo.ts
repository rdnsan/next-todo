import type { Todo } from '@/types/todo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getAll: builder.query<Todo[], number | void>({
      query: (page = 0) => `todos?_start=${page}&_limit=10`,
      providesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
    addTodo: builder.mutation<string, string>({
      query(text) {
        return {
          url: 'todos',
          method: 'POST',
          body: {
            completed: false,
            title: text,
            userId: 1,
          },
        };
      },
      invalidatesTags: [{ type: 'Todo', id: 'LIST' }],
    }),
  }),
});

export const { getAll } = todoApi.endpoints;
