import { Pagination } from 'antd';

const MAX_CARDS = 20;
const PaginationComponent = (props) => {
  const { totalPages, currentPage } = props;

  return (
    <Pagination
      current={currentPage}
      total={totalPages}
      defaultPageSize={MAX_CARDS}
      onChange={(page) => console.log(page)}
    />
  );
};

export default PaginationComponent;
