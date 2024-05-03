console.log('Background script loaded.');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message ---->", message );
    console.log("sender ---->", sender );

  if (message.type === 'USER_EMAIL') {
    console.log('User email received:', message.payload);
    chrome.storage.local.set({ userEmail: message.payload });
  }
});