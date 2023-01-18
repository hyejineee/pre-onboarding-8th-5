import { useState, MouseEvent } from 'react';

export default function Pagination({ refetch, lastPage, unit }: any) {
  const [startPage, setStartPage] = useState(0);

  const handleClickPageNumber = (event: MouseEvent<HTMLSpanElement>) => {
    if (!(event.target instanceof HTMLSpanElement)) return;
    // refetch({ page: Number(event.target.id) });
    refetch(Number(event.target.id));
  };

  const handleClickPrev = () => {
    if (startPage === 0) return;

    setStartPage(prev => prev - 1);
    // refetch({ page: startPage * unit + 1 - unit });
    refetch(startPage * unit + 1 - unit);
  };

  const handleClickNext = () => {
    if (startPage * unit + unit >= lastPage) return;

    setStartPage(prev => prev + 1);
    // refetch({ page: startPage * unit + 1 + unit });
    refetch(startPage * unit + 1 + unit);
  };

  return (
    <div>
      <button
        type='button'
        style={{ marginRight: '10px' }}
        onClick={handleClickPrev}
      >
        이전 페이지
      </button>

      {Array(unit)
        .fill(0)
        .map((_, i) =>
          i + 1 + startPage * unit > lastPage ? (
            <></>
          ) : (
            <button
              type='button'
              key={i}
              style={{ marginRight: '10px' }}
              onClick={handleClickPageNumber}
              id={String(i + 1 + startPage * unit)}
            >
              {i + 1 + startPage * unit}
            </button>
          ),
        )}

      <button
        type='button'
        style={{ marginRight: '10px' }}
        onClick={handleClickNext}
      >
        다음 페이지
      </button>
    </div>
  );
}
