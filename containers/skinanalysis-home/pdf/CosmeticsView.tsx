import React from "react";
import { Page, View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import { APP_COLORS } from "@/theme/colors/colors";
const sunlightFacial="/images/sinlight.png";
const facialPeel="/images/facial-peels-for-men.jpg";
const noMakeupGlow="/images/no-makeup-glow.jpg";

interface CosmeticsViewProps {
  fontFamily: string;
}
const CosmeticsView = ({ fontFamily }: CosmeticsViewProps) => {
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
      paddingLeft: 30,
      borderRadius: 20,
      marginBottom: 10,
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
                Cosmetics Services
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.contentCard, backgroundColor: "#D4E6F1" }}>
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
            src={sunlightFacial}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>Sunlight facial</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              Led facial with skin rejuvenation provides hydration and improves
              blood circulation once in three months 2k-25k
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.contentCard, backgroundColor: "#F8F9F9" }}>
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
            src={facialPeel}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>Combination peel</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              Acne anti-aging procedure Reduces acne and wrinkles. 3-4 Sessions
              for 4 months 11-14k No makeup glow
            </Text>
          </View>
        </View>
      </View>
      <View style={{ ...styles.contentCard, backgroundColor: "#D5F5E3" }}>
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
            src={noMakeupGlow}
          />
        </View>
        <View style={{ flex: 1, paddingLeft: 50 }}>
          <View>
            <Text style={styles.contentCardTitle}>No makeup glow</Text>
          </View>
          <View>
            <Text style={styles.contentCardInfo}>
              Semi-permanent make up providing a make-up look Once in 8 months
              15K-25K
            </Text>
          </View>
        </View>
      </View>
    </Page>
  );
};

export default CosmeticsView;
