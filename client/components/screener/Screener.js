import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

export class Screener extends Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }
  render() {
    const { TextArea } = Input;
    const { Option } = Select;
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    return (
      <>
        <Form layout={formLayout}>
          <Form.Item label='Age' {...formItemLayout}>
            <Input placeholder='Enter age' />
          </Form.Item>
          <Form.Item label='Location' {...formItemLayout}>
            <Input placeholder='Current city' />
          </Form.Item>
          <Form.Item label='Background' {...formItemLayout}>
            <Input placeholder='Academic/Personal background' />
          </Form.Item>
          <Form.Item label='Graduation Details' {...formItemLayout}>
            <Input placeholder='Graduation details' />
          </Form.Item>
          <Form.Item label='Graduation Year' {...formItemLayout}>
            <Input placeholder='Graduation year' />
          </Form.Item>
          <Form.Item label='Employed?' {...formItemLayout}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select an option'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value='yes'>Yes</Option>
              <Option value='no'>No</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Expected joining month' {...formItemLayout}>
            <Input placeholder='Expected joining month' />
          </Form.Item>
          <Form.Item label='Expected joining year' {...formItemLayout}>
            <Input placeholder='Expected joining year' />
          </Form.Item>
          <Form.Item label='Programming experience' {...formItemLayout}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select an option'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value='yes'>Yes</Option>
              <Option value='no'>No</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Source platform' {...formItemLayout}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder='Select an option'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value='yes'>Yes</Option>
              <Option value='no'>No</Option>
            </Select>
          </Form.Item>
          <Form.Item label='Motivation' {...formItemLayout}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label='Remarks' {...formItemLayout}>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default Screener;
