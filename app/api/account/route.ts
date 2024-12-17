// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";
// import { Account } from "../../types/account";

// // Path to the local data file
// const dataPath = path.join(process.cwd(), "data", "account.json");

// // Helper functions to read and write account data
// const readAccounts = (): Account[] => {
//   if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
//   const data = fs.readFileSync(dataPath, "utf-8");
//   return JSON.parse(data || "[]");
// };

// const writeAccounts = (accounts: Account[]) => {
//   fs.writeFileSync(dataPath, JSON.stringify(accounts, null, 2));
// };

// // Handle GET request
// export async function GET(req: Request) {
//   const url = new URL(req.url);
//   const email = url.searchParams.get("email");
//   const accounts = readAccounts();

//   if (email) {
//     const account = accounts.find((acc) => acc.email === email);
//     if (account) {
//       return NextResponse.json(account);
//     }
//     return NextResponse.json({ error: "Account not found" }, { status: 404 });
//   }

//   return NextResponse.json(accounts);
// }

// // Handle POST request (Signup)
// export async function POST(req: Request) {
//   const accounts = readAccounts();
//   const { name, email, password, isgoogle } = await req.json();

//   if (!name || !email || (!password && !isgoogle)) {
//     return NextResponse.json(
//       { error: "Name, email, and password are required" },
//       { status: 400 }
//     );
//   }

//   const existingAccount = accounts.find((acc) => acc.email === email);
//   if (existingAccount) {
//     return NextResponse.json({ error: "Email already exists" }, { status: 400 });
//   }

//   const newAccount: Account = {
//     id: `acc-${Date.now()}`,
//     name,
//     email,
//     password,
//     phone: "",
//     address: "",
//     cart: [],
//     wishlist: [],
//     orders: [],
//     reviews: [],
//     createdAt: new Date().toISOString(),
//     isActive: true,
//   };

//   accounts.push(newAccount);
//   writeAccounts(accounts);

//   return NextResponse.json(newAccount, { status: 201 });
// }

// // Handle PUT request (Login)
// export async function PUT(req: Request) {
//   const accounts = readAccounts();
//   const { email, password, isgoogle } = await req.json();

//   if (!email || (!password && !isgoogle)) {
//     return NextResponse.json(
//       { error: "Email and password are required" },
//       { status: 400 }
//     );
//   }

//   const account = accounts.find(
//     (acc) => acc.email === email && (acc.password === password || isgoogle)
//   );

//   if (account) {
//     return NextResponse.json(account);
//   }

//   return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
// }

// // Handle PATCH request (Update account)
// export async function PATCH(req: Request) {
//   const accounts = readAccounts();
//   const { email, updates } = await req.json();
// console.log(updates)
//   if (!email || !updates) {
//     return NextResponse.json(
//       { error: "Email and updates are required" },
//       { status: 400 }
//     );
//   }

//   const accountIndex = accounts.findIndex((acc) => acc.email === email);

//   if (accountIndex === -1) {
//     return NextResponse.json({ error: "Account not found" }, { status: 404 });
//   }

//   // Update the account with the new data
//   accounts[accountIndex] = {
//     ...accounts[accountIndex],
//     ...updates,
//     updatedAt: new Date().toISOString(), // Optionally track updates
//   };

//   writeAccounts(accounts);

//   return NextResponse.json(accounts[accountIndex]);
// }
import { CartItem, Order, Review, WishlistItem } from "@/app/types/account";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      email,
      phone='',
      address='',
      cart=[],
      wishlist=[],
      orders=[],
      reviews=[],
      isActive,
      isgoogle=false,
      password,
    } = body;
