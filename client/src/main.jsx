import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import Root, {loader as rootUserLoader} from './routes/root'
import AdminRoot from './routes/admin/adminRoot'
import Login, { action as loginAction } from './routes/login'
import {action as logoutAction} from './routes/logout'
import ErrorPage from './error-page'
import './index.css'
import CategoryRoot from './routes/admin/routes/categories/categoryRoot'
import CreateCategory, {
  action as createCategoryAction,
} from './routes/admin/routes/categories/createCategory'
import PrimeCategories from './routes/admin/routes/categories/getPrimeCategories'
import InfinitePrimes, {
  loader as infiniteCategoryLoader,
} from './routes/admin/routes/categories/InfinitePrimes'
import GetCategorySearch, {
  loader as searchCategoryLoader,
} from './routes/admin/routes/categories/getCategorySearch'
import DeleteCategory, { action as deleteCategoryAction } from './routes/admin/routes/categories/deleteCategory'
import EditCategory, {loader as editCategoryLoader, action as editCategoryAction} from './routes/admin/routes/categories/editCategory'
import GetSubCategories, {
  loader as subCategoriesLoader,
} from './routes/admin/routes/categories/getSubCategories'
import { loader as specialPrimaryLoader } from './routes/admin/routes/categories/getPrimariesLoader'
import ProductRoot from './routes/admin/routes/products/productRoot'
import CreateProduct, {action as createProductAction} from './routes/admin/routes/products/createProduct'
import ViewProductRoot from './routes/admin/routes/products/viewProductRoot'
import GetAllProducts, {loader as getAllProductsLoader} from './routes/admin/routes/products/getAllProducts'
import ProductSearch, {loader as productSearchLoader} from './routes/admin/routes/products/productSearch'
import EditProduct, { loader as editProductLoader, action as editProdcutAction } from './routes/admin/routes/products/editProduct'
import DeleteProduct, {action as deleteAction} from './routes/admin/routes/products/deleteProduct'
import SalesRoot from './routes/admin/routes/sales/salesRoot'
import CreateSales, { action as createSalesAction } from './routes/admin/routes/sales/createSales'
//import {loader as getAllSalesLoader} from './routes/admin/routes/sales/getAllSalesLoader'
import ViewSalesRoot from './routes/admin/routes/sales/viewSalesRoot'
import InfinitySales, {loader as infinitySalesLoader} from './routes/admin/routes/sales/infinitySales'
import EditSales, {loader as editSalesLoader, action as editSalesAction} from './routes/admin/routes/sales/editSales'
import DeleteSales, {action as deleteSalesAction} from './routes/admin/routes/sales/deleteSales'
import SearchSales, {loader as searchSalesLoader} from './routes/admin/routes/sales/searchSales'
import ProductRootClient from './routes/product/productRoot'
import ProductType from './routes/product/productType'
import {action as addToCartAction} from './routes/addToCart'
import {action as changeQtyAction} from './routes/changeQty'
import {action as changeSizeAction} from './routes/changeSize'
import { action as deleteItemAction } from './routes/deleteCartItem'
import {loader as allCategoriesLoader} from './routes/getAllCategories'
import CategoryProducts, {loader as categoryProductsLoader} from './routes/product/categoryProducts'
import SearchProductsClient, {loader as searchProductClientLoader} from './routes/product/searchProducts'
import SalesProductsClient, {loader as salesProductsClientLoader} from './routes/product/salesProducts'
import SingleProduct, {loader as singleProductLoader} from './routes/product/singleProduct'
import Addresses, {action as addAddressAction, loader as userAddressesLoader} from './routes/addresses'
import Checkout, {loader as checkoutCartLoader} from './routes/checkout'
import CheckoutForm from './routes/checkoutForm'
import CompletePage from './routes/completePage'
import OrderRoot from './routes/orders/orderRoot'
import ViewOrder, {loader as viewOrderLoader, action as viewOrderAction} from './routes/orders/ordersView'
import FilterOrders, {
  loader as filterOrderLoader,
  action as filterOrderAction,
} from './routes/orders/filterOrders'
import UserProfile, {action as profileAction} from './routes/admin/userProfile'
import HomePage from './routes/homePage'
import App from './routes/App'
//import {loader as last6Loader} from './routes/product/last6Loader'
//import loader from 'css-loader'
//import loader from 'css-loader'



