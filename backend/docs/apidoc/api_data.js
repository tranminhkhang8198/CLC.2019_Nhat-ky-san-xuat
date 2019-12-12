define({ "api": [
  {
    "type": "delete",
    "url": "/api/cooperatives",
    "title": "Request User information",
    "name": "DeleteCooperatives",
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
            "description": "<p>Lọc danh sách các dữ liệu cần xóa.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"query\":{\n        \"_id\": \"5de66297c78c93258003b0d0\"\n\t}\n}",
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
            "field": "responseMessage",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "get",
    "url": "/api/cooperatives",
    "title": "Tìm kiếm thông tin HTX.",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "patch",
    "url": "/api/cooperatives",
    "title": "Cập nhật thông tin của HTX.",
    "name": "PatchCooperatives",
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
            "description": "<p>filter cho tác vụ update.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "update",
            "description": "<p>Update object.</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "update.set",
            "description": "<p>phương thức update.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"query\":{\n\t\t\"_id\": \"5dece63aa343bc1aad4b2565\"\n\t},\n\t\"update\":{\n\t\t\"$set\":{\n\t\t\t\"name\":\"Hop tac xa nong thon moi2\"\n\n\t\t}\n\t}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "nModified",
            "description": "<p>Số documents đã được update.</p>"
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "post",
    "url": "/api/cooperatives",
    "title": "Thêm HTX mới",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Cooperatives"
  },
  {
    "type": "post",
    "url": "/api/diaries",
    "title": "Xóa HTX.",
    "name": "PostDiaries",
    "group": "Diaries",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/Diaries",
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
            "field": "plant_id",
            "description": "<p>ID của loại cây trồng.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "area_id",
            "description": "<p>ID của khu vực gieo trồng.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "HTX_id",
            "description": "<p>ID của HTX.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "begin",
            "description": "<p>Thời gian bắt đầu mùa vụ (dạng time-stem-unix)).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "end",
            "description": "<p>Thời gian kết thúc mùa vụ (dạng time-stem-unix)).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n\t\"query\":{\n        \"_id\": \"5de66297c78c93258003b0d0\"\n\t}\n}",
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
            "field": "firstname",
            "description": "<p>Firstname of the User.</p>"
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Diaries"
  },
  {
    "type": "post",
    "url": "/fertilizer",
    "title": "Create new fertilizer",
    "name": "CreateFertilizer",
    "group": "Fertilizer",
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
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"Phân bón với tên '\" + name + \"' đã tồn tại.\"\n}",
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
    "groupTitle": "Fertilizer"
  },
  {
    "type": "get",
    "url": "/fertilizers",
    "title": "Get all fertilizers with pageNumber and nPerPage",
    "name": "GetAllFertilizer",
    "group": "Fertilizer",
    "examples": [
      {
        "title": "Tìm kiếm phân bón:",
        "content": "curl -i http://localhost:3001/api/fertilizer?pageNumber=9&nPerPage=20",
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5de75a92f4e889141cc24ee8\",\n        \"ministry\": \"Công thương\",\n        \"province\": \"Bà Rịa - Vũng Tàu\",\n        \"enterprise\": \"Công ty TNHH YARA Việt Nam\",\n        \"type\": \"Phân vô cơ\",\n        \"name\": \"Phân bón NPK Kristalon Scarlet (7.5-12-36+TE)\",\n        \"ingredient\": \"Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%\",\n        \"lawDocument\": \"Nts: 7,5%; P2O5hh: 12%; K2Ohh: 36%; S: 4%; B: 0,025%; Cu: 0,01%; Fe: 0,07%; Zn: 0,025%; Mn: 0,04%; Mo: 0,004%; Độ ẩm: 0,8%\",\n        \"isoCertOrganization\": \"\",\n        \"manufactureAndImport\": \"\",\n        \"created\": \"2019-12-04T07:04:50.952Z\"\n    },\n    {\n        \"_id\": \"5de75a92f4e889141cc24efd\",\n        \"ministry\": \"Công thương\",\n        \"province\": \"Bà Rịa - Vũng Tàu\",\n        \"enterprise\": \"Công ty TNHH YARA Việt Nam\",\n        \"type\": \"Phân vô cơ\",\n        \"name\": \"Phân bón NPK 15-9-20+TE\",\n        \"ingredient\": \"Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%\",\n        \"lawDocument\": \"Nts: 15%; P2O5hh: 9%; K2Ohh: 20%; MgO: 1,8%; S: 3,8%; B: 0,015%; Mn: 0,02%; Zn: 0,02%; Độ ẩm 0,8%\",\n        \"isoCertOrganization\": \"\",\n        \"manufactureAndImport\": \"\",\n        \"created\": \"2019-12-04T07:04:50.956Z\"\n    },\n    {\n        \"_id\": \"5de75a92f4e889141cc24f7d\",\n        \"ministry\": \"Công thương\",\n        \"province\": \"Bà Rịa - Vũng Tàu\",\n        \"enterprise\": \"Công ty TNHH Sản xuất NGÔI SAO VÀNG\",\n        \"type\": \"Phân vô cơ\",\n        \"name\": \"Phân vi lượng TE MAX ( SUPER CHELATE)\",\n        \"ingredient\": \"\",\n        \"lawDocument\": \"\",\n        \"isoCertOrganization\": \"\",\n        \"manufactureAndImport\": \"\",\n        \"created\": \"2019-12-04T07:04:50.974Z\"\n    },\n    ...\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Conflict\n{\n  \"error\": \"\"\n}",
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
    "groupTitle": "Fertilizer"
  },
  {
    "type": "get",
    "url": "/fertilizers",
    "title": "Get fertilizer by query",
    "name": "GetFertilizerByQuery",
    "group": "Fertilizer",
    "examples": [
      {
        "title": "Tìm kiếm phân bón theo _id:",
        "content": "curl -i http://localhost:3001/api/fertilizer?_id=5de75a92f4e889141cc24ef5",
        "type": "curl"
      },
      {
        "title": "Tìm kiếm phân bón theo tên:",
        "content": "curl -i http://localhost:3001/api/fertilizer?name=Phân bón Calcium Nitrate( Calcinit)",
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
          "content": "HTTP/1.1 404 Not found\n{\n  \"error\": \"Không tìm thấy phân bón\"\n}",
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
    "groupTitle": "Fertilizer"
  },
  {
    "type": "patch",
    "url": "/fertilizer",
    "title": "Update fertilizer",
    "name": "UpdateFertilizer",
    "group": "Fertilizer",
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
          "content": "HTTP/1.1 404 Conflict\n{\n  \"error\": \"Không tìm thấy phân bón\"\n}",
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
    "groupTitle": "Fertilizer"
  },
  {
    "type": "post",
    "url": "/plant-protection-product",
    "title": "Create new plant protection product",
    "name": "CreatePlantProtectionProduct",
    "group": "PlantProtectionProduct",
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
            "description": "<p>Thieu truong thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "GHS-must-be-a-number",
            "description": "<p>Truong GHS phai la so</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "WHO-must-be-a-number",
            "description": "<p>Truong WHO phai la so</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PHI-must-be-a-number",
            "description": "<p>Truong PHI phai la so</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 Conflict\n{\n  \"error\": \"Thuốc bảo vệ thực vật với tên '\" + name + \"' đã tồn tại.\"\n}",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "delete",
    "url": "/fertilizer/",
    "title": "Delete fertilizer by query",
    "name": "DeleteFertilizerByQuery",
    "group": "PlantProtectionProduct",
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
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": \"Xóa phân báo thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"error\": \"Không tìm thấy phân báo\"\n}",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "delete",
    "url": "/plant-protection-products/",
    "title": "Delete plant protection product by query",
    "name": "DeletePlantProtectionProductByQuery",
    "group": "PlantProtectionProduct",
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
          "content": "HTTP/1.1 200 OK\n{\n   \"success\": \"Xóa thuốc bảo vệ thực vật thành công\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n    \"error\": \"Không tìm thấy thuốc bảo vệ thực vật\"\n}",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "get",
    "url": "/plant-protection-product",
    "title": "Get all plant protection product",
    "name": "GetAllPlantProtectionProduct",
    "group": "PlantProtectionProduct",
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5dce66cb5c25ee6da0a29ac8\",\n        \"name\": \" Ababetter  3.6EC\",\n        \"activeIngredient\": \"Abamectin\",\n        \"content\": \"36g/l\",\n        \"plantProtectionProductGroup\": \"\",\n        \"ghs\": \"\",\n        \"who\": \"2\",\n        \"created\": \"2019-11-15T08:50:19.842Z\",\n        \"scopeOfUse\": [\n            {\n                \"_id\": \"5dce66cc5c25ee6da0a29ac9\",\n                \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n                \"plant\": \"dưa hấu\",\n                \"pest\": \"bọ trĩ\",\n                \"dosage\": \"0.2 - 0.3 lít/ha\",\n                \"phi\": \"7\",\n                \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n                \"created\": \"2019-11-15T08:50:20.100Z\"\n            }\n        ],\n        \"registrationInfo\": {\n            \"_id\": \"5dce66cc5c25ee6da0a29acd\",\n            \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n            \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n            \"registrationUnitAddress\": \"\",\n            \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n            \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n            \"created\": \"2019-11-15T08:50:20.107Z\"\n        }\n    },\n    {\n        \"_id\": \"5dce66e25c25ee6da0a29ace\",\n        \"name\": \" Ababetter  5EC\",\n        \"activeIngredient\": \"Abamectin\",\n        \"content\": \"50g/l\",\n        \"plantProtectionProductGroup\": \"\",\n        \"ghs\": \"\",\n        \"who\": \"2\",\n        \"created\": \"2019-11-15T08:50:42.728Z\",\n        \"scopeOfUse\": [\n            {\n                \"_id\": \"5dce66e25c25ee6da0a29acf\",\n                \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                \"plant\": \"lúa\",\n                \"pest\": \"sâu cuốn lá\",\n                \"dosage\": \"150 - 250 ml/ha\",\n                \"phi\": \"\",\n                \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n                \"created\": \"2019-11-15T08:50:42.728Z\"\n            },\n            {\n                \"_id\": \"5dce66e25c25ee6da0a29ad0\",\n                \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                \"plant\": \"quýt\",\n                \"pest\": \"nhện đỏ\",\n                \"dosage\": \"0.0375 - 0.0625%\",\n                \"phi\": \"\",\n                \"usage\": \"Phun ướt đều plant khi mật độ khoảng \\r\\n5 - 6 con/ lá\",\n                \"created\": \"2019-11-15T08:50:42.728Z\"\n            }\n        ],\n        \"registrationInfo\": {\n            \"_id\": \"5dce66e25c25ee6da0a29ad1\",\n            \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n            \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n            \"registrationUnitAddress\": \"\",\n            \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n            \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n            \"created\": \"2019-11-15T08:50:42.728Z\"\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Conflict\n{\n  \"error\": \"\"\n}",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "get",
    "url": "/plant-protection-products/:id",
    "title": "Get plant protection product by query",
    "name": "GetPlantProtectionProductByQuery",
    "group": "PlantProtectionProduct",
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
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhóm thuốc</p>"
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
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Không tìm thấy thuốc bảo vệ thực vật\"\n    }",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "patch",
    "url": "/plant-protection-products/",
    "title": "Update plant protection product by query",
    "name": "UpdatePlantProtectionProductByQuery",
    "group": "PlantProtectionProduct",
    "examples": [
      {
        "title": "Update thuoc bvtv theo _id:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products?_id=5df1d86fadb2472bffdde52c",
        "type": "curl"
      },
      {
        "title": "Update thuoc bvtv theo tên:",
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
          "content": "{\n    \"update\": {\n        \"name\": \"updated\",\n        \"activeIngredient\": \"updated\",\n        \"content\": \"updated\",\n        \"plantProtectionProductGroup\": \"updated\",\n        \"ghs\": \"20\",\n        \"who\": \"20\",\n        \"scopeOfUse\": [\n            {\n                \"_id\": \"5df1d870adb2472bffde2f09\",\n                \"pppId\": \"5df1d86fadb2472bffdde52c\",\n                \"plant\": \"updated\",\n                \"pest\": \"updated\",\n                \"dosage\": \"updated\",\n                \"phi\": \"9\",\n                \"usage\": \"updated\"\n            },\n            {\n                \"_id\": \"5df1d870adb2472bffde2f0a\",\n                \"pppId\": \"5df1d86fadb2472bffdde52c\",\n                \"plant\": \"updated\",\n                \"pest\": \"updated\",\n                \"dosage\": \"updated\",\n                \"phi\": \"9\",\n                \"usage\": \"updated\"\n            }\n        ],\n        \"registrationInfo\": {\n            \"_id\": \"5df1d870adb2472bffde2f0b\",\n                   \"pppId\": \"5df1d86fadb2472bffdde52c\",\n            \"registrationUnit\": \"updated\",\n            \"registrationUnitAddress\": \"updated\",\n            \"manufacturer\": \"updated\",\n            \"manufacturerAddress\": \"updated\"\n        }\n    }\n}",
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
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Không tìm thấy thuốc bảo vệ thực vật phù hợp!\"\n    }",
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
    "groupTitle": "PlantProtectionProduct"
  },
  {
    "type": "post",
    "url": "/resources",
    "title": "Them resource can quan ly quyen",
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
          "content": "{\n    \"name\":\"user\",\n    \"role\":{\n        \"user\":\"G\",\n        \"manager\":\"GU\",\n        \"administrator\":\"GUDP\",\n    }\n}",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Resource"
  },
  {
    "type": "post",
    "url": "/roles",
    "title": "Them phuong thuc moi",
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
          "content": "{\n    \"_id\":\"D\",\n    \"permission\":\"DELETE\"\n}",
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
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"D\",\n        \"permission\": \"DELETE\",\n        \"created\": \"2019-11-14T07:10:50.507Z\"\n    }\n]",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Role"
  },
  {
    "type": "post",
    "url": "/refresh_token",
    "title": "Xac thuc lay access token moi",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "Token"
  },
  {
    "type": "get",
    "url": "/users/me",
    "title": "Get user info from token",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create new user",
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
          "content": "{\n  \"name\": \"Nguyen Van Loi\",\n  \"personalId\":\"384736273\",\n  \"address\": \"Ninh Kieu, Can Tho\",\n  \"phone\": \"093827463\",\n  \"email\": \"admin@gmail.com\",\n  \"user\": \"user\",\n  \"HTXId\": \"dowidnfjd\",\n  \"password\": \"123456\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"name\": \"Nguyen Quang Khai\",\n    \"personalId\": \"381823821\",\n    \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n    \"email\": \"vanloi10c@gmail.com\",\n    \"user\": \"user\",\n    \"HTXId\": \"115\",\n    \"created\": \"2019-11-12T12:13:24.216Z\",\n    \"_id\": \"5dcaa1e4e363dc1df58f0317\"\n}",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:userId",
    "title": "Get user info from id",
    "name": "GetUser",
    "group": "User",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/users/all",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login user",
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
    "version": "0.0.0",
    "filename": "./router.js",
    "groupTitle": "User"
  },
  {
    "type": "patch",
    "url": "/users",
    "title": "Update users info",
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
    "version": "0.0.0",
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
    "group": "_home_khangtmk_SCHOOL_CLC_2019_Nhat_ky_san_xuat_backend_docs_apidoc_main_js",
    "groupTitle": "_home_khangtmk_SCHOOL_CLC_2019_Nhat_ky_san_xuat_backend_docs_apidoc_main_js",
    "name": ""
  }
] });
