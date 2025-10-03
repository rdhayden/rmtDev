import Background from './Background';
import Container from './Container';
import Footer from './Footer';
import Header, { HeaderTop } from './Header';
import Sidebar, { SideBarTop } from './Sidebar';
import ResultsCount from './ResultsCount';
import SortingControls from './SortingControls';
import JobList from './JobList';
import PaginationControls from './PaginationControls';
import Logo from './Logo';
import BookmarksButton from './BookmarksButton';
import SearchForm from './SearchForm';
import {
  useActiveId,
  useDebounce,
  useJobDetail,
  useJobItems,
} from '../lib/hooks';
import { useState } from 'react';
import JobItemContent from './JobItemContent';

function App() {
  const [searchText, setSearchText] = useState('');
  // debounce the search text input to avoid excessive network requests
  // the search text will only be updated after 250ms of inactivity
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItemsSlice: jobItems, isLoading } =
    useJobItems(debouncedSearchText);
  const activeId = useActiveId();

  // the colon syntax is a way to rename the variable while destructuring
  const { jobDetails, isLoading: jobDetailsIsLoading } = useJobDetail(activeId);

  return (
    <>
      <Background />
      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>
      <Container>
        <Sidebar>
          <SideBarTop>
            <ResultsCount />
            <SortingControls />
          </SideBarTop>

          <JobList jobItems={jobItems} isLoading={isLoading} />

          <PaginationControls />
        </Sidebar>

        <JobItemContent
          jobDetails={jobDetails}
          isLoading={jobDetailsIsLoading}
        />
      </Container>
      <Footer />
    </>
  );
}

export default App;
