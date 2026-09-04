export type Lang = "en" | "hi"

export const translations = {
  en: {
    // Common
    appName: "SmartBazaar Seller",
    switchToHindi: "हिंदी",
    switchToEnglish: "English",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    cancel: "Cancel",
    loading: "Loading...",
    back: "Back",

    // Auth
    shopName: "Shop Name",
    phone: "Phone Number",
    city: "City / Area",
    password: "Password",
    signup: "Create Seller Account",
    login: "Login",
    alreadyHaveAccount: "Already have account?",
    noAccount: "New seller?",
    loginTitle: "Seller Login",
    signupTitle: "Become a Seller",

    // Dashboard
    dashboard: "Dashboard",
    todayOrders: "Today's Orders",
    yourProducts: "Your Products",
    earnings: "Earnings",
    addProduct: "Add Product",
    noOrders: "No orders today",
    noProducts: "No products yet",
    addFirstProduct: "Add your first product",

    // Product
    productName: "Product Name",
    price: "Selling Price (₹)",
    mrp: "MRP (optional)",
    stock: "Stock (pieces)",
    uploadPhoto: "Upload Photo",
    takePhoto: "Take Photo",
    next: "Next",
    previous: "Previous",
    submitProduct: "Save Product",
    outOfStock: "Out of Stock",
    increaseStock: "Increase Stock",
    decreaseStock: "Decrease Stock",

    // Earnings
    thisWeek: "This Week",
    totalSales: "Total Sales",
    commission: "Commission",
    payable: "Amount Payable",

    // Orders
    customer: "Customer",
    address: "Address",
    cod: "Cash on Delivery",
    orderReceived: "Order Received",
  },
  hi: {
    // Common
    appName: "स्मार्टबाज़ार सेलर",
    switchToHindi: "हिंदी",
    switchToEnglish: "English",
    save: "सेव करें",
    delete: "हटाएं",
    edit: "बदलें",
    cancel: "रद्द करें",
    loading: "लोड हो रहा है...",
    back: "वापस",

    // Auth
    shopName: "दुकान का नाम",
    phone: "फ़ोन नंबर",
    city: "शहर / इलाका",
    password: "पासवर्ड",
    signup: "सेलर अकाउंट बनाएं",
    login: "लॉगिन",
    alreadyHaveAccount: "पहले से अकाउंट है?",
    noAccount: "नए सेलर हैं?",
    loginTitle: "सेलर लॉगिन",
    signupTitle: "सेलर बनें",

    // Dashboard
    dashboard: "डैशबोर्ड",
    todayOrders: "आज के ऑर्डर",
    yourProducts: "आपका माल",
    earnings: "हिसाब",
    addProduct: "नया प्रोडक्ट जोड़ें",
    noOrders: "आज कोई ऑर्डर नहीं",
    noProducts: "अभी कोई प्रोडक्ट नहीं",
    addFirstProduct: "अपना पहला प्रोडक्ट जोड़ें",

    // Product
    productName: "प्रोडक्ट का नाम",
    price: "बेचने की कीमत (₹)",
    mrp: "MRP (optional)",
    stock: "स्टॉक (कितने पीस)",
    uploadPhoto: "फ़ोटो अपलोड करें",
    takePhoto: "कैमरा से फ़ोटो लें",
    next: "आगे",
    previous: "पीछे",
    submitProduct: "प्रोडक्ट सेव करें",
    outOfStock: "स्टॉक खत्म",
    increaseStock: "स्टॉक बढ़ाएं",
    decreaseStock: "स्टॉक घटाएं",

    // Earnings
    thisWeek: "इस हफ़्ते",
    totalSales: "कुल बिक्री",
    commission: "कमीशन",
    payable: "आपको मिलने वाली राशि",

    // Orders
    customer: "ग्राहक",
    address: "पता",
    cod: "कैश ऑन डिलीवरी",
    orderReceived: "ऑर्डर मिला",
  },
}

export type TranslationKey = keyof typeof translations.en
