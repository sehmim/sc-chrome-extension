// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('loginForm').addEventListener('submit', function(event) {
//         event.preventDefault();
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;

//         // Get the current active tab
//         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//             // Check if tabs exist and send the message
//             if (tabs.length > 0) {
//                 chrome.storage.local.set({ loggedInUser: username }, function() {
//                     console.log("MAKE FETCH HERE");
//                     chrome.tabs.sendMessage(tabs[0].id, { message: 'login', url: tabs[0].url, type: "LOGIN" }, function(){
//                         console.log("SEND MESSAGE")
//                     });
//                 });
//             } else {
//                 console.error("No active tabs found.");
//             }
//         });
//     });
// });


// function popup() {
//     chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
//         var activeTab = tabs[0];
//         chrome.tabs.sendMessage(activeTab.id, {"message": "start"});
//     });
// }

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("button1").addEventListener("click", popup);
// });

// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response){
//         console.log("SENT FROM POPUPJS")
//         // alert(response)
//         // $("#text").text(response);
//     });
// });