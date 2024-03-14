import Home from '../../screens/Home/index2';
import Detail from '../../screens/ShowCatagory';
import Splash from '../../screens/Splash';
import SplashII from '../../screens/SplashII';

enum enum_stack {
  SPLASH_SCREEN = 'SPlash_Screen',
  SPLASH_SCREENII = 'SPlash_ScreenII',
  HOME_SCREEN = 'Home_Screen',
  DETAIL_SCREEN = 'Detail_Screen',
  SETTING_SCREEN = 'Setting_Screen',
  MEMORY_SCREEN = 'Memory_Screen',
  NEXT_SCREEN = 'Next_Screen',
}

const getComponentByName = (screeName: string) => {
  switch (screeName) {
    case enum_stack.SPLASH_SCREEN:
      return Splash;
    case enum_stack.SPLASH_SCREENII:
      return SplashII;
    case enum_stack.HOME_SCREEN:
      return Home;
    case enum_stack.DETAIL_SCREEN:
      return Detail;
    default:
      return Splash;
  }
};
const _routes = {
  navigation_routes: Object.keys(enum_stack).map(item => {
    let name = item as keyof typeof enum_stack;
    return {
      name: enum_stack[name],
      component: getComponentByName(enum_stack[name]),
    };
  }),
};

export default _routes;
