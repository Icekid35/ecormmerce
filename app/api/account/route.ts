import { CartItem, Order, Review } from "@/app/types/account";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  const {
    id,
    name,
    email,
    phone = '',
    address = '',
    cart = [],
    wishlist = [],
    orders = [],
    reviews = [],
    isActive,
    isgoogle = false,
    password,
  } = body;
  console.log(body)
  if (!id) return new NextResponse("ID is required", { status: 400 });
  try {

    // Ensure the account exists
    const existingAccount = await prismadb.account.findUnique({
      where: { id },
      // include: {
      //   cart: true,
      //   orders: true,
      //   reviews: true,
      // },
    });

    if (!existingAccount) {
      return NextResponse.json("Account not found", { status: 404 });
    }

    // Handle nested cart updates
  // Delete existing cart items and re-create (simpler than partial updates)
  await prismadb.cartItem.deleteMany({
    where: { accountId: id },
  });
  const cartUpdates = cart.map((item: CartItem) => ({
    id: item.id,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    image: item.image,
    sizes: item.sizes?.filter?.(i=>i!="")||[],
    colors: item.colors?.filter?.(i=>i!="")||[],
  }));
//       if (cart.length > 0) {

//       // console.log("running...")
// try{
// // console.log(cartUpdates)

//   // console.log("first passed")
//   try{

//     await prismadb.cartItem.createMany({
//       data: cartUpdates.map((item: CartItem) => ({
//         ...item,
//         accountId: id,
//       })),
//     });
//   }catch(error){
//     console.log(error)
//   }
//   // console.log("passed second")
// }catch(err){
//   console.log("error from cart",err)
//   return NextResponse.json(updatedAccount);

// }
// }
// await prismadb.wishlistItem.deleteMany({
//   where: { accountId: id },
// });
// const wishlistUpdates = wishlist.map((item: Product) => ({
//   id: item.id,
//   title: item.title,
//   price: item.price,
//   image: item.images[0],
//   addedAt: new Date(Date.now()),
// }));
    // if (wishlist.length > 0) {
    //   // Handle nested wishlist updates
    //   try {
    //     await updatewishlists(wishlist, id);
    //   } catch (error) {
    //    console.log("error from wishlists",error) 
    //   }
    // }
    await prismadb.order.deleteMany({
      where: { accountId: id },
    });
    const orderUpdates = orders.map((item: Order) => ({
      id: item.id,
      productId: item.productId,
      orderId: item.orderId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      total: item.total,
      discountPercentage: item.discountPercentage,
      sizes:item.sizes,
      colors:item.colors,
      status: item.status,
      isCancellable: item.isCancellable,
      placedAt: new Date(item.placedAt),
    }));
    // if (orders.length > 0) {
    //   // Handle nested orders updates
    //   try {
        
    //     await updateorders(orders, id);
    //   } catch (error) {
    //     console.log("order error: ",error)
    //   }
    // }
    await prismadb.review.deleteMany({
      where: { accountId: id },
    });
    const reviewUpdates = reviews.map((item: Review) => ({
      id: item.id,
      title: item.title,
      rating: item.rating || undefined,
      image: item.image,
  productId :item.productId,

      reviewedAt: new Date(item.reviewedAt || Date.now()),
    }));
//        if (reviews.length > 0) {
//       // Handle nested reviews updates
// try {
//         await updatereview(reviews, id);
// } catch (error) {
//   console.log("error from review",error)
// }
//     }
    // Update the account in the database
    // const updatedAccount = await prismadb.account.update({
    //   where: { id },
    //   data: accountData,
    //   include: {
    //     cart: true,
    //     wishlist: true,
    //     orders: true,
    //     reviews: true,
    //   },
    // });
    
    // Update account fields
    const accountData = {
      name,
      email,
      phone,
      address,
      isActive,
      isgoogle,
      password,
      wishlist,
      ...(cartUpdates.length > 0 && { cart: { create: cartUpdates } }),
      // ...(wishlistUpdates.length > 0 && { wishlist: { create: wishlistUpdates } }),
      ...(orderUpdates.length > 0 && { orders: { create: orderUpdates } }),
      ...(reviewUpdates.length > 0 && { reviews: { create: reviewUpdates } }),
    };
    const updatedAccount = await prismadb.account.update({
      where: { id },
      data: accountData,
      include: {
        cart: true,
        // wishlist: true,
        orders: true,
        reviews: true,
      },
    });
    // console.log("updated ",updatedAccount)
    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error(error);
    return NextResponse.json({body}, { status: 201 });
  }

//   async function updatereview(reviews: any, id: any) {
//     const reviewUpdates = reviews.map((item: Review) => ({
//       id: item.id,
//       title: item.title,
//       rating: item.rating || undefined,
//       image: item.image,
//       reviewedAt: new Date(item.reviewedAt || Date.now()),
//     }));

//     await prismadb.review.createMany({
//       data: reviewUpdates.map((item: Review) => ({
//         ...item,
//         accountId: id,
//       })),
//     });
//   }

//   async function updatewishlists(wishlist: any, id: any) {
//     const wishlistUpdates = wishlist.map((item: WishlistItem) => ({
//       id: item.id,
//       title: item.title,
//       price: item.price,
//       image: item.image,
//       addedAt: new Date(item.addedAt || Date.now()),
//     }));

//     // Delete existing wishlist items and re-create
//    try {

