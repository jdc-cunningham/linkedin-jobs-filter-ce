let observerStarted = false;
let observerTimeout;

const startObserver = (target) => {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // mutation is attributes
      // fires multiple times, debounce
      clearTimeout(observerTimeout);

      observerTimeout = setTimeout(() => {
        const jobDetailsText = target.querySelector('.jobs-description-content__text').innerText;
        console.log(jobDetailsText);
      }, 50);
    });
  });

  // configuration of the observer:
  var config = { attributes: true, childList: true, characterData: true }

  // pass in the target node, as well as the observer options
  observer.observe(target, config);

  observerStarted = true;
}

const addGenericClickHandler = () => {
  document.addEventListener('click', (e) => {
    const thisParent = e.target.parentElement;
    const thisGrandParent = thisParent.parentElement;
    const targClass = Array.from(e.target.classList);
    const targClasses = [...targClass, thisParent.classList, thisGrandParent.classList];
    const cardClasses = ['job-card-list', 'jobs-search-results__list-item'];

    if (cardClasses.some(cardClass => targClasses.includes(cardClass))) {
      console.log('card clicked');

      if (!observerStarted) {
        const jobDetails = document.querySelector('.jobs-search__job-details');
        startObserver(jobDetails);
      }
    }
  });
}

addGenericClickHandler();
