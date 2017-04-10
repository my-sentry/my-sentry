import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {Actions, ActionConst, DefaultRenderer} from 'react-native-router-flux';

const drawerStyles = {
  drawer: {
    backgroundColor: '#cccccc',
    height: 100,
    shadowColor: '#000000',
    opacity: .95,
    shadowRadius: 3,
    overflow: 'hidden'
  },
};
export default class NavigationDrawer extends Component {
  render() {
    const state = this.props.navigationState;
    const children = state.children;
    return (
        <Drawer
            ref="navigation"
            open={state.open}
            onOpen={()=>Actions.refresh({key: state.key, open: true})}
            onClose={()=>Actions.refresh({key: state.key, open: false})}
            type="overlay"
            content={<SideMenu />}
            tapToClose={true}
            openDrawerOffset={.3}
            side={'right'}
            panCloseMask={0.2}
            acceptPan={true}
            styles={drawerStyles}
            >
            <DefaultRenderer navigationState={children[children.length - 1]} onNavigate={this.props.onNavigate} />
        </Drawer>
    );
  }
}
