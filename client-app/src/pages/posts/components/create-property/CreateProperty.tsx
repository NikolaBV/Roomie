import { Checkbox, Form, Input, Select } from "antd";

//TODO Implement this controller
export default function CreateProperty() {
  return (
    <Form>
      <Form.Item name="apartmentType" rules={[{ required: true }]}>
        <Select
          defaultValue={"Studio"}
          options={[
            { value: "Studio", label: "Studio" },
            { value: "lucy", label: "Lucy" },
            { value: "OneBedroom", label: "One Bedroom" },
            { value: "TwoBedroom", label: "Two Bedroom" },
            { value: "ThreeBedroom", label: "Three Bedroom" },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name="numberOfRooms" rules={[{ required: true }]}>
        <Input
          placeholder="Number Of Rooms"
          style={{
            width: "100%",
            height: "2.25rem",
          }}
        />
      </Form.Item>
      <Form.Item name="numberOfRooms" rules={[{ required: true }]}>
        <Checkbox
          style={{
            width: "100%",
            height: "2.25rem",
          }}
        >
          Furnished?
        </Checkbox>
      </Form.Item>
      <Form.Item name="rent" rules={[{ required: true }]}>
        <Input
          placeholder="Rent"
          style={{
            width: "100%",
            height: "2.25rem",
          }}
        ></Input>
      </Form.Item>
      <Form.Item name="additionalNotes">
        <Input
          placeholder="Additional notes"
          style={{
            width: "100%",
            height: "2.25rem",
          }}
        ></Input>
      </Form.Item>
    </Form>
  );
}
