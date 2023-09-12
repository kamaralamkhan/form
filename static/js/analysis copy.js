// analysis.js

const apiKey = "47160f02bc64433e96747fce737f5fa1";
const apiUrl = "https://uvw26giknfr.cognitiveservices.azure.com/formrecognizer/documentModels/foodbill1:analyze?api-version=2023-07-31";

const processedImages = [];

document
  .getElementById("upload-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const imageInput = document.getElementById("image-input");

    if (!imageInput.files || imageInput.files.length === 0) {
      alert("Please select image files.");
      return;
    }

    // Clear previous content
    const analysisResultDiv = document.getElementById("analysis-result");
    analysisResultDiv.innerHTML = "";

    try {
      const responsePromises = Array.from(imageInput.files).map(async (imageFile) => {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
            "Content-Type": "application/octet-stream",
          },
          body: imageFile,
        });

        if (response.ok) {
          const operationLocation = response.headers.get("Operation-Location");
          const imageName = imageFile.name;

          processedImages.push({
            name: imageName,
            operationLocation: operationLocation,
          });
        } else {
          const errorText = await response.text();
          document.getElementById(
            "result"
          ).innerHTML = `Error: ${errorText}`;
        }
      });

      await Promise.all(responsePromises);

      // After processing all images, update the image list
      await pollForAnalysisCompletion();
    } catch (error) {
      document.getElementById(
        "result"
      ).innerHTML = `An error occurred: ${error.message}`;
    }
  });

async function pollForAnalysisCompletion() {
  for (const image of processedImages) {
    let status = "running";

    while (status === "running") {
      try {
        const response = await fetch(image.operationLocation, {
          headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
          },
        });

        if (response.ok) {
          const result = await response.json();
          status = result.status;

          if (status === "succeeded") {
            updateImageList(result);
          } else if (status === "failed") {
            console.error("Analysis failed.");
            break;
          }
        } else {
          console.error("Failed to check analysis status.");
          break;
        }
      } catch (error) {
        console.error("An error occurred while fetching analysis result:", error);
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000)); // Poll every second
    }
  }
}

function updateImageList(result) {
  const imageList = document.getElementById("analysis-result");

  const fields = result.analyzeResult.documents[0].fields;

  // Generate the analysis result table for this image
  const table = document.createElement("table");
  const headerRow = document.createElement("tr");

  // Create table header cells
  for (const fieldName in fields) {
    const th = document.createElement("th");
    th.textContent = fieldName;
    headerRow.appendChild(th);
  }

  table.appendChild(headerRow);

  // Create table content row
  const contentRow = document.createElement("tr");
  for (const fieldName in fields) {
    const td = document.createElement("td");
    const field = fields[fieldName];

    if (fieldName === "Items" || fieldName === "TaxDetails") {
      const arrayValue = field.valueArray;
      if (arrayValue) {
        const arrayContent = arrayValue
          .map((item) => item.valueObject.content)
          .join(", ");
        td.textContent = arrayContent || "N/A";
      }
    } else {
      td.textContent = field.content;
    }

    contentRow.appendChild(td);
  }

  table.appendChild(contentRow);

  // Display the generated table in the analysis-result div
  imageList.appendChild(table);
}
