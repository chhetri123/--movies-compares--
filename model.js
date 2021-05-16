let leftSide, rightSide;

export const fetchData = async (searchTerm) => {
  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '260c416c',
        s: searchTerm,
      },
    });
    let data = response.data.Search;
    if (!data) throw Error('Not found Movie');
    return data;
  } catch (err) {
    throw err;
  }
};
export const fetchResultData = async (dataID) => {
  try {
    const response = await axios.get('https://www.omdbapi.com/', {
      params: {
        apikey: '260c416c',
        i: dataID,
      },
    });
    if (!response.data) throw Error('Search Result not found');
    return response.data;
  } catch (err) {
    throw err;
  }
};
