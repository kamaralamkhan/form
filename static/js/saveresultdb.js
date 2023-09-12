// async function saveAnalysisResultToDatabase(result) {
//     const csrfToken = "{{ csrf_token }}"; // Ensure you have the CSRF token defined here
  
//     const image_name = result.imageName; // Get the image name from the result
//     const analysisData = result.analyzeResult.documents[0].fields; // Get the analysis data
  
//     try {
//       await fetch('/save-analysis-result/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json', // Set the content type to JSON
//           'X-CSRFToken': csrfToken, // Include the CSRF token
//         },
//         body: JSON.stringify({ image_name, analysisData }), // Convert to JSON string
//       });
//     } catch (error) {
//       console.error('Error saving analysis result:', error);
//     }
//   }