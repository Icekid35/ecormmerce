"use client"
import React, { useState, useEffect, } from "react";
// import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft,faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { CardHolder} from "../components/CardHolder";
import ProductCard from "../components/ProductCard";
import { Product } from "../types/product";
import getProducts from "../controller/products";
// import Title from "../components/Title";
// import Seo from "../components/Seo";
// import { DataContext } from "../context/State";

const productsPerPage = 30;

interface sidebar {
    // priceRange?: number,
    // setPriceRange?: (arg0: number) => void,
    activeCategory: string,
    filterByCategory: (arg0: string) => void,
    shopProducts: Product[]
    ,
    categories: string[],
    mobile?:boolean
}
const SideBar: React.FC<sidebar> = ({ mobile,  activeCategory, filterByCategory, shopProducts, categories }) => {
    return (

        <div className={`${!mobile &&" col-span-1 hidden"} md:block bg-white w-full text-sm border-2 rounded-md shadow-md`}>
            <div>
                {/* <h2 className="text-lg font-bold mb-4">Search Products</h2> */}
                {/* <div className="flex items-center bg-gray-100 p-2 rounded">
                 <input
                   type="text"
                   placeholder="Search products"
                   ref={searchRef}
                   className="flex-grow bg-transparent outline-none"
                 />
                 <button onClick={searchProducts}>
                   <FontAwesomeIcon icon={faSearch} />
                 </button>
               </div> */}
            </div>

            {/* Price Range
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Filter by Price</h2>
                <input
                    type="range"
                    min={1}
                    max={1000}
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full"
                />
                <p className="text-sm mt-2">
                    Price: <FontAwesomeIcon icon={faNairaSign} />{priceRange} - <FontAwesomeIcon icon={faNairaSign} />1000
                </p>
            </div> */}

            {/* Categories */}
            <div className="mt-4">
                <h2 className="text-lg font-bold mb-4 p-4 pb-0">Hot</h2>
                <ul className="flex flex-col gap-2  text-sm">
                    <li
                        className={`cursor-pointer   w-full pl-5   ${activeCategory === "discounts" && "font-semibold bg-slate-50 border"}`}
                        onClick={() => filterByCategory("discounts")}
                    >
                       Discounts <span className="text-xs italic text-opacity-80">({shopProducts.filter((p) => p.discountPrice).length})</span>
                    </li>
                  
                    <li
                        className={`cursor-pointer   w-full pl-5   ${activeCategory === "newarrival" && "font-semibold bg-slate-50 border"}`}
                        onClick={() => filterByCategory("newarrival")}
                    >
                       New Arrivals <span className="text-xs italic text-opacity-80">({shopProducts.filter((p) => p.isNewArrival).length})</span>
                    </li>
                    <li
                        className={`cursor-pointer   w-full pl-5   ${activeCategory === "featured" && "font-semibold bg-slate-50 border"}`}
                        onClick={() => filterByCategory("featured")}
                    >
                       Featured prooducts <span className="text-xs italic text-opacity-80">({shopProducts.filter((p) => p.isFeatured).length})</span>
                    </li>
                  
                </ul>
            </div>
            <div className="mt-2">
                <h2 className="text-lg font-bold mb-4 p-4 pb-0">Categories</h2>
                <ul className="flex flex-col gap-2  ">
                    <li
                        className={`cursor-pointer   w-full pl-5   ${activeCategory === "all" && "font-semibold bg-slate-50 border"}`}
                        onClick={() => filterByCategory("all")}
                    >
                        All Categories <span className="text-xs italic text-opacity-80 ">({shopProducts.length}) </span>
                    </li>
                    {categories.map((cat, idx) => (
                        <li
                            key={idx}
                            className={`cursor-pointer w-full pl-5   ${activeCategory === cat && "font-semibold bg-slate-50 border"}`}
                            onClick={() => filterByCategory(cat)}
                        >
                            {cat} <span className="text-xs italic text-opacity-80">({shopProducts.filter((p) => p.category === cat).length})</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Colors
            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4">Colors</h2>
                <div className="flex gap-2">
                    {colors.map((color) => (
                        <span
                            key={color}
                            title={color}
                            style={{
                                backgroundColor: color,
                                border: selectedColor === color ? "2px solid black" : "2px solid transparent",
                            }}
                            className="w-6 h-6 rounded-full cursor-pointer"
                            onClick={() => setSelectedColor(color)}
                        ></span>
                    ))}
                </div>
            </div> */}
        </div>

    )
}





const shopProducts =await getProducts()
let once=false
let prev=""
interface shop {categoryId?:string,productname?:string}

const Shop:React.FC<shop>=({categoryId,productname=""})=> {
    //   const { state } = useContext(DataContext);
    //   const { shopProducts }: { shopProducts: Product[] } = state;

    const [products, setProducts] = useState<Product[]>(shopProducts);
    // const [displayProducts, setDisplayProducts] = useState<Product[]>(shopProducts);
    const [data, setData] = useState<Product[]>([]);
    const [batch, setBatch] = useState(1);
    const [maxbatch, setmaxBatch] = useState(products.length % productsPerPage <=0 ? Math.floor(products.length/productsPerPage): Math.floor(products.length/productsPerPage) + 1);
    // const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [categories] = useState<string[]>(Array.from(new Set(shopProducts.map((p) => p.category))).sort());
    const [sortType, setSortType] = useState("default");
    // const [listMode, setListMode] = useState(false);
    // const [priceRange, setPriceRange] = useState(1);
    // const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    // const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
    // const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const newdata =[...products].slice((batch - 1) * productsPerPage,((products.length < (productsPerPage * batch) )) ? (productsPerPage * (batch - 1)) + ((products.length) % productsPerPage)  : productsPerPage * batch)
        setData(newdata)
        }, [products,batch]);

    // const searchProducts = () => {
    //     setSearchTerm(searchRef.current?.value || "");
    // };

    const filterByCategory = (category: string) => {
        const filter=(pro:Product,cat:string)=>{
            if(cat=="discounts") return pro.discountPrice
            if(cat=="newarrival") return pro.isNewArrival
            if(cat=="featured") return pro.isFeatured
            return pro.category == cat
        }
        const filtered = category === "all" ? shopProducts : shopProducts.filter((p) =>filter(p,category));
        setProducts(filtered);
        setActiveCategory(category);
        handleSort(sortType,filtered)
    };

    const handleSort = (type: string,filtered?:Product[]) => {
        const sortedProducts =filtered ||  [...products];
        switch (type) {
            case "price-asc":
                sortedProducts.sort((a:Product, b:Product) => (a.discountPrice ? Math.round(a.price-((a.discountPrice/100)*a.price)):a.price) - (b.discountPrice ? Math.round(b.price-((b.discountPrice/100)*b.price)):b.price));
                break;
            case "price-desc":
                sortedProducts.sort((a:Product, b:Product) =>(b.discountPrice ? Math.round(b.price-((b.discountPrice/100)*b.price)):b.price) - (a.discountPrice ? Math.round(a.price-((a.discountPrice/100)*a.price)):a.price));
                break;
            case "a-z":
                sortedProducts.sort((a:Product, b:Product) => a.title.localeCompare(b.title));
                break;
            case "newest":
                sortedProducts.sort((a:Product, b:Product) => new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime());
                break;
            default:
                break;
        }
        setProducts(sortedProducts);
        setSortType(type);
        setBatch(1);

setmaxBatch(sortedProducts.length % productsPerPage <=0 ? Math.floor(sortedProducts.length/productsPerPage): Math.floor(sortedProducts.length/productsPerPage) + 1)
    };
if(!once){
    once=true
    if(categoryId)return filterByCategory(categoryId)
      
}
if(productname !=prev){
    // alert(productname)
    prev=productname
    const newp=shopProducts.filter(pro=>pro.title.toLowerCase().includes(productname?.replaceAll("%20"," ").toLowerCase()))
    // alert(newp.length)
 setProducts(newp)
} 
    const nextBatch = () => {
        if (batch > maxbatch) return;
        setBatch(batch + 1);
    };

    const prevBatch = () => {
        if (batch === 1) return;
        setBatch(batch - 1);
    };

    return (
        <>
            {/* <Seo title="Shop" />
      <Title name="Shop" link="HOME /SHOP" /> */}
            <div className="grid text-xs md:text-base md:grid-cols-5 gap-4 mt-12 mb-8 md:px-12 justify-center">
                <SideBar activeCategory={activeCategory} categories={categories} filterByCategory={filterByCategory}  shopProducts={shopProducts} />
                {/* Product Listing */}
                <div className="md:col-span-4 bg-white border-2 md:p-4 p-1 rounded shadow-xl w-[98vw]">
                    <div className="flex justify-between items-center mb-6">
                        <p className="font-semibold capitalize">
                            {activeCategory}<span className="text-[10px] opacity-80 italic">({products.length} Products availaible)</span>
                        </p>
                        <select onChange={(e) => handleSort(e.target.value)} value={sortType} className="border-2 p-2 rounded-md">
                            <option value="default">Default</option>
                            <option value="price-asc">Price Ascending</option>
                            <option value="price-desc">Price Descending</option>
                            <option value="a-z">A-Z</option>
                            <option value="newest">Newest</option>
                        </select>

                    </div>
                    <div>

                        <CardHolder>
                            {data.length>0 ?
                            data.map((product) => (
                                // <Card dispatch={() => { }} key={product.id} product={product} selectedColor={selectedColor} selectedSize={selectedSize} />
                                <ProductCard key={product.id} product={product} />
                            )): <div className="text-3xl font-semibold capitalize text-center">No Product Available</div>}
                        </CardHolder>

                    </div>
                    <div className="flex justify-between mt-8 aria-hidden:hidden" aria-hidden={products.length<productsPerPage}>
                        <button onClick={prevBatch} disabled={batch === 1} className="bg-slate-800 text-white p-2 rounded disabled:bg-gray-500 hover:scale-105">
                            <FontAwesomeIcon icon={faArrowLeft} /> Previous
                        </button>
                        <div>
                            (Page <span>{batch}</span> of <span>{maxbatch}</span>)
                        </div>
                        <button onClick={nextBatch} disabled={batch>=maxbatch} className="hover:scale-105 disabled:bg-gray-500 bg-slate-800 text-white p-2 rounded">
                        Next <FontAwesomeIcon icon={faArrowRight} />  
                        </button>
                    </div>
                </div>
                <SideBar mobile activeCategory={activeCategory} categories={categories} filterByCategory={filterByCategory}  shopProducts={shopProducts} />

            </div>
        </>
    );
}
export default Shop