import Axios from "axios";
import Cookies from "js-cookie";

const { REACT_APP_LIFERAY_API = "http://localhost:8080/api/jsonws" } =
  process.env;

const _getLiferayGroupId = () => {
  try {
    // eslint-disable-next-line no-undef
    const groupId = Liferay.ThemeDisplay.getSiteGroupId();
    return groupId;
  } catch (error) {
    console.warn("Not able to find Liferay GroupId\n", error);
    return "";
  }
};

const _getLiferayToken = () => {
  try {
    // eslint-disable-next-line no-undef
    const token = Liferay.authToken;
    return token;
  } catch (error) {
    console.warn("Not able to find Liferay auth token\n", error);
    return "";
  }
};

const LiferayAPI = Axios.create({
  baseURL: REACT_APP_LIFERAY_API,
  auth: {
    username: "test@liferay.com",
    password: "test",
  },
  headers: {
    "x-csrf-token": _getLiferayToken(),
  },
});

/**
 * @param {string} filter - Search string used to filter the results
 * @returns {Promise<{
 * id: string
 * title: string
 * description: string
 * }[]>} Filtered Array of business types
 */
const getBusinessTypes = async (filter = "") => {
  if (!filter.length) return [];

  const normalizedFilter = filter.toLowerCase().replace(/\\/g, "");

  const parentId = Cookies.get("CATEGORY_PARENT_ID");

  const assetCategories = await _getAssetCategoriesByParentId(parentId);

  const filteredBusinessTypes = _adaptAssetCategories(assetCategories).filter(
    ({ title, description }) =>
      title.toLowerCase().match(normalizedFilter) ||
      description.toLowerCase().match(normalizedFilter)
  );

  return filteredBusinessTypes;
};

/**
 * @param {string} id - Parent category Id of asset categories
 * @returns {Promise<{
 * categoryId: string
 * titleCurrentValue: string
 * descriptionCurrentValue: string
 * parentCategoryId: string
 * }[]>}  Array of matched categories
 */
const _getAssetCategoriesByParentId = async (id) => {
  const {
    data: { categories },
  } = await LiferayAPI.get("/assetcategory/search-categories-display", {
    params: {
      groupIds: _getLiferayGroupId(),
      parentCategoryIds: id,
      title: "",
      vocabularyIds: "",
      start: 0,
      end: 50,
    },
  });

  return categories;
};

/**
 * @param {{
 * categoryId: string
 * titleCurrentValue: string
 * descriptionCurrentValue: string
 * parentCategoryId: string
 * }[]}  data Array of matched categories
 * @returns {{
 * id: string
 * title: string
 * description: string
 * }[]} Array of business types
 */
const _adaptAssetCategories = (data = []) =>
  data.map(({ categoryId, titleCurrentValue, descriptionCurrentValue }) => ({
    id: categoryId,
    title: titleCurrentValue,
    description: descriptionCurrentValue,
  }));

export const LiferayService = {
  getBusinessTypes,
};
