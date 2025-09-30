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
import { useJobItems } from '../lib/hooks';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState('');
  const [jobItems, isLoading] = useJobItems(searchText);

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
      </Container>
      <Footer />
    </>
  );
}

export default App;
