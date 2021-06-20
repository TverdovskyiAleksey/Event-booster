import getRefs from './get-Refs';
import NewsApiService from './apiService';
import { clearContainer, fetchHits, newsApiService, randomList } from './Search-event';

const refs = getRefs();

const option = {
  totalItems: 980,
  visiblePages: 3,
  itemsPerPage: 20,
};

function startPagination() {
  const totalEl = newsApiService.totalElements < 980 ? newsApiService.totalElements : 980;
  option.totalItems = totalEl;
  const pagination = new tui.Pagination(refs.pagination, option);
  pagination.on('beforeMove', function (e) {
    newsApiService.setPage(e.page);
    clearContainer();
    fetchHits();
    //     функция скролла;
  });
}

function startPaginationRandom() {
  const totalEl = newsApiService.totalElements < 980 ? newsApiService.totalElements : 980;
  option.totalItems = totalEl;
  const pagination = new tui.Pagination(refs.pagination, option);
  pagination.on('beforeMove', function (e) {
    // onScroll();
    newsApiService.setPage(e.page);
    clearContainer();
    randomList();
    //      функция скролла;
  });
}
// function onScroll() {
//   refs.eventList.scrollIntoView({
//     behavior: 'smooth',
//     block: 'start',
//   });
// }
export { startPaginationRandom, startPagination, option };
