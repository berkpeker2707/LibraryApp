import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button, StyleSheet, Modal } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

export default function CameraComponent() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const cameraRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();

      setHasPermission(
        cameraPermission.status === "granted" &&
          mediaLibraryPermission.status === "granted"
      );
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        // Get the app's document directory path
        const documentsDirectory = FileSystem.documentDirectory;

        // Create a new directory called 'photos' in the app's document directory
        const photosDirectory = `${documentsDirectory}photos/`;

        // Create the 'photos' directory if it doesn't exist
        await FileSystem.makeDirectoryAsync(photosDirectory, {
          intermediates: true,
        });

        // Get the file name (use a timestamp as the name for uniqueness)
        const fileName = `${new Date().getTime()}.jpg`;

        // Save the picture to the 'photos' directory
        await FileSystem.moveAsync({
          from: photo.uri,
          to: `${photosDirectory}${fileName}`,
        });

        console.log(
          "Photo captured and saved to:",
          `${photosDirectory}${fileName}`
        );
      }
      toggleModal();
    }
  };

  return (
    <View>
      <Button title="Open Camera" onPress={toggleModal} />
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {hasPermission === null ? (
            <Text>Requesting camera permission...</Text>
          ) : hasPermission === false ? (
            <Text>No access to camera.</Text>
          ) : (
            <Camera
              ref={cameraRef}
              style={{ flex: 1 }}
              type={Camera.Constants.Type.back}
              ratio="16:9"
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button title="Take Picture" onPress={takePicture} />
                <Button title="Close Camera" onPress={toggleModal} />
              </View>
            </Camera>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});
