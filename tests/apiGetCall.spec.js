const { test, expect } = require('@playwright/test');

test.describe('API GET Calls', () => {

    test('GET API Call - Basic Example', async ({ request }) => {
        
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        
        // Verify status code
        expect(response.status()).toBe(200);
        
        // Get response body
        const responseBody = await response.json();
        console.log('Response:', responseBody);
        
        // Verify response data
        expect(responseBody.id).toBe(1);
        expect(responseBody.userId).toBe(1);
        expect(responseBody.title).toBeDefined();
    });

    test('GET API Call - With Headers', async ({ request }) => {
        
        const response = await request.get('https://jsonplaceholder.typicode.com/users/1', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        console.log('User Data:', responseBody);
        expect(responseBody.name).toBeDefined();
        expect(responseBody.email).toBeDefined();
    });

    test('GET API Call - Multiple Endpoints', async ({ request }) => {
        
        // Get posts
        const postsResponse = await request.get('https://jsonplaceholder.typicode.com/posts');
        expect(postsResponse.status()).toBe(200);
        const posts = await postsResponse.json();
        expect(posts.length).toBeGreaterThan(0);
        
        // Get first post's user
        const userId = posts[0].userId;
        const userResponse = await request.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        expect(userResponse.status()).toBe(200);
        const user = await userResponse.json();
        
        console.log(`Post by user: ${user.name}`);
        expect(user.id).toBe(userId);
    });

    test('GET API Call - Query Parameters', async ({ request }) => {
        
        const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                userId: 1,
                _limit: 5
            }
        });
        
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        
        console.log('Posts for user 1:', responseBody.length);
        expect(responseBody.length).toBeLessThanOrEqual(5);
        responseBody.forEach(post => {
            expect(post.userId).toBe(1);
        });
    });

    test('GET API Call - Response Headers', async ({ request }) => {
        
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        
        expect(response.status()).toBe(200);
        
        // Verify response headers
        const headers = response.headers();
        console.log('Response Headers:', headers);
        expect(headers['content-type']).toContain('application/json');
    });

    test('GET API Call - Error Handling', async ({ request }) => {
        
        // Test 404 error
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/99999');
        
        // Note: JSONPlaceholder returns empty object for non-existent IDs with 200 status
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Object.keys(responseBody).length).toBe(0);
    });

    test('GET API Call - Store Token in Context', async ({ request }) => {
        
        // Example: Get data using stored context
        const allPosts = await request.get('https://jsonplaceholder.typicode.com/posts');
        expect(allPosts.status()).toBe(200);
        
        const posts = await allPosts.json();
        const firstPostId = posts[0].id;
        
        // Use the ID for subsequent calls
        const singlePost = await request.get(`https://jsonplaceholder.typicode.com/posts/${firstPostId}`);
        expect(singlePost.status()).toBe(200);
        
        const singlePostData = await singlePost.json();
        expect(singlePostData.id).toBe(firstPostId);
    });

});
