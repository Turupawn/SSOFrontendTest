import React from 'react'
import * as QueryString from "query-string"

import { withRouter } from 'react-router-dom';
class Home extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      token: ""
    };
    this.logout = this.logout.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentWillMount() {
    const { match, location, history } = this.props
    const params = QueryString.parse(location.search)

    var token = null

    if(params.token && this.state.token == "")
    {
      this.setState({ token: params.token })
      token = params.token
    }
    
    if(this.state.token != "")
    {
      token = this.state.token
    }
    
    if(token)
    {
      console.log('fdsa')
      const apiUrl = 'http://localhost:3000/api/v1/examples/me?user_token=' + token;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.updateUser(data))
    }
  }

  updateUser(data)
  {
    this.setState({ first_name: data["user"].first_name })
  }
  logout() {
    this.setState({ token: "", first_name: "" })
    window.location.href='/'
  }
  render () {
    return (
      <div>
        <a href="http://localhost:3000/sso_login?redirect_url=http://localhost:3001">
          Iniciar sesión
        </a>
        {this.state.first_name != "" &&
          <div>
            <p>Bienvenido { this.state.first_name }</p>
            <a href="#" onClick={this.logout}>
              Cerrar sesión
            </a>
          </div>
        }
      </div>
    )
  }
}
export default withRouter(Home)