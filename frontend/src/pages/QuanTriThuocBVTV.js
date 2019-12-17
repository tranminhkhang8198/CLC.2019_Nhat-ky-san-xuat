/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { ListItems } from '../components/DataTable/DataTable';
import DeleteItemsModal from '../components/Modals/DeleteItemsModal';
import AddItemModal from '../components/Modals/AddItemModal';

const FAKE_DATA = [
  {
    'Tên thương phẩm': 'Tonye Hummerston',
    'Tên hoạt chất': 'Tonye',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Bondon Tocknell',
    'Tên hoạt chất': 'Bondon',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Caddric Klezmski',
    'Tên hoạt chất': 'Caddric',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Filberte Bernaciak',
    'Tên hoạt chất': 'Filberte',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Edlin Trolley',
    'Tên hoạt chất': 'Edlin',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Trixie Lusk',
    'Tên hoạt chất': 'Trixie',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Sheryl Capelow',
    'Tên hoạt chất': 'Sheryl',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Annie Wilbraham',
    'Tên hoạt chất': 'Annie',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Celia Trowler',
    'Tên hoạt chất': 'Celia',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Pauly Aplin',
    'Tên hoạt chất': 'Pauly',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Tate Wakes',
    'Tên hoạt chất': 'Tate',
    'Loại thuốc': 'americanexpress',
  }, {
    'Tên thương phẩm': 'Leon Menico',
    'Tên hoạt chất': 'Leon',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Isiahi Acaster',
    'Tên hoạt chất': 'Isiahi',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Perl Tancock',
    'Tên hoạt chất': 'Perl',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Allyn Paal',
    'Tên hoạt chất': 'Allyn',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Diahann Coutts',
    'Tên hoạt chất': 'Diahann',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Aurea Kincade',
    'Tên hoạt chất': 'Aurea',
    'Loại thuốc': 'bankcard',
  }, {
    'Tên thương phẩm': 'Papagena Dalglish',
    'Tên hoạt chất': 'Papagena',
    'Loại thuốc': 'china-unionpay',
  }, {
    'Tên thương phẩm': 'Zollie Kiddell',
    'Tên hoạt chất': 'Zollie',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Alexander Weblin',
    'Tên hoạt chất': 'Alexander',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Walton Youd',
    'Tên hoạt chất': 'Walton',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Madlin Molineaux',
    'Tên hoạt chất': 'Madlin',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Leigha Grimsdike',
    'Tên hoạt chất': 'Leigha',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Andrea Ellerbeck',
    'Tên hoạt chất': 'Andrea',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Nerita Durman',
    'Tên hoạt chất': 'Nerita',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Miranda Kastel',
    'Tên hoạt chất': 'Miranda',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Adey Bert',
    'Tên hoạt chất': 'Adey',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Claudetta Ivashkov',
    'Tên hoạt chất': 'Claudetta',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Cairistiona Truelock',
    'Tên hoạt chất': 'Cairistiona',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Glori Wreakes',
    'Tên hoạt chất': 'Glori',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Lemar Olyet',
    'Tên hoạt chất': 'Lemar',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Cullen Pavie',
    'Tên hoạt chất': 'Cullen',
    'Loại thuốc': 'americanexpress',
  }, {
    'Tên thương phẩm': 'Brien Welsh',
    'Tên hoạt chất': 'Brien',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Gennie Vanyard',
    'Tên hoạt chất': 'Gennie',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Bendicty MacIllrick',
    'Tên hoạt chất': 'Bendicty',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Conway Brazier',
    'Tên hoạt chất': 'Conway',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Ines Symes',
    'Tên hoạt chất': 'Ines',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Berthe Sudell',
    'Tên hoạt chất': 'Berthe',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Cathrine Bedford',
    'Tên hoạt chất': 'Cathrine',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Maggee Halse',
    'Tên hoạt chất': 'Maggee',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Drusy Killik',
    'Tên hoạt chất': 'Drusy',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Moreen Galley',
    'Tên hoạt chất': 'Moreen',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Chase Slark',
    'Tên hoạt chất': 'Chase',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Tim Gabala',
    'Tên hoạt chất': 'Tim',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Bab Spens',
    'Tên hoạt chất': 'Bab',
    'Loại thuốc': 'visa-electron',
  }, {
    'Tên thương phẩm': 'Bambie Orchard',
    'Tên hoạt chất': 'Bambie',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Herta Hardy-Piggin',
    'Tên hoạt chất': 'Herta',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Carie Treweek',
    'Tên hoạt chất': 'Carie',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Marja Guare',
    'Tên hoạt chất': 'Marja',
    'Loại thuốc': 'china-unionpay',
  }, {
    'Tên thương phẩm': 'Lorin Frift',
    'Tên hoạt chất': 'Lorin',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Sherill Solomon',
    'Tên hoạt chất': 'Sherill',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Corine Laxon',
    'Tên hoạt chất': 'Corine',
    'Loại thuốc': 'americanexpress',
  }, {
    'Tên thương phẩm': 'Kendra Stothart',
    'Tên hoạt chất': 'Kendra',
    'Loại thuốc': 'diners-club-enroute',
  }, {
    'Tên thương phẩm': 'Gardy MacAne',
    'Tên hoạt chất': 'Gardy',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Torey Engeham',
    'Tên hoạt chất': 'Torey',
    'Loại thuốc': 'visa',
  }, {
    'Tên thương phẩm': 'Lettie Goodlud',
    'Tên hoạt chất': 'Lettie',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Vere Jiricka',
    'Tên hoạt chất': 'Vere',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Lenna Campion',
    'Tên hoạt chất': 'Lenna',
    'Loại thuốc': 'visa',
  }, {
    'Tên thương phẩm': 'Star Brickwood',
    'Tên hoạt chất': 'Star',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Wrennie Thomann',
    'Tên hoạt chất': 'Wrennie',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Fax Kingzett',
    'Tên hoạt chất': 'Fax',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Sascha Blackaller',
    'Tên hoạt chất': 'Sascha',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Damiano Moar',
    'Tên hoạt chất': 'Damiano',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Sherye Farrant',
    'Tên hoạt chất': 'Sherye',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Stanley Sprionghall',
    'Tên hoạt chất': 'Stanley',
    'Loại thuốc': 'diners-club-enroute',
  }, {
    'Tên thương phẩm': 'Rosemaria Feehery',
    'Tên hoạt chất': 'Rosemaria',
    'Loại thuốc': 'china-unionpay',
  }, {
    'Tên thương phẩm': 'Vinny Nicholl',
    'Tên hoạt chất': 'Vinny',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Ronnica Mangeon',
    'Tên hoạt chất': 'Ronnica',
    'Loại thuốc': 'china-unionpay',
  }, {
    'Tên thương phẩm': 'Hugo Conrath',
    'Tên hoạt chất': 'Hugo',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Maddi Ginnane',
    'Tên hoạt chất': 'Maddi',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Maddi Minucci',
    'Tên hoạt chất': 'Maddi',
    'Loại thuốc': 'americanexpress',
  }, {
    'Tên thương phẩm': 'Celina Ninnoli',
    'Tên hoạt chất': 'Celina',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Teena Ors',
    'Tên hoạt chất': 'Teena',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Carly Hawket',
    'Tên hoạt chất': 'Carly',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Laurel Oggers',
    'Tên hoạt chất': 'Laurel',
    'Loại thuốc': 'diners-club-us-ca',
  }, {
    'Tên thương phẩm': 'Dallas OLeary',
    'Tên hoạt chất': 'Dallas',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Egan Baish',
    'Tên hoạt chất': 'Egan',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Leigh Blondel',
    'Tên hoạt chất': 'Leigh',
    'Loại thuốc': 'bankcard',
  }, {
    'Tên thương phẩm': 'Ferguson Chavey',
    'Tên hoạt chất': 'Ferguson',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Johnnie Biskup',
    'Tên hoạt chất': 'Johnnie',
    'Loại thuốc': 'americanexpress',
  }, {
    'Tên thương phẩm': 'Georgianne Grigorini',
    'Tên hoạt chất': 'Georgianne',
    'Loại thuốc': 'maestro',
  }, {
    'Tên thương phẩm': 'Klara MacArte',
    'Tên hoạt chất': 'Klara',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Mikel Durbridge',
    'Tên hoạt chất': 'Mikel',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Avrom MacLaverty',
    'Tên hoạt chất': 'Avrom',
    'Loại thuốc': 'bankcard',
  }, {
    'Tên thương phẩm': 'Abeu Whitnell',
    'Tên hoạt chất': 'Abeu',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Waneta Jeratt',
    'Tên hoạt chất': 'Waneta',
    'Loại thuốc': 'diners-club-enroute',
  }, {
    'Tên thương phẩm': 'Lindsay Cristofolo',
    'Tên hoạt chất': 'Lindsay',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Arleta Bech',
    'Tên hoạt chất': 'Arleta',
    'Loại thuốc': 'diners-club-carte-blanche',
  }, {
    'Tên thương phẩm': 'Gusty McGeachie',
    'Tên hoạt chất': 'Gusty',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Justis Swallwell',
    'Tên hoạt chất': 'Justis',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Stanfield Houlson',
    'Tên hoạt chất': 'Stanfield',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Arda Preuvost',
    'Tên hoạt chất': 'Arda',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Krysta Trusslove',
    'Tên hoạt chất': 'Krysta',
    'Loại thuốc': 'mastercard',
  }, {
    'Tên thương phẩm': 'Eilis Greatbanks',
    'Tên hoạt chất': 'Eilis',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Chandal Nyssens',
    'Tên hoạt chất': 'Chandal',
    'Loại thuốc': 'solo',
  }, {
    'Tên thương phẩm': 'Wilow Skillington',
    'Tên hoạt chất': 'Wilow',
    'Loại thuốc': 'jcb',
  }, {
    'Tên thương phẩm': 'Elyn McAlester',
    'Tên hoạt chất': 'Elyn',
    'Loại thuốc': 'china-unionpay',
  }, {
    'Tên thương phẩm': 'Delmor Dorking',
    'Tên hoạt chất': 'Delmor',
    'Loại thuốc': 'switch',
  }, {
    'Tên thương phẩm': 'Latia McGarvie',
    'Tên hoạt chất': 'Latia',
    'Loại thuốc': 'laser',
  }, {
    'Tên thương phẩm': 'Kary Quaintance',
    'Tên hoạt chất': 'Kary',
    'Loại thuốc': 'laser',
  },
];

