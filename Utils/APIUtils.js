class APIUtils {

    constructor(apiRequest, loginPayload)
    {
        this.apiRequest = apiRequest;
        this.loginPayload = loginPayload;
    };


   async APIToken(){

        const apiResponse = await this.apiRequest.post('https://rahulshettyacademy.com/api/ecom/auth/login',
                {
                    data: this.loginPayload,
                });
            //expect(apiResponse.ok()).toBeTruthy();
            const responseData = await apiResponse.json();
              const token = responseData.token;
                return token;

    }

    async createOrder(orderPayload){

        const response = {};
        response.token = await this.APIToken();
        const orderResponse = await this.apiRequest.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
               {
                        data: orderPayload,
                        headers: {
                            'Authorization': response.token,
                            'Content-Type': 'application/json'
                        } 
                    });
                    const orderResponseData = await orderResponse.json();
                    console.log(orderResponseData);
                    const orderId = orderResponseData.orders[0];
                    response.orderId = orderId;
                    
                    return response;

    }
}
module.exports = {APIUtils};
