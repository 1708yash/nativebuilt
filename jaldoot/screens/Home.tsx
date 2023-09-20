//@ts-nocheck
import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, Chip, Button } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useState } from "react";
import { newsData } from "../types";
import CardItem from "../components/CardItem";
const APIKEY = "pub_297695c84b578645eefc6bd1f4812022e127";
const categories = ["Environment", "Health", "Science", "World"];
const Home = () => {
  const [nextPage, setNextPage] = useState("");
  const [newsData, setnewsData] = useState<newsData[]>([]);
  const handlepress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${APIKEY}b&country=in&language=en&${
      selectedcategory.length > 0 ? `category=${selectedcategory.join()}` : ""
    }${nextPage?.length > 0 ? `&nextPage=${nextPage}` : ""}`;
    try {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
        setnewsData((prev)=>[...prev,...data.results]);
        setNextPage(data.nextPage);
    });
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedcategory, setselectedCategrory] = React.useState([]);
  const handleSelect = (val: string) => {
    setselectedCategrory((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((categories) => categories !== val)
        : [...prev, val]
    );
  };
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Jaldoot" />
      </Appbar.Header>
      <View style={styles.filters}>
        {categories.map((category) => (
          <Chip
            mode="outlined"
            key={category}
            style={{ margin: 5 }}
            textStyle={{ fontWeight: "400", color: "white", padding: 1 }}
            showSelectedOverlay
            selected={
              selectedcategory.find((c) => category === c) ? true : false
            }
            onPress={() => handleSelect(category)}
          >
            {category}
          </Chip>
        ))}
        <Button
          mode="outlined"
          style={styles.button}
          labelStyle={{
            fontSize: 14,
            margin: "auto",
            color: theme.colors.primary,
          }}
          icon={"sync"}
          onPress={handlepress}
        >
          Refresh
        </Button>
      </View>
      <FlatList onEndReached={()=>handlepress}
        style={styles.flatlist}
        data={newsData}
        renderItem={({ item }) => (
          <CardItem
            category={item.category}
            content={item.content}
            country={item.country}
            creator={item.creator}
            description={item.description}
            image_url={item.image_url}
            keywords={item.keywords}
            language={item.language}
            link={item.link}
            pubData={item.pubData}
            source_id={item.source_id}
            title={item.title}
            video_url={item.video_url}
          />
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  cipsstyle: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatlist: {
    flex: 1,
    height: "auto",
  },
});
