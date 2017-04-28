import React from "react";
import {View} from "react-native";
import {Container, Content, Button, Header, Icon, Left, Body, Text, InputGroup, Input, Item} from "native-base";
import {connect} from "react-redux";
import {login} from "../action/account";

class AdminLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: "#fff"
            }}>
                <Header>
                    <Left>
                        <Button transparent={true} onPress={this.onBackNavigator.bind(this)}>
                            <Icon name="md-arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{
                        color: "#fff"
                    }}>
                        Admin Login
                    </Text>
                    </Body>
                </Header>
                <View style={{
                    flex: 0.1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Item>
                        <InputGroup>
                            <Input
                                onChangeText={(username) => this.setState({username})}
                                value={this.state.username}
                                placeholder="Username or Email"/>
                        </InputGroup>
                    </Item>
                    <Item>
                        <InputGroup>
                            <Input
                                onChangeText={(password) => this.setState({password})}
                                value={this.state.password}
                                placeholder="Password" secureTextEntry={true}/>
                        </InputGroup>
                    </Item>
                    <Button block onPress={() => {this.props.login(this.state.username, this.state.password, this)}}>
                        <Text style={{
                           color: "#fff"
                       }}>
                            Login
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps) (AdminLogin);