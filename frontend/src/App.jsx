import React from 'react';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';
import Lottie from 'react-lottie';
import animationData from '../src/animations/loading.json';
import './App.css';

//HOME
import Home from './pages/homePage/home';
//PUBLIC PAGE
import PublicPage from './pages/homePage/publicPage';
//AUTHENTICATION
import SignUp from './pages/authentication/signupPage/signup';
import SignIn from './pages/authentication/signinPage/signin';
import ForgotPassword from './pages/authentication/forgotpasswordPage/forgotpassword';
import ResetPassword from './pages/authentication/resetpasswordPage/resetpassword';
import Verified from './pages/authentication/verifiedPage/verified';
import VerifyResetPassword from './pages/authentication/verifiedPage/verifyresetpassword';
//VIEW PDF
import MyPdfViewer from './pages/pdfViewer/pdfviewer';
//PROFILE
import Profile from './pages/user/profilePage/profile';
//UPDATE PROFILE
import UpdateProfile from './pages/user/profilePage/updateProfile';
//BOOKSHELVES
import BookShelves from './pages/user/profilePage/bookshelves';
//MY BOOKS
import MyBooks from './pages/user/profilePage/MyBooks/mybooks';
//MY POSTS
import MyPosts from './pages/user/profilePage/MyPosts/myposts';
import CreatePost from './pages/user/profilePage/MyPosts/createpost';
import ListAllPosts from './components/Profile/MyPostsBody/Posts/ListAllPosts';
import LikedPosts from './pages/user/profilePage/likedposts';
//ORDERS
import Orders from './pages/user/profilePage/orders';
//ABOUT
import About from './pages/user/profilePage/about';
//CHAT
import Chat from './pages/chat/chatpage';
//BLOG
import Blog from './pages/Blog/blog';
//BOOK
import PDFViewer from './pages/pdfViewer/pdfviewer';
import useAxiosInterceptors from './axiosInstance/useAxiosInterceptors';
import PostDetails from './pages/user/profilePage/MyPosts/postdetails';
import { useQuery } from '@tanstack/react-query';
import CreateStory from './pages/user/profilePage/MyBooks/createStory';
import useAuthUser from './hooks/authentication/useAuthUser';
import BookInfo from './pages/Book/bookInfo';
import CategoryInfo from './pages/Category/CategoryInfo';
import Search from './pages/Search/search';
import Cart from './pages/Cart/cart';
import CheckoutPage from './pages/Checkout/checkoutPage';
import ProtectedRoute from './protectRoute/protectRoute';
import OrderDetailsPage from './pages/Order/OrderDetailsPage';
import Dashboard from './pages/Admin/Dashboard';
import Library from './pages/Admin/Library';
import { ChakraProvider } from '@chakra-ui/react';
import chakraTheme from './chakraTheme';
import CreateCategory from './pages/Admin/CreateCategory';
import AddNewBook from './pages/Admin/AddNewBook';
import LibraryCategories from './pages/Admin/LibraryCategories';
import SearchComponent from './pages/Search/searchComponent';
import BookListPage from './pages/user/profilePage/bookListPage';
import OrdersAdmin from './pages/Admin/Orders';
import Sales from './pages/Admin/Sales';
import Customers from './pages/Admin/Customers';
import PaymentSuccess from './components/Checkout/PaymentSuccess';

