let allBlockedJobs = [];

const applyAppliedFilter = () => {
  const appliedCompanies = JSON.parse(localStorage.getItem('lijfce-applied-companies'));

  if (appliedCompanies && appliedCompanies.length) {
    document.querySelectorAll('.jobs-search-results__list-item').forEach(jobNode => {
      const comp = jobNode.querySelector('.job-card-container__primary-description');
      const compName = comp?.innerText;

      if (appliedCompanies.includes(compName)) {
        jobNode.style.backgroundColor = '#AFE1AF';
        jobNode.style.border = '2px solid green';
      }
    });

    const statsPanel = document.querySelector('.lijfce__stats-panel span');

    statsPanel.innerText = `Applied to ${appliedCompanies.length} jobs`;
  }
}

const appliedToCompany = (companyName) => {
  const appliedCompanies = JSON.parse(localStorage.getItem('lijfce-applied-companies'));

  if (appliedCompanies && !appliedCompanies.includes(companyName)) {
    appliedCompanies.push(companyName);

    localStorage.setItem('lijfce-applied-companies', JSON.stringify(appliedCompanies));
  } else {
    localStorage.setItem('lijfce-applied-companies', JSON.stringify([companyName]));
  }

  applyAppliedFilter();
}

const blockCompany = (companyName) => {
  if (!allBlockedJobs.includes(companyName)) {
    const blockedJobsLs = JSON.parse(localStorage.getItem('lijfce-blocked-companies'));

    if (!blockedJobsLs?.length) {
      localStorage.setItem('lijfce-blocked-companies', JSON.stringify([companyName]))
    } else {
      blockedJobsLs.push(companyName);
      localStorage.setItem('lijfce-blocked-companies', JSON.stringify(blockedJobsLs));
    }

    loadBlockedJobs();
  }
}

const filterJobs = (blockedCompanies) => {
  document.querySelectorAll('.jobs-search-results__list-item').forEach(jobNode => {
    const comp = jobNode.querySelector('.job-card-container__primary-description');
    const compName = comp?.innerText;
    const title = jobNode.querySelector('.job-card-list__title');
    const titleText = title?.innerText.toLowerCase();

    if (compName && blockedCompanies.includes(compName)) {
      jobNode.remove();
    } else if (titleText && blockedTitles.some(title => titleText.includes(title))) {
      jobNode.remove();
    }
  });
}

// load from filters.js (first run)
// load from localStorage
const loadFilters = () => {
  allBlockedJobs = [];

  // from block.js
  if (blockedCompanies && blockedCompanies.length) {
    allBlockedJobs.push(...blockedCompanies);
  }

  const blockedJobsLs = JSON.parse(localStorage.getItem('lijfce-blocked-companies'));

  if (blockedJobsLs && blockedJobsLs.length) {
    allBlockedJobs.push(...blockedJobsLs);
  }

  filterJobs(allBlockedJobs);
}

const filterJobDetails = (jobDetailsText) => {
  const jobDesc = document.querySelector('.jobs-description-content__text');
  const jobText = jobDetailsText.toLowerCase();
  
  jobDesc.style.backgroundColor = '#ffffff'; // reset back to white
  
  if (matchDegreeWords.some(word => jobText.includes(word) && !(jobText.includes('equivalent') && jobText.includes('experience')))) {
    jobDesc.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
  } else if (blockedStack.some(stack => jobText.includes(stack))) {
    jobDesc.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
  }
}

// get msgs from popup ui
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;

  if (msg?.applied) {
    appliedToCompany(msg.applied);
  }

  if (msg?.block) {
    blockCompany(msg.block);
  }

  // sendMessageToLogic('from dom');
  callback('dom ack');
});

window.onload = async () => {
  loadFilters();
  listenToJobsPanelScroll();
  addGenericClickHandler(filterJobDetails);

  setTimeout(() => {
    applyAppliedFilter();
  }, 3000);
};