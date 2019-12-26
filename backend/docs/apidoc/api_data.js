define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/register",
    "title": "User request creating new account",
    "version": "0.1.0",
    "name": "authRegister",
    "group": "Auth",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/auth/register",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personalId",
            "description": "<p>So CMND cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mat khau cua nguoi su dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Nguyen Van Loi\",\n  \"personalId\":\"384736273\",\n  \"address\": \"Ninh Kieu, Can Tho\",\n  \"phone\": \"093827463\",\n  \"email\": \"admin@gmail.com\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "personalId",
            "description": "<p>So CMND cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>Thoi gian nguoi dung duoc tao</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua nguoi su dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Nguyen Quang Khai\",\n    \"avatar\": \"http://localhost:3003/image-1576222546040.png\",\n    \"personalId\": \"381823821\",\n    \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n    \"email\": \"vanloi10c@gmail.com\",\n    \"user\": \"user\",\n    \"HTXId\": \"115\",\n    \"created\": \"2019-11-12T12:13:24.216Z\",\n    \"_id\": \"5dcaa1e4e363dc1df58f0317\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Name-is-required",
            "description": "<p>Thieu truong ten nguoi dung</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Personal-id-is-invalid",
            "description": "<p>So CMND sai</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Phone-number-already-exist",
            "description": "<p>Nguoi dung da ton tai trong CSDL</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Phone-number-is-reqired",
            "description": "<p>Thieu SDT</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Passsword-is-required-and-more-than-3-characters",
            "description": "<p>Khong co ma khau hoac mat khau qua ngan</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Phone number already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/api/cooperatives",
    "title": "Xóa thông tin của HTX.",
    "version": "0.1.0",
    "name": "DeleteCooperatives",
    "group": "Cooperatives",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của HTX trong CSDL (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "foreignName",
            "description": "<p>Tên nước ngoài của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "abbreviationName",
            "description": "<p>Tên viết tắt của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Logo của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Tình trạng họat động của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "cooperativeID",
            "description": "<p>Mã số của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "tax",
            "description": "<p>Mã số thuế của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "surrgate",
            "description": "<p>Người đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Giám đốc của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Số điện thoại của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Số fax của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>Địa chỉ website của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "representOffice",
            "description": "<p>Địa chỉ văn phòng đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String[]",
            "optional": false,
            "field": "docs",
            "description": "<p>Danh sách file liên quan của HTX (tùy chọn).</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -X DELETE http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Thông báo đã xóa thành công dữ liệu.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"responseMessage\": \"Xóa thành công: 1 dữ liệu\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Du-lieu-khong-ton-tai",
            "description": "<p>Dữ liệu không tồn tại.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Tac-vu-eyu-cau-phai-co-dieu-kien",
            "description": "<p>Tác vụ yêu cầu phải có điều kiện.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n {\n     \"error\": \"Dữ liệu không tồn tại\"\n }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "get",
    "url": "/api/cooperatives",
    "title": "Tìm kiếm thông tin HTX.",
    "version": "0.1.0",
    "name": "GetCooperatives",
    "group": "Cooperatives",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/cooperatives",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "query",
            "description": "<p>Dieu kien tim kiem.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "options",
            "description": "<p>Cau truc ket qua tra ve.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "resultNumber",
            "description": "<p>so luong ket qua tra ve theo phan trang (tuy chon).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>trang du lieu can tra ve theo phan trang (tuy chon).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Response Fileds": [
          {
            "group": "Response Fileds",
            "type": "Object[]",
            "optional": false,
            "field": "records",
            "description": "<p>Danh sach HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records._id",
            "description": "<p>ID cua Hop tac xa.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.name",
            "description": "<p>Tên gọi của hợp tác xã.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.foreignName",
            "description": "<p>Tên nước ngoài của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.abbreviationName",
            "description": "<p>Tên viết tắt.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.logo",
            "description": "<p>Logo của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.status",
            "description": "<p>Thông tin trạng thái của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.cooperativeID",
            "description": "<p>Mã số HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.tax",
            "description": "<p>Mã số thuế của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.surrgate",
            "description": "<p>Người đại diện.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.director",
            "description": "<p>Giám đốc.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.address",
            "description": "<p>Địa chỉ của hợp tác xã.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.phone",
            "description": "<p>Số điện thoại của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.fax",
            "description": "<p>Địa chỉ fax của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.website",
            "description": "<p>Đia chỉ website của HTX.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String",
            "optional": false,
            "field": "records.representOffice",
            "description": "<p>Văn phòng đại diện.</p>"
          },
          {
            "group": "Response Fileds",
            "type": "String[]",
            "optional": false,
            "field": "records.docs",
            "description": "<p>Danh sách tài liệu.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"records\": [\n        {\n            \"_id\": \"5de653f18a92cd1e06fc0b59\",\n            \"name\": \"Hop tac xa nga nam\",\n            \"foreignName\": \"Hop tac xa nga nam\",\n            \"abbreviationName\": \"NN\",\n            \"logo\": \"\",\n            \"status\": \"Dang hoat dong\",\n            \"cooperativeID\": \"HTXNN\",\n            \"tax\": \"NN23442\",\n            \"surrgate\": \"Nguyen Tan Vu\",\n            \"director\": \"Huynh Van Tan\",\n            \"address\": \"\",\n            \"phone\": \"0836738223\",\n            \"fax\": \"NN341\",\n            \"website\": \"nn.com\",\n            \"representOffice\": \"\",\n            \"docs\": \"\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Loi-Trong-qua-trinh-tim-kiem",
            "description": "<p>Lỗi trong quá trình tìm kiếm.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ID-khong-hop-le",
            "description": "<p>ID không hợp lệ</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"ID không hợp lệ\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "patch",
    "url": "/api/cooperatives",
    "title": "Cập nhật thông tin của HTX.",
    "version": "0.1.0",
    "name": "PatchCooperatives",
    "group": "Cooperatives",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của HTX trong CSDL (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "foreignName",
            "description": "<p>Tên nước ngoài của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "abbreviationName",
            "description": "<p>Tên viết tắt của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Logo của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Tình trạng họat động của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "cooperativeID",
            "description": "<p>Mã số của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "tax",
            "description": "<p>Mã số thuế của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "surrgate",
            "description": "<p>Người đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Giám đốc của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Số điện thoại của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Số fax của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>Địa chỉ website của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "representOffice",
            "description": "<p>Địa chỉ văn phòng đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "query",
            "type": "String[]",
            "optional": false,
            "field": "docs",
            "description": "<p>Danh sách file liên quan của HTX (tùy chọn).</p>"
          }
        ],
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của HTX trong CSDL (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "foreignName",
            "description": "<p>Tên nước ngoài của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "abbreviationName",
            "description": "<p>Tên viết tắt của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Logo của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Tình trạng họat động của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "cooperativeID",
            "description": "<p>Mã số của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "tax",
            "description": "<p>Mã số thuế của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "surrgate",
            "description": "<p>Người đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Giám đốc của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Số điện thoại của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Số fax của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>Địa chỉ website của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "representOffice",
            "description": "<p>Địa chỉ văn phòng đại diện của HTX (tùy chọn).</p>"
          },
          {
            "group": "body",
            "type": "String[]",
            "optional": false,
            "field": "docs",
            "description": "<p>Danh sách file liên quan của HTX (tùy chọn).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"Hop tac xa u minh ha\"\n\n}",
          "type": "json"
        }
      ]
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/cooperatives?_id=5df306ee040d111f9b9e56bf",
        "type": "curl"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "successMessage",
            "description": "<p>Số documents đã được update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"successMessage\": \"Số lượng dữ liệu đã chỉnh sửa: 4\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ID-khong-hop-le",
            "description": "<p>ID không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Nothing-to-update",
            "description": "<p>Query không kết quả hoặc dữ liệu đã được update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Nothing to update\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "post",
    "url": "/api/cooperatives",
    "title": "Thêm HTX mới",
    "version": "0.1.0",
    "name": "PostCooperatives",
    "group": "Cooperatives",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/cooperatives",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "foreignName",
            "description": "<p>Tên nước ngoài của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbreviationName",
            "description": "<p>Tên viết tắt của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Logo của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Tình trạng họat động của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cooperativeID",
            "description": "<p>Mã số của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "tax",
            "description": "<p>Mã số thuế của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "surrgate",
            "description": "<p>Tên người đại diện của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Tên giams đốc của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Số điện thoại của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Địa chỉ fax của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>Địa chỉ website của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "representOffice",
            "description": "<p>Địa chỉ văn phòng đại diện của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Danh sách file tài liệu liên quan đến HTX.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"foreignName\":\"Hop tac xa u minh ha3\",\n\t\"abbreviationName\":\"UMH3\",\n\t\"logo\":\"\",\n\t\"status\":\"Dang hoat dong\",\n\t\"cooperativeID\":\"HTXUMH3\",\n\t\"tax\":\"NN23446\",\n\t\"surrgate\":\"Nguyen Tan Vu\",\n\t\"director\":\"Huynh Van Tan\",\n\t\"phone\":\"0836738224\",\n\t\"email\":\"nn@gmail.com\",\n\t\"fax\":\"NN344\",\n\t\"website\":\"nn.com\",\n\t\"represendOffice\":\"\",\n\t\"docs\":\"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "foreignName",
            "description": "<p>Tên nước ngoài của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "abbreviationName",
            "description": "<p>Tên viết tắt của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logo",
            "description": "<p>Logo của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Tình trạng họat động của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "cooperativeID",
            "description": "<p>Mã số của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "tax",
            "description": "<p>Mã số thuế của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "surrgate",
            "description": "<p>Tên người đại diện của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Tên giams đốc của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Số điện thoại của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Địa chỉ fax của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "website",
            "description": "<p>Địa chỉ website của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "representOffice",
            "description": "<p>Địa chỉ văn phòng đại diện của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "docs",
            "description": "<p>Danh sách file tài liệu liên quan đến HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của htx trong csdl.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Hop tac xa U Minh Ha\",\n    \"foreignName\": \"Hop tac xa u minh ha\",\n    \"abbreviationName\": \"UMH\",\n    \"logo\": \"\",\n    \"status\": \"Dang hoat dong\",\n    \"cooperativeID\": \"HTXUMH\",\n    \"tax\": \"NN23445\",\n    \"surrgate\": \"Nguyen Tan Vu\",\n    \"director\": \"Huynh Van Tan\",\n    \"address\": \"\",\n    \"phone\": \"0836738224\",\n    \"fax\": \"NN344\",\n    \"website\": \"nn.com\",\n    \"representOffice\": \"\",\n    \"docs\": \"\",\n    \"_id\": \"5decdd74e8296d17b3e7a5a0\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "HTX-da-ton-tai-trong-csdl",
            "description": "<p>Hợp tác xã đã tồn tại trong csdl</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"HTX da ton tai trong csdl\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "post",
    "url": "/api/diaries",
    "title": "Tạo nhật ký mới.",
    "version": "0.1.0",
    "name": "PostDiaries",
    "group": "Diaries",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "plant_id",
            "description": "<p>ID của loại cây trồng.</p>"
          },
          {
            "group": "body",
            "type": "String[]",
            "optional": false,
            "field": "area_id",
            "description": "<p>ID của khu vực gieo trồng.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "HTX_id",
            "description": "<p>ID của HTX.</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "begin",
            "description": "<p>Thời gian bắt đầu mùa vụ (dạng ISO-8601)).</p>"
          },
          {
            "group": "body",
            "type": "Number",
            "optional": false,
            "field": "end",
            "description": "<p>Thời gian kết thúc mùa vụ (dạng ISO-8601)).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"plant_id\":\"dfejdkfsdh\",\n\t\"fields\":[\"5dedc932bad8e32650d38788\",\"5dedc93ebad8e32650d38789\"],\n\t\"HTX_id\":\"UM\",\n\t\"begin\":\"2019-12-13 04:14\",\n\t\"end\":\"2019-12-15 17:20\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant_id",
            "description": "<p>ID của loại cây trồng.</p>"
          },
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "area_id",
            "description": "<p>ID của khu vực gieo trồng.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "HTX_id",
            "description": "<p>ID của HTX.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "begin",
            "description": "<p>Thời gian bắt đầu mùa vụ (dạng ISO-8601)).</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "end",
            "description": "<p>Thời gian kết thúc mùa vụ (dạng ISO-8601)).</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của nhật ký trong CSDL.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"plant_id\": \"dfejdkfsdh\",\n    \"fields\": [\n        \"5dedc932bad8e32650d38788\",\n        \"5dedc93ebad8e32650d38789\"\n    ],\n    \"HTX_id\": \"UM\",\n    \"begin\": \"2019-12-12T21:14:00.000Z\",\n    \"end\": \"2019-12-15T10:20:00.000Z\",\n    \"_id\": \"5df32bce13f76d331d8fa1ec\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Loai-cay-trong-khong-hop-le",
            "description": "<p>Loại cây trồng không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Khu-vuc-khong-hop-le",
            "description": "<p>Khu vực không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "HTX-khong-hop-le",
            "description": "<p>Hợp tác xã không hợp lệ.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Ngay-bat-dau-khong-hop-le",
            "description": "<p>Ngày bắt đầu không hợp lệ</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Ngay-ket-thuc-khong-hop-le",
            "description": "<p>Ngày kết thúc không hợp lệ</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Thua-",
            "description": "<p>{}-Dang-duoc-su-dung thửa đang được sử dụng</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Loi-trong-qua-trinh-them-vao-CSDL",
            "description": "<p>Lỗi trong qúa trình thêm vào CSDL</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Lỗi trong qúa trình thêm vào CSDL\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Diaries"
  },
  {
    "type": "post",
    "url": "/api/fertilizers",
    "title": "Create new fertilizer",
    "name": "CreateFertilizer",
    "group": "Fertilizers",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/fertilizers",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n    \"ministry\": \"Công thương\",\n    \"province\": \"Bà Rịa - Vũng Tàu\",\n    \"enterprise\": \"Công ty TNHH Sản xuất NGÔI SAO VÀNG\",\n    \"type\": \"Phân vô cơ\",\n    \"name\": \"Phân vi lượng TE MAX ( SUPER CHELATE)\",\n    \"ingredient\": \"\",\n    \"lawDocument\": \"\",\n    \"isoCertOrganization\": \"\",\n    \"manufactureAndImport\": \"\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"_id\": \"5de75a92f4e889141cc24f7d\",\n    \"ministry\": \"Công thương\",\n    \"province\": \"Bà Rịa - Vũng Tàu\",\n    \"enterprise\": \"Công ty TNHH Sản xuất NGÔI SAO VÀNG\",\n    \"type\": \"Phân vô cơ\",\n    \"name\": \"Phân vi lượng TE MAX ( SUPER CHELATE)\",\n    \"ingredient\": \"\",\n    \"lawDocument\": \"\",\n    \"isoCertOrganization\": \"\",\n    \"manufactureAndImport\": \"\",\n    \"created\": \"2019-12-04T07:04:50.974Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Name-is-required",
            "description": "<p>Thiếu trường tên phân bón</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Fertilizer-exists",
            "description": "<p>Phân bón đã tồn tại</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Phân bón tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Phân bón với tên '\" + name + \"' đã tồn tại\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường tên phân bón:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập tên phân bón\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Fertilizers"
  },
  {
    "type": "delete",
    "url": "/api/fertilizers",
    "title": "Delete fertilizer",
    "name": "DeleteFertilizer",
    "group": "Fertilizers",
    "examples": [
      {
        "title": "Xóa phân bón theo _id:",
        "content": "curl -i http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24ef5",
        "type": "curl"
      },
      {
        "title": "Xóa phân báo theo tên:",
        "content": "curl -i http://localhost:3001/api/fertilizers?name=Phân bón Calcium Nitrate( Calcinit)",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của phân bón</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên của phân bón</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"successMessage\": \"Xóa phân bón thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"errorMessage\": \"Không tìm thấy phân bón\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Fertilizers"
  },
  {
    "type": "get",
    "url": "/api/fertilizers",
    "title": "Get all fertilizers with pageNumber and nPerPage",
    "name": "GetAllFertilizers",
    "group": "Fertilizers",
    "examples": [
      {
        "title": "Tìm kiếm phân bón:",
        "content": "curl -i http://localhost:3001/api/fertilizers?pageNumber=9&nPerPage=20",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Số thứ tự trang cần lấy</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nPerPage",
            "description": "<p>Số lượng thuốc bvtv trên mỗi trang</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalProducts",
            "description": "<p>Tổng số phân bón trong danh mục</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Tổng số lượng trang</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"totalProducts\": 14152,\n    \"totalPages\": 708,\n    \"data\": [\n        {\n            \"_id\": \"5de75a92f4e889141cc24ee8\",\n            \"ministry\": \"Công thương\",\n            \"province\": \"Bà Rịa - Vũng Tàu\",\n            \"enterprise\": \"Công ty TNHH YARA Việt Nam\",\n            \"type\": \"Phân vô cơ\",\n            \"name\": \"Phân bón NPK Kristalon Scarlet (7.5-12-36+TE)\",\n            \"ingredient\": \"Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%\",\n            \"lawDocument\": \"Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%\",\n            \"isoCertOrganization\": \"\",\n            \"manufactureAndImport\": \"\",\n            \"created\": \"2019-12-04T07:04:50.952Z\"\n        },\n        {\n            \"_id\": \"5de75a92f4e889141cc24efd\",\n            \"ministry\": \"Công thương\",\n            \"province\": \"Bà Rịa - Vũng Tàu\",\n            \"enterprise\": \"Công ty TNHH YARA Việt Nam\",\n            \"type\": \"Phân vô cơ\",\n            \"name\": \"Phân bón NPK 15-9-20+TE\",\n            \"ingredient\": \"Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%\",\n            \"lawDocument\": \"Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%\",\n            \"isoCertOrganization\": \"\",\n            \"manufactureAndImport\": \"\",\n            \"created\": \"2019-12-04T07:04:50.956Z\"\n        },\n        {\n            \"_id\": \"5de75a92f4e889141cc24f7d\",\n            \"ministry\": \"Công thương\",\n            \"province\": \"Bà Rịa - Vũng Tàu\",\n            \"enterprise\": \"Công ty TNHH Sản xuất NGÔI SAO VÀNG\",\n            \"type\": \"Phân vô cơ\",\n            \"name\": \"Phân vi lượng TE MAX ( SUPER CHELATE)\",\n            \"ingredient\": \"\",\n            \"lawDocument\": \"\",\n            \"isoCertOrganization\": \"\",\n            \"manufactureAndImport\": \"\",\n            \"created\": \"2019-12-04T07:04:50.974Z\"\n        },\n        ...\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Fertilizers"
  },
  {
    "type": "get",
    "url": "/api/fertilizers",
    "title": "Get fertilizer by query",
    "name": "GetFertilizerByQuery",
    "group": "Fertilizers",
    "examples": [
      {
        "title": "Tìm kiếm phân bón theo _id:",
        "content": "curl -i http://localhost:3001/api/fertilizers/query?_id=5de75a92f4e889141cc24ef5",
        "type": "curl"
      },
      {
        "title": "Tìm kiếm phân bón theo tên:",
        "content": "curl -i http://localhost:3001/api/fertilizers/query?name=Phân bón Calcium Nitrate( Calcinit)",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Số trang cần lấy</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nPerPage",
            "description": "<p>Số lượng thuốc bvtv trên mỗi trang</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n    {\n        \"_id\": \"5de75a92f4e889141cc24ef5\",\n        \"ministry\": \"Công thương\",\n        \"province\": \"Bà Rịa - Vũng Tàu\",\n        \"enterprise\": \"Công ty TNHH YARA Việt Nam\",\n        \"type\": \"Phân vô cơ\",\n        \"name\": \"Phân bón Calcium Nitrate( Calcinit)\",\n        \"ingredient\": \"Nts: 15,4%; CaO: 26,5%; Độ ẩm: 0,8%\",\n        \"lawDocument\": \"Nts: 15,4%; CaO: 26,5%; Độ ẩm: 0,8%\",\n        \"isoCertOrganization\": \"\",\n        \"manufactureAndImport\": \"\",\n        \"created\": \"2019-12-04T07:04:50.955Z\"\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"errorMessage\": \"Không tìm thấy phân bón\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Fertilizers"
  },
  {
    "type": "patch",
    "url": "/api/fertilizers",
    "title": "Update fertilizer",
    "name": "UpdateFertilizer",
    "group": "Fertilizers",
    "examples": [
      {
        "title": "Update phân bón theo _id:",
        "content": "curl -i http://localhost:3001/api/fertilizers?_id=5de75a92f4e889141cc24f7d",
        "type": "curl"
      },
      {
        "title": "Update phân bón theo tên:",
        "content": "curl -i http://localhost:3001/api/fertilizers?_name=Phân vi lượng TE MAX ( SUPER CHELATE)",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n{\n    \"ministry\": \"updated\",\n    \"province\": \"updated\",\n    \"enterprise\": \"updated\",\n    \"type\": \"updated\",\n    \"name\": \"updated\",\n    \"ingredient\": \"updated\",\n    \"lawDocument\": \"updated\",\n    \"isoCertOrganization\": \"updated\",\n    \"manufactureAndImport\": \"updated\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ministry",
            "description": "<p>Bộ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "province",
            "description": "<p>Tỉnh</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "enterprise",
            "description": "<p>Tên doanh nghiệp</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Loại phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên phân bón</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "ingredient",
            "description": "<p>Thành phần, hàm lượng chất dinh dưỡng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lawDocument",
            "description": "<p>Căn cứ, tiêu chuẩn, quy định</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "isoCertOrganization",
            "description": "<p>Tổ chức chứng nhận hợp quy</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufactureAndImport",
            "description": "<p>Nhập khẩu, xuất khẩu</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n\n{\n    \"_id\": \"5de75a92f4e889141cc24f7d\",\n    \"ministry\": \"updated\",\n    \"province\": \"updated\",\n    \"enterprise\": \"updated\",\n    \"type\": \"updated\",\n    \"name\": \"updated\",\n    \"ingredient\": \"updated\",\n    \"lawDocument\": \"updated\",\n    \"isoCertOrganization\": \"updated\",\n    \"manufactureAndImport\": \"updated\",\n    \"created\": \"2019-12-04T07:04:50.974Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"errorMessage\": \"Không tìm thấy phân bón\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Fertilizers"
  },
  {
    "type": "post",
    "url": "/api/warehouse/plant-protection-products",
    "title": "Create new plant protection product warehouse",
    "name": "CreatePlantProtectionProductWarehouse",
    "group": "PlantProtectionProductWarehouses",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/warehouse/plant-protection-products",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"plantProtectionProductId\": \"5df20540e2b16e4d09842e26\",\n    \"tradeDate\": \"2019-01-14\",\n    \"quantity\": \"2\",\n    \"manufacturingDate\": \"2019-02-18\",\n    \"expiryDate\": \"2019-04-28\",\n    \"distributionAgent\": \"Cty Thuoc Diet Co\",\n    \"quarantineDate\": \"2\",\n    \"cooperativeId\": \"HTXUMH3\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Id của dữ liệu thuốc vừa được thêm vào kho</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Thời gian dữ liệu mới được lưu vào db</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"plantProtectionProductId\": \"5df20540e2b16e4d09842e26\",\n    \"tradeDate\": \"2019-01-14\",\n    \"quantity\": \"2\",\n    \"manufacturingDate\": \"2019-02-18\",\n    \"expiryDate\": \"2019-04-28\",\n    \"quarantineDate\": \"2\",\n    \"distributionAgent\": \"Cty Thuoc Diet Co\",\n    \"cooperativeId\": \"HTXUMH3\",\n    \"created\": \"2019-12-20T15:56:40.048Z\",\n    \"_id\": \"5dfcef3b83ec1418baf42a34\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "plantProtectionProductId-is-required",
            "description": "<p>Trường id thuốc bvtv là bắt buộc</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CooperativeId-is-required",
            "description": "<p>Trường id hợp tác xã là bắt buộc</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tradeDate-must-be-a-date",
            "description": "<p>Trường tradeDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "manufacturingDate-must-be-a-date",
            "description": "<p>Trường manufacturingDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "expiryDate-must-be-a-date",
            "description": "<p>Trường expiryDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "quantity-must-be-a-number",
            "description": "<p>Trường quantity phải là số nguyên dương</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "quarantineDate-must-be-a-number",
            "description": "<p>Trường quarantineDate phải là số nguyên dương</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "plant-protection-product-not-found",
            "description": "<p>Không tìm thấy thuốc bảo vệ thực vật trong danh mục</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "cooperative-not-found",
            "description": "<p>Không tìm thấy HTX</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Thuốc bvtv không tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Thuốc bảo vệ thực vật không tồn tại trong danh mục\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường id thuốc bvtv:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập id thuốc bảo vệ thực vật\"\n}",
          "type": "json"
        },
        {
          "title": "HTX không tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Hợp tác xã không tồn tại\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường id HTX:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập id họp tác xã\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường quantity:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập số lượng\"\n}",
          "type": "json"
        },
        {
          "title": "Trường quantity phải là số nguyên dương:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Số lượng phải là số nguyên dương\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường quarantineDate:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập thời gian cách ly\"\n}",
          "type": "json"
        },
        {
          "title": "Trường quarantineDate phải là số nguyên dương:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Thời gian cách ly phải là số nguyên dương\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường manufacturingDate:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập ngày sản xuất\"\n}",
          "type": "json"
        },
        {
          "title": "Trường manufacturingDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Ngày sản xuất không hợp lệ\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường expiryDate:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập hạn sử dụng\"\n}",
          "type": "json"
        },
        {
          "title": "Trường expiryDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Hạn sử dụng không hợp lệ\"\n}",
          "type": "json"
        },
        {
          "title": "Trường tradeDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Ngày mua không hợp lệ\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProductWarehouses"
  },
  {
    "type": "delete",
    "url": "/api/warehouse/plant-protection-products/:id",
    "title": "Delete plant protection product warehouse by id",
    "name": "DeletePlantProtectionProductWarehouseById",
    "group": "PlantProtectionProductWarehouses",
    "examples": [
      {
        "title": "Xóa thuốc bvtv trong kho theo _id:",
        "content": "curl -i http://localhost:3001//apiwarehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>Id của dữ liệu phân bón được lưu trong kho (NOT plantProtectionProductId)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"successMessage\": \"Thuốc bảo vệ thực vật được xóa khỏi kho thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"errorMessage\": \"Thuốc bảo vệ thực vật không tồn tại trong kho\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProductWarehouses"
  },
  {
    "type": "get",
    "url": "/api/warehouse/plant-protection-products",
    "title": "Get all plant protection product warehourses with pageNumber and nPerPage",
    "name": "GetAllPlantProtectionProductWarehouses",
    "group": "PlantProtectionProductWarehouses",
    "examples": [
      {
        "title": "Tìm kiếm tất cả thuốc bvtv và phân trang:",
        "content": "curl -i http://localhost:3001/api/warehouse/plant-protection-products?pageNumber=1&nPerPage=20",
        "type": "curl"
      },
      {
        "title": "Tìm kiếm tất cả thuốc bvtv theo HTX và phân trang:",
        "content": "curl -i http://localhost:3001/api/warehouse/plant-protection-products?cooperativeId=HTXNN&pageNumber=1&nPerPage=20",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Số thứ tự trang cần lấy</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nPerPage",
            "description": "<p>Số lượng thuốc bvtv trên mỗi trang</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cooperativeId",
            "description": "<p>Id của hợp tác xã</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Tổng số lượng trang</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Id của dữ liệu thuốc vừa được thêm vào kho</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Thời gian dữ liệu mới được lưu vào db</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"totalPages\": 10,\n    \"data\": [\n        {\n            \"_id\": \"5dfd66fc2ea5880f577c38a4\",\n            \"plantProtectionProductId\": \"5df20540e2b16e4d09842e24\",\n            \"tradeDate\": \"2019-01-14\",\n            \"quantity\": \"2\",\n            \"manufacturingDate\": \"2019-02-18\",\n            \"expiryDate\": \"2019-04-28\",\n            \"quarantineDate\": \"2\",\n            \"distributionAgent\": \"Cty Thuoc Diet Co\",\n            \"cooperativeId\": \"HTXUMH3\",\n            \"created\": \"2019-12-21T00:25:12.075Z\",\n            \"plantProtectionProductName\": \"Abagold 55EC\"\n        },\n        {\n            \"_id\": \"5dfd67d3cdb9e2106e3df625\",\n            \"plantProtectionProductId\": \"5df20540e2b16e4d09842e2e\",\n            \"tradeDate\": \"2019-01-14\",\n            \"quantity\": \"2\",\n            \"manufacturingDate\": \"2019-02-18\",\n            \"expiryDate\": \"2019-04-28\",\n            \"quarantineDate\": \"2\",\n            \"distributionAgent\": \"Cty Thuoc Diet Co\",\n            \"cooperativeId\": \"HTXNN\",\n            \"created\": \"2019-12-21T00:31:12.409Z\",\n            \"plantProtectionProductName\": \"Aba-navi 5.5EC\"\n        },\n        {\n            \"_id\": \"5dfd67575953c80fe78f9645\",\n            \"plantProtectionProductId\": \"5df20540e2b16e4d09842e33\",\n            \"tradeDate\": \"2019-01-14\",\n            \"quantity\": \"2\",\n            \"manufacturingDate\": \"2019-02-18\",\n            \"expiryDate\": \"2019-04-28\",\n            \"quarantineDate\": \"2\",\n            \"distributionAgent\": \"Cty Thuoc Diet Co\",\n            \"cooperativeId\": \"HTXNN\",\n            \"created\": \"2019-12-21T00:28:03.627Z\",\n            \"plantProtectionProductName\": \"Abasuper 3.6EC\"\n        }   \n        ...\n    ]\n    \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Page-not-found",
            "description": "<p>Trang tìm kiếm không tồn tại</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Page not found:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"errorMessage\": \"Trang tìm kiếm không tồn tại\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProductWarehouses"
  },
  {
    "type": "get",
    "url": "/api/warehouse/plant-protection-products/:id",
    "title": "Get plant protection product warehourses by id",
    "name": "GetPlantProtectionProductWarehousesById",
    "group": "PlantProtectionProductWarehouses",
    "examples": [
      {
        "title": "Tìm kiếm thuốc bvtv trong kho theo id:",
        "content": "curl -i http://localhost:3001/api/warehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Số thứ tự trang cần lấy</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nPerPage",
            "description": "<p>Số lượng thuốc bvtv trên mỗi trang</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "cooperativeId",
            "description": "<p>Id của hợp tác xã</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Id của dữ liệu thuốc vừa được thêm vào kho</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Thời gian dữ liệu mới được lưu vào db</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5dfd66fc2ea5880f577c38a4\",\n        \"plantProtectionProductId\": \"5df20540e2b16e4d09842e24\",\n        \"tradeDate\": \"2019-01-14\",\n        \"quantity\": \"2\",\n        \"manufacturingDate\": \"2019-02-18\",\n        \"expiryDate\": \"2019-04-28\",\n        \"quarantineDate\": \"2\",\n        \"distributionAgent\": \"Cty Thuoc Diet Co\",\n        \"cooperativeId\": \"HTXUMH3\",\n        \"created\": \"2019-12-21T00:25:12.075Z\",\n        \"plantProtectionProductName\": \"Abagold 55EC\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Plant-protection-product-not-found",
            "description": "<p>Thuốc bvtv không tồn tại</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Plant protection product not found:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"errorMessage\": \"Thuốc bảo vệ thực vật không tồn tại trong kho\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProductWarehouses"
  },
  {
    "type": "patch",
    "url": "/api/warehouse/plant-protection-products/:id",
    "title": "Update plant protection product warehouse by id",
    "name": "UpdatePlantProtectionProductWarehouseById",
    "group": "PlantProtectionProductWarehouses",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/warehouse/plant-protection-products/5dfd66fc2ea5880f577c38a4",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    {\n         \"plantProtectionProductId\": \"5df20540e2b16e4d09842e2e\",\n         \"tradeDate\": \"2019-12-12\",\n         \"quantity\": \"99\",\n         \"manufacturingDate\": \"2019-12-12\",\n         \"expiryDate\": \"2020-12-12\",\n         \"distributionAgent\": \"updated\",\n         \"quarantineDate\": \"99\",\n         \"cooperativeId\": \"HTXNN\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductId",
            "description": "<p>Id thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "tradeDate",
            "description": "<p>Ngày mua (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quantity",
            "description": "<p>Số lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "manufacturingDate",
            "description": "<p>Ngày sản xuất (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "expiryDate",
            "description": "<p>Hạn sử dụng (ISO8601 Format)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "distributionAgent",
            "description": "<p>Đại lý phân phối</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "quarantineDate",
            "description": "<p>Thời gian cách ly</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>Id của dữ liệu thuốc vừa được thêm vào kho</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "optional": false,
            "field": "created",
            "description": "<p>Thời gian dữ liệu mới được lưu vào db</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"_id\": \"5dfd66fc2ea5880f577c38a4\",\n    \"plantProtectionProductId\": \"5df20540e2b16e4d09842e2e\",\n    \"tradeDate\": \"2019-12-12\",\n    \"quantity\": \"99\",\n    \"manufacturingDate\": \"2019-12-12\",\n    \"expiryDate\": \"2020-12-12\",\n    \"quarantineDate\": \"99\",\n    \"distributionAgent\": \"updated\",\n    \"cooperativeId\": \"HTXNN\",\n    \"created\": \"2019-12-21T02:55:59.859Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "tradeDate-must-be-a-date",
            "description": "<p>Trường tradeDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "manufacturingDate-must-be-a-date",
            "description": "<p>Trường manufacturingDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "expiryDate-must-be-a-date",
            "description": "<p>Trường expiryDate phải là ngày với định dạng ISO8601</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "quantity-must-be-a-number",
            "description": "<p>Trường quantity phải là số nguyên dương</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "quarantineDate-must-be-a-number",
            "description": "<p>Trường quarantineDate phải là số nguyên dương</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "plant-protection-product-not-found",
            "description": "<p>Không tìm thấy thuốc bảo vệ thực vật trong danh mục</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "cooperative-not-found",
            "description": "<p>Không tìm thấy HTX</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Thuốc bvtv không tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Thuốc bảo vệ thực vật không tồn tại trong danh mục\"\n}",
          "type": "json"
        },
        {
          "title": "HTX không tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Hợp tác xã không tồn tại\"\n}",
          "type": "json"
        },
        {
          "title": "Trường quantity phải là số nguyên dương:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Số lượng phải là số nguyên dương\"\n}",
          "type": "json"
        },
        {
          "title": "Trường quarantineDate phải là số nguyên dương:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Thời gian cách ly phải là số nguyên dương\"\n}",
          "type": "json"
        },
        {
          "title": "Trường manufacturingDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Ngày sản xuất không hợp lệ\"\n}",
          "type": "json"
        },
        {
          "title": "Trường expiryDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Hạn sử dụng không hợp lệ\"\n}",
          "type": "json"
        },
        {
          "title": "Trường tradeDate phải là định dạng ngày:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Ngày mua không hợp lệ\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProductWarehouses"
  },
  {
    "type": "post",
    "url": "/api/plant-protection-products",
    "title": "Create new plant protection product",
    "name": "CreatePlantProtectionProduct",
    "group": "PlantProtectionProducts",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \" Ababetter  3.6EC\",\n    \"activeIngredient\": \"Abamectin\",\n    \"content\": \"36g/l\",\n    \"plantProtectionProductGroup\": \"Thuốc trừ sâu\",\n    \"ghs\": \"7\",\n    \"who\": \"6\",\n    \"scopeOfUse\": [\n        {\n            \"plant\": \"dưa hấu\",\n            \"pest\": \"bọ trĩ\",\n            \"dosage\": \"0.2 - 0.3 lít/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\"\n        },\n        {\n            \"plant\": \"lúa\",\n            \"pest\": \"sâu cuốn lá\",\n            \"dosage\": \"200 - 300 ml/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n        \"registrationUnitAddress\": \"\",\n        \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n        \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"name\": \" Ababetter  3.6EC\",\n    \"activeIngredient\": \"Abamectin\",\n    \"content\": \"36g/l\",\n    \"plantProtectionProductGroup\": \"Thuốc trừ sâu\",\n    \"ghs\": \"7\",\n    \"who\": \"6\",\n    \"created\": \"2019-11-14T16:43:16.899Z\",\n    \"_id\": \"5dcd842416d4391c7f8a4265\",\n    \"scopeOfUse\": [\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"dưa hấu\",\n            \"pest\": \"bọ trĩ\",\n            \"dosage\": \"0.2 - 0.3 lít/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4266\"\n        },\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"lúa\",\n            \"pest\": \"sâu cuốn lá\",\n            \"dosage\": \"200 - 300 ml/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4267\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"pppId\": \"5dcd842416d4391c7f8a4265\",\n        \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n        \"registrationUnitAddress\": \"\",\n        \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n        \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n        \"created\": \"2019-11-14T16:43:16.900Z\",\n        \"_id\": \"5dcd842416d4391c7f8a4268\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Name-is-required",
            "description": "<p>Thiếu trường tên thuốc bvtv</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GHS-must-be-a-number",
            "description": "<p>Trường GHS phải là số</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WHO-must-be-a-number",
            "description": "<p>Trường WHO phải là số</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PHI-must-be-a-number",
            "description": "<p>Trường PHI phải là số</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Thuốc bvtv tồn tại:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Thuốc bảo vệ thực vật với tên '\" + name + \"' đã tồn tại.\"\n}",
          "type": "json"
        },
        {
          "title": "Thiếu trường tên thuốc bvtv:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Vui lòng nhập tên thuốc bvtv\"\n}",
          "type": "json"
        },
        {
          "title": "Trường WHO phải là số:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Trường WHO phải là số\"\n}",
          "type": "json"
        },
        {
          "title": "Trường GHS phải là số:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Trường GHS phải là số\"\n}",
          "type": "json"
        },
        {
          "title": "Trường PHI phải là số:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"errorMessage\": \"Trường PHI phải là số\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProducts"
  },
  {
    "type": "delete",
    "url": "/api/plant-protection-products/",
    "title": "Delete plant protection product",
    "name": "DeletePlantProtectionProduct",
    "group": "PlantProtectionProducts",
    "examples": [
      {
        "title": "Xóa thuốc bảo vệ thực vật theo _id:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?_id=5dd6527842d8944aa7cef4a1",
        "type": "curl"
      },
      {
        "title": "Xóa thuốc bảo vệ thực vật theo tên:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?name=Abagold 55EC",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten cua thuoc bao ve thuc vat</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"successMessage\": \"Xóa thuốc bảo vệ thực vật thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"errorMessage\": \"Không tìm thấy thuốc bảo vệ thực vật\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProducts"
  },
  {
    "type": "get",
    "url": "/api/plant-protection-products",
    "title": "Get all plant protection products",
    "name": "GetAllPlantProtectionProducts",
    "group": "PlantProtectionProducts",
    "examples": [
      {
        "title": "Tìm kiếm thuốc bảo vệ thực vật:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?pageNumber=9&nPerPage=20",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pageNumber",
            "description": "<p>Số thứ tự trang cần lấy</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "nPerPage",
            "description": "<p>Số lượng thuốc bvtv trên mỗi trang</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalProducts",
            "description": "<p>Tổng số thuốc bvtv trong danh mục</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "totalPages",
            "description": "<p>Tổng số lượng trang</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n{\n     \"totalProducts\": 6331,\n     \"totalPages\": 317,\n     \"data\": [\n         {\n             \"_id\": \"5dce66cb5c25ee6da0a29ac8\",\n             \"name\": \" Ababetter  3.6EC\",\n             \"activeIngredient\": \"Abamectin\",\n             \"content\": \"36g/l\",\n             \"plantProtectionProductGroup\": \"\",\n             \"ghs\": \"\",\n             \"who\": \"2\",\n             \"created\": \"2019-11-15T08:50:19.842Z\",\n             \"scopeOfUse\": [\n                 {\n                     \"_id\": \"5dce66cc5c25ee6da0a29ac9\",\n                     \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n                     \"plant\": \"dưa hấu\",\n                     \"pest\": \"bọ trĩ\",\n                     \"dosage\": \"0.2 - 0.3 lít/ha\",\n                     \"phi\": \"7\",\n                     \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n                     \"created\": \"2019-11-15T08:50:20.100Z\"\n                 }\n             ],\n             \"registrationInfo\": {\n                 \"_id\": \"5dce66cc5c25ee6da0a29acd\",\n                 \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n                 \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n                 \"registrationUnitAddress\": \"\",\n                 \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n                 \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n                 \"created\": \"2019-11-15T08:50:20.107Z\"\n             }\n         },\n         {\n             \"_id\": \"5dce66e25c25ee6da0a29ace\",\n             \"name\": \" Ababetter  5EC\",\n             \"activeIngredient\": \"Abamectin\",\n             \"content\": \"50g/l\",\n             \"plantProtectionProductGroup\": \"\",\n             \"ghs\": \"\",\n             \"who\": \"2\",\n             \"created\": \"2019-11-15T08:50:42.728Z\",\n             \"scopeOfUse\": [\n                 {\n                     \"_id\": \"5dce66e25c25ee6da0a29acf\",\n                     \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                     \"plant\": \"lúa\",\n                     \"pest\": \"sâu cuốn lá\",\n                     \"dosage\": \"150 - 250 ml/ha\",\n                     \"phi\": \"\",\n                     \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n                     \"created\": \"2019-11-15T08:50:42.728Z\"\n                 },\n                 {\n                     \"_id\": \"5dce66e25c25ee6da0a29ad0\",\n                     \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                     \"plant\": \"quýt\",\n                     \"pest\": \"nhện đỏ\",\n                     \"dosage\": \"0.0375 - 0.0625%\",\n                     \"phi\": \"\",\n                     \"usage\": \"Phun ướt đều plant khi mật độ khoảng \\r\\n5 - 6 con/ lá\",\n                     \"created\": \"2019-11-15T08:50:42.728Z\"\n                 }\n             ],\n             \"registrationInfo\": {\n                 \"_id\": \"5dce66e25c25ee6da0a29ad1\",\n                 \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                 \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n                 \"registrationUnitAddress\": \"\",\n                 \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n                 \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n                 \"created\": \"2019-11-15T08:50:42.728Z\"\n             }\n         }\n         ...\n     ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"errorMessage\": \"Trang tìm kiếm không tồn tại\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProducts"
  },
  {
    "type": "get",
    "url": "/api/plant-protection-products",
    "title": "Get plant protection product by query",
    "name": "GetPlantProtectionProductByQuery",
    "group": "PlantProtectionProducts",
    "examples": [
      {
        "title": "Tìm thuốc bảo vệ thực vật theo _id:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products/query?_id=5dd6527842d8944aa7cef84e",
        "type": "curl"
      },
      {
        "title": "Tìm thuốc bảo vệ thực vật theo tên:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products/query?name=B52-usa 500EC",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"name\": \" Ababetter 3.6EC\",\n    \"activeIngredient\": \"Abamectin\",\n    \"content\": \"36g/l\",\n    \"plantProtectionProductGroup\": \"Thuốc trừ sâu\",\n    \"ghs\": \"7\",\n    \"who\": \"6\",\n    \"created\": \"2019-11-14T16:43:16.899Z\",\n    \"_id\": \"5dcd842416d4391c7f8a4265\",\n    \"scopeOfUse\": [\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"dưa hấu\",\n            \"pest\": \"bọ trĩ\",\n            \"dosage\": \"0.2 - 0.3 lít/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4266\"\n        },\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"lúa\",\n            \"pest\": \"sâu cuốn lá\",\n            \"dosage\": \"200 - 300 ml/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4267\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"pppId\": \"5dcd842416d4391c7f8a4265\",\n        \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n        \"registrationUnitAddress\": \"\",\n        \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n        \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n        \"created\": \"2019-11-14T16:43:16.900Z\",\n        \"_id\": \"5dcd842416d4391c7f8a4268\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"errorMessage\": \"Không tìm thấy thuốc bảo vệ thực vật\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProducts"
  },
  {
    "type": "patch",
    "url": "/api/plant-protection-products",
    "title": "Update plant protection product",
    "name": "UpdatePlantProtectionProduct",
    "group": "PlantProtectionProducts",
    "examples": [
      {
        "title": "Update thuốc bvtv theo _id:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?_id=5df1d86fadb2472bffdde52c",
        "type": "curl"
      },
      {
        "title": "Update thuốc bvtv theo tên:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?name=Alfatin 1.8EC",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Update JSON example",
          "content": "{\n      \"name\": \"updated\",\n      \"activeIngredient\": \"updated\",\n      \"content\": \"updated\",\n      \"plantProtectionProductGroup\": \"updated\",\n      \"ghs\": \"20\",\n      \"who\": \"20\",\n      \"scopeOfUse\": [\n          {\n              \"_id\": \"5df1d870adb2472bffde2f09\",\n              \"pppId\": \"5df1d86fadb2472bffdde52c\",\n              \"plant\": \"updated\",\n              \"pest\": \"updated\",\n              \"dosage\": \"updated\",\n              \"phi\": \"9\",\n              \"usage\": \"updated\"\n          },\n          {\n              \"_id\": \"5df1d870adb2472bffde2f0a\",\n              \"pppId\": \"5df1d86fadb2472bffdde52c\",\n              \"plant\": \"updated\",\n              \"pest\": \"updated\",\n              \"dosage\": \"updated\",\n              \"phi\": \"9\",\n              \"usage\": \"updated\"\n          }\n      ],\n      \"registrationInfo\": {\n          \"_id\": \"5df1d870adb2472bffde2f0b\",\n          \"pppId\": \"5df1d86fadb2472bffdde52c\",\n          \"registrationUnit\": \"updated\",\n          \"registrationUnitAddress\": \"updated\",\n          \"manufacturer\": \"updated\",\n          \"manufacturerAddress\": \"updated\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Tên thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoạt chất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Hàm lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhóm độc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhóm độc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Phạm vi sử dụng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cây trồng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dịch hại</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Liều lượng</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phi",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "usage",
            "description": "<p>Cách dùng</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thông tin đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Đơn vị đăng ký</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Địa chỉ</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nhà sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Địa chi sản xuất</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID của thuốc bảo vệ thực vật</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID của thuốc bảo vệ thực vật || Phạm vi sử dụng || Thông tin đăng ký</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"_id\": \"5df1d86fadb2472bffdde52c\",\n    \"name\": \"updated\",\n    \"activeIngredient\": \"updated\",\n    \"content\": \"updated\",\n    \"plantProtectionProductGroup\": \"updated\",\n    \"ghs\": \"20\",\n    \"who\": \"20\",\n    \"created\": \"2019-12-12T06:04:31.587Z\",\n    \"scopeOfUse\": [\n        {\n            \"_id\": \"5df1d870adb2472bffde2f09\",\n            \"pppId\": \"5df1d86fadb2472bffdde52c\",\n            \"plant\": \"updated\",\n            \"pest\": \"updated\",\n            \"dosage\": \"updated\",\n            \"phi\": \"9\",\n            \"usage\": \"updated\",\n            \"created\": \"2019-12-12T06:04:32.858Z\"\n        },\n        {\n            \"_id\": \"5df1d870adb2472bffde2f0a\",\n            \"pppId\": \"5df1d86fadb2472bffdde52c\",\n            \"plant\": \"updated\",\n            \"pest\": \"updated\",\n            \"dosage\": \"updated\",\n            \"phi\": \"9\",\n            \"usage\": \"updated\",\n            \"created\": \"2019-12-12T06:04:32.858Z\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"_id\": \"5df1d870adb2472bffde2f0b\",\n        \"pppId\": \"5df1d86fadb2472bffdde52c\",\n        \"registrationUnit\": \"updated\",\n        \"registrationUnitAddress\": \"updated\",\n        \"manufacturer\": \"updated\",\n        \"manufacturerAddress\": \"updated\",\n        \"created\": \"2019-12-12T06:04:32.858Z\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"errorMessage\": \"Không tìm thấy thuốc bảo vệ thực vật phù hợp!\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "PlantProtectionProducts"
  },
  {
    "type": "post",
    "url": "/resources",
    "title": "Them resource can quan ly quyen",
    "version": "0.1.0",
    "name": "PostResource",
    "group": "Resource",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/resources",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten resource can quan ly</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>Danh sach role cho nguoi dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role.user",
            "description": "<p>Ki hieu quyen cho nguoi dung la user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role.manager",
            "description": "<p>Ki hieu quyen cho nguoi dung la manager</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role.administrator",
            "description": "<p>Ki hieu quyen cho nguoi dung la administrator</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\":\"user\",\n    \"role\":{\n        \"user\":\"G\",\n        \"manager\":\"GU\",\n        \"administrator\":\"GUDP\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten resource da quan ly.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "role",
            "description": "<p>danh sach role doi voi tung loai nguoi dung.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.user",
            "description": "<p>Ki hieu quyen cho nguoi dung la user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.manager",
            "description": "<p>Ki hieu quyen cho nguoi dung la manager</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role.administrator",
            "description": "<p>Ki hieu quyen cho nguoi dung la administrator</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>ngay them moi resource</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>id cua resource</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"name\": \"main\",\n        \"role\": {\n            \"user\": \"\",\n            \"manager\": \"G\",\n            \"administrator\": \"GPUD\"\n        },\n        \"created\": \"2019-11-14T07:39:33.888Z\",\n        \"_id\": \"5dcd04b5e99a6d1c435e6ff1\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Resource-already-exist",
            "description": "<p>resource da ton tai</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"resource already exist\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "/roles",
    "title": "Them phuong thuc moi",
    "version": "0.1.0",
    "name": "PostRole",
    "group": "Role",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/roles",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "char(1)",
            "optional": false,
            "field": "_id",
            "description": "<p>Ki hieu cua method</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>Ten method</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"_id\":\"D\",\n    \"method\":\"DELETE\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ki hieu cua method</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>Ten method</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>Ngay them vao database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"D\",\n        \"method\": \"DELETE\",\n        \"created\": \"2019-11-14T07:10:50.507Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "error-creating-new-role",
            "description": "<p>Thong tin tao moi sai</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"error creating new role\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Role"
  },
  {
    "type": "post",
    "url": "/refresh_token",
    "title": "Xac thuc lay access token moi",
    "version": "0.1.0",
    "name": "PostToken",
    "group": "Token",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/refresh_token",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>refresh token cua nguoi dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"refresh_token\": \"fsfsdhfwrtwjf34yrwi4rjfweoifhefjwpuwfseo.oiehskdlwhwsfoiwdfsj3ljdnvkjdbfwoh\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refresh_token",
            "description": "<p>refresh token moi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>access token moi</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"refresh_token\": \"fsjdoiwukmvwafojf9wa4rrjirhfelkfsarwjijgerhggjh8reighoighergelrgsfhg\",\n    \"token\": \"sdfhwefdfbnbvsuerisbcfuhriufbwfjbskfheiurhkjfiurtherwgfkjsdhfsg\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Verify-JWT-token-failed",
            "description": "<p>refresh token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Request-without-refresh-token",
            "description": "<p>Khong tim thay refresh token tren request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Request without refresh token\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "Token"
  },
  {
    "type": "get",
    "url": "/users/me",
    "title": "Get user info from token",
    "version": "0.1.0",
    "name": "CheckToken",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users/me",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>Ngay tao token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>Thong tin cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user._id",
            "description": "<p>ID cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>Ten cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.personalId",
            "description": "<p>So CMND cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.address",
            "description": "<p>Địa chỉ cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.phone",
            "description": "<p>So dien thoai cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>Địa chỉ email cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.user",
            "description": "<p>Loai nguoi dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.HTXId",
            "description": "<p>ID cua hop tac xa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.created",
            "description": "<p>ngay tao account cua user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5dca9992d683f81b09183344\",\n    \"created\": \"2019-11-12T11:37:54.687Z\",\n    \"user\": {\n        \"_id\": \"5dca995fd683f81b09183342\",\n        \"name\": \"Nguyen Quang Khai\",\n        \"personalId\": \"381823821\",\n        \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n        \"phone\": \"0836810112\",\n        \"email\": \"vanloi10c@gmail.com\",\n        \"user\": \"manager\",\n        \"HTXId\": \"115\"\n    },\n        \"created\": \"2019-11-12T11:37:03.461Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Access-dinied",
            "description": "<p>Token khong hop le</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Access dinied\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
    "version": "0.1.0",
    "name": "CreateUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ảnh đại diện của user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "personalId",
            "description": "<p>So CMND cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Chuc vu cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "HTXId",
            "description": "<p>ID cua hop tac xa</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mat khau cua nguoi su dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"Nguyen Van Loi\",\n  \"avatar\": file,\n  \"personalId\":\"384736273\",\n  \"address\": \"Ninh Kieu, Can Tho\",\n  \"phone\": \"093827463\",\n  \"email\": \"admin@gmail.com\",\n  \"user\": \"user\",\n  \"HTXId\": \"dowidnfjd\",\n  \"password\": \"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>Ten file avatar</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "personalId",
            "description": "<p>So CMND cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Chuc vu cua nguoi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "HTXId",
            "description": "<p>ID cua hop tac xa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>Thoi gian nguoi dung duoc tao</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua nguoi su dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Nguyen Quang Khai\",\n    \"avatar\": \"http://localhost:3003/image-1576222546040.png\",\n    \"personalId\": \"381823821\",\n    \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n    \"email\": \"vanloi10c@gmail.com\",\n    \"user\": \"user\",\n    \"HTXId\": \"115\",\n    \"created\": \"2019-11-12T12:13:24.216Z\",\n    \"_id\": \"5dcaa1e4e363dc1df58f0317\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Name-is-required",
            "description": "<p>Thieu truong ten nguoi dung</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Personal-id-is-invalid",
            "description": "<p>So CMND sai</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Phone-number-already-exist",
            "description": "<p>Nguoi dung da ton tai trong CSDL</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Phone-number-is-reqired",
            "description": "<p>Thieu SDT</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Passsword-is-required-and-more-than-3-characters",
            "description": "<p>Khong co ma khau hoac mat khau qua ngan</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Phone number already exist\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:userId",
    "title": "Get user info from id",
    "version": "0.1.0",
    "name": "GetUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users/all",
        "type": "curl"
      },
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users/fsdlkfjsdoeijfsdlsdfj",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userId",
            "description": "<p>User ID hoac gia tri &quot;all&quot; voi yeu cau tat ca user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "personalId",
            "description": "<p>So CMND cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Địa chỉ cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Địa chỉ email cua user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>Loai nguoi dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "HTXId",
            "description": "<p>ID cua hop tac xa</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>ngay tao account cua user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5dc7c9fbeae2ba2a92117f4c\",\n        \"name\": \"Nguyen Van Loi\",\n        \"personalId\": \"381823821\",\n        \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n        \"phone\": \"0836810223\",\n        \"email\": \"vanloi10c@gmail.com\",\n        \"user\": \"user\",\n        \"HTXId\": \"115\",\n        \"password\": \"$2b$10$tLavRp8.KFIcD8Rk4BBn7eR1qtfzBJsM6kUcNEyB5N.fLfZldXPoi\",\n        \"created\": \"2019-11-10T08:27:39.377Z\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-ID-is-invalid",
            "description": "<p>User Id khong dung</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Users-are-not-found",
            "description": "<p>Khong tim thay nguoi dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Access denied\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/login",
    "title": "Login user",
    "version": "0.1.0",
    "name": "LoginUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/login",
        "type": "curl"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>So dien thoai cua nguoi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Mat khau cua nguoi su dung</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"phone\": \"0847362182\",\n  \"password\":\"123456\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>ID token</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "created",
            "description": "<p>Ngay login</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e\n    yJfaWQiOiI1ZGQ2YTVjMWEwYWJkYTcwZmQ2YmZjYzkiLCJuYW\n    1lIjoiTmd1eWVuIHZhbiBsb2kiLCJwZXJzb25hbElkIjoiNDc\n    zNzI2MzcyMiIsImFkZHJlc3MiOiIiLCJwaG9uZSI6IjA4NDcz\n    ODE5MjIxIiwiZW1haWwiOiJsb2lAZ21haWwuY29tIiwidXNlci\n    I6InVzZXIiLCJIVFhJZCI6bnVsbCwicGFzc3dvcmQiOiIkMmI\n    kMTAkVE51bm1UR3poV2FhLjZtOUtSU1Z3LnBTU2JHT284RHZC\n    b3JZZFdZMWJXUmZXQnNiZ1BhTlMiLCJjcmVhdGVkIjoiMjAxO\n    S0xMS0yMVQxNDo1NzowNS4yMDBaIiwiaWF0IjoxNTc0MzQ4Mj\n    g5LCJleHAiOjE1NzQzNDgzNDl9.JeuNFsCBVC30Glz5YsBTb3\n    GzaqwdTfApwrLYIKxWrMU\",\n    \"refreshToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX\n    VCJ9.eyJfaWQiOiI1ZGQ2YTVjMWEwYWJkYTcwZmQ2YmZjYzki\n    LCJuYW1lIjoiTmd1eWVuIHZhbiBsb2kiLCJwZXJzb25hbElkI\n    joiNDczNzI2MzcyMiIsImFkZHJlc3MiOiIiLCJwaG9uZSI6Ij\n    A4NDczODE5MjIxIiwiZW1haWwiOiJsb2lAZ21haWwuY29tIiw\n    idXNlciI6InVzZXIiLCJIVFhJZCI6bnVsbCwicGFzc3dvcmQi\n    OiIkMmIkMTAkVE51bm1UR3poV2FhLjZtOUtSU1Z3LnBTU2JHT\n    284RHZCb3JZZFdZMWJXUmZXQnNiZ1BhTlMiLCJjcmVhdGVkIj\n    oiMjAxOS0xMS0yMVQxNDo1NzowNS4yMDBaIiwiaWF0IjoxNTc\n    0MzQ4Mjg5LCJleHAiOjE1NzQzNDg0MDl9.VZKH4yNpTsH0Umi\n    lLNUI45rtsA3QvuiRAy8UHRav__A\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Phone-and-password-are-required",
            "description": "<p>Thieu SDT hoac mat khau</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-is-not-found",
            "description": "<p>Khong tim thay nguoi su dung</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Wrong-password",
            "description": "<p>Sai mat khau</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Password is wrong\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "none"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users",
    "title": "Update users info",
    "version": "0.1.0",
    "name": "PatchUsers",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users",
        "type": "curl"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "Query",
            "description": "<p>Bo Loc danh sach nguoi dung cho viec update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Query.Params",
            "description": "<p>Danh sach thuoc tinh cua bo loc. VD: name, _id, phone, address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "update",
            "description": "<p>Thong tin can update</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "update.set",
            "description": "<p>Tap hop cac thuoc tinh can update</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "update.set.Params",
            "description": "<p>Danh sach thuoc tinh can update. VD: name, address, _id,...</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"query\":{\n        \"name\":\"Nguyen Van Loi\"\n    },\n    \"update\":{\n        \"$set\":{\n            \"HTXfdId\": \"116\"\n        }\n    }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "nModified",
            "description": "<p>So luong du lieu da cap nhat</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"nModified\": \"4\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Permission-denied",
            "description": "<p>Token khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User-id-is-invalid-in-query-block",
            "description": "<p>User Id khong hop le</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Nothing-to-update",
            "description": "<p>Query sai hoac du lieu update da ton tai trong database</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Nothing to update\"\n    }",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "manager-admin"
      }
    ],
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./docs/apidoc/main.js",
    "group": "_home_loi_webWorkspace_CLC_2019_Nhat_ky_san_xuat_backend_docs_apidoc_main_js",
    "groupTitle": "_home_loi_webWorkspace_CLC_2019_Nhat_ky_san_xuat_backend_docs_apidoc_main_js",
    "name": ""
  }
] });
