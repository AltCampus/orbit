import React, { Component } from 'react';
import {
  Button,
  Avatar,
  Card,
  Icon,
  Progress,
  Descriptions,
  Modal,
  Input,
  Checkbox,
} from 'antd';

const { Meta } = Card;

const { TextArea } = Input;

export class UserProgress extends Component {
  state = {
    loading: false,
    visible: false,
  };

  showScoreModal = () => {
    this.setState({
      visible: true,
    });
  };

  showReviewModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  render() {
    const { visible, loading } = this.state;

    return (
      <>
        <div className="progress-container">
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
              </Button>,
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
                </Button>,
              ]}
            >
              <p>Review</p>
              <TextArea rows={4} />
            </Modal>
            <div style={{ marginBottom: '20px' }}>
              <Meta title="Progress" />
              <Progress percent={100} size="small" />
            </div>
            <Descriptions>
              <Descriptions.Item label="Submission Date">
                2017-01-10
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Submission Time">
                21:53
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Score">10</Descriptions.Item>
            </Descriptions>
            <Checkbox onChange={this.onChange}>Evaluated</Checkbox>
          </Card>
          <Card
            style={{ width: 350 }}
            cover={
              <img
                alt="example"
                src="data:image/jpeg;base64,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"
              />
            }
            actions={[
              <Button type="link">
                <Icon type="fire" key="setting" />
              </Button>,
              <Button type="link" onClick={this.showReviewModal}>
                <Icon type="edit" key="edit" />
              </Button>,
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
                </Button>,
              ]}
            >
              <p>Review</p>
              <TextArea rows={4} />
            </Modal>
            <div style={{ marginBottom: '20px' }}>
              <Meta title="Progress" />
              <Progress percent={100} size="small" />
            </div>
            <Descriptions>
              <Descriptions.Item label="Submission Date">
                2017-01-10
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Submission Time">
                21:53
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Score">10</Descriptions.Item>
            </Descriptions>
            <Checkbox onChange={this.onChange}>Evaluated</Checkbox>
          </Card>

          <Card
            style={{ width: 350 }}
            cover={
              <img
                alt="example"
                src="data:image/png;base64,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"
              />
            }
            actions={[
              <Button type="link">
                <Icon type="fire" key="setting" />
              </Button>,
              <Button type="link" onClick={this.showReviewModal}>
                <Icon type="edit" key="edit" />
              </Button>,
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
                </Button>,
              ]}
            >
              <p>Review</p>
              <TextArea rows={4} />
            </Modal>
            <div style={{ marginBottom: '20px' }}>
              <Meta title="Progress" />
              <Progress percent={100} size="small" />
            </div>
            <Descriptions>
              <Descriptions.Item label="Submission Date">
                2017-01-10
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Submission Time">
                21:53
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Score">10</Descriptions.Item>
            </Descriptions>
            <Checkbox onChange={this.onChange}>Evaluated</Checkbox>
          </Card>
          <Card
            style={{ width: 350 }}
            cover={
              <img
                alt="example"
                src="data:image/png;base64,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"
              />
            }
            actions={[
              <Button type="link">
                <Icon type="fire" key="setting" />
              </Button>,
              <Button type="link" onClick={this.showReviewModal}>
                <Icon type="edit" key="edit" />
              </Button>,
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
                </Button>,
              ]}
            >
              <p>Review</p>
              <TextArea rows={4} />
            </Modal>
            <div style={{ marginBottom: '20px' }}>
              <Meta title="Progress" />
              <Progress percent={100} size="small" />
            </div>
            <Descriptions>
              <Descriptions.Item label="Submission Date">
                2017-01-10
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Submission Time">
                21:53
              </Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="Score">10</Descriptions.Item>
            </Descriptions>
            <Checkbox onChange={this.onChange}>Evaluated</Checkbox>
          </Card>
        </div>
      </>
    );
  }
}

export default UserProgress;
