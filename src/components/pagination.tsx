import { Pagination as AntPagination } from 'antd';
import styled from 'styled-components';

type PaginationPropsType = {
  limit: number;
  totalItems: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Wrapper = styled.div`
  text-align: center;
  width: 100%;
  margin: 12px 0;
`;

export default function Pagination({
  limit,
  totalItems,
  currentPage,
  onChangePage,
}: PaginationPropsType) {
  return (
    <Wrapper>
      <AntPagination
        current={currentPage}
        onChange={onChangePage}
        defaultPageSize={limit}
        total={totalItems}
      />
    </Wrapper>
  );
}
