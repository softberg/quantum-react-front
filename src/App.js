import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import NotFound from './NotFound/NotFound';
import Posts from './components/Posts/Posts';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import About from './components/About/About';
import MyPosts from './components/MyPosts/MyPosts';
import Main from './components/Main/Main';
import RequireAuth from './components/Auth/RequireAuth';
import useAuth from './hooks/useAuth';
import SinglePost from './components/Posts/SinglePost/SinglePost';
import PostForm from './components/MyPosts/PostForm/PostForm';
import Verify from './components/Auth/Verify';
import Forget from './components/Auth/Forget';
import Reset from './components/Auth/Reset';
import { authMe } from './helpers/helpers';

function App() {
	const { setAuth } = useAuth()

	useEffect(() => {
		authMe(setAuth)
	}, [setAuth]);


	return <>
		<Routes>
			<Route path="/" element={<Main />}>
				<Route index element={<Home />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:postId" element={<SinglePost />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/forget" element={<Forget />} />
				<Route path="/verify" element={<Verify />} />
				<Route path="/reset/:reset_token" element={<Reset />} />
				<Route path="/about" element={<About />} />
				<Route element={<RequireAuth />}>
					<Route path="/my-posts" element={<MyPosts />} />
					<Route path="update-post/:postId" element={<PostForm pageTitle='Update Post' />} />
					<Route path="create-post" element={<PostForm pageTitle='Create Post' />} />
				</Route>
			</Route>
			<Route path="404" element={<NotFound />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</>
}

export default App;
