import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera, Permissions } from "expo";
import { Icon } from "react-native-elements";

import TextDetectingCamera from "./src/TextDetectingCamera";
import DetectedTextList from "./src/DetectedTextList";
import ErrorMessage from "./src/ErrorMessage";

export default class App extends React.Component {
  state = {
    hasCameraPermission: false,
    cameraOpen: false,
    textDetections: []
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  openCamera = () => {
    this.setState({ cameraOpen: true });
  };

  closeCamera = ({ textDetections }) => {
    this.setState({ cameraOpen: false, textDetections: textDetections });
  };

  render() {
    const { hasCameraPermission, cameraOpen } = this.state;

    if (!hasCameraPermission) {
      return (
        <ErrorMessage message="This app requires camera permissions to run" />
      );
    }

    if (hasCameraPermission && cameraOpen) {
      return <TextDetectingCamera close={this.closeCamera} />;
    }

    return (
      <View style={styles.container}>
        <DetectedTextList textDetections={this.state.textDetections} />
        <View style={styles.openCameraContainer}>
          <TouchableOpacity onPress={this.openCamera}>
            <Icon reverse raised name="photo-camera" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  openCameraContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(255, 52, 40, 0.6)"
  }
});
