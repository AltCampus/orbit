import React from "react";
import { Button, Modal, Form, Input, Radio } from "antd";

const CollectionCreateForm = Form.create({ name: "form_in_modal" })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        questionType: "mcq"
      };
    }

    handleChange = e => {
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    };

    render() {
      const radioStyle = {
        display: "block",
        height: "30px",
        lineHeight: "30px",
        marginBottom: "3px"
      };
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Add question"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Question">
              {getFieldDecorator("title", {
                rules: [
                  {
                    required: true,
                    message: "Please input the title of collection!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item className="collection-create-form_last-form-item">
              {getFieldDecorator("modifier", {
                initialValue: "mcq"
              })(
                <Radio.Group name="questionType">
                  <Radio value="mcq" onChange={this.handleChange}>
                    MCQ
                  </Radio>
                  <Radio value="subjective" onChange={this.handleChange}>
                    Subjective
                  </Radio>
                </Radio.Group>
              )}
            </Form.Item>
            {this.state.questionType === "mcq" ? (
              <Form.Item style={{ width: "100%" }} label="Options">
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio style={radioStyle} value={1}>
                    <Input placeholder="A" />
                  </Radio>
                  <Radio style={radioStyle} value={2}>
                    <Input placeholder="B" />
                  </Radio>
                  <Radio style={radioStyle} value={3}>
                    <Input placeholder="C" />
                  </Radio>
                  <Radio style={radioStyle} value={4}>
                    <Input placeholder="D" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
            ) : null}
          </Form>
        </Modal>
      );
    }
  }
);

class Questionnaire extends React.Component {
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
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          New Collection
        </Button>
        <CollectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default Questionnaire;
