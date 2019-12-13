import { List, Pagination, Select } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import React, { useState } from 'react';
import useAPI from '..';

interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

const queryData = ({ current, pageSize, gender }) => (
  fetch(`https://randomuser.me/api?results=${pageSize}&page=${current}&gender=${gender}`)
    .then(res => res.json())
)

export default () => {
  const [gender, setGender] = useState();
  const { data, loading, pagination } = useAPI(
    params => queryData({ ...params, gender }),
    {
      paginated: true,
      refreshDeps: [gender],
      formatResult: (res) => ({
        total: 55,
        list: res.results as Item[],
      })
    }
  );

  return (
    <>
      <Select
        style={{ width: 180, marginBottom: 24 }}
        onChange={g => setGender(g)}
        placeholder="select gender"
        allowClear
      >
        <Select.Option value="male">male</Select.Option>
        <Select.Option value="female">female</Select.Option>
      </Select>
      <List
        dataSource={data && data.list}
        loading={loading}
        renderItem={item => (
          <List.Item>
            {item.name.last} - {item.email}
          </List.Item>
        )}
      />
      <Pagination
        {...pagination}
        showQuickJumper
        showSizeChanger
        onShowSizeChange={pagination.onChange}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
    </>
  );
};