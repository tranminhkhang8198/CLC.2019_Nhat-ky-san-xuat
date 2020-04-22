# CLC.2019_Quản lý nhật ký sản xuất
## :two_men_holding_hands: Project members
- Nguyễn Quang Khải, Nguyễn Minh Toàn, Nguyễn Văn Lợi, Đặng Huỳnh Phúc Hậu, Huỳnh Minh Nhật, Nguyễn Nhật Quang, Trần Minh Khang, Nguyễn Hoàng Huynh, Nguyễn Thái Ngọc
-----
## :golf: Objective
1. **Giai đoạn 1**: Xây dựng hệ thống Quản lý Hợp tác xã nông nghiệp 4.0 và hệ thống Quản lý nhật ký sản xuất trồng lúa
2. **Giai đoạn 2**: Xây dựng hệ thống Quản lý HTX theo tiêu chuẩn GlobalGAP/VietGAP
3. **Giai đoạn 3**: Xây dựng hệ thống Quản lý nhật ký Cây ăn quả và truy xuất nguồn gốc sản phẩm
4. **Giai đoạn 4**: Ứng dụng công nghệ blockchain cho hệ thống truy xuất nguồn gốc sản phẩm 

-----
## :computer: Development environment
- OS: Windows, MacOS, Linux
- API: Restful, NodeJS
- DB: MongoDB
- Mobile App: React Native

-----
## How to start
### In host machine
```
1. Start API server
$ cd backend
$ npm start

2. Start UI server
$ cd frontend
$ npm start
```

### Dockerization
```
1. Start both services
$ docker-compose up

2. Stop services
$ docker-compose up

$ docker rmi htx/ui:v1
$ docker rmi htx/api:v1
```

-----
## Project structure
```
| docs/
| packages/
| -- ...
| scripts
| -- ...
| .gitignore
| README.md
```

## Project teams
### APIs:
1. Tran Minh Khang
2. Nguyen Van Loi
3. Nguyen Nhat Quang

### Mobile app:
1. Huynh Minh Nhat
2. Dang Huynh Phuc Hau

### Web app:
1. Nguyen Minh Toan
2. Nguyen Thai Ngoc
3. Nguyen Quang Khai
4. Nguyen Hoang Huynh

## Phân tích chức năng
### Quản lý hệ thống
<img src="https://github.com/CTU-CICT/CLC.2019_Nhat-ky-san-xuat/blob/master/docs/srs/UC%20diagram/Actor%20-%20Quan%20ly%20he%20thong.png" width=60%>

### Quản lý HTX
<img src="https://github.com/CTU-CICT/CLC.2019_Nhat-ky-san-xuat/blob/master/docs/srs/UC%20diagram/Actor%20-%20Quan%20ly%20HTX.png" width=85%>

### Nông dân
<img src="https://github.com/CTU-CICT/CLC.2019_Nhat-ky-san-xuat/blob/master/docs/srs/UC%20diagram/Actor%20-%20Nong%20dan.png" width=70%>

## Project Roadmap

### APIs
| # 	|                    Task                   	| Start | Deadline 	| Progress 	| Report 	| UC     |
|:----:	|:-----------------------------------------	|:----:	|:---------:|:--------:	|:------:	|:------:|
|  1 	| Fertilizer management API                          |      	|          	|           |        	|        |
|  2 	| Plant protection product management API            |      	|          	|           |        	|        |
|  3 	| Good receipt API (for import product to warehouse) |      	|          	|          	|        	|        |
|  4 	| Good issue API (for export product from warehouse  |      	|          	|          	|        	|        |
|  5 	| Warehouse API                                      |      	|          	|          	|        	|        |
|  6 	| Cooperative management API                         |      	|          	|          	|        	|        |
|  7 	| Employee management API                            |      	|          	|          	|        	|        |
|  8 	| User management API                                |      	|          	|          	|        	|        |
|  9 	| Tool management API                                |      	|          	|          	|        	|        |
|  10	| Subcontractor management API                       |      	|          	|          	|        	|        |
|  11	| Diary management API                               |      	|          	|          	|        	|        |
|  12	| Field management API                               |      	|          	|          	|        	|        |




### Web app
| # 	|                    Task                   	| Start | Deadline 	| Progress 	| Report 	| UC     |
|:----:	|:-----------------------------------------	|:----:	|:---------:|:--------:	|:------:	|:------:|
|  1 	| Phan quyen Admin - Manager                             |      	|          	|           |        	|        |
|  2 	| Quan tri nhan su HTX (Admin)                             |      	|          	|           |        	|        |
|  3 	| Quan li kho phan bon (Manager)                             |      	|          	|          	|        	|        |
|  4 	| Quan li su kien HTX (Manager)                             |      	|          	|          	|        	|        |
|  5 	| Quan li kho thuoc BVTV (Manager)                             |      	|          	|          	|        	|        |
|  6 	| Quan li kho cong cu, dung cu (Manager)                             |      	|          	|          	|        	|        |
|  7 	| Quan li co so vat chat (Manager)                             |      	|          	|          	|        	|        |
|  8 	| Quan li nhan su HTX (Manager)                             |      	|          	|          	|        	|        |
|  9 	| Quan li giong lua (Manager)                             |      	|          	|          	|        	|        |





### Mobile app
| # 	|                    Task                   	| Start | Deadline 	| Progress 	| Report 	| UC     |
|:----:	|:-----------------------------------------	|:----:	|:---------:|:--------:	|:------:	|:------:|
|  1 	| Giao dien ghi nhat ky                             |      	| Done         	|           |        	|        |
|  2 	| Giao dien kho                             |      	|          	|           |        	|        |
|  3 	| Giao dien thu hoach                             |      	|          	|          	|        	|        |
|  4 	| Giao dien cac mua vu truoc                             |      	|          	|          	|        	|        |
|  5 	| Giao dien thong tin ca nhan,dang nhap,thong bao,...                             |      	| Done         	|          	|        	|        |
|  6 	| Goi API                             |      	|          	|          	|        	| On pending       |

