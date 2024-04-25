// console.log("background");

// // Listen for messages from other parts of the extension
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     // Check the action type of the message
//     if (message.action === 'login') {
//         // Handle login action
//         console.log('Received login message from popup:', message.user);
//         // Perform any necessary actions, such as updating state or performing authentication
//         // Send a response if needed using sendResponse()
//     }
//     // Add more conditional blocks to handle other types of messages if necessary
// });

// chrome.browserAction.onClicked.addListener(function(activeTab){
//   var newURL = "http://stackoverflow.com/";
//   chrome.tabs.create({ url: newURL });
// });