import React,{Component} from 'react';
import { Navigator, View, AsyncStorage } from 'react-native';
import Home from "./home";
import Feedback from "./Feedback";
import AdminLogin from "./adminLogin";
import {initDatabase} from "../util/initData";

class Navigation extends Component {
    constructor(props) {
      super(props);
      this._navigator = null;
      this.state = {
        route: {}
      }
    }

    componentWillMount() {
        initDatabase();
    }

    renderScene(route, navigator) {
      switch (route.id) {
        case "home":
          return (
            <Home navigator={navigator}/>
          );
          case "feedback":
              return <Feedback navigator={navigator}/>;
          case "adminlogin":
              return <AdminLogin navigator={navigator}/>
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
              ref={(ref) => this._navigator = ref}
              initialRoute={{id: 'home', index: 0}}
              renderScene={this.renderScene.bind(this)}
              onWillFocus={this.onWillFocus.bind(this)}
              />
          </View>
        );
    }
}

export default Navigation;
