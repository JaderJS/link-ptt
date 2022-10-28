import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignUp from "./pages/signup/SignUp"
import SignIn from "./pages/signin/SignIn"
import NotFound from "./pages/notfound/NotFound"
import PrivateRoutes from './utils/PrivateRoutes'
import User from './pages/user/User'
import WalkTalkie from './pages/walktalk/WalkTalk'

export default function Rout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path='/user' element={<User />} />
                    <Route path='/app' element={<WalkTalkie />} />
                </Route>
                <Route exact path="/" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
