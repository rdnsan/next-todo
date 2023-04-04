import { Header } from '@/components/Header/Header';
import { getAll, todoApi } from '@/services/todo';
import { wrapper } from '@/store';
import { CheckCircleOutlined, ClockCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, List, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const { data: todos, isLoading, error } = todoApi.useGetAllQuery(page);
  const [addTodo] = todoApi.useAddTodoMutation();
  const [form] = Form.useForm();

  const onAdd = useCallback((todoTitle: string) => addTodo(todoTitle), [addTodo]);

  const onFinish = (values: { inputTodo: string }) => {
    onAdd(values.inputTodo);
    message.success('Success add todo');
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.error('Failed', errorInfo);
  };

  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col justify-center bg-white px-4">
      <div className="rounded-lg border-2 border-dashed border-primary-300 p-4">
        <Header title="Todo" />
        <section>
          <Form
            form={form}
            name="todo"
            layout="inline"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="!w-full !justify-center"
          >
            <Form.Item
              name="inputTodo"
              rules={[{ required: true, message: 'Please input todo!' }]}
              className="!basis-5/6"
            >
              <Input placeholder="New Todo" />
            </Form.Item>
            <Form.Item className="!m-0">
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Add
              </Button>
            </Form.Item>
          </Form>
        </section>
        <section className="my-4 md:mx-9">
          {error && <p>Oh no, there was an error</p>}
          {(router.isFallback || isLoading) && <p>Loading...</p>}
          {todos && (
            <List
              pagination={{
                position: 'bottom',
                align: 'end',
                pageSize: 10,
                total: 200,
                showSizeChanger: false,
                // showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange(currentPage, _pageSize) {
                  setPage((currentPage - 1) * 10);
                },
              }}
              dataSource={todos}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    key={item.id}
                    title={
                      <Fragment>
                        <Checkbox checked={item.completed} />
                        <span className={`ml-4 ${item.completed ? 'line-through' : ''}`}>
                          {item.title}
                        </span>
                      </Fragment>
                    }
                  />
                  {item.completed ? (
                    <Tag icon={<CheckCircleOutlined />} color="success" className="!m-0">
                      completed
                    </Tag>
                  ) : (
                    <Tag icon={<ClockCircleOutlined />} color="default" className="!m-0">
                      waiting
                    </Tag>
                  )}
                </List.Item>
              )}
            />
          )}
        </section>
      </div>
    </main>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (_context) => {
  store.dispatch(getAll.initiate(0));

  await Promise.all(store.dispatch(todoApi.util.getRunningQueriesThunk()));

  return {
    props: {},
  };
});
