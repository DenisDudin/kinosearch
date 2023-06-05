import { Pagination } from 'antd';

const PaginationComponent = (props) => {
  const { totalPages, currentPage, onChangePage } = props;

  return (
    <Pagination current={currentPage} total={totalPages} pageSize={1} showSizeChanger={false} onChange={onChangePage} />
  );
};

export default PaginationComponent;
