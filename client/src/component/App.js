import React from 'react';

import { Route, Switch } from "react-router-dom";
import Login from "./login"
import AddPost from "./Addpost"
import signup from "./signup"
import navbar from "./navbar"
import ViewPost from "./viewPost"
import Comment from "./comment"
import Logout from "./logout"
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/addComment/:id" component={Comment} />
          <Route path="/viewPost" component={ViewPost} />
          <Route path="/addPost" component={AddPost} />
          <Route path="/signup" component={signup} />
          <Route path="/navbar" component={navbar} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>



      </div>
    </BrowserRouter>
  );
}

export default App;
