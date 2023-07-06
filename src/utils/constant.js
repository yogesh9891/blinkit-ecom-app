export const rolesObj = {
    ADMIN: "ADMIN",
    SUBADMIN: "SUBADMIN",
    USER: "USER",
    SELLER: "SELLER",
    WAREHOUSE: "WAREHOUSE",
    STORE: "STORE",
    OFFLINESTORE: "OFFLINESTORE",
    DELIVERY: "DELIVERY",
    DELIVERYTEAM: "DELIVERYTEAM",
  };
  
  export const ErrorMessages = {
    EMAIL_EXISTS: "Email already exists",
    PHONE_EXISTS: "Phone number already exists",
    EMAIL_NOT_EXISTS: "Email not exists",
    PHONE_NOT_EXISTS: "Phone number not exists",
    INVALID_EMAIL: "Invalid email",
    INVALID_PASSWORD: "Invalid password",
    INVALID_PHONE: "Invalid phone number",
    INVALID_USER: "Invalid user",
    INVALID_TOKEN: "Invalid token",
    INVALID_ROLE: "Invalid ROLE ",
    INVALID_PERMISSIONN: "Invalid PERMISSION",
    COMPANY_EXISTS: "company already exists",
    VAT_EXISTS: "VAT already exists",
    TITLE_EXISTS: "TITLE already exists",
    SLUG_EXISTS: "SLUG already exists",
  };
  
  export const generalModelStatuses = {
    APPROVED: "APPROVED",
    DECLINED: "DECLINED",
    PENDING: "PENDING",
    CONFIRME: "CONFIRM",
    SHIPPED: "SHIPPED",
    DELEVERED: "DELIVERED",
    APPLIED:"APPLIED"
  };
  
  export const PERMISSION = {
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    GET: "GET",
  };
  
  export const INTERNAL_ORDER_ORDER_FOR = {
    ADMIN_STOCK_IN:"adminStockIn",
    WAREHOUSE_STOCK_IN:"wareHouseStockIn",
    STORE_STOCK_IN:"storeStockIn",
  };
  
  
  export const INTERNAL_ORDER_ORDER_TYPE = {
    BUY:"BUY",
    SELL:"SELL",
  };
  
  
  export const discountStatus = {
    PERCENTAGE: "PERCENTAGE",
    FLATOFF: "FLATOFF",
  };
  
  
  export const TransactionTypes = {
    Debit: "Debit",
    Credit: "Credit",
  };
  
  
  export const paymentOptions = {
    Wallet: "Wallet",
    Razorpay: "Razorpay",
  };
  