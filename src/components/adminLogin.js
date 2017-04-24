import React from "react";
import {View} from "react-native";
import {Container, Content, Button, Header, Icon, Left, Body, Text, InputGroup, Input, Item} from "native-base";

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
    }

    onBackNavigator() {
        this.props.navigator.pop();
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
                            <Input placeholder="Username or Email"/>
                        </InputGroup>
                    </Item>
                    <Item>
                        <InputGroup>
                            <Input placeholder="Password" secureTextEntry={true}/>
                        </InputGroup>
                    </Item>
                    <Button block>
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

export default AdminLogin;