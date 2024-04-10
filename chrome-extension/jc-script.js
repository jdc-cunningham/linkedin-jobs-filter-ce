let allBlockedJobs = [];

const bindScrollEvent = (jobsPanel) => jobsPanel.addEventListener('scrollend', () => console.log('scroll end'));

const getJobPanel = () => document.querySelector('.jobs-search-results-list');

const waitForJobsPanel = () => new Promise(resolve => {
  const wait = () => {
    const jp = getJobPanel();

    if (jp) {
      resolve(jp);
    } else {
      setTimeout(() => {
        wait();
      }, 100);
    }
  }

  wait();
});

// load from block.js (first run)
// load from localStorage
const loadBlockedJobs = () => {
  // from block.js
  if (blockedCompanies) {
    console.log(blockedCompanies);
  }

  const blockedJobsLs = localStorage.getItem('linkedin-blocked-jobs');
}

const listenToJobsPanelScroll = async () => {
  const jobPanel = await waitForJobsPanel();

  bindScrollEvent(jobPanel);
}

window.onload = async () => {
  console.log('alive');

  listenToJobsPanelScroll();
  loadBlockedJobs();
};