function App() {
    useAxiosInterceptors();
    const {authUser, isLoading } = useAuthUser();
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      },
    };

    if (isLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <Lottie 
                    height='50%'
                    width='50%'
                    options={defaultOptions}
                />  
            </div>
        );
    }

  return (
    <div className='p-4 flex items-center justify-center font-serif'>
        <Routes>
            {/* HOME */}
            <Route path='/' element={!authUser ? <PublicPage/> : <Navigate to='/home' /> } />
            {/* <Home />  */}
            <Route path='/home' element={
                <ProtectedRoute>
                  <Home /> 
                </ProtectedRoute>
            }/> 
            {/* AUTHENTICATION */}
            <Route path='/signup' element={<SignUp />}/>
            <Route path='/login' element={<SignIn />} />
            <Route path='/verified' element={<Verified />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/verify-reset' element={< VerifyResetPassword/>} />
            <Route path='/reset-password' element={<ResetPassword />} />
            {/* PROFILE */}
            <Route path='/profile' element={ <Profile />
            }/>
            {/* Bookshelves */}
            <Route path={`/profile/bookshelves`} element={ 
              <ProtectedRoute>
                <BookShelves/>
              </ProtectedRoute>
            } />
            {/* Bookshelves List */}
            <Route path={`/profile/bookshelves/:listName`} element={ 
              <ProtectedRoute>
                <BookListPage/>
              </ProtectedRoute>
            } />
            {/* My books */}
            <Route path={`/profile/mybooks`} element={
              <ProtectedRoute>
                <MyBooks/>
              </ProtectedRoute>
            } />
            <Route path={`/profile/add-story`} element={
              <CreateStory />
            } />
            {/* My posts */}
            <Route path={`/profile/my-posts`} element={
              <ProtectedRoute>
                <MyPosts/>
              </ProtectedRoute>
            } />
            <Route path={`/create-post`} element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            } />
            <Route path={`/list-posts`} element={
              <ProtectedRoute>
                <ListAllPosts />
              </ProtectedRoute>
            } />
            <Route path={`/posts/:postId`} element={
              <ProtectedRoute>
                <PostDetails />
              </ProtectedRoute>
            } />
            {/* <Route path={`/posts/:postId`} element={< UpdatePost />} /> */}
            {/* Liked posts */}
            <Route path={`/profile/liked-posts`} element={
              <ProtectedRoute>
                <LikedPosts/>
              </ProtectedRoute>
            } />
            {/* Orders */}
            <Route path={`/profile/orders`} element={
              <ProtectedRoute>
                <Orders/>
              </ProtectedRoute>
            } />
            <Route path={`/profile/order/:orderId`} element={
              <ProtectedRoute>
                <OrderDetailsPage/>
              </ProtectedRoute>
            } />
            {/* About */}
            <Route path={`/profile/about`} element={
              <ProtectedRoute>
                <About/>
              </ProtectedRoute>
            } />
            {/* EDIT PROFILE */}
            <Route path='/editprofile' element={
              <ProtectedRoute>
                <UpdateProfile/>
              </ProtectedRoute>
            } />
            {/* CHAT */}
            <Route path='/chatting' element={
              <ProtectedRoute>
                <ChakraProvider theme={chakraTheme}>
                  <Chat/>
                </ChakraProvider>
              </ProtectedRoute>
            } /> 
            {/* VIEW PDF */}
            <Route path='/view/:bookId' element={
              <ProtectedRoute>
                <PDFViewer />
              </ProtectedRoute>
            } />
            {/* BLOG */}
            <Route path='/blog' element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }  />
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            {/* BOOK */} 
            {/* /book/:bookId */}
            <Route path={'/book/:bookId'} element={
              <ProtectedRoute>
                <BookInfo />
              </ProtectedRoute>
            } />
            {/* /category/:categoryname */}
            {/* ///:levelOne/:levelTwo */}
            <Route path={'/category'} element={<CategoryInfo/>} />
            {/* SEARCH */}
            <Route path={'/search'} element={<Search/>} />
            {/* <Route path={'/search'} element={< SearchComponent/>} /> */}
            {/* CART */}
            <Route path={'/cart'} element={
              <ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
            } />
            {/* CHECKOUT */}
            <Route path={'/checkout'} element={
              <ProtectedRoute>
                <CheckoutPage/>
              </ProtectedRoute>
            } />
            <Route
              path={"/success"}
              element={
                <ProtectedRoute>
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            {/* --------------------------------------------------------------------------------------------- */}
            {/* ADMIN */}
            <Route path='/admin' element={<Dashboard/>} />
            <Route path='/admin/library' element={< Library/>} />
            <Route path='/admin/library/add-category' element={< CreateCategory/>} />
            <Route path='/admin/library/categories' element={< LibraryCategories/>} />
            <Route path='/admin/library/add-book' element={< AddNewBook/>} />
            <Route path='/admin/orders' element={<OrdersAdmin/>} />
            <Route path='/admin/sales' element={<Sales/>} />
            <Route path='/admin/customers' element={<Customers/>} />
        </Routes>
      <Toaster position="top-right"/>
    </div>
  );
}

export default App; 

