import Medusa from "@medusajs/js-sdk";

export const sdk = new Medusa({
  baseUrl: process.env.EXPO_PUBLIC_MEDUSA_BACKEND_URL!,
  publishableKey: process.env.EXPO_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY,
})

export const formatPrice = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
    }).format(amount);
};

export default sdk;