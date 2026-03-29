import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { formatPrice } from '../lib/sdk';


export default function ListItem({ product }: { product: any }) {
  const cheapestVariant = product.variants?.sort((a: any, b: any) =>
    (a.calculated_price?.calculated_amount ?? Infinity) -
    (b.calculated_price?.calculated_amount ?? Infinity)
  )[0];

  const calculatedPrice = cheapestVariant?.calculated_price;
  const currencyCode = calculatedPrice?.currency_code;

  const isSale =
    calculatedPrice?.calculated_price?.price_list_type === "sale";

  const price =
    calculatedPrice?.calculated_amount != null
      ? formatPrice(calculatedPrice.calculated_amount, currencyCode)
      : "-";

  const originalPrice =
    isSale && calculatedPrice?.original_amount != null
      ? formatPrice(calculatedPrice.original_amount, currencyCode)
      : null;
      
  const image = product.thumbnail ?? product.images?.[0]?.url

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{product.title}</Text>
      <View style={{ flex: 1, flexDirection: 'row', gap: 5}}>
        {isSale && originalPrice && (
          <Text style={[styles.price, { textDecorationLine: 'line-through',  }]}>
            {originalPrice}
          </Text>
        )}
        <Text style={[styles.price, { color: isSale ? "red" : "black" } ]}>
          {price}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '48%', padding: 10, gap: 5, alignItems: 'flex-start', borderWidth: 1, borderColor: "#2b2b2b", marginVertical: 5 },
  image: { width: '100%', aspectRatio: 1},
  title: { fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace' },
  price: { fontSize: 11, fontFamily: 'monospace', color: "gray" },
})