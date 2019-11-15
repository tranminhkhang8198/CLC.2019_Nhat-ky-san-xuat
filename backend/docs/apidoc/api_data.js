define({ "api": [
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
            "description": "<p>Ten thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoat chat</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Ham luong</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhom thuoc</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhom doc GHS</p>"
          },
          {
            "group": "Parameter",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhom doc WHO</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Pham vi su dung</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cay trong</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dich hai</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Lieu luong</p>"
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
            "description": "<p>Cach dung</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thong tin dang ky</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Don vi dang ky</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Dia chi</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nha san xuat</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Dia chi san xuat</p>"
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
            "description": "<p>Ten thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoat chat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Ham luong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhom thuoc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhom doc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhom doc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Pham vi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cay trong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dich hai</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Lieu luong</p>"
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
            "description": "<p>Cach dung</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thong tin dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Don vi dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Dia chi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nha san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Dia chi san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID cua thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"name\": \" Ababetter  3.6EC\",\n    \"activeIngredient\": \"Abamectin\",\n    \"content\": \"36g/l\",\n    \"plantProtectionProductsGroup\": \"Thuốc trừ sâu\",\n    \"ghs\": \"7\",\n    \"who\": \"6\",\n    \"created\": \"2019-11-14T16:43:16.899Z\",\n    \"_id\": \"5dcd842416d4391c7f8a4265\",\n    \"scopeOfUse\": [\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"dưa hấu\",\n            \"pest\": \"bọ trĩ\",\n            \"dosage\": \"0.2 - 0.3 lít/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4266\"\n        },\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"lúa\",\n            \"pest\": \"sâu cuốn lá\",\n            \"dosage\": \"200 - 300 ml/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4267\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"pppId\": \"5dcd842416d4391c7f8a4265\",\n        \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n        \"registrationUnitAddress\": \"\",\n        \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n        \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n        \"created\": \"2019-11-14T16:43:16.900Z\",\n        \"_id\": \"5dcd842416d4391c7f8a4268\"\n    }\n}",
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
    "type": "get",
    "url": "/plant-protection-product",
    "title": "Get all plant protection product",
    "name": "GetAllPlantProtectionProduct",
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
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Ten thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoat chat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Ham luong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhom thuoc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhom doc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhom doc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Pham vi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cay trong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dich hai</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Lieu luong</p>"
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
            "description": "<p>Cach dung</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thong tin dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Don vi dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Dia chi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nha san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Dia chi san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID cua thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n    {\n        \"_id\": \"5dce66cb5c25ee6da0a29ac8\",\n        \"name\": \" Ababetter  3.6EC\",\n        \"activeIngredient\": \"Abamectin\",\n        \"content\": \"36g/l\",\n        \"plantProtectionProductsGroup\": \"\",\n        \"ghs\": \"\",\n        \"who\": \"2\",\n        \"created\": \"2019-11-15T08:50:19.842Z\",\n        \"scopeOfUse\": [\n            {\n                \"_id\": \"5dce66cc5c25ee6da0a29ac9\",\n                \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n                \"plant\": \"dưa hấu\",\n                \"pest\": \"bọ trĩ\",\n                \"dosage\": \"0.2 - 0.3 lít/ha\",\n                \"phi\": \"7\",\n                \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n                \"created\": \"2019-11-15T08:50:20.100Z\"\n            }\n        ],\n        \"registrationInfo\": {\n            \"_id\": \"5dce66cc5c25ee6da0a29acd\",\n            \"pppId\": \"5dce66cb5c25ee6da0a29ac8\",\n            \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n            \"registrationUnitAddress\": \"\",\n            \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n            \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n            \"created\": \"2019-11-15T08:50:20.107Z\"\n        }\n    },\n    {\n        \"_id\": \"5dce66e25c25ee6da0a29ace\",\n        \"name\": \" Ababetter  5EC\",\n        \"activeIngredient\": \"Abamectin\",\n        \"content\": \"50g/l\",\n        \"plantProtectionProductsGroup\": \"\",\n        \"ghs\": \"\",\n        \"who\": \"2\",\n        \"created\": \"2019-11-15T08:50:42.728Z\",\n        \"scopeOfUse\": [\n            {\n                \"_id\": \"5dce66e25c25ee6da0a29acf\",\n                \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                \"plant\": \"lúa\",\n                \"pest\": \"sâu cuốn lá\",\n                \"dosage\": \"150 - 250 ml/ha\",\n                \"phi\": \"\",\n                \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n                \"created\": \"2019-11-15T08:50:42.728Z\"\n            },\n            {\n                \"_id\": \"5dce66e25c25ee6da0a29ad0\",\n                \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n                \"plant\": \"quýt\",\n                \"pest\": \"nhện đỏ\",\n                \"dosage\": \"0.0375 - 0.0625%\",\n                \"phi\": \"\",\n                \"usage\": \"Phun ướt đều plant khi mật độ khoảng \\r\\n5 - 6 con/ lá\",\n                \"created\": \"2019-11-15T08:50:42.728Z\"\n            }\n        ],\n        \"registrationInfo\": {\n            \"_id\": \"5dce66e25c25ee6da0a29ad1\",\n            \"pppId\": \"5dce66e25c25ee6da0a29ace\",\n            \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n            \"registrationUnitAddress\": \"\",\n            \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n            \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n            \"created\": \"2019-11-15T08:50:42.728Z\"\n        }\n    }\n]",
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
    "title": "Get plant protection product by id",
    "name": "GetPlantProtectionProduct",
    "group": "PlantProtectionProduct",
    "examples": [
      {
        "title": "Example usage:",
        "content": "curl -i http://localhost:3001/api/plant-protection-products/:id",
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
            "field": "id",
            "description": "<p>ID cua thuoc bao ve thuc vat</p>"
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
            "description": "<p>Ten thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "activeIngredient",
            "description": "<p>Hoat chat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Ham luong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plantProtectionProductGroup",
            "description": "<p>Nhom thuoc</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "ghs",
            "description": "<p>Nhom doc GHS</p>"
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "who",
            "description": "<p>Nhom doc WHO</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "scopeOfUse",
            "description": "<p>Pham vi su dung</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "plant",
            "description": "<p>Cay trong</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "pest",
            "description": "<p>Dich hai</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "dosage",
            "description": "<p>Lieu luong</p>"
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
            "description": "<p>Cach dung</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "registrationInfo",
            "description": "<p>Thong tin dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnit",
            "description": "<p>Don vi dang ky</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "registrationUnitAddress",
            "description": "<p>Dia chi</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturer",
            "description": "<p>Nha san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "manufacturerAddress",
            "description": "<p>Dia chi san xuat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "pppId",
            "description": "<p>ID cua thuoc bao ve thuc vat</p>"
          },
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>ID cua thuoc bao ve thuc vat || pham vi su dung || thong tin dang ky</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n {\n    \"name\": \" Ababetter  3.6EC\",\n    \"activeIngredient\": \"Abamectin\",\n    \"content\": \"36g/l\",\n    \"plantProtectionProductsGroup\": \"Thuốc trừ sâu\",\n    \"ghs\": \"7\",\n    \"who\": \"6\",\n    \"created\": \"2019-11-14T16:43:16.899Z\",\n    \"_id\": \"5dcd842416d4391c7f8a4265\",\n    \"scopeOfUse\": [\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"dưa hấu\",\n            \"pest\": \"bọ trĩ\",\n            \"dosage\": \"0.2 - 0.3 lít/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun tkhi mật độ \\r\\nbọ trĩ  2-3 con/ ngọn\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4266\"\n        },\n        {\n            \"pppId\": \"5dcd842416d4391c7f8a4265\",\n            \"plant\": \"lúa\",\n            \"pest\": \"sâu cuốn lá\",\n            \"dosage\": \"200 - 300 ml/ha\",\n            \"phi\": \"7\",\n            \"usage\": \"Lượng nước phun 400 lít/ha. Phun thuốc khi sâu tuổi 1-2\",\n            \"created\": \"2019-11-14T16:43:16.900Z\",\n            \"_id\": \"5dcd842416d4391c7f8a4267\"\n        }\n    ],\n    \"registrationInfo\": {\n        \"pppId\": \"5dcd842416d4391c7f8a4265\",\n        \"registrationUnit\": \"Công ty TNHH MTV Lucky\",\n        \"registrationUnitAddress\": \"\",\n        \"manufacturer\": \"Hebei Yetian Agrochemicals Co., Ltd.\",\n        \"manufacturerAddress\": \"Xiyangling, East Circle Road, 2HD Shi Jia Zhuang City, Hebei, China.\",\n        \"created\": \"2019-11-14T16:43:16.900Z\",\n        \"_id\": \"5dcd842416d4391c7f8a4268\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n    {\n      \"error\": \"Không tìm thấy thuốc bảo vệ thực vật với id = '\" + id + \"'\"\n    }",
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
            "description": "<p>Dia chi cua user</p>"
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
            "description": "<p>Dia chi email cua user</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    \"_id\": \"5dca9992d683f81b09183344\",\n    \"created\": \"2019-11-12T11:37:54.687Z\",\n    \"user\": {\n        \"_id\": \"5dca995fd683f81b09183342\",\n        \"name\": \"Nguyen Quang Khai\",\n        \"personalId\": \"381823821\",\n        \"address\": \"14/132, 3/2 street, Ninh Kieu, Can Tho\",\n        \"phone\": \"0836810112\",\n        \"email\": \"vanloi10c@gmail.com\",\n        \"user\": \"manager\",\n        \"HTXId\": \"115\",\n    }\n        \"created\": \"2019-11-12T11:37:03.461Z\"\n}",
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
            "description": "<p>Dia chi cua nguoi su dung</p>"
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
            "description": "<p>Dia chi email cua nguoi su dung</p>"
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
          "content": "{\n  \"name\": \"Nguyen Van Loi\",\n  \"personalId\":\"384736273\",\n  \"address\": Ninh Kieu, Can Tho,\n  \"phone\": \"093827463\",\n  \"email\": \"admin@gmail.com\",\n  \"user\": \"user\",\n  \"HTXId\": \"dowidnfjd\",\n  \"password\": \"dfjeidjd\"\n}",
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
            "description": "<p>Dia chi email cua nguoi su dung</p>"
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
            "description": "<p>Dia chi cua user</p>"
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
            "description": "<p>Dia chi email cua user</p>"
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
          "content": "{\n  \"phone\": \"0847362182\",\n  \"password\":\"123456\",\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n    \"created\": \"2019-11-12T13:43:57.518Z\",\n    \"_id\": \"5dcab71db87686272aeb80f4\"\n}",
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
