import React from "react";
import {View, TouchableNativeFeedback, AsyncStorage} from "react-native";
import {
    Container,
    Content,
    Title,
    Button,
    Header,
    Icon,
    Left,
    Body,
    Text,
    Label,
    Input,
    Item,
    List,
    Picker,
    Form
} from "native-base";
import {connect} from "react-redux";
import Indicator from "./indicator";
import * as Animate from "react-native-animatable";

class BusForm extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        this.currentRouteNumber = data != undefined ? data.routeNumber : 0;
        this.state = {
            routeData: [],
            routeNumber: data != undefined ? data.routeNumber : 0,
            timeToNextStation: data != undefined ? data.timeToNextStation : 0,
            distanceToNextStation: data != undefined ? data.distanceToNextStation : 0,
            isLoading: true
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('route', (err, routeData) => {
            if (!err && routeData) {
                let route = JSON.parse(routeData);
                if (route.length) {
                    this.setState({
                        routeData: route
                    });
                    setTimeout(() => {
                        this.setState({
                            isLoading: false
                        })
                    }, 500)
                }
            }
        })
    }

    onValueChange(value: string) {
        this.setState({
            routeNumber: value
        });
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    updateRouteItem() {
        let busData = this.props.instance.state.busData,
            currentData = busData.find(item => item.routeNumber == this.currentRouteNumber);
        if (currentData) {
            let currentIndex = busData.indexOf(currentData);
            currentData.routeNumber = this.state.routeNumber;
            busData.splice(currentIndex, 1, currentData);
            this.props.instance.setState({busData: []});
            this.props.instance.setState({busData: busData});
        }
    }

    onUpdateRoute() {
        AsyncStorage.getItem("bus", (err, busData) => {
            if (!err && busData) {
                let bus = JSON.parse(busData);
                if (bus.length) {
                    let currentBus = bus.find((item) => item.routeNumber == this.currentRouteNumber);
                    if (currentBus) {
                        let currentBusIndex = bus.indexOf(currentBus);
                        currentBus.routeNumber = this.state.routeNumber;
                        bus.splice(currentBusIndex, 1, currentBus);
                        AsyncStorage.setItem('bus', JSON.stringify(bus));
                        this.updateRouteItem();
                        this.props.navigation.pop();

                    } else {
                        alert("Update Failed");
                    }
                }
            }
        })
    }

    onPressCreate() {
        let busItem = { routeNumber, timeToNextStation, distanceToNextStation} = this.state;
        console.warn(JSON.stringify(busItem, null, 4));
        /*AsyncStorage.getItem("bus", (err, busData) => {
            if(!err && busData) {
                let bus = JSON.parse(busData);
                if(bus.length) {
                    let currentBus = bus.find(item => item.routeNumber == this.state.routeNumber);
                    if(!currentBus) {

                    } else {
                        alert("Duplicate");
                    }
                } else {

                }
            }
        })*/
    }

    onFocusItem(type) {

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
                        Bus Form
                    </Title>
                    </Body>
                </Header>
                <View style={{
                    flex: 1
                }}>
                    <Label>Route Number</Label>
                    {
                        !this.state.isLoading &&
                        <Picker
                            mode="dropdown"
                            selectedValue={this.state.routeNumber.toString()}
                            onValueChange={this.onValueChange.bind(this)}>
                            {
                                this.state.routeData.map(item => {
                                    return <Picker.Item key={`${item.routeNumber}`} label={`${item.routeNumber}`}
                                                        value={`${item.routeNumber}`}/>
                                })
                            }
                        </Picker>

                    }
                    <Form>
                        <Item inlineLabel={true}>
                            <Label>
                                Time To Next Station
                            </Label>
                            <Input
                                onChangeText={(timeToNextStation) => this.setState({timeToNextStation})}
                                value={this.state.timeToNextStation.toString()}/>
                        </Item>
                        <Item inlineLabel={true}>
                            <Label>
                                Distance To Next Station
                            </Label>
                            <Input
                                onChangeText={(distanceToNextStation) => this.setState({distanceToNextStation})}
                                value={this.state.distanceToNextStation.toString()}/>
                        </Item>
                    </Form>
                    <Button block onPress={() => {
                        if(this.props.formType === "create") {
                             this.onPressCreate();
                        } else if(this.props.formType === 'update') {
                            this.onUpdateRoute();
                        }
                    }}>
                        <Text>
                            Submit
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

export default connect(mapStateToProps, null)(BusForm);