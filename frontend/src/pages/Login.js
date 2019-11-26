/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Login extends Component {
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
              <form style={{ paddingBottom: '20px' }} className="jumbotron border-top border-primary">
                <div className="form-group">
                  <label htmlFor="email">Tài khoản</label>
                  <input
                    className="form-control item"
                    type="email"
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
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
