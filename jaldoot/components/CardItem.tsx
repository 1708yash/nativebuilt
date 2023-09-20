import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { newsData } from "../utils/types";
import { Card, useTheme } from "react-native-paper";

const CardItem = (props: newsData) => {
  const theme = useTheme();
  return (
    <Pressable>
      <Card
        style={{
          marginVertical: 10,
          backgroundColor: theme.colors.elevation.level5,
        }}
      >
        <Card.Cover borderRadius={10} source={{uri:props.image_url}}/>
        <Card.Title title={props.title} subtitle={props.description.split("\n")[0]}
        titleNumberOfLines={1}
        > </Card.Title>
      </Card>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {},
});
