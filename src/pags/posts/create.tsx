import {
  Create,
  Form,
  Input,
  Select,
  useForm,
  useSelect,
} from "@pankod/refine-antd";

import { IPost } from "interfacs";

export const PostCreate: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IPost>();

  // to select the category
  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: "categories",
    defaultValue: queryResult?.data?.data?.category.id,
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status" rules={[{ required: true }]}>
          <Select
            options={[
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
              { label: "Rejected", value: "rejected" },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
      </Form>
    </Create>
  );
};
