import './App.css';
import React, { lazy, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { authMe } from './helpers/helpers';
import { useTranslation } from 'react-i18next';
import useAuth from './hooks/useAuth';
import Main from './components/Main/Main';

const Home 			= lazy(() => import('./components/Home/Home'));
const NotFound 		= lazy(() => import('./NotFound/NotFound'));
const Posts 		= lazy(() => import('./components/Posts/Posts'));
const SignUp 		= lazy(() => import('./components/Auth/SignUp'));
const SignIn 		= lazy(() => import('./components/Auth/SignIn'));
const About 		= lazy(() => import('./components/About/About'));
const MyPosts 		= lazy(() => import('./components/MyPosts/MyPosts'));
const RequireAuth 	= lazy(() => import('./components/Auth/RequireAuth'));
const SinglePost 	= lazy(() => import('./components/Posts/SinglePost/SinglePost'));
const PostForm 		= lazy(() => import('./components/MyPosts/PostForm/PostForm'));
const Verify 		= lazy(() => import('./components/Auth/Verify'));
const Forget 		= lazy(() => import('./components/Auth/Forget'));
const Reset 		= lazy(() => import('./components/Auth/Reset'));

function App() {
	const { setAuth } = useAuth()
	const { t } = useTranslation()
	useEffect(() => {
		authMe(setAuth)
	}, [setAuth]);


	return <>
		<React.Suspense>
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
						<Route path="update-post/:postId" element={<PostForm pageTitle={t('update_post')} />} />
						<Route path="create-post" element={<PostForm pageTitle={t('create_post')} />} />
					</Route>
				</Route>
				<Route path="404" element={<NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</React.Suspense>
	</>
}

export default App;
