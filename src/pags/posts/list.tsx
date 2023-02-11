import {
  DateField,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  Select,
  ShowButton,
  Space,
  Table,
  TagField,
  TextField,
  useSelect,
  useTable,
} from "@pankod/refine-antd";
import { ICategory, IPost } from "interfacs";

import { useMany } from "@pankod/refine-core";

export const PostList: React.FC = () => {
  const { tableProps } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  // useMany will handle the relation between the ID and the title
  // to retrieve multiple items from the resources

  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: "categories",
  });

  return (
    // wrapper the create button and the title
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="id" />
        <Table.Column dataIndex="title" title="title" />
        <Table.Column
          dataIndex="status"
          title="status"
          render={(value) => <TagField value={value} />}
        />
        <Table.Column
          dataIndex="createAt"
          title="createdAt"
          render={(value) => <DateField format="LLL" value={value} />}
        />

        <Table.Column
          dataIndex={["category", "id"]}
          title="category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading ..." />;
            }
            return (
              <TextField
                value={
                  categoriesData?.data.find((item) => item.id === value)?.title
                }
              />
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />

        <Table.Column<IPost>
          title="Actions"
          dataIndex="actions"
          render={(_text, record): React.ReactNode => {
            return (
              <Space>
                <ShowButton size="small" recordItemId={record.id} hideText />
                <EditButton size="small" recordItemId={record.id} hideText />
                <DeleteButton size="small" recordItemId={record.id} hideText />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
