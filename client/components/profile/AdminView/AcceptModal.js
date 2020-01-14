import React from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  InputNumber,
  DatePicker
} from "antd";

const AcceptModalForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Batch Number">
              {getFieldDecorator("batchNumber", {
                rules: [
                  {
                    required: true,
                    message: "Please input the Batch Number!"
                  }
                ]
              })(<InputNumber />)}
            </Form.Item>
            <Form.Item label="Joining Date">
              {getFieldDecorator("joiningDate", {
                rules: [
                  {
                    required: true,
                    message: "Please input the joining date!"
                  }
                ]
              })(<DatePicker />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class AcceptModal extends React.Component {
  state = {
    visible: false
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      await this.props.acceptUser(values);
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <>
        <Button
          type="primary"
          loading={this.props.loading}
          onClick={this.showModal}
        >
          Accept
        </Button>
        <AcceptModalForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </>
    );
  }
}
export default AcceptModal;
