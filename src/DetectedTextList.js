import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { List, ListItem, Badge } from "react-native-elements";
import ConfidenceBadge from "./ConfidenceBadge";
import ErrorMessage from "./ErrorMessage";

class DetectedTextList extends React.Component {
  render() {
    const { textDetections } = this.props;

    if (textDetections.length === 0) {
      return (
        <ErrorMessage message="No detections! Capture an image with text" />
      );
    }

    return (
      <React.Fragment>
        <View style={styles.listHeaderContainer}>
          <Badge value="Detected Text" />
          <Badge value="Confidence" />
        </View>
        <ScrollView>
          <List containerStyle={{ marginBottom: 5 }}>
            {textDetections.map((detected, i) => (
              <ListItem
                key={i}
                title={detected.text}
                badge={{
                  element: <ConfidenceBadge confidence={detected.confidence} />
                }}
                titleNumberOfLines={10}
                hideChevron={true}
              />
            ))}
          </List>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  listHeaderContainer: {
    flex: 0,
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "space-between"
  },
  listHeaderText: {
    fontWeight: "bold"
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  captureImageButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  captureImageButtonText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white"
  }
});

export default DetectedTextList;
