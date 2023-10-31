import React, { useState, useEffect } from "react";
import { View, Text, Modal, Button, TouchableOpacity } from "react-native";
import * as Contacts from "expo-contacts";
import Contact from "./src/components/contact/Contact";
import Book from "./src/components/book/Book";
import CameraComponent from "./src/components/book/Camera";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState("");
  const [bookDueDate, setBookDueDate] = useState("");
  const [bookReturnedDate, setBookReturnedDate] = useState("");
  const [country, setCountry] = useState("Turkey");
  const [isModalVisible, setModalVisible] = useState(false);
  const [totalFine, setTotalFine] = useState(0);

  // console.log(
  //   "🚀 ~ file: App.js:10 ~ App ~ selectedContact:",
  //   selectedContact?.name
  // );
  // console.log("🚀 ~ file: App.js:11 ~ App ~ bookDueDate:", bookDueDate);
  // console.log(
  //   "🚀 ~ file: App.js:12 ~ App ~ bookReturnedDate:",
  //   bookReturnedDate
  // );
  // console.log("🚀 ~ file: Book.js:52 ~ Book ~ country:", country);
  // console.log("🚀 ~ file: App.js:15 ~ App ~ totalFine:", totalFine)

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    requestContactsPermission();
  }, []);

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      fetchContacts();
    }
  };

  const fetchContacts = async () => {
    const { data } = await Contacts.getContactsAsync({});
    setContacts(data);
  };

  return (
    <>
      {/* modal section starts */}
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={{ backgroundColor: "white", padding: 20 }}>
              <Text>Selected Contact Name: {selectedContact}</Text>
              <Text>country: {country}</Text>
              <Text>Dook Due Date: {bookDueDate}</Text>
              <Text>Book Returned Date: {bookReturnedDate}</Text>
              <Text>Total Fine: {totalFine}</Text>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </View>
        </Modal>
      </View>
      {/* modal section ends */}
      {contacts && contacts.length > 0 ? (
        <Contact
          fetchContacts={fetchContacts}
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            marginBottom: 190,
          }}
        >
          <Text>You got no contacts available... :/</Text>
        </View>
      )}

      <Book
        bookDueDate={bookDueDate}
        setBookDueDate={setBookDueDate}
        bookReturnedDate={bookReturnedDate}
        setBookReturnedDate={setBookReturnedDate}
        country={country}
        setCountry={setCountry}
        totalFine={totalFine}
        setTotalFine={setTotalFine}
      />
      <CameraComponent />
      <View
        style={{
          alignItems: "center",
          // backgroundColor: "pink",
        }}
      >
        <TouchableOpacity
          onPress={toggleModal}
          disabled={
            selectedContact === ""
              ? true
              : false || country === ""
              ? true
              : false || bookDueDate === ""
              ? true
              : false || bookReturnedDate === ""
              ? true
              : false || totalFine === ""
              ? true
              : false
          }
          style={{
            backgroundColor: "orange",
            width: 150,
            height: 50,
            borderColor: "red",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#FFF" }}>Calculate</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default App;
