import React, { Component } from "react";
import {
  Form,
  Input,
  Select,
  Modal,
  InputNumber,
  Button,
  Typography
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const ScreenerInfoForm = Form.create({
  name: "form_in_modal",
  mapPropsToFields: props =>
    props.mapPropsToFields &&
    Object.keys(props.mapPropsToFields).reduce((obj, field) => {
      obj[field] = Form.createFormField({
        value: props.mapPropsToFields[field]
      });
      return obj;
    }, {})
})(
  class extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { visible, onClose, onSubmit, form, title } = this.props;
      const { getFieldDecorator } = form;

      return (
        <div className={`screener-form-container ${!visible && "invisible"}`}>
          <Title level={2}>{title}</Title>
          <Form layout="horizontal" onSubmit={onSubmit}>
            <Form.Item label="Age">
              {getFieldDecorator("age", {
                rules: [
                  {
                    required: true,
                    message: "Enter Age"
                  }
                ]
              })(<InputNumber placeholder="Enter age" />)}
            </Form.Item>
            <Form.Item label="Location">
              {getFieldDecorator("location", {
                rules: [
                  {
                    required: true,
                    message: "Enter current location"
                  }
                ]
              })(<Input placeholder="Current city" />)}
            </Form.Item>
            <Form.Item label="Background">
              {getFieldDecorator("background", {
                rules: [
                  {
                    required: true,
                    message: "Enter Academic/Personal background"
                  }
                ]
              })(<Input placeholder="Academic/Personal background" />)}
            </Form.Item>
            <Form.Item label="Graduation Details">
              {getFieldDecorator("graduationDetails", {
                rules: [
                  {
                    required: true,
                    message: "Enter Graduation Details"
                  }
                ]
              })(<Input placeholder="Graduation details" />)}
            </Form.Item>
            <Form.Item label="Graduation Year">
              {getFieldDecorator("graduationYear", {
                rules: [
                  {
                    required: true,
                    message: "Enter Graduation Year"
                  }
                ]
              })(<InputNumber placeholder="Graduation year" />)}
            </Form.Item>
            <Form.Item label="Employed?">
              {getFieldDecorator("isCurrentlyEmployed", {
                rules: [
                  {
                    required: true,
                    message: "Please enter wether person is employed or not!"
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Expected joining month">
              {getFieldDecorator("expectedJoiningMonth", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the expected joining month!"
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                  ].map(month => (
                    <Option value={month}>{month}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Expected joining year">
              {getFieldDecorator("expectedJoiningYear", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the expected joining year!"
                  }
                ]
              })(
                <InputNumber
                  placeholder="Expected joining year"
                  min={2017}
                  max={9999}
                />
              )}
            </Form.Item>
            <Form.Item label="Programming experience">
              {getFieldDecorator("programmingExperience", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the programming experience!"
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[
                    "Newbie",
                    "Trying to learn",
                    "Learning for 3 months",
                    "Experienced"
                  ].map(experience => (
                    <Option value={experience}>{experience}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Source platform">
              {getFieldDecorator("sourcePlatform", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the source Platform!"
                  }
                ]
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select an option"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {[
                    "Facebook",
                    "Reddit",
                    "Quora",
                    "Twitter",
                    "Email",
                    "Search engine",
                    "LinkedIn",
                    "Instagram",
                    "Medium",
                    "Word of mouth",
                    "Our blog",
                    "Other blog"
                  ].map(sourcePlaform => (
                    <Option value={sourcePlaform}>{sourcePlaform}</Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Motivation">
              {getFieldDecorator("screenerMotivation", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the motivation!"
                  }
                ]
              })(<TextArea rows={4} placeholder="Motivation" />)}
            </Form.Item>
            <Form.Item label="Remarks">
              {getFieldDecorator("screenerRemarks", {
                rules: [
                  {
                    required: true,
                    message: "Please enter the  remarks!"
                  }
                ]
              })(<TextArea rows={4} placeholder="Remarks" />)}
            </Form.Item>
            <Button type="danger" onClick={onClose}>
              Close
            </Button>
            <Button type="primary" htmlType="submit">
              Save Screener Information
            </Button>
          </Form>
        </div>
      );
    }
  }
);

export default ScreenerInfoForm;
