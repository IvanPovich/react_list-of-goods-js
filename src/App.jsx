import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/goodList/goodList';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_FILD_ALPHABET = 'alphabet';
const SORT_FILD_LENGTH = 'length';
const SORT_FILD_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, query }) {
  let preparedGoods = [...goods];

  if (query) {
    preparedGoods = preparedGoods.filter(good => good.includes(query));
  }

  if (sortField) {
    switch (sortField) {
      case SORT_FILD_ALPHABET:
        return preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      case SORT_FILD_LENGTH:
        return preparedGoods.sort(
          (good1, good2) => good1.length - good2.length,
        );
      case SORT_FILD_REVERSE:
        return preparedGoods.reverse();
      default:
        return 0;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    query: null,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FILD_ALPHABET && 'is-light'}`}
          onClick={() => setSortField(SORT_FILD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FILD_LENGTH && 'is-light'}`}
          onClick={() => setSortField(SORT_FILD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortField !== SORT_FILD_REVERSE && 'is-light'}`}
          onClick={() => setSortField(SORT_FILD_REVERSE)}
        >
          Reverse
        </button>

        {sortField !== '' ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField('')}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
