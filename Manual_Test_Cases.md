# Manual Test Cases - Client App Login & Order Placement

---

## Test Case 1: Client App Login with Valid Credentials and Product Purchase (User 1)

### Test Case ID
TC_001

### Test Case Name
Verify user can login, add product to cart, and place order successfully

### Pre-conditions
- Browser is installed and accessible
- Application is accessible via URL
- Valid user credentials are available
- Product "ZARA COAT 3" is available in the catalog

### Test Data
| Field | Value |
|-------|-------|
| Email | sa.johngrey@gmail.com |
| Password | Test@4321 |
| Product Name | ZARA COAT 3 |
| Country | India |

### Test Steps

| Step No | Action | Expected Result |
|---------|--------|-----------------|
| 1 | Open the application URL in browser | Application login page is loaded |
| 2 | Enter email: `sa.johngrey@gmail.com` in email field | Email is entered successfully |
| 3 | Enter password: `Test@4321` in password field | Password is entered successfully |
| 4 | Click the "Login" button | User is logged in successfully and directed to dashboard |
| 5 | Search for product "ZARA COAT 3" in the search bar | Product appears in search results |
| 6 | Click "Add to Cart" button for "ZARA COAT 3" | Product is added to cart (confirmation message or icon update) |
| 7 | Navigate to Cart page (click cart icon or menu) | Cart page is displayed with "ZARA COAT 3" listed |
| 8 | Verify product "ZARA COAT 3" is displayed in cart | Product name, price, and quantity are visible |
| 9 | Click "Checkout" button | Checkout page is displayed |
| 10 | In the checkout page, search for country "ind" | Country dropdown shows filtered results |
| 11 | Select "India" from the dropdown list | India is selected as the delivery country |
| 12 | Click "Submit" or "Place Order" button | Order is placed successfully and Order ID is generated and displayed |
| 13 | Note/Copy the Order ID displayed | Order ID is recorded (e.g., format: XXXXXX) |
| 14 | Navigate to Orders/Order History page | Orders page is loaded |
| 15 | Verify the Order ID from Step 12 is displayed in order history | Order ID matches and is visible in the list |
| 16 | Click on the order to view details (optional) | Order details are displayed with correct product |

### Expected Result
- ✅ User successfully logs in with valid credentials
- ✅ Product "ZARA COAT 3" is added to cart
- ✅ Cart displays the product correctly
- ✅ Order is placed successfully
- ✅ Order ID is generated and displayed
- ✅ Order ID appears in Order History page

### Post-conditions
- Order is successfully placed and saved in the system
- User can view the order in order history

---

## Test Case 2: Client App Login with Valid Credentials and Product Purchase (User 2)

### Test Case ID
TC_002

### Test Case Name
Verify second user can login and complete order placement with same product

### Pre-conditions
- Browser is installed and accessible
- Application is accessible via URL
- Valid user credentials are available
- Product "ZARA COAT 3" is available in the catalog

### Test Data
| Field | Value |
|-------|-------|
| Email | anshika@gmail.com |
| Password | Iamking@000 |
| Product Name | ZARA COAT 3 |
| Country | India |

### Test Steps

| Step No | Action | Expected Result |
|---------|--------|-----------------|
| 1 | Open the application URL in browser | Application login page is loaded |
| 2 | Enter email: `anshika@gmail.com` in email field | Email is entered successfully |
| 3 | Enter password: `Iamking@000` in password field | Password is entered successfully |
| 4 | Click the "Login" button | User is logged in successfully and directed to dashboard |
| 5 | Search for product "ZARA COAT 3" in the search bar | Product appears in search results |
| 6 | Click "Add to Cart" button for "ZARA COAT 3" | Product is added to cart |
| 7 | Navigate to Cart page | Cart page is displayed with "ZARA COAT 3" listed |
| 8 | Verify product "ZARA COAT 3" is displayed in cart | Product name, price, and quantity are visible |
| 9 | Click "Checkout" button | Checkout page is displayed |
| 10 | In the checkout page, search for country "ind" | Country dropdown shows filtered results |
| 11 | Select "India" from the dropdown list | India is selected as the delivery country |
| 12 | Click "Submit" or "Place Order" button | Order is placed successfully and Order ID is generated |
| 13 | Note/Copy the Order ID displayed | Order ID is recorded |
| 14 | Navigate to Orders/Order History page | Orders page is loaded |
| 15 | Verify the Order ID is displayed in order history | Order ID matches and is visible in the list |

### Expected Result
- ✅ User successfully logs in with valid credentials
- ✅ Product "ZARA COAT 3" is added to cart
- ✅ Cart displays the product correctly
- ✅ Order is placed successfully
- ✅ Order ID is generated and displayed
- ✅ Order ID appears in Order History page

### Post-conditions
- Order is successfully placed and saved in the system
- User can view the order in order history

---

## Test Case 3: Test with Predefined Test Data (Web1)

### Test Case ID
TC_003

### Test Case Name
Verify predefined test data flow - Login and Add Product to Cart

### Pre-conditions
- Browser is installed and accessible
- Application is accessible via URL
- Test data fixtures are available
- Product is available in the catalog

### Test Steps

| Step No | Action | Expected Result |
|---------|--------|-----------------|
| 1 | Open the application URL in browser | Application login page is loaded |
| 2 | Enter test data email in email field | Email is entered successfully |
| 3 | Enter test data password in password field | Password is entered successfully |
| 4 | Click the "Login" button | User is logged in and dashboard is displayed |
| 5 | Search for test data product name | Product is displayed in search results |
| 6 | Click "Add to Cart" button | Product is added to cart |
| 7 | Navigate to Cart page | Cart page is displayed with the product |
| 8 | Verify product is displayed in cart | Product details are visible and correct |
| 9 | Click "Checkout" button | Checkout page is loaded |

### Expected Result
- ✅ Login functionality works with test data
- ✅ Product search functionality works correctly
- ✅ Add to cart functionality works
- ✅ Cart page displays the product
- ✅ Checkout page is accessible

### Post-conditions
- User is on checkout page ready to proceed with order

---

## Notes for Manual Tester

1. **Browser Compatibility**: Test on Chrome, Firefox, and Edge browsers if possible
2. **Network**: Ensure stable internet connection during testing
3. **Screenshots**: Take screenshots at each step for documentation
4. **Order ID Format**: Note the format of Order ID generated for reference
5. **Product Verification**: Ensure product name, price, and image appear correctly at each step
6. **Error Handling**: If any error occurs, note the error message and take a screenshot
7. **Performance**: Note if any page takes longer than expected to load (ideally < 3 seconds per page)

---

## Defect Reporting Template

If any issue is found during manual testing:

- **Defect ID**: 
- **Environment**: 
- **Browser**: 
- **Step Number**: 
- **Expected Result**: 
- **Actual Result**: 
- **Screenshot/Attachment**: 
- **Severity**: (Critical/High/Medium/Low)
- **Reproducibility**: (Always/Sometimes/Rarely)
