const textBox = document.getElementById('company');
const appliedBtn = document.querySelector('.applied');
const blockBtn = document.querySelector('.block');

// from upwork extension I made
const sendMessageToDomFilter = (msg) => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, msg, (response) => {
      // not doing anything with response yet
    });
  });
}

const validate = () => textBox.value.length > 0;

appliedBtn.addEventListener('click', () => {
  if (validate()) sendMessageToDomFilter({
    applied: textBox.value,
  });
});

// not used anymore
blockBtn.addEventListener('click', () => {
  // if (validate()) sendMessageToDomFilter({
  //   block: textBox.value,
  // });
});