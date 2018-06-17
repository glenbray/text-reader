import React from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { Icon } from "react-native-elements";
import { Camera } from "expo";
import Loader from "./Loader";
import { detectText } from "./api";

class TextDetectingCamera extends React.Component {
  state = { loading: false };

  constructor(props) {
    super(props);
    this.camera = React.createRef();
  }

  takePicture = async () => {
    const options = { quality: 0.5, base64: true };
    const photo = await this.camera.current.takePictureAsync(options);

    this.setState({ loading: true }, async () => {
      try {
        const { TextDetections: textDetections } = await detectText(
          photo.base64
        );

        const mapped = textDetections.map(detection => ({
          text: detection.DetectedText,
          confidence: detection.Confidence.toFixed(2)
        }));

        this.props.close({ uri: photo.uri, textDetections: mapped });
      } catch (err) {
        console.log("error", err);
        alert("An error has occured");
        this.props.close({ textDetections: [] });
      }
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingContainer}>
          <Loader />
        </View>
      );
    }

    return (
      <Camera
        ref={this.camera}
        style={styles.container}
        type={Camera.Constants.Type.back}
      >
        <React.Fragment>
          <View style={styles.closeCameraButton}>
            <TouchableOpacity
              onPress={() => this.props.close({ textDetections: [] })}
            >
              <Icon reverse raised name="close" />
            </TouchableOpacity>
          </View>
          <View style={styles.captureImageButton}>
            <TouchableOpacity onPress={this.takePicture}>
              <Icon
                containerStyle={{ backgroundColor: "red" }}
                reverse
                raised
                name="photo-camera"
              />
            </TouchableOpacity>
          </View>
        </React.Fragment>
      </Camera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  closeCameraButton: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start"
  },
  captureImageButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  }
});

export default TextDetectingCamera;
