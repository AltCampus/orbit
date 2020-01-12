import React from 'react';
import { Drawer, Button } from 'antd';
import Screener from '../screener/Screener';

export class DrawerInfo extends React.Component {
  state = { visible: false, childrenDrawer: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  render() {
    return (
      <div>
        <Button type='primary' onClick={this.showDrawer}>
          Fill Information
        </Button>
        <Drawer
          title='Information'
          width={820}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Screener />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.onClose}
            >
              Cancel
            </Button>
            <Button onClick={this.onClose} type='primary'>
              Submit
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default DrawerInfo;
