import React from 'react';
import { DatePicker } from 'antd';


class ControlledDatePicker extends React.Component {
  state = { mode: 'time' };

  handleOpenChange = open => {
    if (open) {
      this.setState({ mode: 'time' });
    }
  };

  handlePanelChange = (value, mode) => {
    this.setState({ mode });
  };

  render() {
    return (
      <DatePicker
        mode={this.state.mode}
        showTime
        onOpenChange={this.handleOpenChange}
        onPanelChange={this.handlePanelChange}
      />
    );
  }
}

export default ControlledDatePicker;