export const runComparison = (leftSide, rightSide) => {
  let left = 0,
    right = 0;
  const footer = document.querySelector('.footer');
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, ind) => {
    const rightStat = rightSideStats[ind];
    const leftSideValue = +leftStat.dataset.value;
    const rightSideValue = +rightStat.dataset.value;
    if (rightSideValue > leftSideValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
      leftStat.style.border = '3px solid red';
      rightStat.style.border = '3px solid green';
      right++;
    } else if (leftSideValue > rightSideValue) {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
      rightStat.style.border = '3px solid red';
      leftStat.style.border = '3px solid green';
      left++;
    } else {
      return;
    }
  });
  footer.style.display = 'block';
  if (right > left) {
    footer.querySelector('p').innerHTML = whoIsBetter(rightSide, leftSide);
  } else if (right < left) {
    footer.querySelector('p').innerHTML = whoIsBetter(leftSide, rightSide);
  } else {
    footer.querySelector('p').innerHTML = 'Both are best';
  }
};
const whoIsBetter = (rightSide, leftSide) => {
  return `OverAll <b>${rightSide.Title} </b>is best movie than <b>${leftSide.Title}</b>`;
};
