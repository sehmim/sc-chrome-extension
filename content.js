////////////////////////////////////

async function fetchDataFromServer(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Propagate the error to the caller if needed
  }
}


// Function to create and style the div container
function createDivContainer() {
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.width = '400px';
  div.style.top = '60px';
  div.style.right = '20px';
  div.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
  div.style.padding = '35px 10px 10px 10px';
  div.style.border = '1px solid #ccc';
  div.style.zIndex = '9999'; // Set a high z-index value
  
  // Create and append close button
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.backgroundColor = 'transparent';
  closeButton.style.border = 'none';
  closeButton.style.cursor = 'pointer';
  closeButton.style.fontSize = '20px';
  closeButton.style.color = '#333';
  closeButton.onclick = function() {
    div.style.display = 'none';
  };
  div.appendChild(closeButton);
  
  return div;
}

// Function to create and style the button
function createButton() {
  const button = document.createElement('button');
  button.textContent = 'Activate';
  button.style.display = 'block';
  button.style.width = '100%';
  button.style.padding = '10px';
  button.style.marginTop = '10px';
  button.style.border = '1px solid #ccc';
  button.style.backgroundColor = '#fff';
  button.style.color = '#333';
  button.style.fontFamily = 'Arial, sans-serif';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  return button;
}

function createDropdownWithOptions(optionsArray) {
  var labelElement = document.createElement('label');
  labelElement.textContent = 'Select your team:';

  var selectElement = document.createElement('select');

  optionsArray.forEach(function(optionText) {
    var optionElement = document.createElement('option');
    optionElement.textContent = optionText;
    optionElement.value = optionText;
    selectElement.appendChild(optionElement);
  });

  var containerDiv = document.createElement('div');
  containerDiv.appendChild(labelElement);
  containerDiv.appendChild(selectElement);
  containerDiv.style.display = "flex";
  containerDiv.style.justifyContent = "space-between";

  return containerDiv;
}

function createLoginButton() {
  var loginButton = document.createElement('button');
  loginButton.textContent = 'Login';
  loginButton.style.cursor = 'pointer'; // Make cursor change on hover

  loginButton.addEventListener('click', function() {
    window.location.href = 'https://sponsorcircle-affiliate-git-feature-landingpage-sehmim.vercel.app/login';
  });

  return loginButton;
}

//////////////////////////////////////

// Function to handle button click event
function handleButtonClick(affiliateLink) {
  window.location.href = affiliateLink;
}

function handleApplyCouponCode(couponCode, maindDiv){
  let discountInput = 
    document.querySelector('input[aria-label="Discount code"]') 
    || document.querySelector('input[placeholder="Discount code"]');
      
  console.log("discountInput ->", discountInput);

  // Check if the input element exists
  if (discountInput) {
    discountInput.focus();
    discountInput.value = couponCode;

    // Trigger an input event to simulate user input
    const inputEvent = new Event('input', { bubbles: true });
    discountInput.dispatchEvent(inputEvent);

  } else {
    console.log("CANT FIND INPUT FIELD")
  }

    setTimeout(() => {
      let applyButton = document.querySelector('button[aria-label="Apply Discount Code"]');
      console.log("applyButton ->", applyButton);

      // Check if the button element exists
      if (applyButton) {
        // Simulate a click event on the button
        applyButton.click();

        maindDiv.style.display = 'none';
      } else {
        console.error('Button with aria-label "Apply Discount Code" not found.');
      }
    }, 300);
  }

// Function to simulate fetching allowed domains with a delay
async function fetchAllowedDomains() {
  const url = "http://127.0.0.1:5001/sponsorcircle-3f648/us-central1/allowedDomains";
  const { allowedDomains: data } = await fetchDataFromServer(url);

  let allowedDomains = [];


  data.map((item) => {
    console.log(item.advertiserUrl);
    allowedDomains.push({
      allowedDomain: item.advertiserUrl, 
      affiliateLink: item?.trackingLink, 
      couponCode: item?.couponCode
    })
  })


  return allowedDomains;
}


async function fetchAllowedGroups() {
  const url = "http://127.0.0.1:5001/sponsorcircle-3f648/us-central1/getAllGroups";
  const groups = await fetchDataFromServer(url);

  return groups.map((group) => {
    return group.teamName;
  })

}



