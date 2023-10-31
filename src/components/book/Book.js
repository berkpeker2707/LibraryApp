import * as React from "react";
import { View, ScrollView, Text, TextInput, Button } from "react-native";
import WeekdayCalculator from "./WeekdayCalculator";
import { Picker } from "@react-native-picker/picker";

const Book = (props) => {
  const {
    bookDueDate,
    setBookDueDate,
    bookReturnedDate,
    setBookReturnedDate,
    country,
    setCountry,
    totalFine,
    setTotalFine,
  } = props;

  const handleDueDateChange = (text) => {
    // const date = new Date(text);
    // if (!isNaN(date)) {
    setBookDueDate(text);
    // } else {
    //   console.log("Date object problem: ", error);
    // }
  };

  const handleReturnDateChange = (text) => {
    // const date = new Date(text);
    // if (!isNaN(date)) {
    setBookReturnedDate(text);
    // } else {
    //   console.log("Date object problem: ", error);
    // }
  };

  const handleSaveDate = () => {
    console.log("Entered bookDueDate:", bookDueDate);
  };

  const handleValueChange = (itemValue, itemIndex) => setCountry(itemValue);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 50,
        // backgroundColor: "red",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* options SaudiArabia or Turkey */}
        <Text>Select a country:</Text>
        <Picker
          style={{
            width: "70%",
            backgroundColor: "#D3D3D3",
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          selectedValue={country}
          onValueChange={handleValueChange}
        >
          <Picker.Item label="Turkey" value="Turkey" />
          <Picker.Item label="Saudi Arabia" value="SaudiArabia" />
        </Picker>
        <Text>Enter a Book Due Date:</Text>
        <TextInput
          style={{
            backgroundColor: "#D3D3D3",
            textDecorationLine: "underline",
            padding: 10,
            height: 50,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onChangeText={handleDueDateChange}
          value={bookDueDate}
          placeholder="YYYY-MM-DD"
          maxLength={10}
          keyboardType="numeric"
        />
        <Text>Enter a Book Returned Date:</Text>
        <TextInput
          style={{
            backgroundColor: "#D3D3D3",
            textDecorationLine: "underline",
            padding: 10,
            height: 50,
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onChangeText={handleReturnDateChange}
          value={bookReturnedDate}
          placeholder="YYYY-MM-DD"
          maxLength={10}
          keyboardType="numeric"
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "yellow",
            width: 300,
          }}
        >
          {bookDueDate >= bookReturnedDate ? (
            <WeekdayCalculator
              startDate={new Date(bookReturnedDate)}
              endDate={new Date(bookDueDate)}
              country={country}
              totalFine={totalFine}
              setTotalFine={setTotalFine}
            />
          ) : (
            <>
              <Text style={{ textAlign: "center" }}>
                Book due date should be greater or equal than book return date.
                :/
              </Text>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Book;
