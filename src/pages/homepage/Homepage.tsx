import { useState, useEffect } from "react";
import * as styled from "./style";
import * as sharedStyled from "../../style/sharedStyle";
import Chip from "../../components/customChip/Chip";
import { useFetchTabByClient } from "../../logic/query/getTabByClient";
import { useFetchTabitemByTab } from "../../logic/mutation/getTabItemByTabID";
import FooditemCard from "../../components/fooditemCard/FooditemCard";
import { Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const Homepage = () => {
  const [selectedTab, setSelectedTab] = useState("");

  const role = localStorage.getItem("role");
  const [fooditems, setFoodItems] = useState<any[]>([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track if more data is available

  const { data: clientTabData } = useFetchTabByClient(1);
  const getTabItemMutate = useFetchTabitemByTab();

  const handleTabitem = async (
    tabid: number,
    tabname: string,
    page: number = 1
  ) => {
    try {
      setSelectedTab(tabname);
      const response = await getTabItemMutate.mutateAsync([tabid, page]);
      if (response.length > 0) {
        setFoodItems((prev) => [...prev, ...response]);
      } else {
        setHasMore(false); // No more data available
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (clientTabData && clientTabData.length > 0) {
      const firstTab = clientTabData[0];
      handleTabitem(firstTab.id, firstTab.name);
    }
  }, [clientTabData]);

  const fetchMoreData = () => {
    if (selectedTab) {
      const selectedTabId = clientTabData.find(
        (tab: any) => tab.name === selectedTab
      )?.id;
      if (selectedTabId) {
        handleTabitem(selectedTabId, selectedTab, page + 1);
        setPage(page + 1);
      }
    }
  };

  return (
    <sharedStyled.allMainpageComponent>
      <styled.chipContainer>
        {clientTabData?.map((item: any) => (
          <Chip
            name={item?.name}
            key={item?.id}
            onClick={() => {
              setPage(1); // Reset to first page when selecting a new tab
              setFoodItems([]); // Clear previous food items
              setHasMore(true); // Reset hasMore flag
              handleTabitem(item?.id, item?.name);
            }}
          />
        ))}
      </styled.chipContainer>

      <InfiniteScroll
        dataLength={fooditems.length} // This is the length of the data that has been loaded
        next={fetchMoreData} // The function to load more data
        hasMore={hasMore} // Boolean to show if there are more items to load
        loader={<Skeleton active />} // A loader component to show while loading
        endMessage={<p>No more items to load</p>} // Message to show when no more items are left
      >
        <styled.flexColumnGap10>
          {fooditems?.map((item: any) => (
            <FooditemCard
              key={item?.id}
              name={item?.name}
              description={item?.description}
              price={item?.price}
              foodImage={item?.foodpictureURL}
            />
          ))}
        </styled.flexColumnGap10>
      </InfiniteScroll>
    </sharedStyled.allMainpageComponent>
  );
};

export default Homepage;
