// import dependencies
import React from 'react';

// import css
import './plugins/fontawesome-free/css/all.min.css';
import './plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css';
import './plugins/icheck-bootstrap/icheck-bootstrap.min.css';
import './plugins/jqvmap/jqvmap.min.css';
import './plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
import './plugins/daterangepicker/daterangepicker.css';
import './plugins/summernote/summernote-bs4.css';

import './styles/css/adminlte.min.css';

// import components
import LeftNavbar from './components/Navbar/LeftNavbar';

function App() {
  return (
    <div className="App">
      <LeftNavbar />
    </div>
  );
}

export default App;
