import React from "react";
import {View, Image} from "react-native";
import ImagePicker from "react-native-image-picker";
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
    }

    onBackNavigator() {
        this.props.navigator.pop();
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
                            <Input placeholder="Bus Number"/>
                        </InputGroup>
                    </Item>
                    <Item>
                        <InputGroup>
                            <Input placeholder="Bus Route"/>
                        </InputGroup>
                    </Item>
                    <Item regular>
                        <InputGroup>
                            <Input placeholder="Feedback"/>
                        </InputGroup>
                    </Item>
                    <Item style={{
                        marginBottom: 20,
                        marginTop: 20,
                        alignItems: "flex-end",
                        borderWidth: 0,
                        height: 56
                    }}>
                        <Image source={{uri: "http://corp-content.tatamotors.com.s3-ap-southeast-1.amazonaws.com/wp-content/uploads/2015/09/buses-gallery04.jpg"}} style={{
                            position: "absolute",
                            left: 20,
                            top: 0,
                            bottom: 0,
                            height: 56,
                            width: 56,
                            borderWidth: 1,
                            borderColor: "#eee"
                        }}/>
                        <Button style={{
                            position: "absolute",
                            right: 20,
                            top: 0,
                            bottom: 0
                        }} onPress={this.imagePicker.bind(this)}>
                            <Text>
                                Upload Image
                            </Text>
                        </Button>

                    </Item>
                    <Button block>
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