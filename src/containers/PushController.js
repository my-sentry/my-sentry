import React, { Component } from 'react';
import { Platform } from 'react-native';
import { connect } from 'react-redux';
import Routes from './Routes';
import { updateUserToken } from '../actions/axiosController';
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
} from 'react-native-fcm';

// map state to props will add id to this.props
export default connect(({auth}) => auth)(class PushController extends Component {

  componentDidMount() {
    if (Platform.OS !== 'ios') {
      FCM.requestPermissions();

      FCM.getFCMToken().then(token => {
        console.log('TOKEN (getFCMToken)', token);
        this.props.dispatch({type: 'UPDATE_TOKEN', token});
      });

      FCM.getInitialNotification().then(notif => {
        console.log('getInitialNotification returned notif: ', notif);
      });

      this.notificationListener = FCM.on(FCMEvent.Notification, notif => {
        console.log('Notification Recieved: ', notif);

        if (notif.local_notification) {
          console.log('Listener blocked because notif was local_notification: ', notif);
          return;
        }

        if (notif.opened_from_tray) {
          console.log('Listener blocked because notif was opened from tray: ', notif);
          return;
        }

        // if (Platform.OS === 'ios') {
        //   //optional
        //   //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
        //   //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
        //   //notif._notificationType is available for iOS platfrom
        //   switch (notif._notificationType) {
        //   case NotificationType.Remote:
        //     notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        //     break;
        //   case NotificationType.NotificationResponse:
        //     notif.finish();
        //     break;
        //   case NotificationType.WillPresent:
        //     notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
        //     break;
        //   }
        // }

        this.showLocalNotification(notif);
      });

      this.refreshTokenListenter = FCM.on(FCMEvent.RefreshToken, token => {
        console.log('TOKEN (refreshUnsubscribe)', token);
        this.props.dispatch({ type: 'UPDATE_TOKEN', token});
        if (this.props.id) {
          updateUserToken(this.props.id, token);
        }
      });
    }
  }

  showLocalNotification(notif) {
    console.log('SHOW_LOCAL_NOTIFICATION');
    FCM.presentLocalNotification({
      'title': notif.title,
      'body': notif.body,
      'priority': 'high',
      'click_action': notif.click_action,
      'show_in_foreground': true,
      'local': true
    });
  }

  componentWillUnmount() {
    if (Platform.OS !== 'ios') {
      this.notificationListener.remove();
      this.refreshTokenListener.remove();
    }
  }

  render() {
    return <Routes />;
  }

});
