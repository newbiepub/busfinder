import React,{Component} from 'react';
import { Navigator, View, AsyncStorage, TouchableNativeFeedback } from 'react-native';
import Home from "./home";
import Feedback from "./Feedback";
import AdminLogin from "./adminLogin";
import AdminPage from "./adminPage";
import AdminBus from "./adminBus";
import BusForm from "./adminBusForm";
import AdminRoute from './adminRoute';
import RouteForm from "./routeForm";
import RouteInfo from "./routeInfo";
import AdminFeedback from "./adminFeedback";
import {initDatabase} from "../util/initData";

class Navigation extends Component {
    constructor(props) {
      super(props);
      this._navigation = null;
      this.state = {
        route: {}
      }
    }

    componentWillMount() {
        initDatabase();
    }

    renderScene(route, navigation) {
      switch (route.id) {
        case "home":
          return (
            <Home navigation={navigation}/>
          );
          case "feedback":
              return <Feedback navigation={navigation} data={route.data} instance={route.instance} routeData={route.routeData}/>;
          case "adminlogin":
              return <AdminLogin navigation={navigation}/>;
          case 'adminpage':
              return <AdminPage navigation={navigation}/>;
          case 'adminbus':
              return <AdminBus navigation={navigation}/>;
          case 'busform':
              return <BusForm navigation={navigation} data={route.data} instance={route.instance} formType={route.formType}/>;
          case 'adminroute':
              return <AdminRoute navigation={navigation}/>;
          case 'routeform':
              return <RouteForm navigation={navigation} data={route.data} instance={route.instance} formType={route.formType}/>;
          case 'routeinfo':
              return <RouteInfo navigation={navigation} data={route.data} instance={route.data}/>;
          case 'adminfeedback':
              return <AdminFeedback navigation={navigation}/>;
          break;
      }
    }

    onWillFocus(route) {
        this.setState({route});
    }

    render() {
        return (
          <View style={{
              flex: 1
            }}>
            <Navigator
              ref={(ref) => this._navigation = ref}
              initialRoute={{id: 'home', index: 0}}
              renderScene={this.renderScene.bind(this)}
              onWillFocus={this.onWillFocus.bind(this)}
              />
          </View>
        );
    }
}

export default Navigation;
