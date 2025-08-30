import Banner from "@/components/Banner/Banner";
import BlogSection from "@/components/BlogSection/BlogSection";
import FAQ from "@/components/FAQ/FAQ";
import FlashSaleProducts from "@/components/FlashSaleProducts/FlashSaleProducts";
import PopularProducts from "@/components/PopularProducts/PopularProducts";
import Testimonials from "@/components/Testimonials/Testimonials";
import UserProduct from "@/components/UserProduct/UserProduct";

export default function Home() {
  return (
    <>
      <Banner/>
      <UserProduct/>
      <FlashSaleProducts/>
      <PopularProducts/>
      <FAQ/>
      <Testimonials/>
      <BlogSection/>
    </>
  );
}
