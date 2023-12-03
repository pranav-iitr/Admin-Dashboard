// function to paginate array in js

export const paginate = (array, page_size) => {
  let ans = [];
  for (let i = 0; i < array.length; i += page_size) {
    ans.push(array.slice(i, i + page_size));
  }
  console.log("ans", ans);
  return ans;
};
