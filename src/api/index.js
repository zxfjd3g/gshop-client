/*
包含项目中所有接口的请求函数: 接口请求函数
每个函数的返回值都是promise
*/
import ajax from './ajax';
import mockAjax from './mockAjax';
/* 首页相关 */
/*
首页三级分类
/api/product/getBaseCategoryList GET
*/
export const reqCategoryList = () => ajax('/product/getBaseCategoryList');

// 定义mock接口的请求函数
export const reqBanners = () => ajax('/cms/banner');

// 访问模拟接口
export const reqRecommends = () => mockAjax('/recommends');
export const reqFloors = () => mockAjax('/floors');

/* 搜索列表页 */
// 请求搜索匹配的商品相关数据
export const reqProductList = (searchParams) =>
  ajax.post('/list', searchParams);

/* 商品详情页 */
// 获取商品详情信息
export const reqDetailInfo = (skuId) => ajax.get(`/item/${skuId}`);

/*
15.获取当前商品促销和优惠券信息
/api/activity/findActivityAndCoupon/{skuId} GET
*/
export const reqDiscountList = (skuId) =>
  ajax.get(`/activity/findActivityAndCoupon/${skuId}`);

/*
16.领取优惠券
/api/activity/auth/getCouponInfo/{couponId} GET
*/
export const reqCouponInfo = (couponId) =>
  ajax.get(`/activity/auth/getCouponInfo/${couponId}`);

/* 购物车页 */
// 6.获取购物车列表 /api/cart/cartList
//注意:接口已修改
export const reqCartList = () => ajax.get('/cart/cartList');

// 7.添加到购物车(对已有物品进行数量改动)
/*
skuId: 商品ID
skuNum: 变化的数量   如果增加用正数, 如果减少用负数
*/
export const reqAddToCart = (skuId, skuNum) =>
  ajax.post(`/cart/addToCart/${skuId}/${skuNum}`);

// 8.切换商品选中状态
/*
0代表取消选中
1代表选中
*/
export const reqCheckCartItem = (skuId, isChecked) =>
  ajax.get(`/cart/checkCart/${skuId}/${isChecked}`);

/* 
批量选中购物车
POST /api/cart/batchCheckCart/{isChecked}
*/
export const reqCheckCartItems = (skuIdList, isChecked) =>
  ajax.post(`/cart/batchCheckCart/${isChecked}`, skuIdList);

// 9.删除购物车商品
export const reqDeleteCartItem = (skuId) =>
  ajax.delete(`/cart/deleteCart/${skuId}`);

/* 
批量删除购物车
*/
export const reqDeleteCartItems = (skuIdList) =>
  ajax.delete(`/cart/batchDeleteCart`, {
    data: skuIdList,
  });

/*
登陆
/api/user/passport/login POST  phone/password
*/
export function reqLogin(phone, password) {
  return ajax.post('/user/passport/login', { phone, password });
}

/*
获取用户信息(检查token)
*/
export const reqUserInfo = () => ajax('/user/passport/auth/getUserInfo');

/*
发送手机验证码
*/
export const reqSendCode = (phone) =>
  ajax.get(`/user/passport/sendCode/${phone}`);

/*
16.注册用户
/api/user/passport/register POST
phone/nickName/password/code
userInfo是包含上面3个属性的对象

{
  "code": "001141",
  "nickName": "atguigu",
  "password": "123123",
  "phone": "13754545454"
}
*/
export const reqRegister = (userInfo) =>
  ajax.post('/user/passport/register', userInfo);

/*
退出登陆
/api/user/passport/logout GET
*/
export const reqLogout = () => ajax('/user/passport/logout');

/*
11.获取我的订单列表
/api/order/auth/{page}/{limit} GET
page: 页码
limit: 每页数量
*/
export const reqOrders = (page, limit) => ajax(`/order/auth/${page}/${limit}`);

/*
10.获取订单交易页信息
/api/order/auth/trade GET
注意:接口已换,已配置新代理
*/
export const reqTradeInfo = () => ajax('/order/auth/trade');

/*
12.提交订单
/api/order/auth/submitOrder?tradeNo={tradeNo} POST
请求体参数对象的结构
  {
      "consignee": "admin",
      "consigneeTel": "15011111111",
      "deliveryAddress": "北京市昌平区2",
      "paymentWay": "ONLINE",
      "orderComment": "xxx",
      "orderDetailList": []
  }
*/
export const reqSumitOrder = (tradeNo, tradeInfo) =>
  ajax({
    // url: '/order/auth/submitOrder',
    url: '/order/info/auth/submitOrder',

    method: 'POST',
    params: { tradeNo },
    data: tradeInfo,
  });

/*
13.获取订单支付信息
/api/payment/weixin/createNative/{orderId} GET
*/
export const reqPayInfo = (orderId) =>
  ajax(`/payment/weixin/createNative/${orderId}`);

/*
14.查询支付订单状态
/api/payment/weixin/queryPayStatus/{orderId} GET
*/
export const reqOrderStatus = (orderId) =>
  ajax.get(`/payment/weixin/queryPayStatus/${orderId}`);

/*
17.获取用户地址列表
/api/user/userAddress/auth/findUserAddressList GET
*/
export const reqUserAddressList = () =>
  ajax.get(`/user/userAddress/auth/findUserAddressList`);

/*
18.获取地址大区列表
/api/user/userAddress/auth/findBaseRegion GET
*/
export const reqAddressBaseRegion = () =>
  ajax.get(`/user/userAddress/auth/findBaseRegion`);

/*
19.根据地址大区获取省份
/api/user/userAddress/auth/findBaseProvinceByRegionId/{regionId} GET
*/
export const reqAddressBaseProvinceByRegionId = (regionId) =>
  ajax.get(`/user/userAddress/auth/findBaseProvinceByRegionId/${regionId}`);

/*
20.新增用户地址
/api/user/userAddress/auth/save POST
*/
export const reqSaveUserAddress = (userAddressInfo) =>
  ajax.post(`/user/userAddress/auth/save`, userAddressInfo);

/*
21.删除用户地址
/api/user/userAddress/auth/delete/{userAddressId} GET
*/
export const reqRemoveUserAddress = (userAddressId) =>
  ajax.get(`/user/userAddress/auth/delete/${userAddressId}`);

/*
22.更新用户地址
/api/user/userAddress/auth/update POST
*/
export const reqUpdateUserAddress = (userAddressId) =>
  ajax.post(`/user/userAddress/auth/update`, userAddressId);

/*
23.获取订单商品详情详情
/api/order/auth/getOrderDetail/{orderDetailId} GET
*/
export const reqOrderDetail = (orderDetailId) =>
  ajax.get(`/order/auth/getOrderDetail/${orderDetailId}`);

/*
24. 根据订单id获取订单详情

/api/order/auth/${orderId}  GET
 */
export const reqOrderInfo = (orderId) => ajax.get(`/order/auth/${orderId}`);

/*
发起退款退货
/api/order/orderRefundInfo/auth/save POST
*/
export const orderRefund = (orderRefundInfo) =>
  ajax.post(`/order/orderRefundInfo/auth/save`, orderRefundInfo);

/*
获取退货列表
/api/order/orderRefundInfo/auth/${page}/${limit}  GET
*/
export const getRefundList = (page, limit) =>
  ajax.get(`/order/orderRefundInfo/auth/${page}/${limit}`);

/* 
退货后发货
GET /api/order/orderRefundInfo/auth/delevered/{id}/{trackingNo}
*/
export const delever = (id, trackingNo) =>
  ajax.get(`/order/orderRefundInfo/auth/delevered/${id}/${trackingNo}`);