const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootUserLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/sales/loader',
        lazy: () => import('./lazyloaders/getHomeSales'),
      },
      {
        path: '/product',
        element: <ProductRootClient />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/product/type',
            element: <ProductType />,
            errorElement: <ErrorPage />,
            lazy: () => import('./lazyloaders/productTypeLoader'),
          },
          {
            path: '/product/search',
            element: <SearchProductsClient />,
            errorElement: <ErrorPage />,
            loader: searchProductClientLoader,
          },
          {
            path: '/product/sales/:sales_id',
            element: <SalesProductsClient />,
            errorElement: <ErrorPage />,
            loader: salesProductsClientLoader,
          },
          {
            path: '/product/categoryProducts/:category_id',
            element: <CategoryProducts />,
            loader: categoryProductsLoader,
            errorElement: <ErrorPage />,
          },
          {
            path: '/product/addToCart',
            action: addToCartAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/product/changeQty',
            action: changeQtyAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/product/changeSize',
            action: changeSizeAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/product/deleteCartItem/:id',
            action: deleteItemAction,
          },
          {
            path: '/product/allCategories/loader',
            loader: allCategoriesLoader,
          },
          {
            path: '/product/last6/loader',
            lazy: () => import('./routes/product/last6Loader')
          },
        ],
      },
      {
        path: '/addresses',
        element: <Addresses />,
        action: addAddressAction,
        loader: userAddressesLoader,
      },
      {
        path: '/checkout/:address',
        element: <Checkout />,
        errorElement: <ErrorPage />,
        loader: checkoutCartLoader,
        children: [
          {
            index: true,
            element: <CheckoutForm />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/checkout/:address/complete',
            element: <CompletePage />,
          },
        ],
      },
      {
        path: '/singleProduct/:id',
        element: <SingleProduct />,
        loader: singleProductLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <Login />,
        action: loginAction,
        errorElement: <ErrorPage />,
      },
      {
        path: '/logout',
        errorElement: <ErrorPage />,
        action: logoutAction,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/admin/profile',
        element: <UserProfile />,
        errorElement: <ErrorPage />,
        action: profileAction,
      },
      {
        path: '/admin/orders',
        element: <OrderRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ViewOrder />,
            loader: viewOrderLoader,
            action: viewOrderAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/orders/filter',
            element: <FilterOrders />,
            loader: filterOrderLoader,
            action: filterOrderAction,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/admin/products',
        element: <ProductRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <CreateProduct />,
            action: createProductAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/products/delete/:id',
            element: <DeleteProduct />,
            action: deleteAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/products/edit/:id',
            element: <EditProduct />,
            errorElement: <ErrorPage />,
            loader: editProductLoader,
            action: editProdcutAction,
          },
          {
            path: '/admin/products/view',
            element: <ViewProductRoot />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <GetAllProducts />,
                loader: getAllProductsLoader,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/products/view/search',
                element: <ProductSearch />,
                loader: productSearchLoader,
                errorElement: <ErrorPage />,
              },
            ],
          },
        ],
      },
      {
        path: '/admin/categories',
        element: <CategoryRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/admin/categories/loader',
            loader: specialPrimaryLoader,
          },
          {
            index: true,
            element: <CreateCategory />,
            action: createCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/view',
            element: <PrimeCategories />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <InfinitePrimes />,
                loader: infiniteCategoryLoader,
                errorElement: <ErrorPage />,
              },
              {
                path: '/admin/categories/view/search',
                element: <GetCategorySearch />,
                loader: searchCategoryLoader,
                errorElement: <ErrorPage />,
              },
            ],
          },
          {
            path: '/admin/categories/delete/:id',
            action: deleteCategoryAction,
            element: <DeleteCategory />,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/edit/:id',
            element: <EditCategory />,
            loader: editCategoryLoader,
            action: editCategoryAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/categories/subs/:parent_id',
            element: <GetSubCategories />,
            loader: subCategoriesLoader,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: '/admin/sales',
        element: <SalesRoot />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <CreateSales />,
            errorElement: <ErrorPage />,
            action: createSalesAction,
          },
          {
            path: '/admin/sales/loader',
            lazy: () => import('./routes/admin/routes/sales/getAllSalesLoader'),
          },
          {
            path: '/admin/sales/view',
            element: <ViewSalesRoot />,
            errorElement: <ErrorPage />,
            children: [
              {
                index: true,
                element: <InfinitySales />,
                loader: infinitySalesLoader,
              },
              {
                path: '/admin/sales/view/search',
                element: <SearchSales />,
                loader: searchSalesLoader,
              },
            ],
          },
          {
            path: '/admin/sales/edit/:id',
            element: <EditSales />,
            loader: editSalesLoader,
            action: editSalesAction,
            errorElement: <ErrorPage />,
          },
          {
            path: '/admin/sales/delete/:id',
            element: <DeleteSales />,
            errorElement: <ErrorPage />,
            action: deleteSalesAction,
          },
        ],
      },
    ],
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <App router={router} />
  </React.StrictMode>,
)
