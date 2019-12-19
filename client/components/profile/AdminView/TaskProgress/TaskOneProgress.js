import React from "react";
import {
  Button,
  Card,
  Icon,
  Progress,
  Descriptions,
  Modal,
  Input,
  Checkbox
} from "antd";

const { Meta } = Card;

const { TextArea } = Input;

const TaskOneProgress = () => {
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_KK8u4YJawDr4MLwxsrB71MHU7XT3J31mJWU_CxuSYBS4tt_K"
        />
      }
      actions={[
        <Button type="link">
          <Icon type="fire" key="setting" />
        </Button>,
        <Button type="link" onClick={this.showReviewModal}>
          <Icon type="edit" key="edit" />
        </Button>
      ]}
    >
      <Modal
        visible={visible}
        title="Title"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={this.handleOk}
          >
            Submit
          </Button>
        ]}
      >
        <p>Review</p>
        <TextArea rows={4} />
      </Modal>
      <div style={{ marginBottom: "20px" }}>
        <Meta title="Progress" />
        <Progress percent={100} size="small" />
      </div>
      <Descriptions>
        <Descriptions.Item label="Submission Date">
          2017-01-10
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Submission Time">21:53</Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Score">10</Descriptions.Item>
      </Descriptions>
      <Checkbox onChange={this.onChange}>Evaluated</Checkbox>
    </Card>
  );
};

export default TaskOneProgress;
