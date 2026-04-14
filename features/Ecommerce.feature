Feature: Ecommerce Validation
    Scenario: Placing the Order
        Given A login to Ecommerce application with "sa.johngrey@gmail.com" and "Test@4321"
        When Add "ZARA COAT 3" to cart
        Then verify "ZARA COAT 3" is displayed in the cart
        When enter valid details and Place the order "sa.johngrey@gmail.com"
        Then verify order in order history page
        