console.log(body)
    if (!id) return new NextResponse("ID is required", { status: 400 });

    // Ensure the account exists
    const existingAccount = await prismadb.account.findUnique({
      where: { id },
      include: {
        cart: true,
        wishlist: true,
        orders: true,
        reviews: true,
      },
    });

    if (!existingAccount) {
      return  NextResponse.json("Account not found", { status: 404 });
    }

    // Update account fields
    const accountData = {
      name,
      email,
      phone,
      address,
      isActive,
      isgoogle,
      password,
    };

    // Handle nested cart updates
    if(cart.length>0){

      const cartUpdates = cart.map((item: CartItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sizes: item.sizes,
        colors: item.colors,
      }));
  
      // Delete existing cart items and re-create (simpler than partial updates)
      await prismadb.cartItem.deleteMany({
        where: { accountId: id },
      });
      await prismadb.cartItem.createMany({
        data: cartUpdates.map((item:CartItem) => ({
          ...item,
          accountId: id,
        })),
      });
    }

    // Handle nested wishlist updates
    const wishlistUpdates = wishlist.map((item: WishlistItem) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      addedAt: new Date(item.addedAt || Date.now()),
    }));

    // Delete existing wishlist items and re-create
    await prismadb.wishlistItem.deleteMany({
      where: { accountId: id },
    });
    wishlistUpdates.length> 0 && await prismadb.wishlistItem.createMany({
      data: wishlistUpdates.map((item:WishlistItem) => ({
        ...item,
        accountId: id,
      })),
    });

    // Handle nested orders updates
    const orderUpdates = orders.map((item: Order) => ({
      id: item.id,
      orderId: item.orderId,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      total: item.total,
      discountPercentage: item.discountPercentage,
      status: item.status,
      isCancellable: item.isCancellable,
      placedAt: new Date(item.placedAt),
    }));

    // Delete existing orders and re-create
   await prismadb.order.deleteMany({
      where: { accountId: id },
    });
    orderUpdates.length> 0 && await prismadb.order.createMany({
      data: orderUpdates.map((item:Order) => ({
        ...item,
        accountId: id,
      })),
    });

    // Handle nested reviews updates
    const reviewUpdates = reviews.map((item: Review) => ({
      id: item.id,
      title: item.title,
      rating: item.rating,
      image: item.image,
      reviewedAt: new Date(item.reviewedAt || Date.now()),
    }));

    // Delete existing reviews and re-create
    await prismadb.review.deleteMany({
      where: { accountId: id },
    });
    reviewUpdates.length> 0 && await prismadb.review.createMany({
      data: reviewUpdates.map((item:Review) => ({
        ...item,
        accountId: id,
      })),
    });

    // Update the account in the database
    const updatedAccount = await prismadb.account.update({
      where: { id },
      data: accountData,
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, email, phone = '', address = '', 
      cart = [], wishlist = [], orders = [], reviews = [], 
      isgoogle = false, password 
    } = body;

    if (!email) return  NextResponse.json({error:"Email is required"}, { status: 400 });
    const accountExist = await prismadb.account.findUnique({
      where: { email },
    });
    if (accountExist) return NextResponse.json({error:"Email already exist"}, { status: 400 });
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

    const wishlistItems = Array.isArray(wishlist)
      ? wishlist.filter(item => item && item.id).map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          addedAt: new Date(),
        }))
      : [];

    const orderItems = Array.isArray(orders)
      ? orders.filter(item => item && item.id).map(item => ({
          id: item.id,
          orderId: item.orderId,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          total: item.price * item.quantity,
          discountPercentage: item.discountPercentage || 0,
          status: item.status,
          isCancellable: item.isCancellable,
          placedAt: item.placedAt ? new Date(item.placedAt) :new Date(),
        }))
      : [];

    const reviewItems = Array.isArray(reviews)
      ? reviews.filter(item => item && item.id).map(item => ({
          id: item.id,
          title: item.title,
          rating: item.rating,
          image: item.image,
          reviewedAt:item?.reviewedAt ? new Date(item?.reviewedAt):new Date(),
        }))
      : [];

    console.log("Validated Data:", { cartItems, wishlistItems, orderItems, reviewItems });

    // Prisma account creation
    const account = await prismadb.account.create({
      data: {
        name,
        email,
        phone,
        address,
        isgoogle,
        password,
        ...(cartItems.length > 0 && { cart: { create: cartItems } }),
        ...(wishlistItems.length > 0 && { wishlist: { create: wishlistItems } }),
        ...(orderItems.length > 0 && { orders: { create: orderItems } }),
        ...(reviewItems.length > 0 && { reviews: { create: reviewItems } }),
      },
    });

    return NextResponse.json(account);
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json({error:"Internal Server Error"}, { status: 500 });
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
        wishlist: true,
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
      cart: account.cart.map((item:CartItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        sizes: item.sizes,
        colors: item.colors,
      })),

      wishlist: account.wishlist.map((item:WishlistItem) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        addedAt: item.addedAt,
      })),
      orders: account.orders.map((item:Order) => ({
        id: item.id,
        orderId: item.orderId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        total: item.total,
        discountPercentage: item.discountPercentage,
        status: item.status,
        isCancellable: item.isCancellable,
        placedAt: item.placedAt,
      })),
      reviews: account.reviews.map((item:Review) => ({
        id: item.id,
        title: item.title,
        rating: item.rating,
        image: item.image,
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