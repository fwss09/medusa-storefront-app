import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListItem from "./components/ListItem";
import sdk from "./lib/sdk";

export default function Index() {
  const [products, setProducts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    fetchProducts()
  }, [])
  const fetchProducts = async () => {
    try {
      const { regions } = await sdk.store.region.list();
      const region = regions[0];
  
      const { products } = await sdk.store.product.list({
        fields: `*variants.calculated_price`,
        region_id: region.id,
      });
  
      setProducts(products);
    } catch (e) {
      console.log('error loading products', e);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {!products.length ? (
        <Text style={{fontSize: 16, fontWeight: '700', textAlign: 'center', fontFamily: 'monospace', marginTop: 20}}>loading...</Text>
      ) : (
        <FlatList data={products} keyExtractor={(item) => item.id} renderItem={({ item }) => <ListItem product={item} />} 
          contentContainerStyle={styles.list} 
          showsVerticalScrollIndicator={false} 
          numColumns={2} 
          columnWrapperStyle={{ justifyContent: 'space-between' }}

          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, },
  list: { padding: 10, },
})