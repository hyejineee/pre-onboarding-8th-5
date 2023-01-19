import { Pagination as AntPagination } from 'antd';

type PaginationPropsType = {
  limit: number;
  totalItems: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

export default function Pagination({
  limit,
  totalItems,
  currentPage,
  onChangePage,
}: PaginationPropsType) {
  return (
    <AntPagination
      current={currentPage}
      onChange={onChangePage}
      defaultPageSize={limit}
      total={totalItems}
    />
  );
}