// eslint-disable-next-line react/prefer-stateless-function
class QuanTriThuocBVTV extends Component {
  render() {
    if (localStorage.getItem('user') === null) {
      // console.log('Profile');
      return <Redirect to="/login" />;
    }
    return (
      <div className="container-fluid">
        <DeleteItemsModal />
        <AddItemModal />
        <div className="card shadow">
          <div className="card-header py-3">
            <p className="text-primary m-0 font-weight-bold">Danh sách thuốc bảo vệ thực vật</p>
            <div className="mt-3 d-flex flex-row justify-content-around">
              <a className="btn btn-success btn-icon-split" role="button" data-toggle="modal" data-target="#modal-add" href="/">
                <span className="text-white-50 icon">
                  <i className="fas fa-plus" />
                </span>
                <span className="text-white text">Thêm mới dữ liệu</span>
              </a>
              <a className="btn btn-danger btn-icon-split" role="button" data-toggle="modal" data-target="#modal-delete-items" href="/">
                <span className="text-white-50 icon">
                  <i className="fas fa-trash" />
                </span>
                <span className="text-white text">Xóa dữ liệu</span>
              </a>
            </div>
          </div>
          <ListItems data={FAKE_DATA} />
        </div>
      </div>
    );
  }
}

export default QuanTriThuocBVTV;
