import { Input } from 'antd';

// const debounce = (fn, time) => {
//   let debounceTimer;
//   return function (...data) {
//     clearTimeout(time);
//     time = setTimeout(() => {
//       fn.apply(this, data);
//       clearTimeout(time);
//       time = null;
//     }, time);
//   };
// };

const SearchInput = () => {
  return <Input />;
};

export default SearchInput;
