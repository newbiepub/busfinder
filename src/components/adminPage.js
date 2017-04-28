import React from "react";
import {View, ScrollView, Image, AsyncStorage, TouchableNativeFeedback} from "react-native";
import {Button, Left, Body, Icon, Header, Text, H2, Label} from "native-base";
import {connect} from "react-redux";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busCount: 0,
            routeCount: 0
        }
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    componentWillMount() {
        AsyncStorage.getItem('bus', (err, busData) => {
            if (!err && busData) {
                let bus = JSON.parse(busData);
                this.setState({busCount: bus.length});
            }
        });

        AsyncStorage.getItem('route', (err, routeData) => {
            if(!err && routeData) {
                let route = JSON.parse(routeData);
                this.setState({routeCount: route.length});
            }
        })
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
                        Dashboard
                    </Text>
                    </Body>
                </Header>
                <View style={{
                    flex: 1
                }}>
                    <ScrollView style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10
                    }}>
                        <TouchableNativeFeedback onPress={() => this.props.navigation.push({
                            id: "adminbus"
                        })}>
                            <View style={{
                            flexDirection: "row",
                            backgroundColor: "#ecf0f5",
                            elevation: 5,
                             borderColor: "#cccccc",
                             marginBottom: 20
                        }}>
                                <View style={{
                                backgroundColor: "#00c0ef",
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 100,
                                width: 100
                            }}>
                                    <Icon style={{
                                    color: "#fff"
                                }} name="ios-bus-outline"/>
                                </View>
                                <View style={{
                                flex: 0.75,
                                paddingHorizontal: 10
                            }}>
                                    <H2>
                                        Bus
                                    </H2>
                                    <View style={{
                                    flexDirection: 'row'
                                }}>
                                        <Label>
                                            Bus Count:
                                        </Label>
                                        <Text>
                                            {this.state.busCount}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback>
                            <View style={{
                            flexDirection: "row",
                             backgroundColor: "#ecf0f5",
                            elevation: 5,
                             borderColor: "#cccccc",
                             marginBottom: 20
                        }}>
                                <View style={{
                                backgroundColor: "#dd4b39",
                                 alignItems: 'center',
                                justifyContent: 'center',
                                height: 100,
                                width: 100
                            }}>
                                    <Icon style={{
                                    color: "#fff"
                                }} name="ios-settings-outline"/>
                                </View>
                                <View style={{
                                flex: 0.75,
                                 paddingHorizontal: 10
                            }}>
                                    <H2>
                                        Route
                                    </H2>
                                    <View style={{
                                    flexDirection: 'row'
                                }}>
                                        <Label>
                                            Route Count:
                                        </Label>
                                        <Text>
                                            {this.state.routeCount}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>

                        <TouchableNativeFeedback>
                            <View style={{
                            flexDirection: "row",
                             backgroundColor: "#ecf0f5",
                            elevation: 5,
                             borderColor: "#cccccc",
                             marginBottom: 20
                        }}>
                                <View style={{
                                backgroundColor: "#00a65a",
                                 alignItems: 'center',
                                justifyContent: 'center',
                                height: 100,
                                width: 100
                            }}>
                                    <Icon style={{
                                    color: "#fff"
                                }} name="ios-paper-outline"/>
                                </View>
                                <View style={{
                                flex: 0.75,
                                 paddingHorizontal: 10
                            }}>
                                    <H2>
                                        Feedback
                                    </H2>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </ScrollView>
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

export default connect(mapStateToProps, null)(AdminPage);