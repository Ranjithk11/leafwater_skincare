import React from "react";
import { Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { APP_COLORS } from "@/theme/colors/colors";
const instaGlow = "/images/insta_glow.jpg";
const goldenMask="/images/goldenmask.jpg";
const faceneck="/images/face_neck.jpg";

interface SalonServiceViewProps {
  fontFamily: string;
}
const SalonServiceView = ({ fontFamily }: SalonServiceViewProps) => {
  const styles = StyleSheet.create({
    page: {
      display: "flex",
      flexDirection: "column",
      padding: 20,
    },
    pageTitle: {
      fontFamily: fontFamily,
      fontWeight: 900,
      fontSize: 26,
    },
    contentCard: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingLeft:30,
      borderRadius:20,
      marginBottom:10
    },
    contentCardImage: {
      width: "100%",
      height: "150px",
    },
    contentCardTitle: {
      fontFamily: fontFamily,
      fontSize: 20,
      fontWeight: 800,
      marginBottom: 10,
    },
    contentCardInfo: {
      fontFamily: fontFamily,
      fontSize: 14,
      fontWeight: 500,
      width: "70%",
    },
  });

  return (
    <Page style={styles.page}>
      <View style={{ width: "100%" }}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <View style={{ marginBottom: 30, marginTop: 30 }}>
            <Text style={styles.pageTitle}>
              Recommended{" "}
              <Text style={{ color: APP_COLORS.PRIMARY_COLOR }}>
                Salon Services
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{...styles.contentCard,backgroundColor:"#87d37c"}}>
        <View
          style={{
            width: 175,
            height: 175,
            overflow: "hidden",
            borderRadius: "100%",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={instaGlow}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>INSTA GLOW</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              A painless method that effectively diminishes wrinkles while
              toning and lifting the facial skin. Once in three months Rs.5499/-
            </Text>
          </View>
        </View>
      </View>
      <View style={{...styles.contentCard,backgroundColor:"#fde3a7"}}>
        <View
          style={{
            width: 175,
            height: 175,
            overflow: "hidden",
            borderRadius: "100%",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={goldenMask}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>GOLDEN MASK</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              It helps treat sun damage by reducing, giving you a natural.
              fairness and glow while keeping your skin toned and moisturized
              Once in two months Rs.2999/-
            </Text>
          </View>
        </View>
      </View>
      <View style={{...styles.contentCard,backgroundColor:"#ecf0f1"}}>
        <View
          style={{
            width: 175,
            height: 175,
            overflow: "hidden",
            borderRadius: "100%",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={faceneck}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>FACE /NECK DE-TAN</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              It helps in reducing tan. brightens and evens skin tone. Highly
              recommended for outdoor men and people with darkened skin tone.
              Once in a month Rs.3499/-
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default SalonServiceView;
