import requests from "./request";

import mockRequests from "./mockAjax";
// 三级联动

export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" })

export const reqBannerList = () => mockRequests({ url: "/banner", method: "get" })

export const reqFloorList = () => mockRequests({ url: "/floor", method: "get" })

export const reqSearchInfo = (params) => requests({ url: "/list", method: "post" ,data:params})

export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:"get"})