// check for block.js variables
// due to gitignore

// can loop this
if (typeof blockedTitles === undefined) blockedTitles = [];
if (typeof matchDegreeWords === undefined) matchDegreeWords = [];
if (typeof blockedStack === undefined) blcokedStack = [];
if (typeof personal === undefined) personal = [];
if (typeof blockedCompanies === undefined) blockedCompanies = [];

let allBlockedJobs = [];

// lol
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

const addGenericClickHandler = () => {
  document.addEventListener('click', (e) => {
    const targClass = Array.from(e.target.classList);
    const thisParent = e.target.parentElement;
    const thisGrandParent = thisParent.parentElement;
    const comp = thisGrandParent.querySelector('.job-card-container__primary-description');
    const comp2 = jobNode.querySelector('.artdeco-entity-lockup__subtitle');
    const compName = comp?.innerText ?? comp2?.innerText;

    if (targClass.includes('job-card-list')) {
      const jobDesc = document.querySelector('.jobs-description-content__text');

      jobDesc.style.backgroundColor = '#ffffff'; // reset back to white

      setTimeout(() => {
        const jobText = jobDesc.innerText.toLowerCase();
        const matchDegreeWords = ['degree', "bachelor's", "master's"];
        const blockedStack = ['.net', 'drupal', 'ios', 'swift', 'c#', 'c++', 'springboot', 'kotlin'];
        
        if (matchDegreeWords.some(word => jobText.includes(word))) {
          jobDesc.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        } else if (blockedStack.some(stack => jobText.includes(stack))) {
          jobDesc.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
        }
      }, 500);
    }

    e.preventDefault();
  });
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

// load from block.js (first run)
// load from localStorage
const loadBlockedJobs = () => {
  allBlockedJobs = []; // reset

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

const listenToJobsPanelScroll = async () => {
  const jobPanel = await waitForJobsPanel();

  bindScrollEvent(jobPanel);
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

// first load, starts here
window.onload = async () => {
  loadBlockedJobs();
  listenToJobsPanelScroll();
  addGenericClickHandler();

  setTimeout(() => {
    applyAppliedFilter();
  }, 3000);
};