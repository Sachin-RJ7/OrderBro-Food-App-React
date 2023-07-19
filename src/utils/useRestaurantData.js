import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useRestaurantData = () => {
  const params = useParams();
  const { resId } = params;

  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    const api = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=23.0363768&lng=72.5466727&restaurantId=${resId}&submitAction=ENTER`;
    try {
      const response = await fetch(api);
      const data = await response.json();
      const restaurantInfo = data.data.cards[0].card.card.info;
      const menuItem =
        data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card
          .itemCards;

      setRestaurantData({
        name: restaurantInfo.name,
        cuisines: restaurantInfo.cuisines,
        areaName: restaurantInfo.areaName,
        lastTravel: restaurantInfo.sla.lastMileTravelString,
        rating: restaurantInfo.avgRatingString,
        totalRating: restaurantInfo.totalRatingsString,
        menuItem: menuItem,
      });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, errorMessage, restaurantData};
};

export default useRestaurantData;
