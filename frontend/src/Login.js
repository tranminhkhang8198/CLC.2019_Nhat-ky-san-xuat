import React from 'react';
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/css/smoothproducts.css"

function Login() {
    return (
        <div>
            <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
                <div className="container"><a className="navbar-brand logo" href="#">HTX 4.0</a><button data-toggle="collapse" className="navbar-toggler" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="navbar-toggler-icon" /></button>
                    <div className="collapse navbar-collapse" id="navcol-1">
                        <ul className="nav navbar-nav ml-auto" />
                    </div>
                </div>
            </nav>
            <main className="page login-page">
                <section className="clean-block clean-form dark">
                    <div className="container">
                        <div className="block-heading">
                            <h2 className="text-info">Đăng nhập</h2>
                            <p>Đăng nhập vào hệ thống bằng tài khoản và mật khẩu được cấp bởi chúng tôi</p>
                        </div>
                        <form style={{paddingBottom: '20px'}}>
                            <div className="form-group"><label htmlFor="email">Tài khoản</label><input className="form-control item" type="email" id="email" /></div>
                            <div className="form-group"><label htmlFor="password">Mật khẩu</label><input className="form-control" type="password" id="password" /></div><button className="btn btn-primary btn-block" type="submit">Đăng nhập</button>
                            <p className="text-center mt-2">Quên mật khẩu?,&nbsp;<a href="#">báo cáo quản trị viên.</a></p>
                        </form>
                    </div>
                </section>
            </main>
            <footer className="page-footer dark" style={{padding: 0}}>
                <div className="footer-copyright" style={{border: 0, backgroundColor: '#fff', color: '#858796', margin: 0}}>
                    <p style={{color: '#858796'}}>Copyright © HTX 4.0 2019</p>
                </div>
            </footer>
        </div>
    );
}

export default Login;

