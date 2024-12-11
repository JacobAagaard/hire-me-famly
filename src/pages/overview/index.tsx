import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { childrenData } from "../../api/mock";
import ChildCard from "../../components/ChildCard";

function OverviewPage() {
  const pageSize = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [children, setChildren] = useState(childrenData.slice(currentPage, pageSize)  );
  const [numCheckedIn, setNumCheckedIn] = useState(0);

  useEffect(() => {
    // const children = fetchChildren();
  }, []);

  useEffect(() => {
    if (!children) {
      return;
    }
    // setChildren(children);
    const numCheckedIn = children.filter((child) => child.checkedIn).length;
    setNumCheckedIn(numCheckedIn);
  }, [children]);

  const loadMore = async () => {
    if (currentPage * pageSize > childrenData.length) {
      // No more data to load
      return;
    }

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setChildren((prev) => [
      ...prev,
      ...childrenData.slice(prev.length, pageSize * nextPage),
    ]);
  };

  return (
    <div className="page-container">
      <div className="greeting-container">
        <span className="daily-greeting">Hi daycare provider! 👋</span>
      </div>
      {children && children.length > 0 && (
        <div>
          {numCheckedIn} of {childrenData.length} children checked in
        </div>
      )}
      <code className="summary">
        {children.length} of {childrenData.length} loaded
      </code>
      <InfiniteScroll
        className="grid-container"
        pageStart={0}
        loadMore={loadMore}
        hasMore={true || false}
      >
        {children?.map((child) => (
          <ChildCard
            key={child.childId}
            child={child}
            setChildren={setChildren}
            children={children}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default OverviewPage;
