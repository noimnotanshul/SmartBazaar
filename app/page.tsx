import { HeroCarousel } from "@/components/home/hero-carousel"
import { CategoryTabs } from "@/components/home/category-tabs"
import { FeaturedProducts } from "@/components/home/featured-products"
import { GamificationWidget } from "@/components/gamification/gamification-widget"

export default function HomePage() {
  return (
    <div>
      <HeroCarousel />
      <GamificationWidget />
      <CategoryTabs />
      <FeaturedProducts />
    </div>
  )
}
