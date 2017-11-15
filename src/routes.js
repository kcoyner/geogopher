import Container from './Components/Container';
import Map from './Components/Map';
import Home from './Components/Home';

const routes = [
  { component: Container,
    routes: [
      { path: '/',
        exact: true,
        component: Home
      },
      { path: '/home',
        component: Home
      },
      { path: '/map',
        component: Map
      }
    ]
  }
];

export default routes;