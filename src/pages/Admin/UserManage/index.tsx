import {EllipsisOutlined, PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import {Button, Dropdown} from 'antd';
import React, {useRef} from 'react';
import {searchUsers} from "@/services/ant-design-pro/api";
import {Image} from 'antd';
// import CurrentUser = API.CurrentUser;

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};


const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '星球编号',
    dataIndex: 'planetCode',
    width: 50,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '账户',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户头像',
    dataIndex: 'avatarUrl',
    copyable: false,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={70} height={70}/>
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '女',
      },
      0: {
        text: '男',
      },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'userRole',
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      1: {
        text: '管理员',
        status: 'success',
      },
      0: {
        text: '用户',
        status: 'Default',
      },
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
    hideInSearch: true,
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        const userList = await searchUsers()
        return {
          data: userList
        }
      }}
      //   await waitTime(2000);
      //   return request<{
      //     data: CurrentUser[];
      //   }>('', {
      //     params,
      //   });
      // }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        defaultValue: {
          option: {fixed: 'right', disable: true},
        },
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="高级表格"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined/>}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined/>
          </Button>
        </Dropdown>,
      ]}
    />
  );
};
