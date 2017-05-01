import React from "react";
import {View, Image, AsyncStorage} from "react-native";
import faker from "faker";
import {
    Container,
    Content,
    Header,
    Button,
    Icon,
    Form,
    Item,
    Text,
    Left,
    Body,
    Right,
    Input,
    InputGroup
} from "native-base";

class Feedback extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.data;
        let routeData = this.props.routeData;
        this.state = {
            id: faker.random.uuid(),
            routeNumber: routeData != undefined ? routeData.routeNumber : 0,
            busLicense: data != undefined ? data.licensePlate : "",
            email: "",
            comment: ""
        }
    }

    onBackNavigator() {
        this.props.navigation.pop();
    }

    imagePicker() {
        var options = {
            title: 'Select Picture',
            customButtons: [
                {name: 'Picture', title: 'Select An Image'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    videoSource: response.uri
                });
            }
        });
    }

    omSubmitFeeback() {
        let feedbackItem = this.state;
        AsyncStorage.getItem("feedback", (err, feedbackData) => {
            if(!err && feedbackData) {
                let feedback = JSON.parse(feedbackData);
                if(feedback.length) {
                    feedback.push(feedbackItem);
                    AsyncStorage.setItem('feedback', JSON.stringify(feedback));
                } else {
                    AsyncStorage.setItem('feedback', JSON.stringify([feedbackItem]));
                }
            } else {
                AsyncStorage.setItem('feedback', JSON.stringify([feedbackItem]));
            }
            this.props.navigation.pop();
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
                        Feedback
                    </Text>
                    </Body>

                </Header>
                <Content>
                    <Item>
                        <InputGroup>
                            <Input
                                editable={false}
                                value={this.state.busLicense}
                                placeholder="Bus License"/>
                        </InputGroup>
                    </Item>
                    <Item>
                        <InputGroup>
                            <Input
                                editable={false}
                                value={this.state.routeNumber.toString()}
                                placeholder="Bus Route"
                            />
                        </InputGroup>
                    </Item>
                    <Item regular>
                        <InputGroup>
                            <Input
                                onChangeText={(email) => this.setState({email})}
                                placeholder="Email"/>
                        </InputGroup>
                    </Item>
                    <Item regular>
                        <InputGroup>
                            <Input
                                onChangeText={(comment) => this.setState({comment})}
                                placeholder="Comment"/>
                        </InputGroup>
                    </Item>
                    <Button block onPress={() => this.omSubmitFeeback()}>
                        <Text style={{
                           color: "#fff"
                       }}>
                            Submit
                        </Text>
                    </Button>
                </Content>
            </View>
        )
    }
}

export default Feedback;