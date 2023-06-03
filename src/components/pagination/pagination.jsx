import { Pagination } from 'antd';

// const MAX_CARDS = 20;
const PaginationComponent = (props) => {
  const { totalPages, currentPage, onChangeTab } = props;

  return (
    <Pagination current={currentPage} total={totalPages} pageSize={1} showSizeChanger={false} onChange={onChangeTab} />
  );
};

export default PaginationComponent;