//////////////////////////
async function initialize() {

  // if (!localStorage.getItem('user')) {
  //   const div = createDivContainer();
  //   const loginButton = createLoginButton();
  //   div.append(loginButton)
  //   document.body.appendChild(div);
  //   return;
  // }

  // chrome.runtime.onMessage.addListener(
  //     function(message, sender, sendResponse) {
  //         console.log(" ------->");
  //         switch(message.type) {
  //             case "getText":
  //               console.log("YESSSSSS ------>")
  //             break;
  //         }
  //     }
  // );

  // const allowedDomains = await fetchAllowedDomains();
  // const allowedTeams = await fetchAllowedGroups();

  // const currentHostname = window.location.href;
  // const matchedDomain = allowedDomains.find(domain => currentHostname.includes(domain.allowedDomain));


  // if (matchedDomain && matchedDomain?.couponCode) {
  //   if (window.location.href.includes("checkouts")) {
  //     const div = createDivContainer();

  //     // const dropdown = createDropdownWithOptions(allowedTeams);

  //     const button = createButton();
  //     button.addEventListener('click', () => handleApplyCouponCode(matchedDomain.couponCode, div));

  //     // div.appendChild(dropdown);
  //     div.appendChild(button);
  //     document.body.appendChild(div);
  //   }
  // } else {
  //   const appliedURL = window.location.href.includes("irclickid");
  //   if (matchedDomain && !appliedURL) {
  //     const div = createDivContainer();
      
  //     const dropdown = createDropdownWithOptions(allowedTeams);
      
  //     const button = createButton();
  //     button.addEventListener('click', () => handleButtonClick(matchedDomain.affiliateLink));
      
  //     div.appendChild(dropdown);
  //     div.appendChild(button);
  //     document.body.appendChild(div);
  //   }
  // }

  // Call the function to reproduce the section content and store the result
  // const reproducedIframe = reproduceSectionContent();

  // // Append the reproduced iframe to the document body or any other container
  // document.body.appendChild(reproducedIframe);

  const isolatedIframe = createIsolatedIframe('400px', '300px');

  isolatedIframe.onload = function() {
    const iframeDocument = isolatedIframe.contentDocument || isolatedIframe.contentWindow.document;

    const loginForm = generateLoginForm();

    if (localStorage.getItem('sponsorcircle-useremail')) {
      console.log("HOZAAAAAA!!")
    }

    iframeDocument.body.innerHTML = '';
    iframeDocument.body.appendChild(loginForm);
    
  };

  document.body.appendChild(isolatedIframe);
}

initialize().then(() => {
  console.log("INITIALZIED")
});


function createIsolatedIframe(width, height) {
  // Create a new iframe element
  const iframe = document.createElement('iframe');

  // Set attributes for the iframe
  iframe.setAttribute('src', 'about:blank'); // Load a blank page initially

  // Set inline styles for the iframe
  iframe.style.position = 'fixed';
  iframe.style.top = '20%';
  iframe.style.left = '85%';
  iframe.style.transform = 'translate(-50%, -50%)';
  iframe.style.width = width;
  iframe.style.height = height;
  iframe.style.border = 'none';
  iframe.style.backgroundColor = '#fff';
  iframe.style.borderRadius = '8px';
  iframe.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)';

  // Access the document within the iframe
  const iframeDocument = iframe.contentDocument;

  // If the iframe document is not null
  if (iframeDocument) {
    // Apply some default styles to the iframe content to ensure isolation
    iframeDocument.body.style.margin = '0';
    iframeDocument.body.style.padding = '20px';
    iframeDocument.body.style.fontFamily = 'Arial, sans-serif';
    iframeDocument.body.style.fontSize = '16px';
    iframeDocument.body.style.color = '#333';
  }

  // Return the created iframe
  return iframe;
}


function generateLoginForm() {
  // Create form element
  const form = document.createElement('form');
  
  // Create email input
  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Email');
  emailInput.setAttribute('name', 'email');
  
  // Create password input
  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Password');
  passwordInput.setAttribute('name', 'password');
  
  // Create submit button
  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  
  // Add event listener to submit button
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;

    localStorage.setItem('sponsorcircle-useremail', email);
    
    console.log('Email:', email);
    console.log('Password:', password);
  });
  
  // Append inputs and button to form
  form.appendChild(emailInput);
  form.appendChild(passwordInput);
  form.appendChild(submitButton);
  
  return form;
}