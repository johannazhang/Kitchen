// Functions to help with user actions

// environment configurations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// Send  request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.currentUser) {
                app.setState({ currentUser: json.currentUser });
            }
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        app.setState({ currentUser: ENV.user });
    }

};

// send POST request with the user to be logged in
export const login = (loginComp, app) => {
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginComp.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    fetch(request)
      .then(res => {
          if (res.status === 200) {
              return res.json();
          }
      })
      .then(json => {
          if (json.currentUser !== undefined) {
              app.setState({ currentUser: json.currentUser });
          }
      })
      .catch(error => {
          console.log(error);
      });
};

// send GET request to logout the current user
export const logout = (app) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            app.setState({
                currentUser: null,
            });
        })
        .catch(error => {
            console.log(error);
        });
};

// send POST request to create a new user
export const signup = (formComp) => {
      const url = `${API_HOST}/api/users`;

      const user = {name: formComp.state.name, email: formComp.state.email, password: formComp.state.password}

      const request = new Request(url, {
          method: "post",
          body: JSON.stringify(user),
          headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
          }
      });

      fetch(request)
        .then( res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
  };
