import React,{Component} from 'react';
import { Navigator, View, AsyncStorage } from 'react-native';
import Home from "./home";
import Feedback from "./Feedback";
import AdminLogin from "./adminLogin";
import AdminPage from "./adminPage";
import AdminBus from "./adminBus";
import BusForm from "./adminBusForm";
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
              return <Feedback navigation={navigation}/>;
          case "adminlogin":
              return <AdminLogin navigation={navigation}/>;
          case 'adminpage':
              return <AdminPage navigation={navigation}/>;
          case 'adminbus':
              return <AdminBus navigation={navigation}/>;
          case 'busform':
              return <BusForm navigation={navigation} data={route.data}/>;
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
