let observerStarted = false;
let observerTimeout;

// wait for job description to load after clicking on a job in the left sidebar
// https://stackoverflow.com/a/29405370/2710227
const startObserver = (target, filterJobDetails) => {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // mutation is attributes
      // fires multiple times, debounce
      clearTimeout(observerTimeout);

      observerTimeout = setTimeout(() => {
        const jobDetailsText = target.querySelector('.jobs-description-content__text').innerText;
        filterJobDetails(jobDetailsText);
      }, 50);
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true };

  // pass in the target node, as well as the observer options
  observer.observe(target, config);
  observerStarted = true;
}

const addGenericClickHandler = (filterJobDetails) => {
  document.addEventListener('click', (e) => {
    const thisParent = e.target.parentElement;
    const thisGrandParent = thisParent.parentElement;
    const targClass = Array.from(e.target.classList);
    const targClasses = [...targClass, thisParent.classList, thisGrandParent.classList];
    const cardClasses = ['job-card-list', 'jobs-search-results__list-item'];

    if (cardClasses.some(cardClass => targClasses.includes(cardClass))) {
      if (!observerStarted) {
        const jobDetails = document.querySelector('.jobs-search__job-details');
        startObserver(jobDetails, filterJobDetails);
      }
    }
  });
}

const bindScrollEvent = (jobsPanel) => jobsPanel.addEventListener('scrollend', () => {
  filterJobs();
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

const listenToJobsPanelScroll = async () => {
  const jobPanel = await waitForJobsPanel();

  bindScrollEvent(jobPanel);
}
