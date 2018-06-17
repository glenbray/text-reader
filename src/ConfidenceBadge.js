import React from "react";
import { Badge } from "react-native-elements";

const ConfidenceBadge = ({ confidence }) => {
  let color = "green";
  if (confidence < 80) color = "orange";
  if (confidence < 60) color = "red";

  return (
    <Badge
      value={`${confidence}%`}
      containerStyle={{ backgroundColor: color }}
    />
  );
};

export default ConfidenceBadge;
