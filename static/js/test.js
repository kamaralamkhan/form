// Place this code at the top or near the beginning of your JavaScript file

async function testFetchRequest() {
    const formData = new FormData();
    formData.append('csrfmiddlewaretoken', '% csrf_token %'); // Replace with an actual CSRF token or a dummy value
    formData.append('image_name', 'image_name');
    formData.append('field_name', 'field_name');
    formData.append('field_content', 'field_content');

    try {
        const response = await fetch('/save-analysis-result/', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('Fetch request successful');
        } else {
            console.error('Fetch request failed');
        }
    } catch (error) {
        console.error('Error during fetch request:', error);
    }
}

// Call the testFetchRequest function to test the fetch request
testFetchRequest();

// The rest of your code follows...
// async function saveAnalysisResultToDatabase(result) {
// ...
// }
