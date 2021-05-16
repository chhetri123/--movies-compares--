import ViewLeft from './view/viewLeft.js';
import ViewRight from './view/viewRight.js';
import { runComparison } from './view/ResultView.js';
import { debounce } from './view/utill.js';
import { fetchData, fetchResultData } from './model.js';
let leftSide, rightSide;
const controlSide = (side, DataSide) => {
  const controlFetchData = async (data) => {
    try {
      const response = await fetchData(data);
      side.renderSearchData(response, controlSearchResult);
    } catch (err) {
      side.renderError(err.message);
    }
  };
  const controlSearchResult = async (id) => {
    const data = await fetchResultData(id);
    side.renderSearchResult(data);
    if (DataSide === 'left') {
      leftSide = data;
    }
    if (DataSide === 'right') {
      rightSide = data;
    }

    if (leftSide && rightSide) {
      runComparison(leftSide, rightSide);
    }
  };
  const controlInputField = (data) => {
    controlFetchData(data);
  };

  const init = () => {
    side.addEventHandler(debounce(controlInputField));
    side.hideResult();
  };
  init();
};

controlSide(ViewLeft, 'left');
controlSide(ViewRight, 'right');