//      await prismadb.wishlistItem.createMany({
//        data: wishlistUpdates.map((item: WishlistItem) => ({
//          ...item,
//          accountId: id,
//        })),
//      });
//    } catch (error) {
//     console.log("error from wishlist",error)
//    }
//   }

//   async function updateorders(orders: any, id: any) {
//     const orderUpdates = orders.map((item: Order) => ({
//       id: item.id,
//       orderId: item.orderId,
//       title: item.title,
//       price: item.price,
//       quantity: item.quantity,
//       image: item.image,
//       total: item.total,
//       discountPercentage: item.discountPercentage,
//       sizes:item.sizes,
//       colors:item.colors,
//       status: item.status,
//       isCancellable: item.isCancellable,
//       placedAt: new Date(item.placedAt),
//     }));
//     // Delete existing orders and re-create
//  try {

//      await prismadb.order.createMany({
//        data: orderUpdates.map((item: Order) => ({
//          ...item,
//          accountId: id,
//        })),
//      });
//  } catch (error) {
//   console.log("error from orders",error)
  
//  }
//   }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name, email, phone = '', address = '',
      cart = [], wishlist = [], orders = [], reviews = [],
      isgoogle = false, password
    } = body;

    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    const accountExist = await prismadb.account.findUnique({
      where: { email },
    });
    if (accountExist) return NextResponse.json({ error: "Email already exist" }, { status: 400 });
    // Transform and validate data
    const cartItems = Array.isArray(cart)
      ? cart.filter(item => item && item.id).map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sizes: item.sizes,
        colors: item.colors,
      }))
      : [];

    // const wishlistItems = Array.isArray(wishlist)
    //   ? wishlist.filter(item => item && item.id).map(item => ({
    //     id: item.id,
    //     title: item.title,
    //     price: item.price,
    //     image: item.image,
    //     addedAt: new Date(),
    //   }))
    //   : [];

    const orderItems = Array.isArray(orders)
      ? orders.filter(item => item && item.id).map(item => ({
        id: item.id,
        productId: item.id,
        orderId: item.orderId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        colors: item.colors,
        sizes: item.sizes,
        image: item.image,
        total: item.price * item.quantity,
        discountPercentage: item.discountPercentage || 0,
        status: item.status,
        isCancellable: item.isCancellable,
        placedAt: item.placedAt ? new Date(item.placedAt) : new Date(),
      }))
      : [];

    const reviewItems = Array.isArray(reviews)
      ? reviews.filter(item => item && item.id).map(item => ({
        id: item.id,
        title: item.title,
        rating: item.rating,
        image: item.image,
        productId:item.productId,
        reviewedAt: item?.reviewedAt ? new Date(item?.reviewedAt) : new Date(),
      }))
      : [];

    console.log("Validated Data:", { cartItems,  orderItems, reviewItems });

    // Prisma account creation
    const account = await prismadb.account.create({
      data: {
        name,
        email,
        phone,
        address,
        isgoogle,
        password,
        wishlist,
        ...(cartItems.length > 0 && { cart: { create: cartItems } }),
        // ...(wishlistItems.length > 0 && { wishlist: { create: wishlistItems } }),
        ...(orderItems.length > 0 && { orders: { create: orderItems } }),
        ...(reviewItems.length > 0 && { reviews: { create: reviewItems } }),
      },
      include:{cart:true,orders:true,reviews:true,}
    });

    return NextResponse.json(account);
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// GET: Fetch Account with transformed format
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log(id)
    if (!id) return new NextResponse("ID is required", { status: 400 });

    // Fetch account with relations
    const account = await prismadb.account.findUnique({
      where: { id },
      include: {
        cart: true,
        orders: true,
        reviews: true,
      },
    });

    if (!account) return new NextResponse("Account not found", { status: 404 });

    // Transform schema format back to original object format
    const transformedAccount = {
      id: account.id,
      name: account.name,
      email: account.email,
      phone: account.phone,
      address: account.address,
      isActive: account.isActive,
      isgoogle: account.isgoogle,
      password: account.password,
      createdAt: account.createdAt,
      wishlist: account?.wishlist,
      cart: account.cart.map((item: CartItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sizes: item.sizes,
        colors: item.colors,
      })),

      // wishlist: account.wishlist.map((item: WishlistItem) => ({
      //   id: item.id,
      //   title: item.title,
      //   price: item.price,
      //   image: item.image,
      //   addedAt: item.addedAt,
      // })),
      orders: account.orders.map((item: Order) => ({
        id: item.id,
        productId: item.productId,
        orderId: item.orderId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        colors:item.colors,
        sizes:item.sizes,
        total: item.total,
        discountPercentage: item.discountPercentage,
        status: item.status,
        isCancellable: item.isCancellable,
        placedAt: item.placedAt,
      })),
      reviews: account.reviews.map((item: Review) => ({
        id: item.id,
        title: item.title,
        rating: item.rating,
        image: item.image,
        productId: item.productId,
        reviewedAt: item.reviewedAt,
      })),
    };

    return NextResponse.json(transformedAccount);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PUT(req: Request) {
  try {
    const { email, password, isgoogle } = await req.json();

    if (!email || (!password && !isgoogle)) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find the account by email
    const account = await prismadb.account.findUnique({
      where: { email },
      include:{cart:true,orders:true,reviews:true,}
    });

    // Validate account existence and credentials
    if (
      account &&
      (account.password === password || (isgoogle && account.isgoogle))
    ) {
      return NextResponse.json(account);
    }

    // Invalid credentials
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}