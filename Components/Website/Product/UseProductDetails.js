"use client";
import { useState } from "react"
import { useParams } from 'next/navigation'
const UseProductDetails = () => {
    const { Slug } = useParams();
    const descriptionContent = `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-[#0055b8] mb-2">Nutrient-Rich Superfood</h3>
        <p>Our Premium Organic Quinoa Bowl is a nutrient-packed meal that combines the goodness of organic quinoa with fresh vegetables and our signature dressing.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-[#0055b8] mb-2">Health-Conscious Choice</h3>
        <p>This ready-to-eat meal is perfect for health-conscious individuals looking for a quick yet nutritious option. Each bowl is carefully prepared using locally sourced ingredients to ensure maximum freshness and flavor.</p>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold text-[#0055b8] mb-2">Balanced Nutrition</h3>
        <p>Our quinoa is rich in protein, fiber, and essential minerals, making it an excellent choice for a balanced diet. The combination of colorful vegetables adds vital vitamins and antioxidants to support your overall health.</p>
      </div>
    </div>
  `


    const ingredientsContent = `
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-[#0055b8] mb-3">Base Ingredients</h3>
      <ul class="space-y-2">
        <li class="flex items-start gap-2">
          <span class="text-[#0055b8] font-bold">•</span>
          <span><strong>Organic Quinoa:</strong> Sourced from sustainable farms</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[#0055b8] font-bold">•</span>
          <span><strong>Fresh Vegetables:</strong> Cherry tomatoes, cucumber, bell peppers, and avocado</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[#0055b8] font-bold">•</span>
          <span><strong>Protein:</strong> Grilled chicken (optional plant-based alternative available)</span>
        </li>
      </ul>
    </div>
    
    <div>
      <h3 class="text-lg font-semibold text-[#0055b8] mb-3">Dressing & Garnish</h3>
      <ul class="space-y-2">
        <li class="flex items-start gap-2">
          <span class="text-[#0055b8] font-bold">•</span>
          <span><strong>Dressing:</strong> Olive oil, lemon juice, herbs, and spices</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-[#0055b8] font-bold">•</span>
          <span><strong>Garnish:</strong> Fresh herbs and toasted seeds</span>
        </li>
      </ul>
    </div>
    
    <div class="border-l-4 border-amber-400 pl-4 py-2">
      <h3 class="text-amber-700 font-semibold mb-2">Allergen Information</h3>
      <p>All ingredients are non-GMO and preservative-free. Our products are prepared in a facility that may process nuts, dairy, and gluten.</p>
    </div>
  </div>
`


    const howToUseContent = `
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-[#0055b8] mb-4">Simple Preparation Steps</h3>
      <ol class="space-y-3 list-decimal pl-5">
        <li>
          <p class="font-medium">Remove the seal and take off the lid</p>
          <p class="text-sm text-gray-600">Carefully remove the protective seal to maintain freshness</p>
        </li>
        <li>
          <p class="font-medium">Let stand at room temperature (if refrigerated)</p>
          <p class="text-sm text-gray-600">Allow to stand for 5 minutes for optimal flavor</p>
        </li>
        <li>
          <p class="font-medium">Mix the contents thoroughly</p>
          <p class="text-sm text-gray-600">Distribute the dressing evenly throughout the bowl</p>
        </li>
        <li>
          <p class="font-medium">Heat if desired</p>
          <p class="text-sm text-gray-600">For a warm meal, microwave for 45 seconds (remove garnish packet first)</p>
        </li>
        <li>
          <p class="font-medium">Add garnish and enjoy</p>
          <p class="text-sm text-gray-600">Add the provided garnish packet contents before eating</p>
        </li>
      </ol>
    </div>
    
    <div class="border-l-4 border-[#39b9e6] pl-4 py-2">
      <h3 class="text-[#0055b8] font-semibold mb-2">Storage Instructions</h3>
      <p>Enjoy within 4 hours of opening or refrigerate for up to 24 hours. Do not freeze.</p>
    </div>
  </div>
`



    const [Rating, setRating] = useState(0);
    const [Comment, setComment] = useState("");
    const [Reviews, setReviews] = useState([]);
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const BreadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Shop", },
        { name: "Product Name" },
    ];


    const Product = {
        Media: {
            Images: [
                'https://img.drz.lazcdn.com/static/np/p/d3855852984beb492053962461a4e00f.png_400x400q75.png_.webp',
                'https://img.drz.lazcdn.com/static/np/p/e983ad3dd92378e03e4a5cbd4585b93d.png_400x400q75.png_.webp',
            ]
        }
    };


    const AddReview = async () => {
        // try {
        //     if (!isAuth) {
        //         router.push("/auth/login");
        //         return;
        //     }
        //     if (Rating == 0 || Comment == "") {
        //         ShowNotification('Please rate the product', { variant: 'error' });
        //         return;
        //     }
        //     const response = await axios.post('api/product/review/add', { UserID, ProductID: Product._id, Rating, Comment });
        //     if (response.status == 201) {
        //         GetReviews();
        //         setRating(0);
        //         setComment("");
        //         ShowNotification('Success! Review added', { variant: 'success' });
        //     }
        // } catch (error) {
        //     if (error.status == 400) {
        //         ShowNotification('Review allowed only once!', { variant: 'error' });
        //     } else {
        //         ShowNotification('Something went wrong', { variant: 'error' });
        //     }
        // }
    }
    return {
        descriptionContent, ingredientsContent, howToUseContent, BreadcrumbItems, Product, thumbsSwiper, setThumbsSwiper, AddReview, Rating, setRating, Comment, setComment, Reviews
    }
}

export default UseProductDetails;