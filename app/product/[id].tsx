import { StoreProduct } from '@medusajs/types';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import sdk, { formatPrice } from '../lib/sdk';


  const { width } = Dimensions.get('window');

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<StoreProduct>();
  useEffect(() => {
    const fetchProduct = async () => {
      const { regions } = await sdk.store.region.list();
      const region = regions[0];
  
      const { product } = await sdk.store.product.retrieve(`${id}`, {
        fields: `*variants.calculated_price`,
        region_id: region.id,
      });
  
      setProduct(product);
    };
  
    fetchProduct();
  }, []);

  if (!product) return (
    <>
      <Stack.Screen  options={{ 
        title: '  ',
        headerTitleAlign: 'center',
         
      }} />
      <ActivityIndicator size={32} color={'black'} style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} />
    </>
  );

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
      ? formatPrice(calculatedPrice.calculated_amount, currencyCode ?? 'usd')
      : "-";

  const originalPrice =
    isSale && calculatedPrice?.original_amount != null
      ? formatPrice(calculatedPrice.original_amount, currencyCode ?? 'usd')
      : null;

  const images = product.images && product.images.length > 0
    ? product.images
    : product.thumbnail
      ? [{ url: product.thumbnail }]
      : [];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{
        title: product.title,
        headerTitleAlign: 'center',
      }} />
      
      <FlatList
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 20 }}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />

      <View style={{paddingHorizontal: 10}}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <View style={{ flexDirection: 'row', gap: 5}}>
          {isSale && originalPrice && (
            <Text style={[styles.price, { textDecorationLine: 'line-through',  }]}>
              {originalPrice}
            </Text>
          )}
          <Text style={[styles.price, { color: isSale ? "red" : "black" } ]}>
            {price}
          </Text>
        </View>
        
        <TouchableOpacity onPress={() => {
          alert(`product "${product.title}" added to cart`)
        }} activeOpacity={0.6} style={[styles.baseButton, { marginVertical: 20 }]}>
          <Text style={styles.btnText}>ДОДАТИ В КОШИК</Text>
        </TouchableOpacity>
        {product.description ? (
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 22, fontWeight: 700, fontFamily: 'monospace'}}>Опис</Text>
            <Text>{product.description}</Text>
          </View>
        ) : ''}
        {product.material ? (
          <View>
            <Text style={{fontSize: 22, fontWeight: 700, fontFamily: 'monospace'}}>Характеристика</Text>
            <Text>Матеріал --- {product.material}</Text>
            <Text>Висота --- {product.height}мм</Text>
            <Text>Ширина --- {product.width}мм</Text>
            <Text>Довжина --- {product.length}мм</Text>
            <Text>Вага --- {product.weight}г</Text>
          </View>
        ) : ''}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  productTitle: { fontSize: 18, fontFamily: 'sans-serif', fontWeight: '800', textTransform: 'uppercase' },
  image: { width: width - 20, aspectRatio: 1 },
  price: { fontSize: 14, fontFamily: 'monospace', color: "gray" },
  baseButton: { backgroundColor: 'white', paddingVertical: 10, alignItems: 'center', borderWidth: 0.9 },
  btnText: { color: 'black', fontSize: 14, fontFamily: 'monospace'},
})