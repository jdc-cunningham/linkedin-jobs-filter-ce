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
  console.log('>>>', jobDetailsText);
}

window.onload = async () => {
  loadFilters();
  listenToJobsPanelScroll();
  addGenericClickHandler(filterJobDetails);

  setTimeout(() => {
    applyAppliedFilter();
  }, 3000);
};