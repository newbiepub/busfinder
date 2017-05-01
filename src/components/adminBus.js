import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage, RefreshControl} from "react-native";
import {Container, Content, Title, Button, Header, Icon, Left, Body, Text, Label, Input, Item, List, Right} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import * as Animate from "react-native-animatable";

class AdminBus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            busData: [],
            isLoading: true,
            refreshing: false
        }
    }

    componentWillMount() {
        this.getData();
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getData();
    }

    getData() {
        AsyncStorage.getItem("bus", (err, busData) => {
            if (!err && busData) {
                let bus = JSON.parse(busData);
                setTimeout(() => {
                    this.setState({busData: bus, isLoading: false, refreshing: false});
                }, 1000);
            }
        })
    }

    onCreateClick() {
        this.props.navigation.push({
            id: 'busform',
            formType: 'create',
            instance: this
        })
    }

    onItemClick(item) {
        this.props.navigation.push({
            id: "busform",
            data: item,
            formType: "update",
            instance: this
        })
    }

    renderRow(item, keyId, rowId) {
        return (
            <TouchableNativeFeedback onPress={() => this.onItemClick(item)}>
                <Animate.View animation="slideInUp" duration={500} delay={rowId * 100} style={{
                marginBottom: 10,
                paddingVertical: 15,
                borderWidth: 1,
                borderColor: "#cccccc",
                backgroundColor: "#fff",
                elevation: 5
            }}>
                    <View style={{
                    flex: 1,
                    flexDirection: "row"
                }}>
                        <View style={{
                        flex: 0.15,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRightWidth: 1,
                        borderRightColor: "#cccccc"
                    }}>
                            <Icon name="md-bus"/>
                        </View>
                        <View style={{
                        flex: 0.85,
                        paddingHorizontal: 20
                    }}>
                            <View style={{
                                flex: 0.33 ,
                                flexDirection: "row"
                            }}>
                                <Label>
                                    Route Number:
                                </Label>
                                <Text style={{
                                marginLeft: 10
                            }}>
                                    {item.routeNumber}
                                </Text>
                            </View>
                            <View style={{flex: 0.33 ,
                            flexDirection: "row"
                        }}>
                                <Label>
                                    Time To Next Station
                                </Label>
                                <Text style={{
                                marginLeft: 10
                            }}>
                                    {item.timeToNextStation}
                                </Text>
                            </View>
                            <View style={{flex: 0.33 ,
                            flexDirection: "row"
                        }}>
                                <Label>
                                    Distance
                                </Label>
                                <Text style={{
                                marginLeft: 10
                            }}>
                                    {item.distanceToNextStation}
                                </Text>
                            </View>
                        </View>
                    </View>
                </Animate.View>
            </TouchableNativeFeedback>
        )
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
                    <Title style={{
                        color: "#fff"
                    }}>
                        Bus
                    </Title>
                    </Body>
                    <Right>
                        <Button transparent={true} onPress={() => this.onCreateClick()}>
                            <Icon name={"md-add"}/>
                        </Button>
                    </Right>
                </Header>
                {
                    this.state.isLoading &&
                    <Indicator/>

                }
                {
                    !this.state.isLoading &&
                    <List
                        refreshControl={
                                  <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                  />
                            }
                        renderRow={this.renderRow.bind(this)}
                        dataArray={this.state.busData}
                    />
                }

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account
    }
};

export default connect(mapStateToProps, null)(AdminBus);