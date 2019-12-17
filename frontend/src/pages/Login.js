/* eslint-disable react/destructuring-assignment */
/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable arrow-parens */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import axios from 'axios';
// eslint-disable-next-line react/prefer-stateless-function

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
  }

  onChangePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // create isValid to check fields
    const user = {
      phone: this.state.phone,
      password: this.state.password,
    };
    axios.post('http://localhost:3001/api/login', user)
      .then((res) => {
        localStorage.setItem('user', res.data.token);
        // Redirect here
      })
      .catch((err) => {
        alert("Vui lòng nhập lại.");
      });

    this.setState({
      phone: '',
      password: '',
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid" style={{ marginTop: '100px' }} />
        <main className="page login-page bg-darkv" style={{ width: '35%', margin: 'auto' }}>
          <section className="clean-block clean-form dark">
            <div className="container">
              <div className="block-heading">
                <h2 className="text-primary" style={{ textAlign: 'center' }}>Đăng nhập</h2>
                <p style={{ textAlign: 'center' }}>
                  Đăng nhập vào hệ thống bằng tài khoản và mật khẩu được cấp bởi
                  chúng tôi
                </p>
              </div>
              <form onSubmit={this.onSubmit} style={{ paddingBottom: '20px' }} className="jumbotron border-top border-primary">
                <div className="form-group">
                  <label htmlFor="phone">Tài khoản</label>
                  <input
                    className="form-control item"
                    type="text"
                    id="phone"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChangePhone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <button className="btn btn-primary btn-block" type="submit">
                  Đăng nhập
                </button>
                <p className="text-center mt-2">
                  Quên mật khẩu?,&nbsp;
                  <a href="/">báo cáo quản trị viên.</a>
                </p>
              </form>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Login;
