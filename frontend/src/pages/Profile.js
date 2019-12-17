/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import Axios from 'axios';

// eslint-disable-next-line react/prefer-stateless-function
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      fullname: '',
      phone: '',
      username: '',
      address: '',
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem('user');
    const response = await Axios.get('/api/users/me', {
      headers: { Authorization: token },
    });
    if (response.status === 200) {
      const user = response.data;
      this.setState(() => ({
        avatar: user.avatar,
        fullname: user.name,
        phone: user.phone,
        username: user.user,
        address: user.address,
      }));
    }
  }

  render() {
    const {
      avatar, username, address, phone, fullname,
    } = this.state;
    return (
      <div className="container-fluid">
        <h3 className="text-dark mb-4">Thông tin cá nhân</h3>
        <div className="row mb-3">
          <div className="col-lg-4">
            <div className="card mb-3">
              <div className="card-body text-center shadow">
                <img alt="img" className="rounded-circle mb-3 mt-4" src={avatar} width={160} height={160} />
                <div className="mb-3">
                  <button className="btn btn-primary btn-sm" type="button">Thay đổi ảnh đại diện</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="row mb-3 d-none">
              <div className="col">
                <div className="card text-white bg-primary shadow">
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="m-0">Peformance</p>
                        <p className="m-0"><strong>65.2%</strong></p>
                      </div>
                      <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                    </div>
                    <p className="text-white-50 small m-0">
                      <i className="fas fa-arrow-up" />
                      &nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card text-white bg-success shadow">
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col">
                        <p className="m-0">Peformance</p>
                        <p className="m-0"><strong>65.2%</strong></p>
                      </div>
                      <div className="col-auto"><i className="fas fa-rocket fa-2x" /></div>
                    </div>
                    <p className="text-white-50 small m-0">
                      <i className="fas fa-arrow-up" />
                      &nbsp;5% since last month
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card shadow mb-3">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 font-weight-bold">Chỉnh sửa thông tin cá nhân</p>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="fullname">
                              <strong>Họ và tên</strong>
                              <br />
                            </label>
                            <input className="form-control" type="text" placeholder={fullname} name="fullname" />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="phone"><strong>Số điện thoại</strong></label>
                            <input className="form-control" type="email" placeholder={phone} name="phone" />
                          </div>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="username"><strong>Tài khoản</strong></label>
                            <input className="form-control" type="text" placeholder={username} name="username" disabled readOnly />
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="address"><strong>Mật khẩu</strong></label>
                            <input className="form-control" type="text" placeholder={address} name="address" required maxLength={128} />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <button className="btn btn-primary btn-sm" type="submit">Lưu cài đặt</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card shadow mb-5">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Báo cáo lỗi</p>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <form>
                  <div className="form-group">
                    <label htmlFor="signature">
                      <strong>Nội dung muốn báo cáo</strong>
                      <br />
                    </label>
                    <textarea className="form-control" rows={4} name="feedback" placeholder="Để thuận tiện cho quá trình sửa lỗi, bạn nên gửi báo cáo giống với ví dụ sau: Phản hồi chậm - Khi tôi thay đổi nội dung người dùng hoặc thêm mới thì phải đợi khoảng 1 phút mới có phản hồi." defaultValue="" />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary btn-sm" type="submit">Gửi báo cáo</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
