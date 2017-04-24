import React from "react";
import {View} from "react-native";
import {Spinner} from "native-base";

class Indicator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                position: "absolute",
                top: 0,
                bottom:0,
                left:0,
                right: 0,
                justifyContent: "center",
                 alignItems: "center"
            }}>
                <Spinner/>
            </View>
        )
    }
}

export default Indicator;