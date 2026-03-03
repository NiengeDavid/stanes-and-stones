import HeaderClient from "@/components/header/header-client";
import { fetchSanitySettings, fetchSanityNavigation } from "@/sanity/lib/fetch";

export default async function Header() {
  const settings = await fetchSanitySettings();
  const navigation = await fetchSanityNavigation();

  return <HeaderClient settings={settings} navigation={navigation} />;
}