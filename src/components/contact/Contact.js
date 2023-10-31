import * as React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";

const Contact = (props) => {
  const { fetchContacts, contacts, selectedContact, setSelectedContact } =
    props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50,
        marginBottom: 10,
        // backgroundColor: "green",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            width: 150,
            height: 50,
            borderColor: "red",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={fetchContacts}
        >
          <Text style={{ color: "#FFF" }}>Fetch Contacts</Text>
        </TouchableOpacity>
        {contacts.length > 0 && (
          <View style={{ alignItems: "center" }}>
            <Text>Contact List:</Text>
            {contacts.map((contact) => (
              <TouchableOpacity
                onPress={() => setSelectedContact(contact.name)}
                style={{
                  height: 50,
                  backgroundColor:
                    // selectedContact === contact ? "#ADD8E6" : "#D3D3D3",
                    "#D3D3D3",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  padding: 10,
                }}
                key={contact.id}
              >
                <Text>{contact.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Contact;
