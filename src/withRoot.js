import React from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { theme } from './theme';
import Reboot from 'material-ui/Reboot';

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

export default withRoot;