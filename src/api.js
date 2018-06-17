import Amplify, { API } from "aws-amplify";
import awsExports from "./aws-exports";

Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "rekognition",
        endpoint: "https://rekognition.ap-southeast-2.amazonaws.com",
        service: "rekognition",
        region: "ap-southeast-2"
      }
    ]
  }
});

async function detectText(bytes) {
  const apiName = "rekognition";
  const path = "/detect-text";
  const body = { Image: { Bytes: bytes } };

  const headers = {
    "X-Amz-Target": "RekognitionService.DetectText",
    "Content-Type": "application/x-amz-json-1.1"
  };

  const init = {
    body: body,
    headers: headers
  };

  return await API.post(apiName, path, init);
}

export { detectText };
