import getRefs from './getRefs';
import NewsApiService from './apiService';
import { clearContainer, fetchHits, newsApiService, randomList } from './searchEvent';

const refs = getRefs();

const option = {
  totalItems: 580,
  visiblePages: 3,
  itemsPerPage: 20,
};

function startPagination(func) {
  const totalEl = newsApiService.totalElements < 580 ? newsApiService.totalElements : 580;
  option.totalItems = totalEl;
  const pagination = new tui.Pagination(refs.pagination, option);
  pagination.on('beforeMove', function (e) {
    newsApiService.setPage(e.page);
    clearContainer();
    func();
  });
}
export { startPagination, option };
