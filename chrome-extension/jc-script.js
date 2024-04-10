let allBlockedJobs = [];

const filterJobs = (blockedCompanies) => {
  document.querySelectorAll('.jobs-search-results__list-item').forEach(jobNode => {
    const comp = jobNode.querySelector('.job-card-container__primary-description');
    const compName = comp.innerText;
  
    if (blockedCompanies.includes(compName)) {
      jobNode.remove();
    }
  });
}

const bindScrollEvent = (jobsPanel) => jobsPanel.addEventListener('scrollend', () => {
  // after scrolling apply filters
  if (allBlockedJobs.length) {
    filterJobs(allBlockedJobs);
  }
});

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
  if (blockedCompanies && blockedCompanies.length) {
    allBlockedJobs.push(...blockedCompanies);
  }

  const blockedJobsLs = JSON.parse(localStorage.getItem('linkedin-blocked-jobs'));

  if (blockedJobsLs && blockedJobsLs.length) {
    allBlockedJobs.push(...blockedJobsLs);
  }
}

const listenToJobsPanelScroll = async () => {
  const jobPanel = await waitForJobsPanel();

  bindScrollEvent(jobPanel);
}

// first load, starts here
window.onload = async () => {
  loadBlockedJobs();
  listenToJobsPanelScroll();
};