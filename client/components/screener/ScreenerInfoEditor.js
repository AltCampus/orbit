import React from "react";
import { Drawer, Button, message } from "antd";
import ScreenerInfoForm from "./ScreenerInfoForm";
import axios from "axios";

export class DrawerInfo extends React.Component {
  state = { visible: false, childrenDrawer: false };

  showForm = () => {
    this.setState({
      visible: true
    });
  };

  hideForm = () => {
    this.setState({
      visible: false
    });
  };

  saveScreenerInfo = e => {
    e.preventDefault();
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      const requestBody = { ...values };
      try {
        const response = await axios.post(
          `/api/v1/screener/${this.props.user._id}`,
          requestBody,
          {
            headers: {
              authorization: JSON.parse(localStorage.authToken)
            }
          }
        );

        message.success("Your screener information has been updated");
        this.setState({ visible: false });
        this.props.fetchUser();
      } catch (error) {
        if (error.response) {
          return message.error(error.response.data.message);
        }
        if (!navigator.onLine) {
          return message.error("You are not connected to internet!");
        }
        message.error("Some error occured");
      }
    });
  };
  saveFormRef = formRef => {
    this.formRef = formRef;
  };
  render() {
    return (
      <div>
        {this.state.visible ? (
          <Button type="danger" onClick={this.hideForm}>
            Close Screener Information
          </Button>
        ) : (
          <Button type="primary" onClick={this.showForm}>
            Fill Information
          </Button>
        )}
        <ScreenerInfoForm
          wrappedComponentRef={ref => this.saveFormRef(ref)}
          mapPropsToFields={this.props.user.screener}
          title="Screener Information Form"
          onSubmit={this.saveScreenerInfo}
          onClose={this.hideForm}
          visible={this.state.visible}
        />
      </div>
    );
  }
}

export default DrawerInfo;
