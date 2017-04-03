import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import {Actions, DefaultRenderer} from 'react-native-router-flux';

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
            type="displace"
            content={<SideMenu />}
            tapToClose={true}
            openDrawerOffset={0.1}
            side={'right'}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={Drawer.tweenPresets.parallax}
            >
            <DefaultRenderer navigationState={children[children.length - 1]} onNavigate={this.props.onNavigate} />
        </Drawer>
    );
  }
}